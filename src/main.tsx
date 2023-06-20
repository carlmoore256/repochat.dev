import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ChatSessionProvider } from './context/ChatSessionContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ChatSessionProvider>
        <App />
      </ChatSessionProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
