import { Box, Text, RadioGroup, Radio, Input, InputGroup, Button, Heading, Divider } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function getVoiceByName(name : string) : SpeechSynthesisVoice | null {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        return voices.find((v) => v.name === name) || null;
    }
    return null;
}


export type LangType = "en" | "es" | "fr" | "de" | "it" | "ja" | "ko" | "pt" | "zh" | "zh-CN" | "zh-TW";

export function getDistinctVoices(count : number, language : LangType | null = null) : SpeechSynthesisVoice[] {
    if (count > 30) {
        throw new Error("Cannot get more than 30 distinct voices");
    }
    if (count < 1) {
        throw new Error("Cannot get less than 1 distinct voice");
    }
    if ('speechSynthesis' in window === false) {
        return [];
    }
    const voices = window.speechSynthesis.getVoices();
    const distinctVoices = new Set<SpeechSynthesisVoice>();
    var iters = 0;
    while (distinctVoices.size < count) {
        const randomIndex = Math.floor(Math.random() * voices.length);
        if (language && !voices[randomIndex].lang.includes(language)) {
            continue;
        }
        distinctVoices.add(voices[randomIndex]);
        iters++;
        if (iters > 30) {
            break;
        }
    }
    return Array.from(distinctVoices);
}

export function SpeechSynthesisVoicePicker(props : { onChange: (value: string) => void }) {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            let voices = synth.getVoices().filter((v) => v.lang.includes("en"));
            if (voices.length !== 0) {
                setVoices(voices);
            } else {
                synth.onvoiceschanged = () => {
                    voices = synth.getVoices().filter((v) => v.lang.includes("en"));
                    setVoices(voices);
                };
            }
        }
    }, []);


    useEffect(() => {
        if (currentVoice) {
            props.onChange(currentVoice.name);
        }
    }, [currentVoice])

    const handleVoicesChanged = (value: string) => {
        const voice = voices.find((v) => v.name === value);
        if (voice) {
            setCurrentVoice(voice);
        }
    }

    return (
        <Box>
            <RadioGroup onChange={handleVoicesChanged}>
                {
                    voices.map((voice) => <Radio value={voice.name}>{voice.name}</Radio>)
                }
            </RadioGroup>
        </Box>
    )
}

export interface ISpeechSynthesizerProps {
    text: string;
    voice: SpeechSynthesisVoice;
}

export function SpeechSynthesizerPanel(props: ISpeechSynthesizerProps) {
    // const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);

    const { text, voice } = props;

    const [currentText, setCurrentText] = useState<string>(text);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setCurrentText(event.target.value);

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(currentText);
        utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
    }

    return (
        <>
            <Box backgroundColor="white" padding={10} display="flex" flexDirection="column" gap="10px" borderRadius={10} margin={5} overflow={"hidden"}>
                <Heading size="2g">Speech Synthesizer</Heading>
                <InputGroup>
                    <Input placeholder="Type something to say" value={currentText} onChange={handleTextChange} />
                    <Button colorScheme="blue" onClick={handleSpeak}>Speak</Button>
                </InputGroup>
                <SpeechSynthesisVoicePicker onChange={(voice) => console.log("new voice", voice)} />
            </Box>
        </>
    )
}



export class SpeechSynthesizer {

    voice: SpeechSynthesisVoice;
    volume: number;
    rate: number;
    pitch: number;

    constructor(voice : SpeechSynthesisVoice, volume : number = 1, rate : number = 1, pitch : number = 1) {
        this.voice = voice;
        this.volume = volume;
        this.rate = rate;
        this.pitch = pitch;
    }

    speak(text: string) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.voice;
        window.speechSynthesis.speak(utterance);
    }

    stop() {
        window.speechSynthesis.cancel();
    }
}
