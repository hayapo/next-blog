import React, {ReactNode} from "react";
import {
  Container,
  ChakraComponent
} from "@chakra-ui/react";

export const MainContent: ChakraComponent<"main", { children: ReactNode }> = ({
  children,
}) => {
  return (
    <Container maxW="container.lg">
      {children}
    </Container >
  )
}
