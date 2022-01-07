declare const fs: any;
declare const path: any;
declare const TAB = "|   ";
declare const PREFIX = "\u251C\u2500\u2500";
declare const LAST_PREFIX = "\u2514\u2500\u2500";
declare const defaultOptions: {
    ignoreFiles: string[];
    maxDepth: number;
    defaultPath: any;
    ROOT_PATH: any;
};
declare namespace ProjectTreeNameSpace {
    type treeOptions = {
        ignoreFiles: string[];
        maxDepth: number;
        defaultPath: string;
        ROOT_PATH: string;
    } | undefined;
    class ProjectTree {
        options: treeOptions;
        constructor(option?: treeOptions);
        readDir(p?: string, depth?: number): void;
    }
}
