"use client";

import { useEffect } from "react";
import { useFolderUIStore } from "@/entities/folder";
import { useFolderTreeStore } from "@/entities/folder";
import { buildTree } from "@/entities/folder/lib/buildTree";

export const useRestoreWorkspace = () => {
  const currentPath = useFolderUIStore((s) => s.currentPath);
  const setTree = useFolderTreeStore((s) => s.setTree);

  useEffect(() => {
    if (!currentPath) return;

    const restore = async () => {
      try {
        const tree = await buildTree(currentPath);
        setTree(tree);
      } catch (err) {
        console.error("Не удалось восстановить workspace:", err);
      }
    };

    restore();
  }, [currentPath, setTree]);
};
