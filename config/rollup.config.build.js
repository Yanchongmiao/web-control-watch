import nodeResolve from 'rollup-plugin-node-resolve' // 帮助寻找node_modules里的包
import babel from 'rollup-plugin-babel' // rollup 的 babel 插件，ES6转ES5
import replace from 'rollup-plugin-replace' // 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import commonjs from 'rollup-plugin-commonjs' // 将非ES6语法的包转为ES6可用
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import path from 'path'
import alias from '@rollup/plugin-alias'
import json from 'rollup-plugin-json'
import cssnano from 'cssnano';// css代码压缩
import autoprefixer from 'autoprefixer'
import vue from 'rollup-plugin-vue';
import clear from 'rollup-plugin-clear';// 打包前，先清空 dist 文件夹

const resolveDir = dir => path.join(__dirname, dir)
const env = process.env.NODE_ENV
const config = {
    input: 'src/main.ts',
    output: [{
        file: 'dist/lib/umd/index.js',
        format: 'umd',// amd / es6 / iife / umd / cjs (umd同时支持 amd、cjs 和 iife)
        name: 'bundleName', //当format为 iife 或 umd 时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
        sourcemap: false,  //生成bundle.map.js文件，方便调试
        globals: {
            // Vue: 'Vue', // 这跟external 是配套使用的，指明global.React即是外部依赖react
        }
    },
    {
        file: 'dist/lib/esm/index.js', // 打包成esmodule
        format: 'es'
    },
    ],
    external: ['lodash'], // 配置rollup，不打包react,redux;将其视为外部依赖
    plugins: [
        vue({
            css: true,
            compileTemplate: true
        }),
        typescript(),
        nodeResolve(),
        json(),
        babel({
            exclude: '**/node_modules/**'
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        postcss({
            plugins: [
                autoprefixer(),
                cssnano()
            ],
            extract: 'css/index.css'
        }),
        commonjs(),
        terser(),//代码压缩
        alias({
            entries: [
                { find: '@', replacement: resolveDir('src') }
            ]
        }),
        clear({
            targets: ['dist/lib'],
            watch: true,
        }),
    ],
}
export default config