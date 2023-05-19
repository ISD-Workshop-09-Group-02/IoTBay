import { Box, Code, Container, Stack, Text, Button, useToast, Td } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useMyCustomer, useDeleteMyCustomer } from "../../../hooks/useCustomer";
import { isTRPCClientError } from "../../../utils/trpc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Profile() {
  const { data: me } = useMyCustomer();
  const toast = useToast();
  const deleteMyCustomer = useDeleteMyCustomer();
  const navigate = useNavigate();

  return (
    <Container maxW={"container.sm"}>
        <Text fontSize="3xl" fontWeight="bold">
          My Detail 
        </Text>
        <Box py={2}>
          {me ? Object.entries(me).map(([key, value]) => (
            <Box key={key} py={1}>
              <Text as="span" fontWeight="bold">
                {key}:
              </Text>{" "}
              <Code>{JSON.stringify(value)}</Code>
            </Box>
          )): null}
        </Box>
        <Box>
        <Button
            colorScheme="yellow"
            size="sm"
            width="100%"
            leftIcon={<EditIcon />}
            as={Link}
            to={{
              pathname: `/profile/myDetail/edit`,
            }}
          >
            Edit
          </Button>
        </Box>
        <Box>
        <Button
            colorScheme="red"
            size="sm"
            width="100%"
            leftIcon={<DeleteIcon />}
            onClick={async () => {
              try {
                deleteMyCustomer.mutateAsync();

                toast({
                  title: "User Deleted",
                  description: "User has been deleted.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                navigate("/login");
              } catch (error) {
                if (isTRPCClientError(error)) {
                  toast({
                    title: "User deletion failed",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                  });
                } else {
                  toast({
                    title: "User deletion failed",
                    description: "Unknown error",
                    status: "error",
                    duration: 5000,
                  });
                }
              }
            }}
          >
            Delete
          </Button>
        </Box>
    </Container>
  );
}