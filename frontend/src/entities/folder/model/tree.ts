import { create } from "zustand";
import { FolderNode } from "./types";
import { renameNode } from "../lib/renameNode";
import { deleteNode } from "../lib/deleteNode";
import { createNode } from "../lib/createNode";

interface FolderTreeStore {
  tree?: FolderNode;

  setTree: (tree: FolderNode) => void;
  renameTree: (path: string, newName: string) => void;
  deleteTree: (path: string) => void;
  
  createTreeNode: (path: string, name: string) => void;
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

  deleteTree: (path) =>
    set((state) => {
      if (!state.tree) return state;

      return {
        tree: deleteNode(state.tree, path) as FolderNode,
      };
    }),

  createTreeNode: (path, name) => 
    set((state) => {
      if (!state.tree) return state;
      return {
        tree: createNode(state.tree, path, name) as FolderNode,
      }
    })
}));
