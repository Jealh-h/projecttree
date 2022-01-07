declare namespace ProjectTreeNameSpace {
    type treeOptions = {
        ignoreFiles: string[];
        maxDepth: number;
        defaultPath: string;
        ROOT_PATH: string;
    } | undefined;
    class ProjectTree {
        readonly option?: treeOptions;
        options: treeOptions;
        constructor(option?: treeOptions);
        readDir(p?: string, depth?: number): void;
    }
}
declare const _default: typeof ProjectTreeNameSpace.ProjectTree;
export default _default;
