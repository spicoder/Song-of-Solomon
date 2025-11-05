import React from "react";

interface ChapterSelectorProps {
  chapterKeys: string[];
  selectedChapter: string;
  onChapterChange: (chapterKey: string) => void;
}

const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  chapterKeys,
  selectedChapter,
  onChapterChange,
}) => {
  return (
    <div className="p-2 bg-gray-50 border-b">
      <label
        htmlFor="chapter-select"
        className="block text-xs font-medium text-gray-500 mb-1"
      >
        Kabanata:
      </label>
      <select
        id="chapter-select"
        value={selectedChapter}
        onChange={(e) => onChapterChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        {chapterKeys.map((key) => (
          <option key={key} value={key}>
            {/* Tries to format "Chapter1" into "Chapter 1" */}
            {key.replace(/([a-zA-Z])(\d+)/, "$1 $2")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChapterSelector;
