# Generate a directory structure for the project

## usage

```bash
npm i project-directory-tree -D

or

npm i project-directory-tree -g
```

- 全局安装

控制台执行：pdt

```bash
pdt
```

- 局部安装

```javascript
// package.json
"scripts": {
    "tree": "pdt"
}
```

```bash
npm run tree
```

在项目的根目录下将会生成一个 projectTree.txt。可能会是下面这个样子。

// projectTree.txt
![demo](https://gitee.com/gitme-H/images-bed/raw/master/img/projectTree.png)

### options

项目根目录下新建pdt.config.js

```javascript
// pdt.config.js
module.exports = {
  maxDepth: 1,
}
```

options 可以是下面的属性：

property|type|default|description|
:-:|:-:|:-:|:-:|
ignoreFiles| string[] |['node_modules','.git']|要忽略的目录或文件|
maxDepth|number|3|生成树结构的最大深度|
defaultPath|string|process.cwd()|项目的路径|
ROOT_PATH|string|path.resolve(projectTree.txt)|保存projectTree.txt的路径|
