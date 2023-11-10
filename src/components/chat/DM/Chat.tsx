import "../../../App.css";
import DirectMessageList from "./DMList";
import DirectMessageSender from "./DMSender";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ChatProps {
  currentUserId: number;
  otherUserId: number;
}

const Chat: React.FC<ChatProps> = (currentUserId, otherUserId) => {
  // state for posting messages
  const [messageContent, setMessageContent] = useState("");
  // state for holding list of messages
  const [messages, setMessages] = useState<string[]>([]);

  // helper function
  const fetchMessages = (
    endpoint: string,
    currentUserId: number,
    otherUserId: number
  ) => {
    axios
      .get(
        `${endpoint}?currentUserId=${currentUserId}&otherUserId=${otherUserId}`,
        { withCredentials: true }
      )
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // fetch messages on new user id
  // useEffect(() => {
  //   fetchMessages("/social", currentUserId, otherUserId);
  //   fetchMessages("/planner", currentUserId, otherUserId);
  //   fetchMessages("/tracker", currentUserId, otherUserId);
  // }, [currentUserId, otherUserId]);

  return (
    <div className="flex-row">
      <DirectMessageList
        currentUserId={currentUserId}
        otherUserId={otherUserId}
        messages={messages}
      />
      <DirectMessageSender
        currentUserId={currentUserId}
        otherUserId={otherUserId}
        setMessages={setMessages}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
      />
    </div>
  );
};

export default Chat;
