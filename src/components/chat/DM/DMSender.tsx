import axios from "axios";
import "../../../App.css";

interface Message {
  id: number;
  sender_id: number;
  recipient_id: number;
  chat: string;
  created_at: string;
}

interface DirectMessageSenderProps {
  currentUserId: number;
  otherUserId: number;
  setMessages: (messages: Message[]) => void;
  messageContent: string;
  setMessageContent: (messageContent: string) => void;
}

// helper function
const sendMessageAndFetch = (
  endpoint: string,
  currentUserId: number,
  otherUserId: number,
  messageContent: string,
  setMessages: (messages: Message[]) => void
) => {
  axios
    .post(endpoint, {
      sender_id: currentUserId,
      recipient_id: otherUserId,
      chat: messageContent,
    })
    .then((res) => {
      setMessageContent("");
    })
    .catch((err) => {
      console.error(err);
    });

  axios
    .get(
      `${endpoint}?currentUserId=${currentUserId}&otherUserId=${otherUserId}`
    )
    .then((res) => {
      setMessages(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

// ***----- DIRECT MESSAGE SENDER COMPONENT -----***
const DirectMessageSender: React.FC<DirectMessageSenderProps> = ({
  currentUserId,
  otherUserId,
  setMessages,
  messageContent,
  setMessageContent,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    sendMessageAndFetch(
      "/social",
      currentUserId,
      otherUserId,
      messageContent,
      setMessages
    );
    sendMessageAndFetch(
      "/planner",
      currentUserId,
      otherUserId,
      messageContent,
      setMessages
    );
    sendMessageAndFetch(
      "/tracker",
      currentUserId,
      otherUserId,
      messageContent,
      setMessages
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 flex justify-center items-center">
      <textarea
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        className="text-base-100-bold bg-secondary pl-5"
      />
      <button
        type="submit"
        className="bg-accent text-primary ml-2">
        Send
      </button>
    </form>
  );
};

export default DirectMessageSender;
