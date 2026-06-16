"use client";   

import { useNotification } from "@/features/notification";

export const Notification = () => {

    const { isEnable, content } = useNotification();

    if (!isEnable) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow">
            {content}
        </div>
    );
}