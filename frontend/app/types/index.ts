// /app/chat/types.ts
export interface User {
    name: string;
    avatarUrl: string;
}

export interface Message {
    id: string;
    text?: string;
    sender?: string;
    avatarUrl?: string;
    isSender?: boolean;
    timestamp?: string;
    type?: 'message' | 'timestamp';
    content?: string;
}

export interface Contact {
    id: string;
    name: string;
    avatarUrl: string;
    online: boolean;
    messages: Message[];
}