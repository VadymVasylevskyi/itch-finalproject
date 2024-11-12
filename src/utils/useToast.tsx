import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
    const toast = useToast();

    // useCallback используется, чтобы избежать зацикливания
    interface ToastOptions {
        title: string;
        description: string;
        status: "info" | "warning" | "success" | "error";
    }

    const showToast = useCallback(
        ({ title, description, status }: ToastOptions) => {
            toast({
                title,
                description,
                status,
                duration: 3000,
                isClosable: true,
            });
        },
        [toast]
    );

    return showToast;
};

export default useShowToast;
