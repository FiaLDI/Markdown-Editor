import { useFileStore } from "@/entities/file";
import { useFolderTreeStore } from "@/entities/folder";
import { graphqlRequest } from "@/shared/api";
import { getFS } from "@/shared/lib/tauri/fs/fs.service";
import { getByteSize, getFileName } from "@/shared/lib/utils";
import { 
    SHARE_FILE_MUTATION, 
    ShareFileMutationData, 
    ShareFileMutationVariables 
} from "../lib/types";


export const useShareFile = () => {
  const getFile = useFileStore((state) => state.getFile);
  const sharedFile = useFileStore((state) => state.sharedFile);
  const shareTreeNode = useFolderTreeStore((state) => state.shareTreeNode);

  const onSharedFileHandler = async (path: string) => {
    if (!path) return;

    const file = getFile(path);
    const content = file?.content ?? (await getFS().readFile(path));

    await graphqlRequest<ShareFileMutationData, ShareFileMutationVariables>({
      query: SHARE_FILE_MUTATION,
      variables: {
        input: {
          filename: getFileName(path),
          url: path,
          size: getByteSize(content),
        },
      },
    });

    sharedFile(path);
    shareTreeNode(path);
  };

  return {
    onSharedFileHandler,
  };
};
