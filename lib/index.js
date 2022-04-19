"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
// import type treeOptions from '../types';
var TAB = "|   ";
var PREFIX = "├──";
var LAST_PREFIX = "└──";
var OUTPUT_NAME = "projectTree.txt";
var CONSOLE_FONT_COLOR = {
    "Error": "\x1B[31m%s\x1B[0m",
    "Success": "\x1B[32m%s\x1B[0m"
};
var ProjectTree = /** @class */ (function () {
    function ProjectTree() {
        this.options = defaultOptions;
        loadConfig(this.options);
        // 先清空源文件
        fs.writeFileSync(this.options.ROOT_PATH, "", { flag: 'w' });
    }
    ProjectTree.prototype.run = function () {
        this.readDir(this.options.defaultPath, this.options.maxDepth);
        console.log(CONSOLE_FONT_COLOR.Success, "Generate success:".concat(this.options.ROOT_PATH));
    };
    ProjectTree.prototype.readDir = function (p, depth) {
        var _this = this;
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
var defaultOptions = {
    ignoreFiles: ["node_modules", ".git"],
    maxDepth: 3,
    defaultPath: process.cwd(),
    ROOT_PATH: path.resolve(OUTPUT_NAME)
};
/**
 * 合并option
 * @param {Array<any>} args options对象数组
 * @returns {null}
 */
function mergeOptions(originConfig, customConfig) {
    if (!customConfig) {
        return;
    }
    else {
        for (var prop in customConfig) {
            if (!defaultOptions.hasOwnProperty(prop)) {
                console.log(CONSOLE_FONT_COLOR.Error, "Configuration attribute error: Error Configuration Property:".concat(prop));
                process.exit();
            }
            if (typeof customConfig[prop] === "object") {
                originConfig[prop] = __spreadArray(__spreadArray([], originConfig[prop], true), customConfig[prop], true);
            }
            else {
                originConfig[prop] = customConfig[prop];
            }
        }
    }
}
/**
 * 加载自定义配置文件
 */
function loadConfig(option) {
    var configPath = ["pdt.config.js", "pdt.config.ts"];
    var options;
    for (var _i = 0, configPath_1 = configPath; _i < configPath_1.length; _i++) {
        var configFile = configPath_1[_i];
        var hasCustomConfig = fs.existsSync(path.resolve(configFile));
        if (hasCustomConfig) {
            options = require(path.resolve(configFile));
            break;
        }
    }
    if (options) {
        mergeOptions(option, options);
    }
}
exports.default = ProjectTree;
