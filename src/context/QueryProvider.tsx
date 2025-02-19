"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext } from "react";

const queryClient = new QueryClient();

export const MyQueryClient = createContext({
    queryClient
});

export default function MyQueryClientProvider ({ children }: { children: React.ReactNode }) {

    return (
        <QueryClientProvider client={ queryClient }>
            {children}
        </QueryClientProvider>
    )
}