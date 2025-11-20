"use client";

import { useOpenFileModel } from "@/features/open-file/model/useOpenFileModel";
import { parse } from "@/shared/lib/markdown/parse";
import { useMemo } from "react";

export const EditorPanel = () => {
    const { content, updateContent, activePath } = useOpenFileModel();
    const html = useMemo(() => parse(content), [content]);

    return (
        <div className="flex flex-1 overflow-hidden">
          <textarea
            value={content}
            onChange={(e) => {
              if (activePath) updateContent(activePath, e.target.value);
            }}
            className="w-1/2 p-4 custom-scrollbar bg-[#1c2125] border-r border-gray-700 font-mono resize-none focus:outline-none"
          />
          <div
            className="w-1/2 p-4 bg-[#1c2125] custom-scrollbar overflow-auto prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
    )
}