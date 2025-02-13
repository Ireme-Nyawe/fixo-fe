import { useEffect, useState } from 'react';
import { Phone, Video, Send, CheckIcon } from 'lucide-react';
import Avatar from '/avatar.svg';
import { IMessage, iMessageChat, IUser } from '../../types/store';
import chatSlice from '../../state/features/chat/chatSlice';
import { toast } from 'sonner';
import { FaCommentAlt } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../utils/axios';
import { formatMessageTime, formatRelativeTime } from '../../helpers/time';

const Chats = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<IUser | null>({});
  const [empty, setEmpty] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chats, setChats] = useState<iMessageChat[]>([]);
  const socket = io(BACKEND_URL);

  useEffect(() => {
    const profileObject = getUserProfile();
    if (!profileObject) return;

    console.log(profileObject);
    socket.emit('join', profileObject._id);

    socket.on('receiveMessage', async (data) => {
      await fetchUsersChat();
      await fetchChatmessages(data.message.senderId);
      if (data.message.receiverId === selectedChat?._id) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      } else {
        toast.success(`New message from ${data.senderNames}`);
      }
    });

    socket.emit('register', profileObject._id);

    return () => {
      socket.off();
    };
  }, [selectedChat?._id]);

  const getUserProfile = () => {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : null;
  };

  const isSentByUser = (senderId: string) => {
    const profile = localStorage.getItem('profile');
    if (!profile) return false;
    const profileObject = JSON.parse(profile);
    return senderId === profileObject._id;
  };

  const fetchUsersChat = async () => {
    setLoading(true);
    try {
      const response = await chatSlice.getUsersForChat();
      if (response.status === 200) {
        console.log(response.data);
        setChats(response.data);
      } else {
        toast.error(response.message || 'An unexpected error occurred');
      }
    } catch (error: any) {
      console.error('Error fetching users', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchChatmessages = async (receiverId: string) => {
    setLoading(true);
    try {
      const response = await chatSlice.getChatMessages(receiverId);
      if (response.status === 200) {
        setMessages(response.data);
        console.log('Messages', response.data);
      } else {
        toast.error(response.message || 'An unexpected error occurred');
      }
    } catch (error: any) {
      console.error('Error fetching messages', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!newMessage.trim()) return;

      const profile = getUserProfile();
      const newMsg: IMessage = {
        content: newMessage,
        receiverId: selectedChat?._id,
        senderId: profile._id,
      };

      const response = await chatSlice.sendMessage(newMsg);

      if (response?.status === 201) {
        socket.emit('sendMessage', newMsg);
        await fetchUsersChat();
        setMessages((prevMessages) => [...prevMessages, newMsg]);
      } else {
        toast.error(response?.message || 'An unexpected error occurred');
      }
    } catch (error: any) {
      console.error('Error sending message', error);
      toast.error(error?.message || 'An unexpected error occurred');
    } finally {
      setNewMessage('');
      setLoading(false);
    }
  };

  const handleSelectChat = async (chat: IUser) => {
    setSelectedChat(chat);
    setEmpty(false);
    fetchChatmessages(chat._id || '');
  };

  useEffect(() => {
    fetchUsersChat();
  }, []);
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Connect with peers</h1>
        <p className="text-gray-600">
          Chat with your peers, share updates, and collaborate on projects.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 h-[600px]">
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <input
              type="search"
              placeholder="Search conversations..."
              className="w-full p-2 rounded-lg bg-[#C2E0D1] outline-none placeholder:text-gray-600"
            />
          </div>
          <div className="space-y-4">
            {chats &&
              chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat?._id === chat._id
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
                        <h3 className="font-semibold">{chat.username}</h3>
                        <p className="text-sm text-gray-600 truncate">
                          {chat?.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {formatMessageTime(chat?.lastMessageDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md">
          {!empty ? (
            <>
              <div className="bg-[#C2E0D1] p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={Avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <h2 className="text-xl font-semibold">
                    {selectedChat?.username}
                  </h2>
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

              <div className="flex-1 p-4 overflow-y-auto flex flex-col-reverse space-y-4 space-y-reverse">
                {messages.map((message: IMessage) => (
                  <div
                    key={message?._id}
                    className={`flex ${
                      isSentByUser(message?.senderId?._id || message?.senderId)
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        isSentByUser(
                          message?.senderId?._id || message?.senderId
                        )
                          ? 'bg-primary text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <p>{message?.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isSentByUser(
                            message?.senderId?._id || message?.senderId
                          )
                            ? 'text-gray-200'
                            : 'text-gray-500'
                        }`}
                      >
                        {formatRelativeTime(message?.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

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
            <div className="flex flex-1 flex-col items-center justify-center text-gray-500">
              <p className="mb-2 text-lg font-medium">
                Select a chat to start messaging
              </p>
              <FaCommentAlt size={42} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
