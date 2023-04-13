import {
  Box,
  Container,
  Stack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  Table,
  HStack,
  Select,
  Input,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  Badge,
  TableContainer,
} from "@chakra-ui/react";

import useMe from "../hooks/useMe";

import reactImage from "../assets/react.svg";
import { Icon } from "@chakra-ui/react";
import React from "react";

export default function ManageInventory() {
  const { data: me } = useMe();

  return (
    <Container maxW={"container.xl"}>
      <Stack spacing={4}>
        {/* Manage Inventory Header, Create, Delete */}
        <Box>
          <HStack spacing={2} align="center" justify="space-between">
            <Heading>Manage Inventory</Heading>
            <HStack spacing={2} align="center" justify="flex-end">
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
            </HStack>
          </HStack>
        </Box>

        <Box>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Manage Inventory</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>

        {/* Search & Filter */}
        <Box>
          <HStack spacing={2} align="center" justify="space-between">
            <Input
              size="lg"
              placeholder="Search for product"
              variant="filled"
              width="60%"
              // leftIcon={<SearchIcon />}
            />
            <Select
              placeholder="Filter by category"
              size="lg"
              // width={}
              width="30%"
              variant="filled"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Button
              colorScheme="green"
              size="lg"
              leftIcon={<Icon>{reactImage}</Icon>}
              width="20%"
            >
              Search
            </Button>
          </HStack>
        </Box>

        <Box>
          <Text fontSize="2xl">XX Products Found</Text>
        </Box>

        {/* Table */}
        <Box
          background={"#01121f"}
          // padding
          padding={4}
        >
          <TableContainer>
            <Table variant={"simple"}>
              <Thead>
                <Tr>
                  <Th textAlign="center">Image</Th>
                  <Th textAlign="center">Name</Th>
                  <Th textAlign="center">Stock</Th>
                  <Th textAlign="center">Categories</Th>
                  <Th textAlign="center">Last Updated</Th>
                  <Th textAlign="center">Price</Th>
                  <Th textAlign="center">Operations</Th>
                </Tr>
              </Thead>

              <Tbody>
                {[1, 2, 3, 4, 5].map((element, index) => {
                  return <TableRow key={index} />;
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Container>
  );
}

export interface ICategories {
  name: string;
  color: string;
  url: string;
}

const TableRow: React.FC<{
  image?: string;
  name?: string;
  description?: string;
  stock?: number;
  categories?: ICategories[];
  lastUpdated?: Date;
  price?: string;
}> = ({ ...props }) => {
  return (
    <Tr>
      <Td>
        <img src="https://via.placeholder.com/150" alt="Product Image" />
      </Td>
      <Td>
        <Text fontSize="2xl">Product Name</Text>
        <Text fontSize="sm">Product Description</Text>
      </Td>
      <Td>
        <Box textAlign="center">
          <Text fontSize="2xl">XX</Text>
          <Text fontSize="sm">In Stock</Text>
        </Box>
      </Td>
      <Td>
        {/* Tags */}
        <HStack spacing={2} align="center" justify="flex-start">
          <Tag size="lg" variant="solid" colorScheme="purple">
            Iot Device
          </Tag>
          <Tag size="lg" variant="solid" colorScheme="purple">
            Iot Device
          </Tag>
        </HStack>
      </Td>
      <Td>
        <Box textAlign="center">
          <Text fontSize="2xl">01/01/2023</Text>
          <Badge colorScheme="red">LAST UPDATED</Badge>
        </Box>
      </Td>
      <Td>
        <Box textAlign="center">
          <Text fontSize="2xl">$XX.XX</Text>
        </Box>
      </Td>
      <Td>
        <Stack spacing={2}>
          <Button colorScheme="yellow" size="sm" width="100%">
            Edit
          </Button>
          <Button colorScheme="red" size="sm" width="100%">
            Delete
          </Button>
        </Stack>
      </Td>
    </Tr>
  );
};
