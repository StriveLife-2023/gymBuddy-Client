import { useState, useEffect } from "react";
import "../../../App.css";
import GPTList from "./GPTList";
import GPTSender from "./GPTSender";
import GPT from "./gptRoutes";

interface dmList {
  id: number;
  ai_chat_id: number;
  is_ai: number;
  message: string;
  created_at: string;
}

const GPTChat: React.FC<{
  dmList: dmList[];
  currentUserId: number;
  chatID: number;
}> = ( {currentUserId, chatID} ) => {
  const [dmList, setDmList] = useState([]);

  useEffect(() => {
    GPT.fetchGpt(chatID)
      .then((res) => {
        setDmList(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUserId, chatID]);

  return (
    <div className="flex-row">
      <GPTList
        messages={dmList}
        setDmList={setDmList}
      />
      <GPTSender
        chatID={chatID}
        dmList={dmList}
        setDmList={setDmList}
      />
    </div>
  );
};

export default GPTChat;
