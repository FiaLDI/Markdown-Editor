interface BaseNode {
  name: string;
  path: string;
}

export interface FileEntry {
  name: string
  path: string
  isDir: boolean
}
export interface FileNode extends BaseNode {
  type: "file";
}

export interface FolderNode extends BaseNode {
  type: "folder";
  children: TreeNode[];
}

export type TreeNode = FileNode | FolderNode;
