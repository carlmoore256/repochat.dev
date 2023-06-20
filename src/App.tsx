import { Box, Flex, VStack, Divider } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import CodeReference from "./components/CodeReference";
import ChatWindow from "./components/ChatWindow";
import Navbar from "./components/NavBar";

function App() {

  return (
    <Flex height="100vh">
      <Box width="300px">
        <Sidebar />
      </Box>

      <Box flex="1" backgroundColor="#1A1A1A">
        <VStack divider={<Divider orientation="horizontal" />} h="100%" padding="5px">
          <Box flex="1" minHeight="100px">
            <CodeReference />
          </Box>
          <Box flex="3" width="98%">
            <ChatWindow />
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}

export default App;
