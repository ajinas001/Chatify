// /app/chat/components/MessageInput.tsx
'use client'
import { FormEvent } from 'react';
import Image from 'next/image';
import { PaperClipIcon, CameraIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import { User } from '../../app/types/index';

interface MessageInputProps {
    newMessage: string;
    setNewMessage: (value: string) => void;
    onSendMessage: (e: FormEvent<HTMLFormElement>) => void;
    currentUser: User; // <-- ADDED: We need the current user for the avatar
}

const MessageInput: React.FC<MessageInputProps> = ({ newMessage, setNewMessage, onSendMessage, currentUser }) => {
    return (
        <form onSubmit={onSendMessage} className="bg-white p-2 border-t border-gray-200 flex items-center space-x-1">
            {/* Current User Avatar */}
            <Image
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                width={30}
                height={30}
                className="rounded-full object-cover"
                // Fallback with initials, styled like the screenshot
                onError={(e) => {
                    e.currentTarget.style.display = 'none'; // Hide broken image
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                }}
            />
            <div className="hidden items-center justify-center h-10 w-10 rounded-full bg-gray-700 text-white font-bold flex-shrink-0">
                {currentUser.name.charAt(0).toUpperCase()}
            </div>

            {/* Input Field */}
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message........"
                className="flex-1 bg-transparent text-xs md:text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
            />

            {/* Action Buttons */}
            <button type="button" className="p-1 md:p-2 text-gray-500 hover:text-gray-700"><PaperClipIcon className="h-4 w-4 md:h-6 md:w-6" /></button>
            <button type="button" className="p-1 md:p-2 text-gray-500 hover:text-gray-700"><CameraIcon className="h-4 w-4 md:h-6 md:w-6" /></button>
            
            {/* Send / Mic Button */}
            {newMessage.trim() ? (
                <button type="submit" className="p-1 md:p-2 text-blue-500 hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 md:h-6 md:w-6"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
                </button>
            ) : (
                <button type="button" className="p-1 md:p-2 text-gray-500 hover:text-gray-700">
                    <MicrophoneIcon className="h-4 w-4 md:h-6 md:w-6" />
                </button>
            )}
        </form>
    );
};

export default MessageInput;