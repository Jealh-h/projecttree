const fs = require('fs');
const path = require('path');
const MAX_DEPTH = 3;
// const Path = path.join(process.argv[1], '../');
const Path = "D:\\MyFrontEndFile\\案例\\d3\\project";
// const ROOT_PATH = path.join(Path, 'dirTree.txt');
const ROOT_PATH = "D:\\MyFrontEndFile\\dirtree\\dirTree.txt";

const TAB = "    ";
/**
 * @param{p:string} 路径
 * @param{depth:number} 还能继续读的深度
 */
function readDir(p, depth) {
    if (depth == 0) {
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
    dir_list.forEach(element => {
        let stat = fs.statSync(path.join(p, element));
        // 是文件夹就继续读
        if (stat.isDirectory()) {
            fs.writeFileSync(ROOT_PATH, TAB.repeat(MAX_DEPTH - depth) + element + '\n', { flag: 'a+' })
            readDir(path.join(p, element), depth - 1);
        } else {
            fs.writeFileSync(ROOT_PATH, TAB.repeat(MAX_DEPTH - depth) + element + '\n', { flag: 'a+' })
        }
    });
}
// 先清空源文件
fs.writeFileSync(ROOT_PATH, "", { flag: 'w' })
readDir(Path, MAX_DEPTH);