import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import bookData from "../songOfSolomon.json"; // Adjust path as needed

// Define the structure of a verse
interface Verse {
  verseNum: string;
  speaker: string;
  text: string;
}

// Define the main speaker. Messages from this speaker will be on the right.
// Everyone else will be on the left.
const MAIN_SPEAKER = "Babae";

const SongOfSolomonChat: React.FC = () => {
  // For this demo, we'll just load Chapter 1
  const [chapterData, setChapterData] = useState<Verse[]>([]);

  useEffect(() => {
    // In a real app, you might fetch this or have a chapter selector
    setChapterData(bookData.Chapter1);
  }, []);

  return (
    <div className="flex justify-center bg-gray-100 p-4 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
        {/* Chat Header */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-center">Ang Awit ni Solomon</h1>
          <p className="text-sm text-gray-600 text-center">Kabanata 1</p>
        </div>

        {/* Message List */}
        <div className="p-4 space-y-2 h-[70vh] overflow-y-auto">
          {chapterData.map((verse, index) => {
            // This is the key logic for the Messenger UI
            // 1. Get the previous speaker
            const prevSpeaker =
              index > 0 ? chapterData[index - 1].speaker : null;

            // 2. Only show the speaker name if it's different from the previous one
            const showSpeakerName = verse.speaker !== prevSpeaker;

            // 3. Determine if this is the "main" speaker
            const isMe = verse.speaker === MAIN_SPEAKER;

            return (
              <MessageBubble
                key={verse.verseNum}
                speaker={verse.speaker}
                text={verse.text}
                verseNum={verse.verseNum}
                isMe={isMe}
                showSpeakerName={showSpeakerName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SongOfSolomonChat;
