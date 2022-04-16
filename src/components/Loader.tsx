import React from "react";
import { HStack, Spinner, Heading } from "native-base";

const Loader = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Carregando" />
      <Heading color="primary.500" fontSize="md">
        Carregando
      </Heading>
    </HStack>
  );
};

export default Loader;
