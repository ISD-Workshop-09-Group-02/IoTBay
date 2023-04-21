import { Container, Stack, Text, Button, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDeleteProducts, useGetProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";
import { useGetCategories } from "../hooks/useCategories";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import BreadCrumbRoute from "../components/BreadCrumbRoute";
import PageTitle from "../components/PageTitle";
import SearchAndFilterNavbar from "../features/IoTDeviceCatalogue/SearchAndFilterNavbar";
import ProductTable from "../features/IoTDeviceCatalogue/ProductTable";

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
        <ProductTable
          getProducts={getProducts}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          isLightMode={useColorMode().colorMode === "light"}
        />
      </Stack>
    </Container>
  );
}
