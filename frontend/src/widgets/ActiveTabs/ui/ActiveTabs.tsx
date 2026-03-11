"use client";

import { useActiveTabs } from "../model/useActiveTabs";
import { TabsContextMenu } from "@/features/tabs";

export const ActiveTabs = () => {
  const { 
    contextMenu, 
    contextItems, 
    menuRef, 
    closeMenu, 
    tabs, 
    isModify, 
    handleContextMenu, 
    setActive, 
    closeTab
  } = useActiveTabs();

  return (
    <>
      <div className="flex bg-[#1c2125] border-b border-gray-700">
        {tabs.map((tab) => {
          return (
            <div
              key={tab.path}
              onContextMenu={(e) => handleContextMenu(e, tab.path)}
              className={`flex items-center px-3 py-1 cursor-pointer select-none border-r border-gray-700 
                ${
                  tab.isActive
                    ? "bg-[#23292d] text-white"
                    : "bg-[#1c2125]/60 text-gray-400 hover:bg-gray-700"
                }`}
              onClick={() => setActive(tab.path)}
            >
              <span className="mr-2 whitespace-nowrap">
                {tab.name}
                {isModify(tab.path) && (
                  <span className="text-yellow-400">*</span>
                )}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.path);
                }}
                className="text-gray-500 hover:text-red-400 ml-1"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {contextMenu && contextItems && (
        <TabsContextMenu 
          contextMenu={contextMenu} 
          menuRef={menuRef} 
          contextItems={contextItems} 
          closeMenu={closeMenu} 
        />
      )}
    </>
  );
};
