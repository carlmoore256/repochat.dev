import { useContext, createContext, useState } from "react";

export interface IChatSession {
    userId: string;
}

export interface ChatSessionContextProps {
    sessionInfo: IChatSession;
    setSessionInfo: (session: IChatSession) => void;
}

// also add ability here to parse the incoming strings to add to context

export const ChatContentContext = createContext<IChatSession | null>(null!);
export const SetChatContentContext = createContext<(session : IChatSession) => void | null>(null!);

export function ChatContentProvider(props: { children : any }) {
    const [sessionInfo, setSessionInfo] = useState<IChatSession | null>(null);
    return (
        <ChatContentContext.Provider value={sessionInfo}>
            <SetChatContentContext.Provider value={setSessionInfo}>
                {props.children}
            </SetChatContentContext.Provider>
        </ChatContentContext.Provider>
    )
}