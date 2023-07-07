import { useState, useEffect, useCallback, useContext } from "react";
import { VStack, Input, Button, Box, Flex, Spacer } from "@chakra-ui/react";
import Message from "./Message";
import { IMessage, MessageRole } from "../models/IMessage";
import "../styles/chat-window.css";
import { SpeechSynthesizer, getDistinctVoices } from "./SpeechSynthesizer";

import { ChatSessionContext, SetChatSessionContext } from "../context/ChatSessionContext";
import { sendMessage } from "../services/repochatAPI";

const VOICES = getDistinctVoices(3);
const SYNTHESIZERS = new Map<MessageRole, SpeechSynthesizer>([
  [MessageRole.AI, new SpeechSynthesizer(VOICES[0])],
  [MessageRole.Human, new SpeechSynthesizer(VOICES[1])],
  [MessageRole.System, new SpeechSynthesizer(VOICES[2])]
]);

const DEFAULT_MESSAGE = "Hello, please add a new repository to the left, and ask me a question about it!";


function ChatWindow() {

  const chatSession = useContext(ChatSessionContext);

  // const [currentChatSessionId, setCurrentChatSessionId] = useState<string>("");
  const [ongoingResponse, setOngoingResponse] = useState<IMessage | null>(null);

  const [chatInput, setChatInput] = useState<string>("");

  const [messages, setMessages] = useState<IMessage[]>([{
    content: chatSession ? "" : "Please select a repository on the left",
    role: MessageRole.AI
  },
]);

  useEffect(() => {
    if (!messages) return;
    const latestMessage = messages[messages.length - 1];
    window.speechSynthesis.cancel();
    SYNTHESIZERS.get(latestMessage.role)?.speak(latestMessage.content);
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log("Enter key pressed");
        handleSendMessage(chatInput);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [chatInput]);


  const handleSendMessage = useCallback((content : string) => {
    if (!chatSession) return;
    
    const newMessage: IMessage = { content, role: MessageRole.Human };

    if (ongoingResponse !== null && ongoingResponse.content !== "") {
      setMessages((messages) => [...messages, ongoingResponse, newMessage]);
    } else {
      setMessages((messages) => [...messages, newMessage]);
    }
    
    setOngoingResponse({
      content: "", // Initially empty content
      role: MessageRole.AI
    });
    sendMessage(newMessage, chatSession, (data : any) => {
      setOngoingResponse((prevResponse) => {
        if (prevResponse) {
          return {
            ...prevResponse,
            content: prevResponse.content + data, // Concatenate incoming text to the existing content
          };
        }
        return null;
      });
    });

    setChatInput("");
      
  }, [chatSession]);

  

  useEffect(() => {
    if (!chatSession) return;
    // Clear previous messages
    setMessages([{
      content: DEFAULT_MESSAGE,
      role: MessageRole.AI
    }]);

  }, [chatSession]);


  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };
      

  
  return (
    <Flex className="container">
      <VStack flex="1" height="100%" overflowY="auto" spacing={4} >
        <Box flex="1" width="100%" overflowY="auto">
          {messages && messages.map((message, index) => <Message message={message} key={`message-${index}`}/>)}
          {ongoingResponse && <Message message={ongoingResponse} />}
        </Box>
      </VStack>
      <Spacer />
      <Flex className="input-bar">
          <Input placeholder="Enter your message here" mb={2} value={chatInput} onChange={handleTextChange}/>
          <Button colorScheme="blue" onClick={() => handleSendMessage(chatInput)}>Send</Button>
      </Flex>
    </Flex>
  );
}

export default ChatWindow;
