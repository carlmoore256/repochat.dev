import { Flex, Text } from "@chakra-ui/react";

function Navbar() {
  return (
    <Flex as="nav" align="center" justify="center" padding={6} backgroundColor="blue.500">
      <Text fontSize="2xl" color="white" fontWeight="bold">
        RepoChat
      </Text>
    </Flex>
  );
}

export default Navbar;
