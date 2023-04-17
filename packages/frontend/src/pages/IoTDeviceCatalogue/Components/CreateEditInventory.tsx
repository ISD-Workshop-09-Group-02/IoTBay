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

import reactImage from "../../../assets/react.svg";
import { Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGetCategories } from "../../../hooks/useCategories";

import { useState } from "react";

interface IEditUpdateInventoryProps {
  createOrUpdate: "create" | "edit";
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  price: number;
  setPrice: (price: number) => void;
  stock: number;
  setStock: (stock: number) => void;
  category: string;
  setCategory: (category: string) => void;
  image: string;
  setImage: (image: string) => void;

  createProduct?: () => void;
  updateProduct?: () => void;
}

const EditUpdateInventory: React.FC<IEditUpdateInventoryProps> = (props) => {
  const getCategories = useGetCategories();

  const defaultPreviewImage: string = "https://via.placeholder.com/150";

  const [previewImage, setPreviewImage] = useState<string | undefined>(
    defaultPreviewImage
  );

  return (
    <Container maxW={"container.xl"}>
      <Stack spacing={4}>
        {/* Manage Inventory Header, Create, Delete */}
        <Box>
          <Heading>Create Product</Heading>
        </Box>

        <Box>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Manage Inventory</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {props.createOrUpdate === "create" ? (
                <BreadcrumbLink href="#">Create A Product</BreadcrumbLink>
              ) : (
                <BreadcrumbLink href="#">Edit A Product</BreadcrumbLink>
              )}
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
              <img
                src={previewImage}
                width="100%"
                height="100%"
                alt="Preview Image"
              />
            </Box>

            <Box width="100%">
              <Input
                placeholder="Product Name"
                size={"lg"}
                variant="filled"
                // leftIcon={<SearchIcon />}
                onChange={(e) => {
                  props.setName(e.target.value);
                }}
                value={props.name}
              />
              <Input
                placeholder="Product URL"
                size={"lg"}
                variant="filled"
                // leftIcon={<SearchIcon />}

                onChange={(e) => {
                  props.setImage(e.target.value);
                }}
                value={props.image}
              />

              <Box>
                <HStack spacing={2} align="center">
                  <Button
                    colorScheme="green"
                    size="lg"
                    leftIcon={<Icon>{reactImage}</Icon>}
                    onClick={() => {
                      setPreviewImage(props.image);
                    }}
                  >
                    Upload Image
                  </Button>

                  <Button
                    colorScheme="red"
                    variant={"outline"}
                    size="lg"
                    leftIcon={<Icon>{reactImage}</Icon>}
                    onClick={() => {
                      props.setImage("");
                      setPreviewImage(defaultPreviewImage);
                    }}
                  >
                    Clear
                  </Button>
                </HStack>
              </Box>

              <NumberInput
                placeholder="Stock"
                size={"lg"}
                variant="filled"
                // leftIcon={<SearchIcon />}

                onChange={(e) => {
                  props.setStock(parseInt(e) ? parseInt(e) : 0);
                }}
                value={props.stock}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              {/* Price */}
              <NumberInput
                placeholder="Price"
                size={"lg"}
                variant="filled"
                // leftIcon={<SearchIcon />}
                onChange={(e) => {
                  props.setPrice(parseInt(e) ? parseInt(e) : 0);
                }}
                value={props.price}
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
                onChange={(e) => {
                  props.setCategory(e.target.value);
                }}
                value={props.category}
              >
                {getCategories.data?.map((category) => {
                  return (
                    <option value={category.categoryId}>{category.name}</option>
                  );
                })}
              </Select>
            </Box>
          </Flex>

          <Box>
            <Textarea
              placeholder="Product Description"
              size={"lg"}
              variant="filled"
              // leftIcon={<SearchIcon />}

              onChange={(e) => {
                props.setDescription(e.target.value);
              }}
              value={props.description}
            />
          </Box>
        </Box>

        <Box>
          <HStack spacing={2} align="center" justify="flex-end">
            {props.createOrUpdate === "create" ? (
              <Button
                colorScheme="green"
                size="lg"
                leftIcon={<Icon>{reactImage}</Icon>}
                onClick={props.createProduct}
              >
                Create Product
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                size="lg"
                leftIcon={<Icon>{reactImage}</Icon>}
                onClick={props.updateProduct}
              >
                Update Product
              </Button>
            )}
            <Button
              colorScheme="red"
              variant={"outline"}
              size="lg"
              leftIcon={<Icon>{reactImage}</Icon>}
              as={Link}
              to="/staff/inventory/manage"
            >
              Cancel
            </Button>
          </HStack>
        </Box>
      </Stack>
    </Container>
  );
};

export default EditUpdateInventory;
