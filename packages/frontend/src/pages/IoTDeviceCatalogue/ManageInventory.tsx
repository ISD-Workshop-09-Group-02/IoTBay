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
  Checkbox,
} from "@chakra-ui/react";

import reactImage from "../../assets/react.svg";
import { Icon } from "@chakra-ui/react";
import React from "react";
import {
  useDeleteProduct,
  useDeleteProducts,
  useGetProducts,
} from "../../hooks/useProducts";
import { Link } from "react-router-dom";
import { useGetCategories } from "../../hooks/useCategories";

export default function ManageInventory() {
  const getProducts = useGetProducts();

  const deleteProducts = useDeleteProducts();
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  // Get categories
  const getCategories = useGetCategories();

  if (getProducts.isLoading || getCategories.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (getProducts.isError || getCategories.isError) {
    return (
      <Text>
        Error: {getProducts?.error?.message || getCategories?.error?.message}
      </Text>
    );
  }

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
                as={Link}
                to="/staff/inventory/create"
              >
                Create Product
              </Button>
              <Button
                colorScheme="red"
                size="lg"
                leftIcon={<Icon>{reactImage}</Icon>}
                onClick={() => {
                  deleteProducts.mutate(selectedItems);
                }}
              >
                Delete Products
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
              {getCategories.data &&
                getCategories.data.map((category) => (
                  <option value={category.categoryId}>{category.name}</option>
                ))}
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

        {/* Number of Products Found */}
        {getProducts.data.length !== 0 && (
          <Box>
            <Text fontSize="2xl">
              {JSON.stringify(getProducts.data.length)} Products Found
            </Text>
          </Box>
        )}

        {/* Table */}
        <Box
          background={"gray.800"}
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
                  <Th textAlign="center">Last Updated (DD-MM-YYYY)</Th>
                  <Th textAlign="center">Price ($)</Th>
                  <Th textAlign="center">Operations</Th>
                </Tr>
              </Thead>

              <Tbody>
                {getProducts.data.length > 0 &&
                  getProducts.data.map((element, index) => {
                    return (
                      <TableRow
                        key={element.productId}
                        productId={element.productId}
                        name={element.name}
                        price={element.price}
                        stock={element.stock}
                        description={element.description}
                        image={element.image}
                        category={element.category}
                        categoryId={element.categoryId}
                        lastUpdated={
                          element.lastUpdated
                            ? new Date(element.lastUpdated)
                            : null
                        }
                        isSelect={selectedItems.includes(element.productId)}
                        setSelectedItems={setSelectedItems}
                      />
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Container>
  );
}

const TableRow: React.FC<{
  productId: string;
  image?: string;
  name?: string;
  description?: string;
  stock?: number;
  category?: string;
  categoryId?: string;
  lastUpdated?: Date | null;
  price?: number;
  isSelect?: boolean;
  setSelectedItems?: React.Dispatch<React.SetStateAction<string[]>>;
}> = (props) => {
  const deleteProduct = useDeleteProduct();

  function convertToDDMMYYYY(lastUpdated: Date): string {
    if (!lastUpdated) return "N/A";

    return lastUpdated.toLocaleDateString("en-GB", {
      // you can use undefined as first argument
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  function convertToCurrency(price: number): string {
    if (!price) return "N/A";

    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  return (
    <Tr>
      <Td>
        <HStack spacing={4} align="center" justify="center">
          <Checkbox
            isChecked={props.isSelect}
            onChange={(e) => {
              if (!props.setSelectedItems) return;

              if (e.target.checked) {
                props.setSelectedItems((prev) => [...prev, props.productId]);
              } else {
                props.setSelectedItems((prev) =>
                  prev.filter((element) => element !== props.productId)
                );
              }
            }}
          ></Checkbox>
          {/* Image */}
          {props.image && (
            <img src={props.image} alt="Product Image" width="150px" />
          )}
        </HStack>
      </Td>
      <Td>
        <Text fontSize="2xl" paddingBottom={2}>
          {props.name}
        </Text>
        <Text fontSize="sm">{props.description}</Text>
      </Td>
      <Td>
        <Box textAlign="center">
          <Text fontSize="2xl" paddingBottom={2}>
            {props.stock ? props.stock : 0}
          </Text>
          <Text fontSize="sm">In Stock</Text>
        </Box>
      </Td>
      <Td>
        {/* Tags */}
        <HStack spacing={2} align="center" justify="flex-start">
          {/* {props.category &&
            props.category.map((element, index) => {
              return (
                <Tag size="lg" variant="solid" colorScheme="purple" key={index}>
                  {element}
                </Tag>
              );
            })} */}
          <Tag
            size="lg"
            variant="solid"
            colorScheme="purple"
            key={props.category}
          >
            {props.category}
          </Tag>
        </HStack>
      </Td>
      <Td>
        <Box textAlign="center">
          <Text fontSize="2xl" paddingBottom={2}>
            {props.lastUpdated ? convertToDDMMYYYY(props.lastUpdated) : "N/A"}
          </Text>
          <Badge colorScheme="green">LAST UPDATED</Badge>
        </Box>
      </Td>
      <Td>
        <Box textAlign="center">
          <Text fontSize="2xl">
            {props.price ? convertToCurrency(props.price) : "N/A"}
          </Text>
        </Box>
      </Td>
      <Td>
        <Stack spacing={2}>
          <Button
            colorScheme="yellow"
            size="sm"
            width="100%"
            as={Link}
            to={{
              pathname: `/staff/inventory/edit/${props.productId}`,
            }}
          >
            Edit
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            width="100%"
            onClick={() => {
              deleteProduct.mutate(props.productId);
            }}
          >
            Delete
          </Button>
        </Stack>
      </Td>
    </Tr>
  );
};
