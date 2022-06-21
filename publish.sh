#!/usr/bin/env bash
set -e
# 修改npm源地址
npm config get registry
npm config set registry=https://registry.npmjs.org/
echo '登录'
npm login
echo "发布中..."
npm publish
# 改回npm源地址
npm config set registry=https://registry.npmmirror.com/
echo -e "\n发布成功\n"
exit
