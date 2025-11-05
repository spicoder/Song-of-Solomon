type MessageBubbleProps = {
  speaker: string;
  text: string;
  verseNum: string;
  isMe: boolean; // Determines if the bubble is on the right (blue) or left (gray)
  showSpeakerName: boolean; // Determines if we should render the speaker's name
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  speaker,
  text,
  verseNum,
  isMe,
  showSpeakerName,
}) => {
  // Aligns the whole message block (name + bubble)
  const alignment = isMe ? "items-end" : "items-start";
  // Aligns the speaker name text
  const speakerNameAlignment = isMe ? "text-right" : "text-left";
  // Styles the bubble itself
  const bubbleStyles = isMe
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-black";

  return (
    <div className={`flex flex-col ${alignment} mb-2`}>
      {/* 1. Speaker Name (Conditional) */}
      {showSpeakerName && (
        <span
          className={`text-xs text-gray-500 mb-1 px-2 ${speakerNameAlignment}`}
        >
          {speaker}
        </span>
      )}

      {/* 2. Message Bubble */}
      <div
        className={`flex items-end max-w-xs md:max-w-md ${
          isMe ? "flex-row-reverse" : ""
        }`}
      >
        <div className={`rounded-2xl px-4 py-2 ${bubbleStyles}`}>
          <p>{text}</p>
        </div>

        {/* 3. Verse Number (Subtle) */}
        <span className="text-2xs text-gray-400 font-mono mx-2">
          {verseNum}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
