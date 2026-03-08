// entities/tab/model/tab.store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Tab {
  path: string;
}

interface TabStore {
  tabs: Tab[];
  activePath?: string;

  openTab: (path: string) => void;
  closeTab: (path: string) => void;
  setActive: (path: string) => void;
}

export const useTabStore = create<TabStore>()(
  persist(
    (set, get) => ({
      tabs: [],
      activePath: undefined,

      openTab: (path) => {
        const exists = get().tabs.find((t) => t.path === path);

        const updated = exists ? get().tabs : [...get().tabs, { path }];

        set({
          tabs: updated,
          activePath: path,
        });
      },

      closeTab: (path) => {
        const updated = get().tabs.filter((t) => t.path !== path);

        const nextActive =
          get().activePath === path ? updated[0]?.path : get().activePath;

        set({
          tabs: updated,
          activePath: nextActive,
        });
      },

      setActive: (path) => {
        set({ activePath: path });
      },
    }),
    {
      name: "tabs-store",
    }
  )
);
