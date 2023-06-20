// import { IRepositoryInfo } from "../models/IRepositoryInfo";

export interface Owner {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    // add more fields as needed
}

export interface IRepositoryInfo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: Owner;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    forks_count: number;
    open_issues_count: number;
    master_branch: string;
    default_branch: string;
    score: number;
    // add more fields as needed
}

export async function getRepositoryInfo(owner: string, name: string): Promise<IRepositoryInfo> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
    if (!response.ok) {
        throw new Error(`GitHub API request failed with status ${response.status}`);
    }
    return await response.json();
}

export async function getRepositoryInfoFromURL(gitURL : string) : Promise<IRepositoryInfo> {
    const name = getRepoName(gitURL);
    const owner = getRepoOwner(gitURL);
    return await getRepositoryInfo(owner, name);    
}

export const getRepoName = (repoUrl : string) => repoUrl.split("/").slice(-1)[0];
export const getRepoOwner = (repoUrl : string) => repoUrl.split("/").slice(-2)[0];