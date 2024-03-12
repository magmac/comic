import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import compressPlugin from 'vite-plugin-compression'
import { resolve } from 'path'
import { injectHtml } from 'vite-plugin-html'

const pathSrc = resolve(__dirname, 'src')
const date = new Date().toLocaleString()

export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      compressPlugin(),
      injectHtml({
        data: {
          date,
          env: loadEnv(mode, process.cwd()).VITE_NODE_ENV
        }
      })
    ],
    server: {
      port: 8888
    },
    resolve: {
      alias: {
        '/@': pathSrc,
        extensions: ['.vue', '.ts']
      }
    },
    css: {
      preprocessorOptions: {
        scss: { additionalData: `@import "/@/sass/main";` } // "@import '../sass/theme';"
      }
    },
    build: {
      terserOptions: {
        minify: 'esbuild',
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  })
}
