import { useFolderUIStore } from "@/entities/folder";
import { useOpenFile } from "@/features/file";
import { TreeNodeProps } from "./types";

export const useTreeNodeModel = ({ node, level = 0 }: TreeNodeProps) => {

  const expandedFolders = useFolderUIStore((s) => s.expandedFolders);
  const toggleFolder = useFolderUIStore((s) => s.toggleFolder);
  const select = useFolderUIStore((s) => s.select);

  const { openFile } = useOpenFile();

  const isFolder = node.type === "folder";
  const isShared = node.isShared === true;
  const expanded = expandedFolders.includes(node.path);

  return {
    isFolder, 
    toggleFolder, 
    select, 
    openFile, 
    expanded,
    isShared,
  }
}