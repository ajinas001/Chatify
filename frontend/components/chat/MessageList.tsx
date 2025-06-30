// /app/chat/components/MessageList.tsx
'use client'
import Image from 'next/image';
import { Message } from '../../app/types/index';

interface MessageListProps {
    messages: Message[];
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, messagesEndRef }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-100">
            {messages.map((msg, index) => {
                if (msg.type === 'timestamp') {
                    return (
                        <div key={msg.id || `ts-${index}`} className="text-center my-3">
                            <span className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full">
                                {msg.content}
                            </span>
                        </div>
                    );
                }
                const showAvatar = !msg.isSender;
                return (
                    <div key={msg.id} className={`flex items-end gap-2.5 ${msg.isSender ? 'justify-end' : 'justify-start'}`}>
                        {/* Avatar for received messages */}
                        {!msg.isSender && showAvatar && (
                            <Image
                                src={msg.avatarUrl!}
                                alt={msg.sender!}
                                width={32}
                                height={32}
                                className="rounded-full object-cover flex-shrink-0"
                            />
                        )}

                        {/* Message Bubble - STYLING UPDATED HERE */}
                        <div
                            className={`py-2 px-3.5 break-words
                            max-w-[80%] sm:max-w-[75%] md:max-w-[65%]
                            ${
                                msg.isSender
                                    // Fully rounded blue bubble for sender
                                    ? 'bg-blue-500 text-white rounded-2xl'
                                    // Fully rounded white bubble with shadow for receiver
                                    : 'bg-white text-gray-800 rounded-2xl shadow-sm border border-gray-100'
                            }`}
                        >
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;