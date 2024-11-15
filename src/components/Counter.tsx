import { Text } from "@chakra-ui/react";

interface CounterProps {
  currentLength: number;
  maxLength: number;
  
}

export default function Counter({
  currentLength,
  maxLength,
  
}: CounterProps) {
  return (
    <Text position={"absolute"} color={"gray.500"} fontSize={"sm"} bottom={"3"} right={"4"}>
      {currentLength}/{maxLength}
    </Text>
  );
}
