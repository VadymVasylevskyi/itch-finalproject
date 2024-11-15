import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
	const toast = useToast();

	// useCallback is used to prevent infinite loop, by  caching the function
    interface ToastOptions {
        title: string;
        description: string;
        status: "info" | "warning" | "success" | "error";
    }

    const showToast = useCallback(
        ({ title, description, status }: ToastOptions) => {
            toast({
                title: title,
                description: description,
                status: status,
                duration: 3000,
                isClosable: true,
            });
        },
        [toast]
    );

	return showToast;
};

export default useShowToast;
