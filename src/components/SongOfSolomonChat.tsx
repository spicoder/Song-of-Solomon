import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChapterSelector from "./ChapterSelector";
import bookData from "../songOfSolomon.json";

// Define the structure of a verse
interface Verse {
  verseNum: string;
  speaker: string;
  text: string;
}

// Define the structure of the entire book data
type BookData = Record<string, Verse[]>;

// 1. DEFINE SPEAKER CONFIGURATION
export interface SpeakerConfig {
  initials: string;
  avatarColor: string; // Tailwind classes for the avatar
  bubbleColor: string; // Tailwind classes for the message bubble
  align: "left" | "right";
}

// *** FIX: "Pastol" is now the "me" user (right-aligned, blue) ***
const speakerConfig: Record<string, SpeakerConfig> = {
  Pastol: {
    initials: "P",
    avatarColor: "bg-green-100 text-green-700",
    bubbleColor: "bg-blue-500 text-white", // Main speaker
    align: "right",
  },
  Dalaga: {
    initials: "D",
    avatarColor: "bg-pink-100 text-pink-700",
    bubbleColor: "bg-gray-200 text-black", // Other speaker
    align: "left",
  },
  Hari: {
    initials: "H",
    avatarColor: "bg-purple-100 text-purple-700",
    bubbleColor: "bg-gray-200 text-black",
    align: "left",
  },
  "Mga anak na babae ng Jerusalem": {
    initials: "A",
    avatarColor: "bg-orange-100 text-orange-700",
    bubbleColor: "bg-gray-200 text-black",
    align: "left",
  },
  "Mga anak na babae ng Sion": {
    initials: "S",
    avatarColor: "bg-yellow-100 text-yellow-700",
    bubbleColor: "bg-gray-200 text-black",
    align: "left",
  },
  "Mga kapatid na lalaki ng dalaga": {
    initials: "K",
    avatarColor: "bg-indigo-100 text-indigo-700",
    bubbleColor: "bg-gray-200 text-black",
    align: "left",
  },
  Pambungad: {
    initials: "N",
    avatarColor: "bg-gray-100 text-gray-500",
    bubbleColor: "bg-gray-100 text-gray-700",
    align: "left",
  },
  // Default for any speaker we missed
  default: {
    initials: "?",
    avatarColor: "bg-gray-100 text-gray-500",
    bubbleColor: "bg-gray-200 text-black",
    align: "left",
  },
};

const SongOfSolomonChat: React.FC = () => {
  // --- FIX: State for Chapter Selection ---
  const [allChapters] = useState<BookData>(bookData);
  const [chapterKeys] = useState(() => Object.keys(allChapters));
  const [selectedChapter, setSelectedChapter] = useState(chapterKeys[0]); // Default to first chapter
  const [chapterData, setChapterData] = useState<Verse[]>([]);

  // Update chapter data whenever selectedChapter changes
  useEffect(() => {
    setChapterData(allChapters[selectedChapter] || []);
  }, [selectedChapter, allChapters]);

  // Handler for the dropdown
  const handleChapterChange = (chapterKey: string) => {
    setSelectedChapter(chapterKey);
  };

  return (
    <div className="flex justify-center bg-gray-100 p-4 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-center">Ang Awit ni Solomon</h1>
          <p className="text-sm text-gray-600 text-center">
            {/* Dynamically show selected chapter name */}
            {selectedChapter.replace(/([a-zA-Z])(\d+)/, "$1 $2")}
          </p>
        </div>

        {/* --- FIX: Chapter Selector Added --- */}
        <ChapterSelector
          chapterKeys={chapterKeys}
          selectedChapter={selectedChapter}
          onChapterChange={handleChapterChange}
        />

        {/* Message List */}
        <div className="p-4 space-y-0.5 h-[70vh] overflow-y-auto">
          {chapterData.map((verse, index) => {
            // Get logic for grouping
            const prevSpeaker =
              index > 0 ? chapterData[index - 1].speaker : null;
            const nextSpeaker =
              index < chapterData.length - 1
                ? chapterData[index + 1].speaker
                : null;

            const isFirstMessageInGroup = verse.speaker !== prevSpeaker;
            const isLastMessageInGroup = verse.speaker !== nextSpeaker;

            // Get config for this verse
            const config =
              speakerConfig[verse.speaker] || speakerConfig.default;
            const isMe = config.align === "right";

            return (
              <MessageBubble
                key={`${selectedChapter}-${verse.verseNum}`} // Key must be unique across chapters
                speaker={verse.speaker}
                text={verse.text}
                verseNum={verse.verseNum}
                isMe={isMe}
                isFirstMessageInGroup={isFirstMessageInGroup}
                isLastMessageInGroup={isLastMessageInGroup}
                config={config}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SongOfSolomonChat;
