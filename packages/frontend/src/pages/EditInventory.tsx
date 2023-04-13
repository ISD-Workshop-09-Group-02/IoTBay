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
  Flex,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";

import useMe from "../hooks/useMe";

import reactImage from "../assets/react.svg";
import { Icon } from "@chakra-ui/react";
import React from "react";

export default function EditInventory() {
  const { data: me } = useMe();

  return (
    <Container maxW={"container.xl"}>
      <Stack spacing={4}>
        {/* Manage Inventory Header, Create, Delete */}
        <Box>
          <Heading>Edit Product</Heading>
        </Box>

        <Box>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Manage Inventory</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Edit A Product</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>

        {/* Product Info */}
        <Box bg="gray.800" padding={4}>
          <Flex
            direction="row"
            alignItems={"start"}
            justifyContent={"space-between"}
            w="100%"
            p={4}
          >
            {/* Preview Image */}
            <Box width="100%">
              <img src={reactImage} width="100%" height="100%" alt="react" />
            </Box>

            <Box width="100%">
              <Input
                placeholder="Product Name"
                size={"lg"}
                variant="filled"
                // leftIcon={<SearchIcon />}
              />
              <Input
                placeholder="Product URL"
                size={"lg"}
                variant="filled"
                // leftIcon={<SearchIcon />}
              />

              <Box>
                <HStack spacing={2} align="center">
                  <Button
                    colorScheme="green"
                    size="lg"
                    leftIcon={<Icon>{reactImage}</Icon>}
                  >
                    Upload Image
                  </Button>

                  <Button
                    colorScheme="red"
                    variant={"outline"}
                    size="lg"
                    leftIcon={<Icon>{reactImage}</Icon>}
                  >
                    Clear{" "}
                  </Button>
                </HStack>
              </Box>

              <NumberInput
                placeholder="Stock"
                size={"lg"}
                variant="filled"
                // leftIcon={<SearchIcon />}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Select
                placeholder="Filter by category"
                size="lg"
                // width={}
                variant="filled"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
          </Flex>

          <Box>
            <Textarea
              placeholder="Product Description"
              size={"lg"}
              variant="filled"
              // leftIcon={<SearchIcon />}
            />
          </Box>
        </Box>

        <Box>
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
              variant={"outline"}
              size="lg"
              leftIcon={<Icon>{reactImage}</Icon>}
            >
              Cancel
            </Button>
          </HStack>
        </Box>
      </Stack>
    </Container>
  );
}
