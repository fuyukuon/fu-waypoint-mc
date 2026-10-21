#!/usr/bin/env node
/**
 * scripts/generate-icons.mjs
 * ---------------------------------------------------------------------------
 * Công cụ tự động chuẩn hóa toàn bộ Icon cho:
 * 1. PC (Electron Windows):
 *    - Xuất public/icon.png & build/icon.png (512x512 RGBA chuẩn để electron-builder
 *      tự động convert bằng app-builder.exe nội bộ).
 *    - Xuất public/icon.ico chuẩn Win32 BMP/DIB (chỉ gồm các frame 16, 24, 32, 48, 64, 128px
 *      với bWidth == biWidth và biSizeImage = xorSize chuẩn đặc tả Microsoft/NSIS).
 * 2. Điện thoại Android (Capacitor APK):
 *    - Tự động chạy ngay sau `npx cap sync android` (nhờ hook `capacitor:sync:after`
 *      trong package.json) VÀ tự động gắn chốt chặn vào `android/app/build.gradle`
 *      (`mergeDebugResources` / `preBuild`) để dù workflow cũ có xóa mipmap-anydpi-v26
 *      thì trước khi đóng gói APK, hệ thống vẫn tự động phục hồi đầy đủ bộ Mipmap +
 *      Adaptive Icon chuẩn 100%.
 * ---------------------------------------------------------------------------
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// ============================================================================
// 1. BỘ GIẢI MÃ & MÃ HÓA PNG THUẦN NODE.JS
// ============================================================================

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function decodePNG(buffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (buffer.subarray(0, 8).compare(signature) !== 0) {
    throw new Error('File không phải định dạng PNG hợp lệ!');
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  let palette = null;
  let trns = null;
  const idatChunks = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === 'PLTE') {
      palette = data;
    } else if (type === 'tRNS') {
      trns = data;
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }
    offset += 12 + length;
  }

  if (bitDepth !== 8) {
    throw new Error(`Chỉ hỗ trợ PNG 8-bit (hiện tại: ${bitDepth}-bit). Hãy lưu icon.png ở dạng 8-bit RGBA/RGB.`);
  }
  if (interlace !== 0) {
    throw new Error('Không hỗ trợ PNG interlaced. Hãy lưu icon.png ở dạng Non-interlaced.');
  }

  const channels =
    colorType === 6 ? 4 :
    colorType === 2 ? 3 :
    colorType === 4 ? 2 :
    colorType === 0 || colorType === 3 ? 1 : 0;

  if (!channels) {
    throw new Error(`Không hỗ trợ PNG colorType=${colorType}`);
  }

  const compressed = Buffer.concat(idatChunks);
  const raw = zlib.inflateSync(compressed);
  const stride = width * channels;
  const recon = Buffer.alloc(height * stride);

  for (let y = 0; y < height; y++) {
    const filterType = raw[y * (stride + 1)];
    const rowStart = y * (stride + 1) + 1;
    const outStart = y * stride;
    const prevStart = (y - 1) * stride;

    for (let x = 0; x < stride; x++) {
      const rawByte = raw[rowStart + x];
      const a = x >= channels ? recon[outStart + x - channels] : 0;
      const b = y > 0 ? recon[prevStart + x] : 0;
      const c = y > 0 && x >= channels ? recon[prevStart + x - channels] : 0;

      let val = rawByte;
      if (filterType === 1) val = (rawByte + a) & 0xff;
      else if (filterType === 2) val = (rawByte + b) & 0xff;
      else if (filterType === 3) val = (rawByte + ((a + b) >> 1)) & 0xff;
      else if (filterType === 4) val = (rawByte + paethPredictor(a, b, c)) & 0xff;

      recon[outStart + x] = val;
    }
  }

  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const outIdx = i * 4;
    if (colorType === 6) {
      const inIdx = i * 4;
      rgba[outIdx] = recon[inIdx];
      rgba[outIdx + 1] = recon[inIdx + 1];
      rgba[outIdx + 2] = recon[inIdx + 2];
      rgba[outIdx + 3] = recon[inIdx + 3];
    } else if (colorType === 2) {
      const inIdx = i * 3;
      const r = recon[inIdx];
      const g = recon[inIdx + 1];
      const b = recon[inIdx + 2];
      rgba[outIdx] = r;
      rgba[outIdx + 1] = g;
      rgba[outIdx + 2] = b;
      if (trns && trns.length >= 6 && r === trns[1] && g === trns[3] && b === trns[5]) {
        rgba[outIdx + 3] = 0;
      } else {
        rgba[outIdx + 3] = 255;
      }
    } else if (colorType === 3) {
      const idx = recon[i];
      rgba[outIdx] = palette ? palette[idx * 3] : 0;
      rgba[outIdx + 1] = palette ? palette[idx * 3 + 1] : 0;
      rgba[outIdx + 2] = palette ? palette[idx * 3 + 2] : 0;
      rgba[outIdx + 3] = trns && idx < trns.length ? trns[idx] : 255;
    } else if (colorType === 4) {
      const inIdx = i * 2;
      const v = recon[inIdx];
      rgba[outIdx] = v;
      rgba[outIdx + 1] = v;
      rgba[outIdx + 2] = v;
      rgba[outIdx + 3] = recon[inIdx + 1];
    } else if (colorType === 0) {
      const v = recon[i];
      rgba[outIdx] = v;
      rgba[outIdx + 1] = v;
      rgba[outIdx + 2] = v;
      rgba[outIdx + 3] = 255;
    }
  }

  return { width, height, rgba };
}

const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makePNGChunk(type, data) {
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });

  return Buffer.concat([
    signature,
    makePNGChunk('IHDR', ihdr),
    makePNGChunk('IDAT', compressed),
    makePNGChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ============================================================================
// 2. XỬ LÝ ẢNH: RESIZE, SAFE-ZONE ADAPTIVE ICON, MASK TRÒN & BO GÓC
// ============================================================================

function resizeRGBA(src, dstW, dstH) {
  const { width: srcW, height: srcH, rgba: srcBuf } = src;
  const dstBuf = Buffer.alloc(dstW * dstH * 4);

  const scaleX = srcW / dstW;
  const scaleY = srcH / dstH;

  for (let y = 0; y < dstH; y++) {
    for (let x = 0; x < dstW; x++) {
      const dstIdx = (y * dstW + x) * 4;

      if (scaleX <= 1 && scaleY <= 1) {
        const sx = Math.min(srcW - 1, Math.floor(x * scaleX));
        const sy = Math.min(srcH - 1, Math.floor(y * scaleY));
        const srcIdx = (sy * srcW + sx) * 4;
        dstBuf[dstIdx] = srcBuf[srcIdx];
        dstBuf[dstIdx + 1] = srcBuf[srcIdx + 1];
        dstBuf[dstIdx + 2] = srcBuf[srcIdx + 2];
        dstBuf[dstIdx + 3] = srcBuf[srcIdx + 3];
      } else {
        const x0 = Math.floor(x * scaleX);
        const x1 = Math.min(srcW, Math.ceil((x + 1) * scaleX));
        const y0 = Math.floor(y * scaleY);
        const y1 = Math.min(srcH, Math.ceil((y + 1) * scaleY));

        let r = 0, g = 0, b = 0, a = 0, count = 0;
        for (let sy = y0; sy < y1; sy++) {
          for (let sx = x0; sx < x1; sx++) {
            const idx = (sy * srcW + sx) * 4;
            const alpha = srcBuf[idx + 3];
            r += srcBuf[idx] * alpha;
            g += srcBuf[idx + 1] * alpha;
            b += srcBuf[idx + 2] * alpha;
            a += alpha;
            count++;
          }
        }
        if (count > 0 && a > 0) {
          dstBuf[dstIdx] = Math.round(r / a);
          dstBuf[dstIdx + 1] = Math.round(g / a);
          dstBuf[dstIdx + 2] = Math.round(b / a);
          dstBuf[dstIdx + 3] = Math.round(a / count);
        }
      }
    }
  }

  return { width: dstW, height: dstH, rgba: dstBuf };
}

function createSolidRGBA(width, height, r, g, b, a = 255) {
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    rgba[idx] = r;
    rgba[idx + 1] = g;
    rgba[idx + 2] = b;
    rgba[idx + 3] = a;
  }
  return { width, height, rgba };
}

function createPaddedIcon(src, canvasSize, scaleRatio = 0.56, bgColor = null) {
  const base = bgColor
    ? createSolidRGBA(canvasSize, canvasSize, bgColor[0], bgColor[1], bgColor[2], bgColor[3] ?? 255)
    : createSolidRGBA(canvasSize, canvasSize, 0, 0, 0, 0);

  const innerSize = Math.max(1, Math.round(canvasSize * scaleRatio));
  const resized = resizeRGBA(src, innerSize, innerSize);
  const offset = Math.floor((canvasSize - innerSize) / 2);

  for (let y = 0; y < innerSize; y++) {
    for (let x = 0; x < innerSize; x++) {
      const srcIdx = (y * innerSize + x) * 4;
      const dstX = x + offset;
      const dstY = y + offset;
      const dstIdx = (dstY * canvasSize + dstX) * 4;

      const sa = resized.rgba[srcIdx + 3] / 255;
      const da = base.rgba[dstIdx + 3] / 255;
      const outA = sa + da * (1 - sa);

      if (outA > 0) {
        base.rgba[dstIdx] = Math.round((resized.rgba[srcIdx] * sa + base.rgba[dstIdx] * da * (1 - sa)) / outA);
        base.rgba[dstIdx + 1] = Math.round((resized.rgba[srcIdx + 1] * sa + base.rgba[dstIdx + 1] * da * (1 - sa)) / outA);
        base.rgba[dstIdx + 2] = Math.round((resized.rgba[srcIdx + 2] * sa + base.rgba[dstIdx + 2] * da * (1 - sa)) / outA);
        base.rgba[dstIdx + 3] = Math.round(outA * 255);
      }
    }
  }
  return base;
}

function applyCircleMask(img, bgColor = [17, 16, 21, 255]) {
  const { width, height } = img;
  const padded = createPaddedIcon(img, width, 0.72, bgColor);
  const out = Buffer.from(padded.rgba);
  const cx = (width - 1) / 2;
  const cy = (height - 1) / 2;
  const radius = width / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const idx = (y * width + x) * 4;
      if (dist > radius) {
        out[idx + 3] = 0;
      } else if (dist > radius - 1) {
        out[idx + 3] = Math.round(out[idx + 3] * (radius - dist));
      }
    }
  }
  return { width, height, rgba: out };
}

function applyRoundedRectMask(img, bgColor = [17, 16, 21, 255]) {
  const { width, height } = img;
  const padded = createPaddedIcon(img, width, 0.84, bgColor);
  const out = Buffer.from(padded.rgba);
  const r = width * 0.18;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let dx = 0;
      let dy = 0;
      if (x < r) dx = r - x;
      else if (x > width - 1 - r) dx = x - (width - 1 - r);
      if (y < r) dy = r - y;
      else if (y > height - 1 - r) dy = y - (height - 1 - r);

      if (dx > 0 && dy > 0) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        const idx = (y * width + x) * 4;
        if (dist > r) {
          out[idx + 3] = 0;
        } else if (dist > r - 1) {
          out[idx + 3] = Math.round(out[idx + 3] * (r - dist));
        }
      }
    }
  }
  return { width, height, rgba: out };
}

// ============================================================================
// 3. BỘ TẠO FILE .ICO CHUẨN WIN32 BMP/DIB (Tương thích 100% NSIS makensis & rcedit)
// ============================================================================

function createBMPFrame(img) {
  const { width, height, rgba } = img;
  const xorRowBytes = width * 4;
  const xorSize = xorRowBytes * height;
  const andRowBytes = Math.ceil(width / 32) * 4;
  const andSize = andRowBytes * height;

  const headerSize = 40;
  const buf = Buffer.alloc(headerSize + xorSize + andSize);

  buf.writeUInt32LE(headerSize, 0); // biSize = 40 (BITMAPINFOHEADER)
  buf.writeInt32LE(width, 4);       // biWidth
  buf.writeInt32LE(height * 2, 8);  // biHeight (x2 cho XOR + AND mask)
  buf.writeUInt16LE(1, 12);         // biPlanes = 1
  buf.writeUInt16LE(32, 14);        // biBitCount = 32 (BGRA)
  buf.writeUInt32LE(0, 16);         // biCompression = BI_RGB (0)
  buf.writeUInt32LE(xorSize, 20);   // biSizeImage = xorSize (chuẩn Win32 DIB)
  buf.writeInt32LE(0, 24);
  buf.writeInt32LE(0, 28);
  buf.writeUInt32LE(0, 32);
  buf.writeUInt32LE(0, 36);

  let xorOffset = headerSize;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      buf[xorOffset] = rgba[srcIdx + 2];     // Blue
      buf[xorOffset + 1] = rgba[srcIdx + 1]; // Green
      buf[xorOffset + 2] = rgba[srcIdx];     // Red
      buf[xorOffset + 3] = rgba[srcIdx + 3]; // Alpha
      xorOffset += 4;
    }
  }

  const andStart = headerSize + xorSize;
  for (let y = height - 1; y >= 0; y--) {
    const rowIndex = height - 1 - y;
    const rowOffset = andStart + rowIndex * andRowBytes;
    for (let x = 0; x < width; x++) {
      const alpha = rgba[(y * width + x) * 4 + 3];
      if (alpha < 128) {
        const byteIndex = x >> 3;
        const bitIndex = 7 - (x & 7);
        buf[rowOffset + byteIndex] |= (1 << bitIndex);
      }
    }
  }

  return buf;
}

/**
 * Lưu ý quan trọng cho NSIS (makensis.exe):
 * Chỉ dùng các kích thước <= 128 (16, 24, 32, 48, 64, 128) ở định dạng BMP/DIB
 * để bWidth (uint8) trong ICONDIRENTRY luôn khớp 100% với biWidth trong BITMAPINFOHEADER
 * (tránh lỗi bWidth=0 != biWidth=256 khiến makensis báo "invalid icon file").
 */
function encodeICO(sourceImg, sizes = [16, 24, 32, 48, 64, 128]) {
  const frames = sizes.map((size) => {
    const resized = resizeRGBA(sourceImg, size, size);
    const data = createBMPFrame(resized);
    return { size, data };
  });

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  const dirEntries = [];
  let currentOffset = 6 + frames.length * 16;

  for (const frame of frames) {
    const entry = Buffer.alloc(16);
    entry[0] = frame.size;
    entry[1] = frame.size;
    entry[2] = 0;
    entry[3] = 0;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(frame.data.length, 8);
    entry.writeUInt32LE(currentOffset, 12);
    dirEntries.push(entry);
    currentOffset += frame.data.length;
  }

  return Buffer.concat([header, ...dirEntries, ...frames.map((f) => f.data)]);
}

// ============================================================================
// 4. HÀM CHÍNH: TẠO ICON CHO PC, WEB PWA & ANDROID CAPACITOR
// ============================================================================

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function patchAndroidGradleAndManifest() {
  const gradlePath = path.join(ROOT_DIR, 'android', 'app', 'build.gradle');
  if (fs.existsSync(gradlePath)) {
    let gradleContent = fs.readFileSync(gradlePath, 'utf8');

    // 1. Tự động tăng versionCode theo thời gian thực để điện thoại Android bắt buộc xóa cache icon cũ
    const dynamicVersionCode = Math.max(2, Math.floor(Date.now() / 60000) - 29000000);
    gradleContent = gradleContent.replace(/versionCode\s+\d+/, `versionCode ${dynamicVersionCode}`);

    // 2. Gắn hook tự động chạy lại generate-icons.mjs ngay trước khi Gradle đóng gói tài nguyên APK
    // (Phòng trường hợp file build-apk.yml cũ trên GitHub xóa mất mipmap-anydpi-v26 sau bước cap sync!)
    const hookMarker = '// [FU-WAYPOINT-ICON-HOOK]';
    if (!gradleContent.includes(hookMarker)) {
      gradleContent += `\n${hookMarker}
tasks.matching { it.name.startsWith("merge") && it.name.endsWith("Resources") }.configureEach {
    doFirst {
        exec {
            workingDir rootProject.projectDir.parentFile
            commandLine "node", "scripts/generate-icons.mjs", "--from-gradle"
        }
    }
}
`;
    }
    fs.writeFileSync(gradlePath, gradleContent, 'utf8');
    console.log(`[generate-icons] Đã cập nhật versionCode=${dynamicVersionCode} & gắn chốt chặn bảo vệ Icon vào android/app/build.gradle!`);
  }

  const manifestPath = path.join(ROOT_DIR, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
  if (fs.existsSync(manifestPath)) {
    let manifest = fs.readFileSync(manifestPath, 'utf8');
    if (!manifest.includes('android:icon="@mipmap/ic_launcher"')) {
      manifest = manifest.replace('<application', '<application android:icon="@mipmap/ic_launcher"');
    }
    if (!manifest.includes('android:roundIcon="@mipmap/ic_launcher_round"')) {
      manifest = manifest.replace('<application', '<application android:roundIcon="@mipmap/ic_launcher_round"');
    }
    fs.writeFileSync(manifestPath, manifest, 'utf8');
  }
}

function main() {
  const isFromGradle = process.argv.includes('--from-gradle');
  const srcIconPath = path.join(ROOT_DIR, 'public', 'icon.png');
  if (!fs.existsSync(srcIconPath)) {
    console.error(`[generate-icons] Không tìm thấy file nguồn: ${srcIconPath}`);
    process.exit(1);
  }

  const pngBuffer = fs.readFileSync(srcIconPath);
  const srcImg = decodePNG(pngBuffer);

  if (!isFromGradle) {
    console.log(`[generate-icons] Đang đọc ảnh nguồn từ: public/icon.png (${srcImg.width}x${srcImg.height}px)...`);

    // 1. Chuẩn hóa public/icon.png & build/icon.png (512x512)
    ensureDir(path.join(ROOT_DIR, 'build'));
    const icon512 = resizeRGBA(srcImg, 512, 512);
    const icon512Buf = encodePNG(512, 512, icon512.rgba);
    fs.writeFileSync(path.join(ROOT_DIR, 'public', 'icon.png'), icon512Buf);
    fs.writeFileSync(path.join(ROOT_DIR, 'build', 'icon.png'), icon512Buf);
    fs.writeFileSync(path.join(ROOT_DIR, 'public', 'icon-512.png'), icon512Buf);

    // 2. Tạo icon PWA & iOS/Android Web App (192x192 & 180x180)
    const icon192 = resizeRGBA(srcImg, 192, 192);
    fs.writeFileSync(path.join(ROOT_DIR, 'public', 'icon-192.png'), encodePNG(192, 192, icon192.rgba));

    const icon180 = resizeRGBA(srcImg, 180, 180);
    fs.writeFileSync(path.join(ROOT_DIR, 'public', 'apple-touch-icon.png'), encodePNG(180, 180, icon180.rgba));

    // 3. Tạo file .ICO chuẩn Win32 BMP/DIB (16..128px) tương thích 100% NSIS makensis
    const icoBuf = encodeICO(srcImg, [16, 24, 32, 48, 64, 128]);
    fs.writeFileSync(path.join(ROOT_DIR, 'public', 'icon.ico'), icoBuf);
    fs.writeFileSync(path.join(ROOT_DIR, 'build', 'icon.ico'), icoBuf);
    console.log(`[generate-icons] Đã tạo public/icon.ico & build/icon.ico chuẩn NSIS Win32 BMP (${icoBuf.length} bytes).`);

    // 4. Tạo bộ nguồn 1024x1024 chuẩn trong thư mục assets/ cho @capacitor/assets
    ensureDir(path.join(ROOT_DIR, 'assets'));
    const icon1024 = resizeRGBA(srcImg, 1024, 1024);
    const icon1024Buf = encodePNG(1024, 1024, icon1024.rgba);
    fs.writeFileSync(path.join(ROOT_DIR, 'assets', 'icon.png'), icon1024Buf);
    fs.writeFileSync(path.join(ROOT_DIR, 'assets', 'icon-only.png'), icon1024Buf);
    fs.writeFileSync(path.join(ROOT_DIR, 'assets', 'logo.png'), icon1024Buf);

    const fg1024 = createPaddedIcon(srcImg, 1024, 0.56, null);
    fs.writeFileSync(path.join(ROOT_DIR, 'assets', 'icon-foreground.png'), encodePNG(1024, 1024, fg1024.rgba));

    const bg1024 = createSolidRGBA(1024, 1024, 17, 16, 21, 255);
    fs.writeFileSync(path.join(ROOT_DIR, 'assets', 'icon-background.png'), encodePNG(1024, 1024, bg1024.rgba));
  }

  // 5. Nếu đã khởi tạo thư mục android/, bơm trực tiếp bộ icon chuẩn vào android/app/src/main/res/
  const androidResDir = path.join(ROOT_DIR, 'android', 'app', 'src', 'main', 'res');
  if (fs.existsSync(androidResDir)) {
    console.log(`[generate-icons] Đang thiết lập bộ Mipmap & Adaptive Icon chuẩn cho Android...`);

    const densities = [
      { name: 'mipmap-mdpi', legacy: 48, adaptive: 108 },
      { name: 'mipmap-hdpi', legacy: 72, adaptive: 162 },
      { name: 'mipmap-xhdpi', legacy: 96, adaptive: 216 },
      { name: 'mipmap-xxhdpi', legacy: 144, adaptive: 324 },
      { name: 'mipmap-xxxhdpi', legacy: 192, adaptive: 432 },
    ];

    for (const d of densities) {
      const dir = path.join(androidResDir, d.name);
      ensureDir(dir);

      for (const file of fs.readdirSync(dir)) {
        if (file.startsWith('ic_launcher') && file.endsWith('.webp')) {
          fs.unlinkSync(path.join(dir, file));
        }
      }

      const legacyImg = applyRoundedRectMask(srcImg, [17, 16, 21, 255]);
      const legacyResized = resizeRGBA(legacyImg, d.legacy, d.legacy);
      fs.writeFileSync(path.join(dir, 'ic_launcher.png'), encodePNG(d.legacy, d.legacy, legacyResized.rgba));

      const roundImg = applyCircleMask(srcImg, [17, 16, 21, 255]);
      const roundResized = resizeRGBA(roundImg, d.legacy, d.legacy);
      fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), encodePNG(d.legacy, d.legacy, roundResized.rgba));

      const fgImg = createPaddedIcon(srcImg, d.adaptive, 0.56, null);
      fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), encodePNG(d.adaptive, d.adaptive, fgImg.rgba));

      const bgImg = createSolidRGBA(d.adaptive, d.adaptive, 17, 16, 21, 255);
      fs.writeFileSync(path.join(dir, 'ic_launcher_background.png'), encodePNG(d.adaptive, d.adaptive, bgImg.rgba));
    }

    for (const entry of fs.readdirSync(androidResDir)) {
      if (entry.startsWith('drawable')) {
        const drawDir = path.join(androidResDir, entry);
        if (fs.statSync(drawDir).isDirectory()) {
          for (const f of ['ic_launcher_foreground.xml', 'ic_launcher_background.xml']) {
            const p = path.join(drawDir, f);
            if (fs.existsSync(p)) fs.unlinkSync(p);
          }
        }
      }
      if (entry.startsWith('mipmap-anydpi') && entry !== 'mipmap-anydpi-v26') {
        fs.rmSync(path.join(androidResDir, entry), { recursive: true, force: true });
      }
    }

    const valuesDir = path.join(androidResDir, 'values');
    ensureDir(valuesDir);
    fs.writeFileSync(
      path.join(valuesDir, 'ic_launcher_background.xml'),
      `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#111015</color>\n</resources>\n`,
      'utf8'
    );

    const anydpiDir = path.join(androidResDir, 'mipmap-anydpi-v26');
    ensureDir(anydpiDir);
    const adaptiveXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
    fs.writeFileSync(path.join(anydpiDir, 'ic_launcher.xml'), adaptiveXml, 'utf8');
    fs.writeFileSync(path.join(anydpiDir, 'ic_launcher_round.xml'), adaptiveXml, 'utf8');

    if (!isFromGradle) {
      patchAndroidGradleAndManifest();
    }

    console.log(`[generate-icons] Đã cập nhật hoàn chỉnh bộ icon Android trong android/app/src/main/res/!`);
  }
}

main();
