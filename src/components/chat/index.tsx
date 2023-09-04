import ChatSelectHeader from "./ChatSelect/header";
import Chat from "./DM/Chat";
import React from "react";
import GPTChat from "./GPT/GPTChatParent";

interface DMProps {
  currentUserId: number;
  otherUserId: number;
}

const DMs: React.FC<DMProps> = ({ currentUserId, otherUserId }) => {
  const [aichatid, setAiChatId] = React.useState(0);
  const [aiChatTrue, setAiChatTrue] = React.useState(false);

  React.useEffect(() => {
  }, [aiChatTrue, aichatid]);

  return (
    <div className="flex flex-col gap-1">
      <ChatSelectHeader setAiChatTrue={setAiChatTrue} setAiChatId={setAiChatId}></ChatSelectHeader>

      {aiChatTrue ? ( // If aiChatTrue is truthy, render GPTChat
        <GPTChat
          currentUserId={currentUserId}
          chatID={aichatid}
        />
      ) : (
        // Otherwise, render Chat
        <Chat
          currentUserId={currentUserId}
          otherUserId={otherUserId}
        />
      )}
    </div>
  );
};

export default DMs;