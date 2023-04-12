import {
  Box,
  Code,
  Container,
  Stack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  InputGroup,
  Table,
} from "@chakra-ui/react";

import useMe from "../hooks/useMe";

import reactImage from "../assets/react.svg";
import { Icon } from "@chakra-ui/react";

export default function ManageInventory() {
  const { data: me } = useMe();

  return (
    <Container maxW={"container.sm"}>
      <Stack spacing={2}>
        <Box py={2}>
          {/* <>Create Product</H1> */}
          <Heading>Manage Inventory</Heading>
          <Button
            colorScheme="green"
            size="lg"
            leftIcon={<Icon>{reactImage}</Icon>}
          >
            Create Product
          </Button>
          <Button
            colorScheme="red"
            size="lg"
            leftIcon={<Icon>{reactImage}</Icon>}
          >
            Delete Product
          </Button>

          <InputGroup
            size="lg"
            placeholder="Search for product"
            variant="filled"
            width={500}
            // leftIcon={<SearchIcon />}
          />

          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Manage Inventory</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Create A Product</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Text fontSize="2xl">XX Products Found</Text>

          {/* Table */}
          <Table></Table>
        </Box>
      </Stack>
    </Container>
  );
}
