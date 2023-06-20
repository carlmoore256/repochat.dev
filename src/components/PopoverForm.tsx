import React, { Ref, useState, forwardRef, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    ButtonGroup,
    Button,
    Box,
    Popover,
    PopoverTrigger,
    IconButton,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";

interface TextInputProps {
    id: string;
    label: string;
    defaultValue?: string;
    onChange?: (e: any) => void;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    return (
        <FormControl>
            <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
            <Input ref={ref} {...props} />
        </FormControl>
    )
})

interface FormProps {
    firstFieldRef: Ref<HTMLInputElement>;
    onCancel: () => void;
    onSubmit: (input : string) => void;
}

function Form(props: FormProps) {
    const { firstFieldRef, onCancel, onSubmit } = props
    const [value, setValue] = useState<string>('');


    useEffect(() => {
        console.log("Value changed", value);
    }, [value])

    return (
        <Stack spacing={4}>
            <TextInput
                label='Git Repository URL'
                id='first-name'
                ref={firstFieldRef}
                defaultValue={value}
                onChange={(e : any) => setValue(e.target.value)}
            />
            <ButtonGroup display='flex' justifyContent='flex-end'>
                <Button variant='outline' onClick={onCancel}>
                    Cancel
                </Button>
                <Button isDisabled={value.length > 0 == false} colorScheme='teal' onClick={(e) => onSubmit(value)}>
                    Submit
                </Button>
            </ButtonGroup>
        </Stack>
    )
}

export interface PopoverFormProps {
    onSubmit: (input: string) => void;
}

export function PopoverForm(props : PopoverFormProps) {
    var { onSubmit } = props;
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef<HTMLInputElement>(null)

    const onSubmitAction = (input: string) => {
        onSubmit(input);
        onClose();
    }

    return (
        <>
            <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement='right'
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <Button colorScheme="blue">Add Repository</Button>
                    {/* <IconButton aria-label="Edit" colorScheme="blue" size='sm' icon={<AddIcon />} /> */}
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <Form 
                            firstFieldRef={firstFieldRef} 
                            onCancel={onClose} 
                            onSubmit={onSubmitAction} 
                        />
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default PopoverForm;
