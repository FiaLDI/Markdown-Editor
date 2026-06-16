
export const getFileName = (path: string) => path.split(/[\\/]/).pop() ?? path;
export const getByteSize = (content: string) => new Blob([content]).size;
