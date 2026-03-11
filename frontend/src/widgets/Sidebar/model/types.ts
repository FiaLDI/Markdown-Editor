import { TreeNode } from "@/entities/folder/model/types";

export interface TreeNodeProps {
  node: TreeNode;
  level?: number;
  handleContextMenu?: (e: React.MouseEvent, path: string ) => void
}
