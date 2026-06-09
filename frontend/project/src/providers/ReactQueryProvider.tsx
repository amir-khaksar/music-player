import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            gcTime: 1000 * 60 * 2,
        },
        mutations: {
            retry: 0,
            gcTime: 1000 * 60 * 2,
        },
    },
});

function ReactQueryProvider({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQueryProvider;
