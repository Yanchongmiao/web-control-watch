// import nodeResolve from 'rollup-plugin-node-resolve' // 帮助寻找node_modules里的包
// import babel from 'rollup-plugin-babel' // rollup 的 babel 插件，ES6转ES5
// import replace from 'rollup-plugin-replace' // 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
// import commonjs from 'rollup-plugin-commonjs' // 将非ES6语法的包转为ES6可用
// import typescript from '@rollup/plugin-typescript'
// // import { terser } from 'rollup-plugin-terser'
// import postcss from 'rollup-plugin-postcss'
// import serve from 'rollup-plugin-serve'
// import dev from 'rollup-plugin-dev'
// import livereload from 'rollup-plugin-livereload'
// import path from 'path'
// import alias from '@rollup/plugin-alias'
// import json from 'rollup-plugin-json'
// const resolveDir = dir => path.join(__dirname, dir)
// const env = process.env.NODE_ENV
// const config = {
//     input: 'src/main.js',
//     output: {
//         file: 'dist/bundle.cjs.js',
//         format: 'umd',//amd cmd cjs es iife
//         name: 'bundleName', // 打包后的全局变量，如浏览器端 window.ReactRedux
//         sourcemap: true,  //生成bundle.map.js文件，方便调试
//         globals: {
//             // Vue: 'Vue', // 这跟external 是配套使用的，指明global.React即是外部依赖react
//         }
//     },
//     external: ['lodash'], // 告诉rollup，不打包react,redux;将其视为外部依赖
//     plugins: [
//         typescript(),
//         nodeResolve(),
//         json(),
//         babel({
//             exclude: '**/node_modules/**'
//         }),
//         replace({
//             'process.env.NODE_ENV': JSON.stringify(env)
//         }),
//         commonjs(),
//         // terser(),//代码压缩
//         postcss(),
//         alias({
//             entries: [
//                 { find: '@', replacement: resolveDir('src') }
//             ]
//         }),
//         livereload(),
//         serve({
//             // open: true,
//             port: 8091,
//             contentBase: ''
//         }),
//         // dev({
//         //     port: 8091,
//         // })
//     ],
// }
// if (env === 'production') {
//     config.plugins.push(
//         uglify({
//             compress: {
//                 pure_getters: true,
//                 unsafe: true,
//                 unsafe_comps: true,
//                 warnings: false
//             }
//         })
//     )
// }
// export default config