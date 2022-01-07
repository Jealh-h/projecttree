"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var fs = require('fs');
var path = require('path');
var TAB = "|   ";
var PREFIX = "├──";
var LAST_PREFIX = "└──";
var defaultOptions = {
    ignoreFiles: ['node_modules'],
    maxDepth: 1,
    defaultPath: path.join(process.argv[1], "../"),
    ROOT_PATH: path.join(process.argv[1], "../projectTree.txt")
};
var ProjectTreeNameSpace;
(function (ProjectTreeNameSpace) {
    var ProjectTree = /** @class */ (function () {
        function ProjectTree(option) {
            this.options = defaultOptions;
            if (option !== undefined) {
                this.options = __assign(__assign({}, defaultOptions), option);
            }
            // 先清空源文件
            fs.writeFileSync(this.options.ROOT_PATH, "", { flag: 'w' });
        }
        ProjectTree.prototype.readDir = function (p, depth) {
            var _this = this;
            if (p === void 0) { p = this.options.defaultPath; }
            if (depth === void 0) { depth = this.options.maxDepth; }
            if (depth === 0) {
                return;
            }
            var fls = [];
            var dirs = [];
            var dir_list = [];
            var files = fs.readdirSync(p, { encoding: 'utf-8' });
            // sort,let the directores in the front of files
            files.forEach(function (element) {
                var stat = fs.statSync(path.join(p, element));
                // 是文件夹就继续读
                if (stat.isDirectory())
                    dirs.push(element);
                else {
                    fls.push(element);
                }
            });
            dir_list = dirs.concat(fls);
            dir_list.forEach(function (element, index) {
                var _a, _b, _c;
                if (!((_a = _this.options) === null || _a === void 0 ? void 0 : _a.ignoreFiles.includes(element))) {
                    var stat = fs.statSync(path.join(p, element));
                    var _prefix = index === dir_list.length - 1 ? LAST_PREFIX : PREFIX;
                    // 是文件夹就继续读
                    if (stat.isDirectory()) {
                        // directory
                        fs.writeFileSync((_b = _this.options) === null || _b === void 0 ? void 0 : _b.ROOT_PATH, TAB.repeat(_this.options.maxDepth - depth) + _prefix + element + '\n', { flag: 'a+' });
                        _this.readDir(path.join(p, element), depth - 1);
                    }
                    else {
                        // file
                        fs.writeFileSync((_c = _this.options) === null || _c === void 0 ? void 0 : _c.ROOT_PATH, TAB.repeat(_this.options.maxDepth - depth) + _prefix + element + '\n', { flag: 'a+' });
                    }
                }
            });
        };
        return ProjectTree;
    }());
    ProjectTreeNameSpace.ProjectTree = ProjectTree;
})(ProjectTreeNameSpace || (ProjectTreeNameSpace = {}));
// const projectTree = new ProjectTreeNameSpace.ProjectTree();
module.exports = ProjectTreeNameSpace.ProjectTree;
