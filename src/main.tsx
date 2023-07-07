import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ChatSessionProvider } from './context/ChatSessionContext.tsx';
import { extendTheme } from '@chakra-ui/react';
import theme from './theme';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ChatSessionProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChatSessionProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
