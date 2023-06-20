import { Box, Text } from "@chakra-ui/react";
import { IMessage } from "../models/IMessage";
import { MessageRole } from "../models/IMessage";

const LeftBubbleRadius = "10px 10px 10px 0px";
const RightBubbleRadius = "10px 10px 0 10px";

const getMessageColor = (role: MessageRole) => {
    switch (role) {
        case MessageRole.AI:
            return "gray.300";
            case MessageRole.Human:
            return "blue.500";
        case MessageRole.System:
            return "gray.300";
        default:
            return "gray.300";
    }
}

function Message(props: { message: IMessage }) {
    const { content, role } = props.message;
    const color = getMessageColor(role);

    return (
        <Box
            alignSelf={role === MessageRole.Human ? "flex-end" : "flex-start"}
            backgroundColor={color}
            color={role === MessageRole.Human ? "white" : "black"}
            borderRadius={role === MessageRole.Human ? RightBubbleRadius : LeftBubbleRadius}
            p={2}
            m={1}
        >
            <Text>{content}</Text>
        </Box>
    );
}

export default Message;
