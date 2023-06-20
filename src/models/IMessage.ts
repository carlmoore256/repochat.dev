// export type MessageRole = "user" | "system" | "ai";

export enum MessageRole {
    System,
    Human,
    AI
}

export interface IMessage {
    content: string;
    role: MessageRole;
}