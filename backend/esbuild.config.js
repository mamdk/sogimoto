const esbuild = require('esbuild');
const fs = require('fs')

const buildOptions = {
    entryPoints: ['src/app.ts'],
    bundle: true,
    minify: true,
    platform: 'node',
    target: ['node22'],
    outfile: 'build/app.bundle.js',
    external: ['express', 'cors', 'dotenv'],
    sourcemap: true,
};

console.log('Building...')

if(fs.existsSync('./build')) {
    fs.rmSync('./build', {recursive: true})
}

esbuild
    .build(buildOptions)
    .then(() => {
        fs.copyFileSync('./.env' , './build/.env')
        console.log('✅ Build successful!')
    })
    .catch((err) => {
        console.error('❌ Build failed:', err);
        process.exit(1);
    });