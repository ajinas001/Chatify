// /app/chat/components/ChatHeader.tsx
import Image from 'next/image';
import {
    PhoneIcon,
    VideoCameraIcon,
    ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { Contact } from '../../app/types/index';

interface ChatHeaderProps {
    contact: Contact;
    onBack: () => void; // For mobile navigation
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ contact, onBack }) => {
    return (
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between shadow-sm h-[73px] flex-shrink-0">
            <div className="flex items-center space-x-3 min-w-0">
                {/* Back button for mobile */}
                <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-blue-600 rounded-full md:hidden">
                    <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <Image src={contact.avatarUrl} alt={contact.name} width={40} height={40} className="rounded-full object-cover"/>
                <div className="min-w-0">
                    <h2 className="font-semibold text-lg truncate">{contact.name}</h2>
                    {contact.online && <p className="text-xs text-blue-100">online</p>}
                </div>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
                <button className="p-2 hover:bg-blue-600 rounded-full transition duration-150"><PhoneIcon className="h-5 w-5" /></button>
                <button className="p-2 hover:bg-blue-600 rounded-full transition duration-150"><VideoCameraIcon className="h-5 w-5" /></button>
            </div>
        </div>
    );
};

export default ChatHeader;