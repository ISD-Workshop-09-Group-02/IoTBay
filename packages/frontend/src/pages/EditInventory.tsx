import { Box, Code, Container, Stack, Text } from "@chakra-ui/react";
import useMe from "../hooks/useMe";

export default function EditInventory() {
  const { data: me } = useMe();

  return (
    <Container maxW={"container.sm"}>
      <Stack spacing={2}>
        <Text fontSize="3xl" fontWeight="bold">
          Profile
        </Text>
        <Box py={2}>
          {me
            ? Object.entries(me).map(([key, value]) => (
                <Box key={key} py={1}>
                  <Text as="span" fontWeight="bold">
                    {key}:
                  </Text>{" "}
                  <Code>{JSON.stringify(value)}</Code>
                </Box>
              ))
            : null}
        </Box>
      </Stack>
    </Container>
  );
}
