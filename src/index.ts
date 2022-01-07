
const fs = require('fs');
const path = require('path');

const TAB = "|   ";
const PREFIX = "├──";
const LAST_PREFIX = "└──"

const defaultOptions = {
    ignoreFiles: ['node_modules'],
    maxDepth: 1,
    defaultPath: path.join(process.argv[1], "../"),
    ROOT_PATH: path.join(process.argv[1], "../projectTree.txt")
}

namespace ProjectTreeNameSpace {
    export type treeOptions = {
        ignoreFiles: string[],
        maxDepth: number,
        defaultPath: string
        ROOT_PATH: string
    } | undefined;
    export class ProjectTree {
        options: treeOptions = defaultOptions;
        constructor(option?: treeOptions) {
            if (option !== undefined) {
                this.options = { ...defaultOptions, ...option };
            }
            // 先清空源文件
            fs.writeFileSync(this!.options!.ROOT_PATH, "", { flag: 'w' })
        }
        readDir(p = this.options!.defaultPath, depth = this.options!.maxDepth) {
            if (depth === 0) {
                return;
            }
            let fls: string[] = [];
            let dirs: string[] = [];
            let dir_list = [];
            const files = fs.readdirSync(p, { encoding: 'utf-8' });
            // sort,let the directores in the front of files
            files.forEach((element: string) => {
                let stat = fs.statSync(path.join(p, element));
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
}
module.exports = ProjectTreeNameSpace.ProjectTree;