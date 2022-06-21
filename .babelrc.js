// 这里通过cross-env注入不同执行变量来确定babel转码成不同的格式es和commonjs
const { NODE_ENV, BABEL_ENV } = process.env
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs'
const loose = true

module.exports = {
    // 设置modules:false来避免babel转换成commonjs之后rollup执行会报错
    presets: [['@babel/env', { loose, modules: false }]],
    plugins: []
}
