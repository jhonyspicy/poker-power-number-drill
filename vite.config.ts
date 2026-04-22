import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

// dist/image/ 内の画像をビルド後にリサイズ + WebP 変換するプラグイン
// public/ のオリジナルは変更せず、dist/ 出力後に処理する
function imageResizePlugin(options: { maxWidth: number; quality: number } = { maxWidth: 800, quality: 80 }): Plugin {
  return {
    name: 'vite-plugin-image-resize',
    apply: 'build',
    async closeBundle() {
      const distImageDir = path.resolve(__dirname, 'dist/image')
      if (!fs.existsSync(distImageDir)) return

      const files = fs.readdirSync(distImageDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f))
      for (const file of files) {
        const inputPath = path.join(distImageDir, file)
        if (!fs.existsSync(inputPath)) continue

        const baseName = path.parse(file).name
        const outputPath = path.join(distImageDir, `${baseName}.webp`)

        const metadata = await sharp(inputPath).metadata()
        const needsResize = metadata.width !== undefined && metadata.width > options.maxWidth

        await sharp(inputPath)
          .resize(needsResize ? options.maxWidth : undefined)
          .webp({ quality: options.quality })
          .toFile(outputPath)

        // 元のPNG/JPGを削除（WebPに置き換え）
        fs.unlinkSync(inputPath)

        console.log(`[image-resize] ${file} → ${baseName}.webp (${needsResize ? `max ${options.maxWidth}px` : 'original size'}, quality ${options.quality})`)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imageResizePlugin({ maxWidth: 800, quality: 80 }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: false, quality: 80 },
      svg: false, // svgo未インストールのためSVG最適化を無効化
      includePublic: true,
    }),
  ],
  base: '/poker-power-number-drill/',
})
