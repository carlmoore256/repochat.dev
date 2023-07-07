import { useContext, useState, useEffect, forwardRef } from "react";
import { VStack, Heading, Box, Divider, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { RepoGrid } from "./RepoGrid";
import { ChatSessionContext, SetChatSessionContext } from "../context/ChatSessionContext";
import { newSession } from "../services/repochatAPI";
import { IRepositoryInfo } from "../services/githubAPI";
import "../styles/sidebar.css";

function Sidebar() {

    // const chatSession = useContext(ChatSessionContext);
    const setChatSession = useContext(SetChatSessionContext);

    const handleNewRepoSelected = (repository : IRepositoryInfo) => {
        newSession(repository).then((session) => {
            console.log("Session", session);
            setChatSession(session);
        });
    };

    return (
        <VStack align="start" padding={5} className="bar" backgroundColor={"#303030"}>
            <Box className="logo">
                <Heading color="black" fontWeight={400}>repochat.dev</Heading>
            </Box>
            <Divider orientation="horizontal" />
            <RepoGrid onRepositorySelect={(repository : IRepositoryInfo) => {
                handleNewRepoSelected(repository);
            }}/>
        </VStack>
    );
}

export default Sidebar;
