import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const PageTitle: React.FC<{
  title: string;
  showSideActions?: boolean;
  children?: React.ReactNode;
}> = ({ title, showSideActions = true, children }) => {
  return (
    <Box>
      <HStack spacing={2} align="center" justify="space-between">
        <Heading>{title}</Heading>
        {showSideActions && (
          <HStack spacing={2} align="center" justify="flex-end">
            {children}
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

export default PageTitle;
