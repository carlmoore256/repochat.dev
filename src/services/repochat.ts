// import { IRepositoryInfo } from "../models/IRepositoryInfo";
import { IRepositoryInfo } from "./github";
import { REPOCHAT_API_URL } from "../constants";
import { getRequest, postRequest, postRequestSSE } from "./apiHelpers";
import { IMessage } from "../models/IMessage";

function getAPIRoute(endpoint: string): string {
    return `${REPOCHAT_API_URL}/${endpoint}`;
}

export function getRepositoryMessages(url : string): Promise<IMessage> {
    return new Promise((resolve, reject) => {
        postRequest(getAPIRoute('repository/messages'), {url}, {}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });    
}

export function createNewChat(url : string) : Promise<IRepositoryInfo> {
    return new Promise((resolve, reject) => {
        postRequest(getAPIRoute('chat/create'), {url}, {}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });    
}

export interface ISessionInfo {
    userId: string;
}

export function newSession(repository : IRepositoryInfo) : Promise<ISessionInfo> {
    return new Promise((resolve, reject) => {
        console.log("Sending new session request", repository.html_url, JSON.stringify({
            repoURL : repository.html_url}));
        postRequest(getAPIRoute('chat/new-session'), {
            repoURL : repository.html_url,
        }, {}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });    
}


export function sendMessage(message : IMessage, sessionInfo : ISessionInfo, onMessage : (data : any) => void) : Promise<IMessage> {
    postRequestSSE(getAPIRoute('chat/message'), {
        message : message.content,
        userId : sessionInfo.userId
    }, (data) => {
        console.log("Received message", data);
        onMessage(data);
    });
}