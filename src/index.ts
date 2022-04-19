
import * as fs from 'fs';
import * as path from 'path';
// import type treeOptions from '../types';
const TAB = "|   ";
const PREFIX = "├──";
const LAST_PREFIX = "└──";
const OUTPUT_NAME = "projectTree.txt";
const CONSOLE_FONT_COLOR = {
    "Error": "\x1B[31m%s\x1B[0m",
    "Success": "\x1B[32m%s\x1B[0m"
}


export interface treeOptions {
    ignoreFiles: string[],
    maxDepth: number,
    defaultPath: string
    ROOT_PATH: string
}
class ProjectTree {
    private options: treeOptions = defaultOptions;
    constructor() {
        loadConfig(this.options);

        // 先清空源文件
        fs.writeFileSync(this!.options!.ROOT_PATH, "", { flag: 'w' })
    }
    run() {
        this.readDir(this.options.defaultPath, this.options.maxDepth);
        console.log(CONSOLE_FONT_COLOR.Success, `Generate success:${this.options.ROOT_PATH}`)
    }
    readDir(p: string, depth: number) {
        if (depth === 0) {
            return;
        }
        const fls: string[] = [];
        const dirs: string[] = [];
        var dir_list = [];
        const files = fs.readdirSync(p, { encoding: 'utf-8' });
        // sort,let the directores in the front of files
        files.forEach((element: string) => {
            const stat = fs.statSync(path.join(p, element));
            // 是文件夹就继续读
            if (stat.isDirectory())
                dirs.push(element);
            else {
                fls.push(element);
            }
        });
        dir_list = dirs.concat(fls);
        dir_list.forEach((element: string, index: number) => {
            if (!this.options?.ignoreFiles.includes(element)) {
                let stat = fs.statSync(path.join(p, element));
                let _prefix = index === dir_list.length - 1 ? LAST_PREFIX : PREFIX;
                // 是文件夹就继续读
                if (stat.isDirectory()) {
                    // directory
                    fs.writeFileSync(this.options?.ROOT_PATH, TAB.repeat(this.options!.maxDepth - depth) + _prefix + element + '\n', { flag: 'a+' })
                    this.readDir(path.join(p, element), depth - 1);
                } else {
                    // file
                    fs.writeFileSync(this.options?.ROOT_PATH, TAB.repeat(this.options!.maxDepth - depth) + _prefix + element + '\n', { flag: 'a+' })
                }
            }
        });
    }
}
const defaultOptions = {
    ignoreFiles: ["node_modules", ".git"],
    maxDepth: 3,
    defaultPath: process.cwd(),
    ROOT_PATH: path.resolve(OUTPUT_NAME)
}
/**
 * 合并option
 * @param {Array<any>} args options对象数组 
 * @returns {null}
 */
function mergeOptions(originConfig: treeOptions, customConfig: Partial<treeOptions>): void {
    if (!customConfig) {
        return;
    } else {
        for (const prop in customConfig) {
            if (!defaultOptions.hasOwnProperty(prop)) {
                console.log(CONSOLE_FONT_COLOR.Error, `Configuration attribute error: Error Configuration Property:${prop}`);
                process.exit()
            }
            if (typeof customConfig[prop] === "object") {
                originConfig[prop] = [...originConfig[prop], ...customConfig[prop]];
            } else {
                originConfig[prop] = customConfig[prop];
            }
        }
    }
}

/**
 * 加载自定义配置文件
 */
function loadConfig(option: treeOptions) {
    const configPath = ["pdt.config.js", "pdt.config.ts"];
    let options;
    for (const configFile of configPath) {
        const hasCustomConfig = fs.existsSync(path.resolve(configFile));
        if (hasCustomConfig) {
            options = require(path.resolve(configFile));
            break;
        }
    }
    if (options) {
        mergeOptions(option, options);
    }
}
export default ProjectTree;