export type ShareFileMutationData = {
  register: string;
};

export type ShareFileMutationVariables = {
  input: {
    filename: string;
    url: string;
    size: number;
  };
};

export const SHARE_FILE_MUTATION = `
  mutation ShareFile($input: FileDto!) {
    register(input: $input)
  }
`;
