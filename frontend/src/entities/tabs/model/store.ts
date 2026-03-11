import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TabStore } from "./types";

export const useTabStore = create<TabStore>()(
  persist(
    (set, get) => ({
      tabs: [],
      activePath: undefined,

      openTab: (name, path) => {
        const exists = get().tabs.find((t) => t.path === path);

        const updated = exists ? get().tabs : [...get().tabs, { name, path, isActive: true }];

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
