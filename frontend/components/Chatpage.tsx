'use client'
// pages/chat.tsx (or any other page route)
import { useState, useEffect, useRef, FormEvent } from 'react';
import Image from 'next/image';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    CogIcon,
    MoonIcon, // Or SunIcon for light theme
    ArrowLeftOnRectangleIcon,
    PhoneIcon,
    VideoCameraIcon,
    FaceSmileIcon,
    PaperClipIcon,
    CameraIcon,
    MicrophoneIcon,
} from '@heroicons/react/24/outline'; // Using outline for most, can mix with solid
import Link from 'next/link';

// Type Definitions
interface User {
    name: string;
    avatarUrl: string;
}

interface Message {
    id: string;
    text?: string; // Text is optional for timestamp messages
    sender?: string; // Sender is optional for timestamp messages
    avatarUrl?: string; // Optional, as sender might be current user
    isSender?: boolean; // Optional for timestamp messages
    timestamp?: string; // Optional for timestamp messages
    type?: 'message' | 'timestamp'; // To distinguish between message types
    content?: string; // For timestamp content
}

interface Contact {
    id: string;
    name: string;
    avatarUrl: string;
    online: boolean;
    messages: Message[];
}

// Placeholder Data
const initialCurrentUser: User = {
    name: 'Ajinas',
    avatarUrl:'/images/avatar2.jpg',
};
const initialContacts: Contact[] = [
    {
        id: 'user1',
        name: 'Johnson',
        avatarUrl:'/images/avatar1.jpg',
        online: false,
        messages: [
            { id: 'm1', type: 'message', text: 'Hey Ajinas!', sender: 'Johnson', avatarUrl: '/images/avatar1.jpg', isSender: false, timestamp: 'Yesterday, 10:00 AM' },
            { id: 'm2', type: 'message', text: 'How are things?', sender: 'Johnson', avatarUrl: '/images/avatar1.jpg', isSender: false, timestamp: 'Yesterday, 10:01 AM' },
        ],
    },
    {
        id: 'user2',
        name: 'Albert',
        avatarUrl:'/images/avatar3.jpg',
        online: true,
        messages: [
            { id: 'ts1', type: 'timestamp', content: 'Today, 9:30 AM' },
            { id: 'm3', type: 'message', text: 'Hello', sender: 'Albert', avatarUrl: '/images/avatar3.jpg', isSender: false, timestamp: '9:31 AM' },
            { id: 'm4', type: 'message', text: 'How are you?', sender: 'Ajinas', isSender: true, timestamp: '9:32 AM' }, // Current user is sender
            { id: 'm5', type: 'message', text: 'Fine, Brother', sender: 'Albert', avatarUrl: '/images/avatar3.jpg', isSender: false, timestamp: '9:33 AM' },
        ],
    },
];

const ChatPage: React.FC = () => {
    const [currentUser] = useState<User>(initialCurrentUser);
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [selectedContactId, setSelectedContactId] = useState<string | null>('user2'); // Albert selected by default
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [newMessage, setNewMessage] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const selectedContact = contacts.find(c => c.id === selectedContactId);
    const currentChatMessages: Message[] = selectedContact ? selectedContact.messages : [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentChatMessages, selectedContactId]);


    const handleSelectContact = (contactId: string) => {
        setSelectedContactId(contactId);
    };

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedContact) return;

        const newMsgObject: Message = {
            id: `msg-${Date.now()}`,
            type: 'message',
            text: newMessage,
            sender: currentUser.name,
            isSender: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedContacts = contacts.map(contact => {
            if (contact.id === selectedContactId) {
                return {
                    ...contact,
                    messages: [...contact.messages, newMsgObject],
                };
            }
            return contact;
        });
        setContacts(updatedContacts);
        setNewMessage('');
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-full sm:w-80 md:w-[360px] h-full bg-white flex flex-col border-r border-gray-200">
                {/* Sidebar Header */}
                <div className="p-4 flex items-center justify-between border-b border-gray-200 h-[73px] flex-shrink-0">
                    <div className="flex items-center space-x-3 min-w-0">
                        <Image
                            src={currentUser.avatarUrl || "/avatars/default-avatar.png"}
                            alt={currentUser.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover flex-shrink-0"
                            onError={(e) => (e.currentTarget.src = 'https://placehold.co/40x40/E0E0E0/B0B0B0?text=User')}
                        />
                        <span className="font-semibold text-gray-800 truncate">{currentUser.name}</span>
                    </div>
                    <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                            <PlusIcon className="h-5 w-5" />
                        </button>
                        <Link href={'/home/profile'}>
                            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                                <CogIcon className="h-5 w-5" />
                            </button>
                        </Link>

                        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                            <MoonIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 flex-shrink-0">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Conversations"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-100 text-sm text-gray-700 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Contact List */}
                <nav className="flex-1 overflow-y-auto px-2 space-y-1">
                    {filteredContacts.map((contact) => (
                        <button
                            key={contact.id}
                            onClick={() => handleSelectContact(contact.id)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-xl group text-left
                ${selectedContactId === contact.id ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-700 hover:bg-gray-100'}
              `}
                        >
                            <div className="relative flex-shrink-0">
                                <Image
                                    src={contact.avatarUrl || "/avatars/default-avatar.png"}
                                    alt={contact.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                    onError={(e) => (e.currentTarget.src = `https://placehold.co/40x40/E0E0E0/B0B0B0?text=${contact.name.charAt(0)}`)}
                                />
                                {contact.online && (
                                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm truncate ${selectedContactId === contact.id ? 'text-white' : 'text-gray-800 group-hover:text-gray-900'}`}>
                                    {contact.name}
                                </p>
                            </div>
                        </button>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="p-4 mt-auto border-t border-gray-200 flex-shrink-0">
                    <button className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150">
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {!selectedContact ? (
                    <div className="flex-1 flex items-center justify-center text-gray-500 p-4 text-center">
                        Select a chat to start messaging
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <div className="bg-blue-500 text-white p-4 flex items-center justify-between shadow-sm h-[73px] flex-shrink-0">
                            <div className="flex items-center space-x-3 min-w-0">
                                <Image
                                    src={selectedContact.avatarUrl || "/avatars/default-avatar.png"}
                                    alt={selectedContact.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover flex-shrink-0"
                                    onError={(e) => (e.currentTarget.src = `https://placehold.co/40x40/FFFFFF/3B82F6?text=${selectedContact.name.charAt(0)}`)}
                                />
                                <div className="min-w-0">
                                    <h2 className="font-semibold text-lg truncate">{selectedContact.name}</h2>
                                    {selectedContact.online && <p className="text-xs text-blue-100">online</p>}
                                </div>
                            </div>
                            <div className="flex space-x-2 flex-shrink-0">
                                <button className="p-2 hover:bg-blue-600 rounded-full transition duration-150">
                                    <PhoneIcon className="h-5 w-5" />
                                </button>
                                <button className="p-2 hover:bg-blue-600 rounded-full transition duration-150">
                                    <VideoCameraIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Message List */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 bg-gray-100">
                            {currentChatMessages.map((msg, index) => {
                                if (msg.type === 'timestamp') {
                                    return (
                                        <div key={msg.id || `ts-${index}`} className="text-center my-3 sm:my-4">
                                            <span className="text-xs text-gray-500 bg-gray-200 px-2.5 py-1 rounded-full">
                                                {msg.content}
                                            </span>
                                        </div>
                                    );
                                }
                                // For simplicity, avatar shown for all non-sender messages.
                                const showAvatar = !msg.isSender;
                                return (
                                    <div key={msg.id} className={`flex mb-2.5 ${msg.isSender ? 'justify-end' : 'justify-start'}`}>
                                        {!msg.isSender && showAvatar && (
                                            <Image
                                                src={msg.avatarUrl || "/avatars/default-avatar.png"}
                                                alt={msg.sender || "User"}
                                                width={32}
                                                height={32}
                                                className="rounded-full mr-2 self-end object-cover flex-shrink-0"
                                                onError={(e) => (e.currentTarget.src = `https://placehold.co/32x32/E0E0E0/B0B0B0?text=${msg.sender ? msg.sender.charAt(0) : 'U'}`)}
                                            />
                                        )}
                                        <div
                                            className={`py-2 px-3.5 rounded-2xl max-w-[70%] sm:max-w-[65%] break-words
                        ${msg.isSender
                                                    ? 'bg-blue-500 text-white rounded-br-lg' // Adjusted for screenshot
                                                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-lg' // Adjusted for screenshot
                                                }`}
                                        >
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <form onSubmit={handleSendMessage} className="bg-white p-3 sm:p-4 border-t border-gray-200 flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                            <button type="button" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                                <FaceSmileIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Message........"
                                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none px-2 py-1"
                            />
                            <button type="button" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                                <PaperClipIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                            <button type="button" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                                <CameraIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                            {newMessage.trim() ? (
                                <button type="submit" className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6">
                                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                    </svg>
                                </button>
                            ) : (
                                <button type="button" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                                    <MicrophoneIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                                </button>
                            )}
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default ChatPage;
