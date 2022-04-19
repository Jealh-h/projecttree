export type treeOptions = {
  ignoreFiles: string[],
  maxDepth: number,
  defaultPath: string
  ROOT_PATH: string
}

declare class ProjectTree {
  constructor(options?: treeOptions);
  readDir(path: string, depth: number): void;
}