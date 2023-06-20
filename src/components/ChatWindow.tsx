import { useState, useEffect, useCallback, useContext } from "react";
import { VStack, Input, Button, Box, Flex, Spacer } from "@chakra-ui/react";
import Message from "./Message";
import { IMessage, MessageRole } from "../models/IMessage";
import "../styles/chat-window.css";
import { SpeechSynthesizer, getDistinctVoices } from "./SpeechSynthesizer";

import { ChatSessionContext, SetChatSessionContext } from "../context/ChatSessionContext";
import { sendMessage } from "../services/repochat";

const VOICES = getDistinctVoices(3);
const SYNTHESIZERS = new Map<MessageRole, SpeechSynthesizer>([
  [MessageRole.AI, new SpeechSynthesizer(VOICES[0])],
  [MessageRole.Human, new SpeechSynthesizer(VOICES[1])],
  [MessageRole.System, new SpeechSynthesizer(VOICES[2])]
]);

const DEFAULT_MESSAGE = "Hello, please add a new repository to the left, and ask me a question about it!";


function ChatWindow() {

  const chatSession = useContext(ChatSessionContext);

  const [ongoingResponse, setOngoingResponse] = useState<IMessage | null>(null);

  const [chatInput, setChatInput] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([{
    content: DEFAULT_MESSAGE,
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
        setMessages((messages) => {
          const newMessage: IMessage = {
            content: "Hello, please add a new repository to the left, and ask me a question about it!",
            role: MessageRole.AI
          };
          return [...messages, newMessage];
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  // const handleSendMessage = useCallback((content : string) => {
  //   if (!chatSession) return;
  //   const newMessage: IMessage = {
  //     content,
  //     role: MessageRole.Human
  //   };
  //   setMessages((messages) => {
  //     return [...messages, newMessage];
  //   });

  //   console.log("Sending message", newMessage);
  //   sendMessage(newMessage, chatSession, (data : any) => {
  //     console.log("FOOING THE BAR " + data);
  //   });
      
  // }, [messages, chatSession]);

  const handleSendMessage = useCallback((content : string) => {
    if (!chatSession) return;
    const newMessage: IMessage = {
      content,
      role: MessageRole.Human
    };

    setMessages((messages) => [...messages, newMessage]);

    setOngoingResponse({
      content: "", // Initially empty content
      role: MessageRole.AI
    });

    sendMessage(newMessage, chatSession, (data : any) => {
      console.log("FOOING THE BAR " + data);

      setOngoingResponse((prevResponse) => {
        if (prevResponse) {
          return {
            ...prevResponse,
            content: prevResponse.content + " " + data, // Concatenate incoming text to the existing content
          };
        }
        return null;
      });
      // setMessages((messages) => [...messages, newAIMessage]);
    });
      
  }, [chatSession]);


  useEffect(() => {
    if (!chatSession) return;
    // here we can set the chat session with messages incoming from server, 
    // that are loaded when we switch chat session
  }, [chatSession]);


  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };
      

  
  return (
    //direction="column" padding={5} height="100%" width="100%" backgroundColor="#2E2E2E" borderRadius="10px"
    <Flex className="container">
      <VStack flex="1" width="100%" height="100%" overflowY="auto" spacing={4} >
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
