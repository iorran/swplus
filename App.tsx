import React from "react";
import Home from "./src/pages/Home";
import { NativeBaseProvider, StatusBar, Box, Container } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="primary.500" />
      <Box safeAreaTop bg="primary.500" />
      <Box flex="1" borderWidth="1" borderStyle="dashed">
        <Home />
      </Box>
    </NativeBaseProvider>
  );
}
