import { useState } from "react";
// import { IRepositoryInfo } from "../models/IRepositoryInfo";
import { VStack, Heading, Box, Divider, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { RepositoryCard } from "./RepositoryCard";
import { PopoverForm } from "./PopoverForm";
import { createNewChat, newSession } from "../services/repochatAPI";
// import { repoURLToInfo } from "../utils/repositories";
// import { getRepositoryInfo, IRepositoryInfo } from "../services/github";
// import { getRepoOwner, getRepoId } from "../utils/repositories";
import { getRepositoryInfoFromURL, IRepositoryInfo } from "../services/githubAPI";

export interface RepoGridProps {
    repositories?: IRepositoryInfo[];
    onRepositorySelect : (repository: IRepositoryInfo) => void;
}

export function RepoGrid(props : RepoGridProps) {
    const { onRepositorySelect } = props;
    const [repositories, setRepositories] = useState<IRepositoryInfo[]>(props.repositories || []);

    const handleRepoSubmit = async (value: string) => {
        const repositoryInfo = await getRepositoryInfoFromURL(value);
        console.log("Repository info", repositoryInfo);
        setRepositories([...repositories, repositoryInfo]);
        onRepositorySelect(repositoryInfo);
    };
    
    return (
        <>
            <VStack alignItems={"left"}>
                <Box padding="10px">
                    <Heading size="2g">Repository Chats</Heading>
                </Box>
                <VStack alignItems={"left"}>
                    {
                        repositories && 
                        repositories.map((repo, index) => 
                            <RepositoryCard 
                                key={`repo-${index}`} 
                                repo={repo} 
                                onRepositorySelect={onRepositorySelect}
                            />
                        )
                    }
                </VStack>
                <PopoverForm onSubmit={handleRepoSubmit}/>

            </VStack>
        </>
    )
}