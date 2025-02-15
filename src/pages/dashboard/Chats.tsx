import { useEffect, useState } from 'react';
import { Phone, Video, Send, EditIcon } from 'lucide-react';
import Avatar from '/avatar.svg';
import { IMessage, iMessageChat, IUser } from '../../types/store';
import chatSlice from '../../state/features/chat/chatSlice';
import { toast } from 'sonner';
import { FaCommentAlt } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../utils/axios';
import { formatMessageTime, formatRelativeTime } from '../../helpers/time';
import { uploadToCloudinary } from '../../helpers/clouadinary';
import { truncateText } from '../../helpers/textFormatting';
import NewChat from '../../components/dashboard/Chat/NewChat';

const Chats = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<IUser | null>({});
  const [empty, setEmpty] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chats, setChats] = useState<iMessageChat[]>([]);
  const socket = io(BACKEND_URL);
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    const profileObject = getUserProfile();
    if (!profileObject) return;

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

  const fetchChatmessages = async (receiverId: any) => {
    setSendingMessage(true);
    try {
      const response = await chatSlice.getChatMessages(receiverId);
      if (response.status === 200) {
        setMessages(response.data);
      } else {
        toast.error(response.message || 'An unexpected error occurred');
      }
    } catch (error: any) {
      console.error('Error fetching messages', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingMessage(true);

    try {
      if (!newMessage.trim()) return;

      const newMsg: IMessage = {
        content: newMessage,
        receiverId: selectedChat?._id,
      };

      const response = await chatSlice.sendMessage(newMsg);

      if (response?.status === 201) {
        socket.emit('sendMessage', newMsg);
        await fetchUsersChat();
        await fetchChatmessages(selectedChat?._id);
      } else {
        toast.error(response?.message || 'An unexpected error occurred');
      }
    } catch (error: any) {
      console.error('Error sending message', error);
      toast.error(error?.message || 'An unexpected error occurred');
    } finally {
      setNewMessage('');
      setSendingMessage(false);
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

  const filteredChats = chats.filter((chat) =>
    `${chat?.firstName} ${chat?.lastName}`
      .toLowerCase()
      .includes(search?.toLowerCase() || '')
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        toast.error('No file selected. Please choose a file.');
        return;
      }

      setIsUploading(true);
      const mediaUrl = await uploadToCloudinary(file);
      setIsUploading(false);

      if (!mediaUrl) {
        toast.error('Failed to upload file. Please try again.');
        return;
      }

      let fileMarkup = '';

      if (file.type.startsWith('image/')) {
        fileMarkup = `<img src="${mediaUrl}" alt="Uploaded Image" class="max-w-xs rounded-md" />`;
      } else if (file.type.startsWith('video/')) {
        fileMarkup = `<video controls class="max-w-xs"><source src="${mediaUrl}" type="${file.type}" /></video>`;
      } else {
        fileMarkup = `<a href="${mediaUrl}" target="_blank" class="text-blue-500 underline">Download File</a>`;
      }

      setNewMessage((prevMessage) =>
        prevMessage ? `${prevMessage} ${fileMarkup}` : fileMarkup
      );

      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(
        'An unexpected error occurred while uploading. Please try again.'
      );
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Connect with peers</h1>
        <p className="text-gray-600">
          Chat with your peers, share updates, and collaborate on projects.
        </p>
      </div>
      <div className="mb-4 flex items-center gap-3 bg-[#C2E0D1] p-2 rounded-lg shadow-md">
        <input
          type="search"
          placeholder="Search conversations..."
          className="w-full p-3 rounded-lg bg-transparent outline-none text-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-primary p-3 rounded-lg text-white hover:bg-primary-dark transition-all"
          title="New conversation"
          onClick={() => setNewChatModalOpen(!newChatModalOpen)}
        >
          <EditIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-row gap-4 h-[600px]">
        <div className="w-[60px] md:w-1/3 bg-white rounded-lg shadow-md p-1 md:p-4 overflow-y-auto max-h-[600px]">
          <div className="space-y-4">
            {loading ? (
              <div>
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg flex items-center justify-between animate-pulse bg-gray-200 mb-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                      <div className="hidden md:block">
                        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredChats && filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-1 md:p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat?._id === chat._id
                      ? 'bg-[#C2E0D1]'
                      : 'hover:bg-gray-100'
                  }`}
                  title={`${chat.firstName} ${chat.lastName}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={Avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="hidden md:block">
                        <h3 className="font-semibold">
                          {truncateText(chat.username, 20)}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {truncateText(chat?.lastMessage, 10)}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block text-right">
                      <p className="text-xs text-gray-500">
                        {chat?.lastMessage !== null &&
                          formatMessageTime(chat?.lastMessageDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-primary">No chats found</div>
            )}
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
                {sendingMessage ? (
                  <div className="animate-pulse space-y-4">
                    <div className="flex-1 p-4 space-y-4">
                      <div className="w-full h-12 bg-gray-300 rounded"></div>
                      <div className="w-full h-12 bg-gray-300 rounded"></div>
                      <div className="w-full h-12 bg-gray-300 rounded"></div>
                      <div className="w-full h-12 bg-gray-300 rounded"></div>
                      <div className="w-full h-12 bg-gray-300 rounded"></div>
                      <div className="w-full h-12 bg-gray-300 rounded"></div>
                      <div className="w-full h-12 bg-gray-300 rounded"></div>
                      <div className="w-full h-12 bg-gray-300 rounded"></div>
                      <div className="w-full h-12 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ) : messages && messages.length > 0 ? (
                  messages.map((message: IMessage) => (
                    <div
                      key={message?._id}
                      className={`flex ${
                        isSentByUser(
                          message?.senderId?._id || message?.senderId
                        )
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] w-full rounded-lg p-3 ${
                          isSentByUser(
                            message?.senderId?._id || message?.senderId
                          )
                            ? 'bg-primary text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: message?.content,
                          }}
                        />
                        <div className="flex">
                          <img src={Avatar} alt="" className="w-4 h-4 m-1" />
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
                    </div>
                  ))
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center text-gray-500">
                    <p className="mb-2 text-lg font-medium">
                      Be the first to chat with {selectedChat?.username}
                    </p>
                    <FaCommentAlt size={42} />
                  </div>
                )}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full p-3 rounded-lg bg-gray-100 outline-none resize-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileInput"
                    />
                    {isUploading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-gray-600 border-t-transparent rounded-full"></div>
                    ) : (
                      <label
                        htmlFor="fileInput"
                        className="p-2 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        📎
                      </label>
                    )}

                    <button
                      type="submit"
                      className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors flex items-center justify-center"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
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

        {newChatModalOpen && (
          <NewChat
            isOpen={newChatModalOpen}
            closeModal={() => setNewChatModalOpen(!newChatModalOpen)}
            startChat={(chat: any) => {
              handleSelectChat(chat);
              setNewChatModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Chats;
