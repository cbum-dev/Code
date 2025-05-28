'use client';
import { createContext } from 'react';

export const MessageContext = createContext(
    {} as {
        Messages: { role: string; content: string }[];
        setMessages: React.Dispatch<React.SetStateAction<{ role: string; content: string }[]>>;
        isLoading: boolean;
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
        error: string | null;
        setError: React.Dispatch<React.SetStateAction<string | null>>;
    }
);