import { build } from 'esbuild';
import {resolve, dirname} from 'path'
import {fileURLToPath} from 'url'
import  aliasPath  from 'esbuild-plugin-path-alias';

const __dirname = dirname(fileURLToPath(import.meta.url))

build({
    watch: true,
    bundle: true,
    target: 'node18',
    packages: 'external',
    platform: 'node',
    sourcemap: 'inline',
    entryPoints: ['./src/server/index.ts'],
    outfile: './dist/server/index.cjs',
    plugins: [aliasPath({
        '@':resolve(__dirname, './src')
    })],
});
