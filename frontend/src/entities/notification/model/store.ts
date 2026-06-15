import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NotificationStore {
  isEnable: boolean;
  notify: (message: string) => void;
  content?: string;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      isEnable: false,
      content: "",
      notify: (message) => {
        set({ isEnable: true });
        set({ content: message });

        setTimeout(() => {
          set({ isEnable: false });
          set({ content: "" });
        }, 6000);
      }
    }),
    {
      name: "files-store",
    }
  )
);
