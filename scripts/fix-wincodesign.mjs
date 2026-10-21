#!/usr/bin/env node
/**
 * scripts/fix-wincodesign.mjs
 * ---------------------------------------------------------------------------
 * Tự động khắc phục triệt để lỗi kinh điển của electron-builder trên Windows:
 * "ERROR: Cannot create symbolic link : A required privilege is not held by the client"
 * khi giải nén gói winCodeSign-2.6.0.7z (chứa symlink macOS trong thư mục darwin/).
 * ---------------------------------------------------------------------------
 */

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const WINCODESIGN_URL =
  'https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z';

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const request = (currentUrl) => {
      https
        .get(currentUrl, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            request(res.headers.location);
            return;
          }
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} khi tải ${currentUrl}`));
            return;
          }
          const fileStream = fs.createWriteStream(destPath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close(resolve);
          });
          fileStream.on('error', reject);
        })
        .on('error', reject);
    };
    request(url);
  });
}

function find7zaExe() {
  const candidates = [
    path.join(ROOT_DIR, 'node_modules', '7zip-bin', 'win', 'x64', '7za.exe'),
    path.join(ROOT_DIR, 'node_modules', '7zip-bin', 'win', 'ia32', '7za.exe'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return '7za';
}

async function main() {
  if (process.platform !== 'win32') {
    console.log('[fix-wincodesign] Không phải Windows, bỏ qua bước kiểm tra winCodeSign cache.');
    return;
  }

  const localAppData =
    process.env.LOCALAPPDATA ||
    (process.env.USERPROFILE ? path.join(process.env.USERPROFILE, 'AppData', 'Local') : null);

  if (!localAppData) {
    console.log('[fix-wincodesign] Không tìm thấy biến môi trường LOCALAPPDATA, bỏ qua.');
    return;
  }

  const cacheBase =
    process.env.ELECTRON_BUILDER_CACHE || path.join(localAppData, 'electron-builder', 'Cache');
  const targetDir = path.join(cacheBase, 'winCodeSign', 'winCodeSign-2.6.0');
  const rceditPath = path.join(targetDir, 'rcedit-x64.exe');

  if (fs.existsSync(rceditPath)) {
    console.log('[fix-wincodesign] Cache winCodeSign-2.6.0 đã sẵn sàng:', targetDir);
    return;
  }

  console.log('[fix-wincodesign] Đang chuẩn bị bộ công cụ winCodeSign-2.6.0 (chống lỗi symlink trên Windows)...');
  fs.mkdirSync(targetDir, { recursive: true });
  const archivePath = path.join(cacheBase, 'winCodeSign', 'winCodeSign-2.6.0.7z');

  try {
    await downloadFile(WINCODESIGN_URL, archivePath);
    const sevenZip = find7zaExe();

    const result = spawnSync(
      sevenZip,
      ['x', '-bd', '-y', '-xr!darwin', archivePath, `-o${targetDir}`],
      { stdio: 'inherit' }
    );

    if (fs.existsSync(archivePath)) {
      fs.unlinkSync(archivePath);
    }

    if (fs.existsSync(rceditPath)) {
      console.log('[fix-wincodesign] Đã cài đặt thành công rcedit-x64.exe vào Cache! Sẵn sàng gắn icon .exe.');
    } else {
      console.warn('[fix-wincodesign] Cảnh báo: Giải nén kết thúc với mã:', result.status);
    }
  } catch (err) {
    console.warn('[fix-wincodesign] Không thể chuẩn bị trước winCodeSign cache:', err.message);
  }
}

main();
