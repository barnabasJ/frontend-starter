import { build } from 'esbuild';
import { dTSPathAliasPlugin } from 'esbuild-plugin-d-ts-path-alias';

build({
    watch: true,
    target: 'esnext',
    packages: 'external',
    platform: 'node',
    sourcemap: 'inline',
    entryPoints: ['./src/server/index.ts'],
    outdir: './dist/server',
    plugins: [dTSPathAliasPlugin()],
});
