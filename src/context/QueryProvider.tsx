"use client";
import { QueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

const queryClient = new QueryClient();

export const MyQueryClient = createContext({
    queryClient
});

export default function MyQueryClientProvider ({ children }: { children: React.ReactNode }) {

    return (
        <MyQueryClient.Provider value={{ queryClient: queryClient }}>
            {children}
        </MyQueryClient.Provider>
    )
}