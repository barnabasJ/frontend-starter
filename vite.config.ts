import { defineConfig } from 'vite'
import {fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import react from '@vitejs/plugin-react'
import tsConfigPaths from "vite-tsconfig-paths"

const __dirname = dirname(fileURLToPath(import.meta.url))

console.log(resolve(__dirname, "./src"))

// https://vitejs.dev/config/
export default defineConfig({
    ssr: {
        format: 'cjs',
    },
    plugins: [react(), tsConfigPaths()],
})
