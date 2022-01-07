这是一个生成项目目录结构的小工具。

### usage

npm i projecttree -D

在项目的根目录下创建一个 generator.js

```javascript
// ./genetator.js
const projecttree = require("projecttree");
const p = new projecttree({ maxDepth: 3 });
p.readDir();
```

then

> node genetator.js

在项目的根目录下将会生成一个 projectTree.txt。可能会是下面这个样子。

> // projectTree.txt
> ├──dist
> | ├──index.d.ts
> | └──index.js
> ├──esm
> | ├──index.d.ts
> | └──index.js
> ├──lib
> | ├──index.d.ts
> | └──index.js
> ├──src
> | └──index.ts
> ├──test1
> | ├──test1_1
> | └──test1_2
> ├──index.js
> ├──package-lock.json
> ├──package.json
> ├──projectTree.txt
> ├──test.js
> └──tsconfig.json

### options

```javascript
// ./genetator.js
const projecttree = require("projecttree");
const p = new projecttree(options?);
p.readDir();
```

options 可以是下面的属性：

| property    | type     | default                                          | description                 |
| ----------- | -------- | ------------------------------------------------ | --------------------------- |
| ignoreFiles | string[] | ['node_modules']                                 | 要忽略的目录或文件          |
| maxDepth    | number   | 1                                                | 生成树结构的最大深度        |
| defaultPath | string   | path.join(process.argv[1], "../")                | 项目的路径                  |
| ROOT_PATH   | string   | path.join(process.argv[1], "../projectTree.txt") | 保存 projectTree.txt 的路径 |
