export interface FileEntry {
  name: string
  path: string
  isDir: boolean
}

export interface FileNode {
  type: "file";
  name: string;
  path: string;
}

export interface FolderNode {
  type: "folder";
  name: string;
  path: string;
  children: TreeNode[];
}

export type TreeNode = FileNode | FolderNode;
