// /app/chat/components/ChatArea.tsx
'use client'
import { useEffect, useRef, FormEvent } from 'react';
import { Contact, Message, User } from '../../app/types/index';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatAreaProps {
    contact: Contact | undefined;
    messages: Message[];
    newMessage: string;
    setNewMessage: (value: string) => void;
    onSendMessage: (e: FormEvent<HTMLFormElement>) => void;
    onBack: () => void;
    currentUser: User; // <-- ADDED: Receive currentUser prop
}

const ChatArea: React.FC<ChatAreaProps> = ({ contact, messages, newMessage, setNewMessage, onSendMessage, onBack, currentUser }) => { // <-- Add to destructuring
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, contact]);

    if (!contact) {
        return (
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-500 p-4 text-center">
                Select a chat to start messaging
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-50 h-full">
            <ChatHeader contact={contact} onBack={onBack} />
            <MessageList messages={messages} messagesEndRef={messagesEndRef} />
            {/* Pass currentUser down to MessageInput */}
            <MessageInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                onSendMessage={onSendMessage}
                currentUser={currentUser} // <-- ADDED: Pass the prop
            />
        </div>
    );
};

export default ChatArea;