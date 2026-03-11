import { useEffect, useRef } from "react";
import { useFolderTreeStore } from "@/entities/folder";
import { buildTree } from "@/entities/folder/lib/buildTree";
import { startWatcher } from "@/shared/lib/tauri/fs/fs.watcher";

export const useFileWatcher = (rootPath?: string) => {
  const setTree = useFolderTreeStore((s) => s.setTree);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!rootPath) return;

    let stop: (() => void) | undefined;

    const start = async () => {
      stop = await startWatcher(rootPath, () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
          const tree = await buildTree(rootPath);
          setTree(tree);
        }, 200);
      });
    };

    start();

    return () => {
      stop?.();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [rootPath, setTree]);
};
