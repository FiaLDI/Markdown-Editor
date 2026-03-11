
export interface Tab {
  name: string;
  path: string;
  isActive: boolean;
}

export interface TabStore {
  tabs: Tab[];
  activePath?: string;

  openTab: (name: string,path: string) => void;
  closeTab: (path: string) => void;
  setActive: (path: string) => void;
}
