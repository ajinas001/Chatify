// /app/chat/page.tsx
'use client'
// ... (keep all your existing imports and state definitions)
import { useState, FormEvent } from 'react';
import { initialCurrentUser, initialContacts } from '../../components/chat/data';
import { User, Contact, Message } from '../../app/types/index';
import Sidebar from '../../components/sidebar/Sidebar';
import ChatArea from '../../components/chat/ChatArea';
const ChatPage: React.FC = () => {
    const [currentUser] = useState<User>(initialCurrentUser);
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [selectedContactId, setSelectedContactId] = useState<string | null>('user2');
    const [newMessage, setNewMessage] = useState<string>('');

    const selectedContact = contacts.find(c => c.id === selectedContactId);
    const currentChatMessages: Message[] = selectedContact ? selectedContact.messages : [];
    
    // ... (keep all your handler functions: handleSelectContact, handleBackToSidebar, handleSendMessage)
    const handleSelectContact = (contactId: string) => {
        setSelectedContactId(contactId);
    };

    const handleBackToSidebar = () => {
        setSelectedContactId(null);
    };

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedContact) return;

        const newMsgObject: Message = {
            id: `msg-${Date.now()}`, type: 'message', text: newMessage,
            sender: currentUser.name, isSender: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedContacts = contacts.map(contact => {
            if (contact.id === selectedContactId) {
                return { ...contact, messages: [...contact.messages, newMsgObject] };
            }
            return contact;
        });
        setContacts(updatedContacts);
        setNewMessage('');
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
            <div className={`
                ${selectedContactId ? 'hidden' : 'flex'}
                md:flex flex-col w-full md:w-80 lg:w-[360px]
            `}>
                <Sidebar
                    currentUser={currentUser}
                    contacts={contacts}
                    selectedContactId={selectedContactId}
                    onSelectContact={handleSelectContact}
                />
            </div>

            <div className={`
                 ${selectedContactId ? 'flex' : 'hidden'}
                 md:flex flex-1 flex-col
            `}>
                <ChatArea
                    contact={selectedContact}
                    messages={currentChatMessages}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    onSendMessage={handleSendMessage}
                    onBack={handleBackToSidebar}
                    currentUser={currentUser} // <-- FINAL CHANGE: Pass currentUser here
                />
            </div>
        </div>
    );
}

export default ChatPage;