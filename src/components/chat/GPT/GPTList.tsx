import React from "react";
import "../../../App.css";

interface Message {
  role: string;
  content: string;
}

// ***----- DIRECT MESSAGE LIST COMPONENT -----***
const GPTList: React.FC<{
  messages: Message[];
}> = ({ messages }) => {
  // state for holding message list

  // any time either the userId or the otherUserId changes, the list of messages should be reloaded
  // REPLACE ENDPOINT W SOMETHING LIKE: `/DirectMessage?currentUserId1=${currentUserId}&otherUserId2=${otherUserId}`

  if (!messages) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat bg-base-100 text-secondary flex flex-col gap-1 mb-2 border-2 border-secondary h-96">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-bubble ${
            msg.role === 'user'
              ? "self-end bg-accent text-primary"
              : "self-start bg-tertiary text-primary"
          }`}>
          <p>{msg.content}</p>
          <div className="chat-metadata">
            <p>{msg.role === 'user' ? "You" : "AI"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GPTList;
