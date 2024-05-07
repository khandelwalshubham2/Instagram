import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const quaryClient = new QueryClient();

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={quaryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
