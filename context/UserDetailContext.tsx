'use client'
import { createContext } from 'react';

export const UserDetailContext = createContext(
    {} as {
        userDetails: { _id: string; name: string; email: string;picture:string } | null;
        setUser: React.Dispatch<React.SetStateAction<{ id: string; name: string; email: string } | null>>;
        isLoading: boolean;
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
        error: string | null;
        setError: React.Dispatch<React.SetStateAction<string | null>>;
    }
)
