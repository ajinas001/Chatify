// /app/chat/components/Sidebar.tsx
'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    CogIcon,
    MoonIcon,
    ArrowLeftOnRectangleIcon,
    ChatBubbleLeftRightIcon,
    UserPlusIcon,
} from '@heroicons/react/24/outline';
import { User, Contact } from '../../app/types/index';

interface SidebarProps {
    currentUser: User;
    contacts: Contact[];
    selectedContactId: string | null;
    onSelectContact: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, contacts, selectedContactId, onSelectContact }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full bg-white flex flex-col border-r border-gray-200">
            {/* Sidebar Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-200 h-[73px] flex-shrink-0">
                <div className="flex items-center space-x-3 min-w-0">
                    <Image src={currentUser.avatarUrl} alt={currentUser.name} width={40} height={40} className="rounded-full object-cover" />
                    <span className="font-semibold text-gray-800 truncate">{currentUser.name}</span>
                </div>
                <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                    <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"><PlusIcon className="h-5 w-5" /></button>
                    <Link href={'/home/profile'}><button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"><CogIcon className="h-5 w-5" /></button></Link>
                    <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"><MoonIcon className="h-5 w-5" /></button>
                </div>
            </div>

            {/* Search */}
            <div className="p-4 flex-shrink-0">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MagnifyingGlassIcon className="h-5 w-5 text-gray-400" /></div>
                    <input type="text" placeholder="Search Conversations" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-100 text-sm text-gray-700 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white" />
                </div>
            </div>

            {/* Contact List */}
            <nav className="flex-1 overflow-y-auto px-2 space-y-1">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                        <button
                            key={contact.id}
                            onClick={() => onSelectContact(contact.id)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-xl group text-left ${selectedContactId === contact.id
                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <div className="relative flex-shrink-0">
                                <Image
                                    src={contact.avatarUrl}
                                    alt={contact.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />
                                {contact.online && (
                                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p
                                    className={`font-medium text-sm truncate ${selectedContactId === contact.id
                                            ? 'text-white'
                                            : 'text-gray-800 group-hover:text-gray-900'
                                        }`}
                                >
                                    {contact.name}
                                </p>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
                        {/* Enhanced Empty State */}
                        <div className="relative mb-6">
                            {/* Background circle with gradient */}
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center">
                                    {searchTerm ? (
                                        <MagnifyingGlassIcon className="h-8 w-8 text-blue-400" />
                                    ) : (
                                        <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-400" />
                                    )}
                                </div>
                            </div>
                            {/* Floating dots animation */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-200 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-indigo-200 rounded-full animate-pulse delay-75"></div>
                        </div>

                        {/* Dynamic content based on search state */}
                        {searchTerm ? (
                            <>
                                <h3 className="text-gray-800 font-semibold text-base mb-2">
                                   No results for &quot;{searchTerm}&quot;

                                </h3>
                                <p className="text-gray-500 text-sm mb-6 max-w-48 leading-relaxed">
                                    We couldn&apos;t find any conversations matching your search. Try different keywords or check the spelling.
                                </p>
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors duration-200"
                                >
                                    Clear search
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-gray-800 font-semibold text-base mb-2">
                                    No conversations yet
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 max-w-48 leading-relaxed">
                                    Start a new conversation to connect with friends and colleagues.
                                </p>
                                <div className="flex flex-col space-y-2 w-full max-w-40">
                                    <button className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-200 text-sm font-medium">
                                        <PlusIcon className="h-4 w-4" />
                                        <span>New Chat</span>
                                    </button>
                                    <button className="flex items-center justify-center space-x-2 bg-white text-gray-600 py-2.5 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all duration-200 text-sm font-medium">
                                        <UserPlusIcon className="h-4 w-4" />
                                        <span>Add Contact</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </nav>

            {/* Logout Button */}
            <div className="p-4 mt-auto border-t border-gray-200 flex-shrink-0">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150">
                    <ArrowLeftOnRectangleIcon className="h-5 w-5" /><span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;