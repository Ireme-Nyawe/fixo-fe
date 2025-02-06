import { useState } from 'react';
import { Phone, Video, Send } from 'lucide-react';
import Avatar from '/avatar.svg';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  unread: number;
  timestamp: string;
}

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello there, how are you doing?',
      sender: 'other',
      timestamp: '4:00 PM',
    },
    {
      id: 2,
      text: "I'm working on a project. Let's chat.",
      sender: 'other',
      timestamp: '3:30 PM',
    },
    {
      id: 3,
      text: "Hi! I'm doing great, thanks for asking!",
      sender: 'user',
      timestamp: '4:05 PM',
    },
  ]);

  const [chats] = useState<Chat[]>([
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hello there, how are you doing?',
      unread: 2,
      timestamp: '4:00 PM',
    },
    {
      id: 2,
      name: 'Alice Smith',
      lastMessage: 'Let me know about the updates',
      unread: 0,
      timestamp: '3:45 PM',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      lastMessage: 'See you tomorrow!',
      unread: 1,
      timestamp: '2:30 PM',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Connect with peers</h1>
        <p className="text-gray-600">
          Chat with your peers, share updates, and collaborate on projects.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 h-[600px]">
        {/* Chat List */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <input
              type="search"
              placeholder="Search conversations..."
              className="w-full p-2 rounded-lg bg-[#C2E0D1] outline-none placeholder:text-gray-600"
            />
          </div>
          <div className="space-y-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat === chat.id
                    ? 'bg-[#C2E0D1]'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={Avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{chat.name}</h3>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{chat.timestamp}</p>
                    {chat.unread > 0 && (
                      <span className="bg-primary text-white rounded-full px-2 py-1 text-xs">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-[#C2E0D1] p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <h2 className="text-xl font-semibold">John Doe</h2>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
                    <Phone className="text-primary" />
                  </button>
                  <button className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
                    <Video className="text-primary" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'user'
                            ? 'text-gray-200'
                            : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 rounded-lg bg-gray-100 outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
