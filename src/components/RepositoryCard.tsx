import { Box, Text } from "@chakra-ui/react";
// import { IRepositoryInfo } from "../models/IRepositoryInfo";
import { IRepositoryInfo } from "../services/githubAPI";
import { Skeleton, SkeletonCircle, SkeletonText, Heading, Divider, Card, CardHeader, CardBody, Stack, StackDivider } from '@chakra-ui/react';
import "../styles/sidebar.css"

export interface RepositoryCardProps {
    repo: IRepositoryInfo | null;
    onRepositorySelect: (repository: IRepositoryInfo) => void;
}

export function RepositoryCard(props: RepositoryCardProps) {
    const { repo, onRepositorySelect } = props;

    return (
        <>
            {repo ? 
                <RepositoryCardActive repo={repo} onRepositorySelect={onRepositorySelect}/> : 
                <RepositoryCardSkeleton /> // displays skeleton if content hasn't yet loaded
            }
        </>
    );
}

function RepositoryCardSkeleton() {
    return (
        <Card borderWidth="1px" borderRadius="lg" padding={3} marginY={2} width="100%">
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Card>
    );
}

function RepositoryCardActive(props : {repo: IRepositoryInfo, onRepositorySelect: (repository: IRepositoryInfo) => void}) {
    const { repo, onRepositorySelect } = props;

    return (
        <Card className="prevent-select clickable" onClick={(e) => onRepositorySelect(repo)}>
            <CardHeader>
                <Heading size="sm">{repo.name}</Heading>
                <Text pt='2'>{repo.owner.login}</Text>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider/>} spacing={2}>

                    <Text fontSize='sm'>{repo.description}</Text>

                </Stack>

            </CardBody>
        </Card>
    );


}