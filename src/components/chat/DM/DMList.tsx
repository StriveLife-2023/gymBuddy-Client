interface Message {
  id: number;
  sender_id: number;
  recipient_id: number;
  chat: string;
  created_at: string;
}

// ***----- DIRECT MESSAGE LIST COMPONENT -----***
const DirectMessageList: React.FC<{
  currentUserId: number;
  messages?: Message[];
}> = ({ currentUserId, messages }) => {
  // dummy data for before backend is working properly
  if (messages === undefined || messages.length === 0) {
    messages = [
      {
        id: 1,
        sender_id: 1,
        recipient_id: 2,
        chat: "Hi! How are you?",
        created_at: "1000-01-01 00:00:00",
      },
      {
        id: 2,
        sender_id: 2,
        recipient_id: 1,
        chat: "GREAT!",
        created_at: "1000-01-01 00:00:00",
      },
    ];
    currentUserId = 1;
  }

  return (
    <div className="chat bg-base-100 text-secondary flex flex-col justify-end gap-1 mb-2 border-2 border-secondary h-96 px-1">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-bubble ${
            msg.sender_id === currentUserId
              ? "self-end bg-accent text-primary"
              : "self-start bg-neutral text-primary"
          }`}>
          <p>{msg.chat}</p>
          <div className="chat-metadata">
            <p className="text-xs font-thin">
              {msg.sender_id === currentUserId ? "You" : "Them"}
            </p>
            <p className="text-xs font-thin">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DirectMessageList;
