import { createContext } from 'react';

export interface IndexContext {
    handleLogin : () => void;
}

export const indexContext = createContext<IndexContext | null>(null);

