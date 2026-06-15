/**
 * Generates public/texture.png — a fine grayscale film-grain noise texture
 * used by the full-screen TextureOverlay (mix-blend-mode: lighten, opacity .6).
 *
 * Writes a valid PNG by hand (signature + IHDR + IDAT + IEND) so the project
 * needs no image dependencies. Run with: node scripts/gen-texture.cjs
 */
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const W = 512
const H = 512

// --- CRC32 (PNG chunk checksum) -------------------------------------------
const crcTable = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crc])
}

// --- IHDR: 8-bit grayscale, no interlace ----------------------------------
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0)
ihdr.writeUInt32BE(H, 4)
ihdr.writeUInt8(8, 8) // bit depth
ihdr.writeUInt8(0, 9) // color type 0 = grayscale
ihdr.writeUInt8(0, 10) // compression
ihdr.writeUInt8(0, 11) // filter
ihdr.writeUInt8(0, 12) // interlace

// --- Pixel data: one filter byte (0) per scanline + W grayscale bytes ------
const raw = Buffer.alloc(H * (W + 1))
let p = 0
for (let y = 0; y < H; y++) {
  raw[p++] = 0 // filter: none
  for (let x = 0; x < W; x++) {
    // Subtle dark grain. With lighten blend over #010828 only the brighter
    // specks show through, producing a soft film-grain wash.
    raw[p++] = Math.floor(Math.random() * 90)
  }
}

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
])

const out = path.join(__dirname, '..', 'public', 'texture.png')
fs.writeFileSync(out, png)
console.log(`texture.png written: ${png.length} bytes -> ${out}`)
