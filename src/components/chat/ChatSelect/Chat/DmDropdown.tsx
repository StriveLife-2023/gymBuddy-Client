import React from "react";

const ChatDropdownMenu = ({ title, data, setAiChatTrue }) => {
  const handleChatSelect = () => {
    setAiChatTrue(false);
  };

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost rounded-btn">
        {title}
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] p-2 shadow bg-primary rounded-box w-60 mt-4">
        {data.map((chat, index) => (
          <li key={index}>
            <a
              className="flex items-center space-x-2"
              onClick={() => handleChatSelect()}>
              <img
                src={"../../../../assets/bowser.png"}
                alt="Bowser"
                className="w-8 h-8 rounded-full"
              />
              <span>{chat.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatDropdownMenu;
