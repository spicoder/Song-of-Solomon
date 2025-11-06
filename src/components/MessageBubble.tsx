// We get this type from SongOfSolomonChat.tsx
import { type SpeakerConfig } from "./SongOfSolomonChat";

type MessageBubbleProps = {
  speaker: string;
  text: string;
  verseNum: string;
  isMe: boolean; // Controls alignment
  isFirstMessageInGroup: boolean; // For speaker name and bubble rounding
  isLastMessageInGroup: boolean; // For avatar and bubble rounding
  config: SpeakerConfig; // The new config object
};

/**
 * Helper function to determine the bubble's border radius
 * This creates the "grouped" message effect.
 */
function getBubbleRounding({
  isMe,
  isFirstMessageInGroup,
  isLastMessageInGroup,
}: {
  isMe: boolean;
  isFirstMessageInGroup: boolean;
  isLastMessageInGroup: boolean;
}) {
  const roundedClass = "rounded-2xl";

  // Single message in group
  if (isFirstMessageInGroup && isLastMessageInGroup) {
    return roundedClass;
  }
  // First message in group
  if (isFirstMessageInGroup) {
    return isMe
      ? "rounded-t-2xl rounded-bl-2xl"
      : "rounded-t-2xl rounded-br-2xl";
  }
  // Last message in group
  if (isLastMessageInGroup) {
    return isMe
      ? "rounded-b-2xl rounded-tl-2xl"
      : "rounded-b-2xl rounded-tr-2xl";
  }
  // Middle message
  return isMe ? "rounded-l-2xl" : "rounded-r-2xl";
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  speaker,
  text,
  verseNum,
  isMe,
  isFirstMessageInGroup,
  isLastMessageInGroup,
  config,
}) => {
  // --- Alignment ---
  const messageRowAlignment = isMe ? "justify-end" : "justify-start";
  const messageContentAlignment = isMe ? "items-end" : "items-start";

  // --- Styles ---
  const bubbleStyles = config.bubbleColor;
  const roundingStyles = getBubbleRounding({
    isMe,
    isFirstMessageInGroup,
    isLastMessageInGroup,
  });

  // --- Avatar ---
  const avatar = (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full font-bold shrink-0 ${config.avatarColor}`}
    >
      {config.initials}
    </div>
  );

  return (
    <div
      className={`flex flex-row items-end gap-2 ${messageRowAlignment} mb-4 mt-2`}
    >
      {/* 1. AVATAR (Left side) */}
      {/* This container always takes up space to keep alignment, 
          but the avatar only shows on the last message in a group. */}
      <div
        className="w-8 shrink-0"
        style={{
          visibility: !isMe && isLastMessageInGroup ? "visible" : "hidden",
        }}
      >
        {avatar}
      </div>

      {/* 2. MESSAGE CONTENT (Name + Bubble + Verse) */}
      <div
        className={`flex flex-col ${messageContentAlignment} max-w-xs md:max-w-md`}
      >
        {/* Speaker Name (Conditional) */}
        {isFirstMessageInGroup && !isMe && (
          <span className={`text-xs text-gray-500 mb-1 px-2`}>{speaker}</span>
        )}

        {/* Bubble */}
        <div className={`px-4 py-2 ${bubbleStyles} ${roundingStyles}`}>
          <p>{text}</p>
        </div>
      </div>

      {/* 3. VERSE NUMBER (Subtle, outside bubble) */}
      <div className="flex h-full items-end pb-1">
        {isLastMessageInGroup && (
          <span className="text-xs text-gray-400 font-mono mx-1">
            {verseNum}
          </span>
        )}
      </div>

      {/* 4. AVATAR (Right side) */}
      <div
        className="w-8 shrink-0"
        style={{
          visibility: isMe && isLastMessageInGroup ? "visible" : "hidden",
        }}
      >
        {avatar}
      </div>
    </div>
  );
};

export default MessageBubble;
