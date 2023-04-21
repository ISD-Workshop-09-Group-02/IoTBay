import {
  Box,
  Container,
  Stack,
  Text,
  Heading,
  Button,
  Table,
  HStack,
  Input,
  Thead,
  Tr,
  Th,
  Tbody,
  TableContainer,
  useColorMode,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useDeleteProducts, useGetProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";
import { useGetCategories } from "../hooks/useCategories";
import { AddIcon, CloseIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";

import { Select } from "chakra-react-select";
import BreadCrumbRoute from "../components/BreadCrumbRoute";
import TableRow from "../features/IoTDeviceCatalogue/TableRow";
import PageTitle from "../components/PageTitle";
import SearchAndFilterNavbar from "../features/IoTDeviceCatalogue/SearchAndFilterNavbar";

export default function ManageInventory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);

  interface IFilter {
    searchFilter: string;
    categoryFilter: string[];
  }

  const [finalFilter, setFinalFilter] = React.useState<IFilter>({
    searchFilter: "",
    categoryFilter: [],
  });

  const getProducts = useGetProducts({
    searchFilter: finalFilter.searchFilter,
    categoryFilter: finalFilter.categoryFilter,
  });

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const deleteProducts = useDeleteProducts();

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

        <PageTitle title="Manage Inventory">
          <Button
            colorScheme="green"
            leftIcon={<AddIcon />}
            as={Link}
            to="/staff/inventory/create"
          >
            Create Product
          </Button>
          <Button
            colorScheme="red"
            // leftIcon={<MinusIcon />}
            leftIcon={<DeleteIcon />}
            onClick={() => {
              deleteProducts.mutate(selectedItems);
            }}
          >
            Delete Products
          </Button>
        </PageTitle>

        <BreadCrumbRoute
          parameters={[
            { paths: "Manage Inventory", links: "/staff/inventory/manage" },
          ]}
        />

        {/* Search & Filter */}
        <SearchAndFilterNavbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          setFinalFilter={setFinalFilter}
          getCategories={getCategories}
          getProducts={getProducts}
        />

        {/* Table */}
        <Box
          background={
            useColorMode().colorMode === "light" ? "gray.100" : "gray.900"
          }
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
