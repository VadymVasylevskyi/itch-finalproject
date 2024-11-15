import { useEffect, useRef, useState } from "react";
import { emojis } from "../utils/emojis";
import { Box, Button, Grid, Image } from "@chakra-ui/react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box position="relative" ref={pickerRef}>
  <Button
    onClick={() => setIsOpen(!isOpen)}
    p={2}
    _hover={{ bg: "gray.100" }}
    borderRadius="full"
    bg="transparent"
  >
    <Image src="/icons/emoji.svg" alt="emoji" boxSize="20px" />
  </Button>

  {isOpen && (
    <Box
      position="absolute"
    //   bottom="full"
      left={0}
      w="full"
      mb={2}
      bg="transparent"
      p={2}
      zIndex={10}
    >
      <Grid templateColumns="repeat(7, 1fr)" gap={2} maxH="220px" overflowY="auto" minW={"200px"}>
        {emojis.map((emoji, index) => (
          <Button
            key={index}
            onClick={() => {
              onEmojiSelect(emoji.char);
              setIsOpen(false);
            }}
            variant="ghost"
            fontSize="lg"
            _hover={{ bg: "gray.100" }}
            p={1}
            borderRadius="md"
            title={emoji.name}
          >
            {emoji.char}
          </Button>
        ))}
      </Grid>
    </Box>
  )}
</Box>
  );
}