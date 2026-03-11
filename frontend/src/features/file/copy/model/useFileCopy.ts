import { useFolderTreeStore } from "@/entities/folder"

export const useCopyFileName = () => {

    const onCopyFileRelativeNameHandler = async (path: string) => {
        const rootPath = useFolderTreeStore.getState().tree?.path;
        if (!path || !rootPath) return;

        const relative = path
            .replace(rootPath, "")
            .replace(/^[/\\]/, "");

        await navigator.clipboard.writeText(relative);
    }

    const onCopyFileNameHandler = async (path: string) => {
        if (!path) return;

        await navigator.clipboard.writeText(path);
    }

    return {
        onCopyFileNameHandler,
        onCopyFileRelativeNameHandler
    }
}