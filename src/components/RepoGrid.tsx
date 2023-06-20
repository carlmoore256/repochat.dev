import { useState } from "react";
// import { IRepositoryInfo } from "../models/IRepositoryInfo";
import { VStack, Heading, Box, Divider, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { RepositoryCard } from "./RepositoryCard";
import { PopoverForm } from "./PopoverForm";
import { createNewChat, newSession } from "../services/repochat";
// import { repoURLToInfo } from "../utils/repositories";
// import { getRepositoryInfo, IRepositoryInfo } from "../services/github";
// import { getRepoOwner, getRepoId } from "../utils/repositories";
import { getRepositoryInfoFromURL, IRepositoryInfo } from "../services/github";

export interface RepoGridProps {
    repositories?: IRepositoryInfo[];
    onRepositorySelected : (repository: IRepositoryInfo) => void;
}

export function RepoGrid(props : RepoGridProps) {
    const { onRepositorySelected } = props;
    const [repositories, setRepositories] = useState<IRepositoryInfo[]>(props.repositories || []);

    const handleRepoSubmit = async (value: string) => {

        const repositoryInfo = await getRepositoryInfoFromURL(value);
        console.log("Repository info", repositoryInfo);
        setRepositories([...repositories, repositoryInfo]);

        onRepositorySelected(repositoryInfo);

        // newSession().then((session) => {
        //     console.log("Session", session);
        // });
    };
    
    return (
        <>
            <Box padding="10px">
                <Heading size="2g">Repositories</Heading>
            </Box>
            <Box w="100%">
                {
                    repositories && 
                    repositories.map((repo, index) => <RepositoryCard repo={repo} key={`repo-${index}`} />)
                }
            </Box>
            <PopoverForm onSubmit={handleRepoSubmit}/>
        </>
    )
}