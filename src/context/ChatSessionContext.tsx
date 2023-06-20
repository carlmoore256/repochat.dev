import { useContext, createContext, useState } from "react";

export interface IChatSession {
    userId: string;
}

export interface ChatSessionContextProps {
    sessionInfo: IChatSession;
    setSessionInfo: (session: IChatSession) => void;
}

export const ChatSessionContext = createContext<IChatSession | null>(null!);
export const SetChatSessionContext = createContext<(session : IChatSession) => void | null>(null!);

export function ChatSessionProvider(props: { children : any }) {
    const [sessionInfo, setSessionInfo] = useState<IChatSession | null>(null);
    return (
        <ChatSessionContext.Provider value={sessionInfo}>
            <SetChatSessionContext.Provider value={setSessionInfo}>
                {props.children}
            </SetChatSessionContext.Provider>
        </ChatSessionContext.Provider>
    )
}