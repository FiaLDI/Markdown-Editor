import { useFolderUIStore } from "@/entities/folder";
import { useOpenFile } from "@/features/file";
import { TreeNodeProps } from "./types";

export const useTreeNodeModel = ({ node, level = 0 }: TreeNodeProps) => {

  const expandedFolders = useFolderUIStore((s) => s.expandedFolders);
  const toggleFolder = useFolderUIStore((s) => s.toggleFolder);
  const select = useFolderUIStore((s) => s.select);
  const selected = useFolderUIStore((s) => s.selected);

  const { openFile } = useOpenFile();

  const isFolder = node.type === "folder";
  const expanded = expandedFolders.includes(node.path);
  const isSelected = selected === node.path;

  return {
    isSelected, 
    isFolder, 
    toggleFolder, 
    select, 
    openFile, 
    expanded
  }
}