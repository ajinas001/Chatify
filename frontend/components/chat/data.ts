// /app/chat/data.ts
import { User, Contact } from '../../app/types/index';

export const initialCurrentUser: User = {
    name: 'Ajinas',
    avatarUrl:'/images/avatar2.jpg',
};

export const initialContacts: Contact[] = [
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
            { id: 'm4', type: 'message', text: 'How are you?', sender: 'Ajinas', isSender: true, timestamp: '9:32 AM' },
            { id: 'm5', type: 'message', text: 'Fine, Brother', sender: 'Albert', avatarUrl: '/images/avatar3.jpg', isSender: false, timestamp: '9:33 AM' },
        ],
    },
];