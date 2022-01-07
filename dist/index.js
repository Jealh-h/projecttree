"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const TAB = "|   ";
const PREFIX = "├──";
const LAST_PREFIX = "└──";
const defaultOptions = {
    ignoreFiles: ['node_modules'],
    maxDepth: 1,
    defaultPath: path.join(process.argv[1], "../../"),
    ROOT_PATH: path.join(process.argv[1], "../../projectTree.txt")
};
var ProjectTreeNameSpace;
(function (ProjectTreeNameSpace) {
    class ProjectTree {
        constructor(option) {
            this.option = option;
            this.options = Object.assign(Object.assign({}, defaultOptions), option);
            // 先清空源文件
            fs.writeFileSync(this.options.ROOT_PATH, "", { flag: 'w' });
        }
        readDir(p = this.options.defaultPath, depth = this.options.maxDepth) {
            if (depth === 0) {
                return;
            }
            let fls = [];
            let dirs = [];
            let dir_list = [];
            const files = fs.readdirSync(p, { encoding: 'utf-8' });
            // sort,let the directores in the front of files
            files.forEach((element) => {
                let stat = fs.statSync(path.join(p, element));
                // 是文件夹就继续读
                if (stat.isDirectory())
                    dirs.push(element);
                else {
                    fls.push(element);
                }
            });
            dir_list = dirs.concat(fls);
            dir_list.forEach((element, index) => {
                var _a, _b, _c;
                if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.ignoreFiles.includes(element))) {
                    let stat = fs.statSync(path.join(p, element));
                    let _prefix = index === dir_list.length - 1 ? LAST_PREFIX : PREFIX;
                    // 是文件夹就继续读
                    if (stat.isDirectory()) {
                        // directory
                        fs.writeFileSync((_b = this.options) === null || _b === void 0 ? void 0 : _b.ROOT_PATH, TAB.repeat(this.options.maxDepth - depth) + _prefix + element + '\n', { flag: 'a+' });
                        this.readDir(path.join(p, element), depth - 1);
                    }
                    else {
                        // file
                        fs.writeFileSync((_c = this.options) === null || _c === void 0 ? void 0 : _c.ROOT_PATH, TAB.repeat(this.options.maxDepth - depth) + _prefix + element + '\n', { flag: 'a+' });
                    }
                }
            });
        }
    }
    ProjectTreeNameSpace.ProjectTree = ProjectTree;
})(ProjectTreeNameSpace || (ProjectTreeNameSpace = {}));
// const projectTree = new ProjectTreeNameSpace.ProjectTree();
exports.default = ProjectTreeNameSpace.ProjectTree;
