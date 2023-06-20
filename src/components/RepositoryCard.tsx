import { Box, Text } from "@chakra-ui/react";
// import { IRepositoryInfo } from "../models/IRepositoryInfo";
import { IRepositoryInfo } from "../services/github";
import { Skeleton, SkeletonCircle, SkeletonText, Heading } from '@chakra-ui/react';
import "../styles/sidebar.css"

export interface RepositoryCardProps {
    repo: IRepositoryInfo | null;
}

export function RepositoryCard(props: RepositoryCardProps) {
    const { repo } = props;

    return (
        <Box  className="repo-card prevent-select" borderRadius="lg">
            {repo ? 
                <RepositoryCardActive repo={repo}/> : 
                <RepositoryCardSkeleton /> // displays skeleton if content hasn't yet loaded
            }
        </Box>
    );
}

function RepositoryCardSkeleton() {
    return (
        <Box borderWidth="1px" borderRadius="lg" padding={3} marginY={2} width="100%">
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Box>
    );
}

function RepositoryCardActive(props : {repo: IRepositoryInfo}) {
    const { repo } = props;

    return (
        <Box>
            <Heading size="md">{repo.name}</Heading>
            <Text>{repo.owner.login}</Text>
            <Text fontWeight="bold">{repo.name}</Text>
            <Text>{repo.description}</Text>
        </Box>
    );


}