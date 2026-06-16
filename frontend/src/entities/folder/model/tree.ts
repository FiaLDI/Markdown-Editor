import { create } from "zustand";
import { FolderNode } from "./types";
import { renameNode } from "../lib/renameNode";
import { deleteNode } from "../lib/deleteNode";
import { createNode } from "../lib/createNode";
import { shareNode } from "../lib/shareTree";

interface FolderTreeStore {
  tree?: FolderNode;

  setTree: (tree: FolderNode) => void;
  renameTree: (path: string, newName: string) => void;
  deleteTreeNode: (path: string) => void;
  
  createTreeNode: (path: string, name: string, type: "folder" | "file") => void;
  shareTreeNode: (path: string) => void;
}

export const useFolderTreeStore = create<FolderTreeStore>((set) => ({
  tree: undefined,

  setTree: (tree) => set({ tree }),

  renameTree: (path, newName) =>
    set((state) => {
      if (!state.tree) return state;

      return {
        tree: renameNode(state.tree, path, newName) as FolderNode,
      };
    }),

  deleteTreeNode: (path) =>
    set((state) => {
      if (!state.tree) return state;

      return {
        tree: deleteNode(state.tree, path) as FolderNode,
      };
    }),

  createTreeNode: (path, name, type) => 
    set((state) => {
      if (!state.tree) return state;
      return {
        tree: createNode(state.tree, path, name, type) as FolderNode,
      }
    }),
  
  shareTreeNode: (path) =>
    set((state) => {
      if (!state.tree) return state;
      return {
        tree: shareNode(state.tree, path) as FolderNode,
      }
    }),
}));
