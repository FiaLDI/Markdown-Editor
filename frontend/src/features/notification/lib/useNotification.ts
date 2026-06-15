import { useNotificationStore } from "@/entities/notification/model/store";

export const useNotification = () => {
  const { isEnable, notify, content } = useNotificationStore();
  
    const notifyUi = (message: string) => {
        notify(message);
    }

    return {
        isEnable,
        notify: notifyUi,
        content,
    }
}