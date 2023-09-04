import React from "react";
import GptDropDownMenu from "./GPT/GptDropdown"; // Replace the path with the actual location of DropdownMenu.js
import ChatDropdownMenu from "./Chat/DmDropdown";

const ChatSelectHeader = ({ setAiChatId, setAiChatTrue }) => {
  const chatData = [
    { name: "Chat 1", profilePictureUrl: "profile1.jpg" },
    { name: "Chat 2", profilePictureUrl: "profile2.jpg" },
    // Add more chat objects as needed
  ];

  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <a className="text-lg font-bold">Chat</a>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <ChatDropdownMenu
            title="DMs"
            data={chatData}
            setAiChatTrue={setAiChatTrue}></ChatDropdownMenu>
          <GptDropDownMenu
            title="GPT"
            setAiChatId={setAiChatId}
            setAiChatTrue={setAiChatTrue}></GptDropDownMenu>
        </div>
      </div>
    </div>
  );
};

export default ChatSelectHeader;
