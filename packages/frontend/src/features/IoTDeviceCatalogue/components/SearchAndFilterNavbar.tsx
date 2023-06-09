import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React from "react";
import { RouterOutput } from "backend/src";

interface IProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  category: string[];
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
  setFinalFilter: React.Dispatch<
    React.SetStateAction<{
      searchFilter: string;
      categoryFilter: string[];
    }>
  >;

  getCategories: {
    isLoading: boolean;
    data: RouterOutput["categories"]["categories"];
  };

  getProducts: {
    isLoading: boolean;
    data: RouterOutput["products"]["products"];
  };
}

const SearchAndFilterNavbar: React.FC<IProps> = ({
  search,
  setSearch,
  category,
  setCategory,
  setFinalFilter,
  getCategories,
  getProducts,
}) => {
  return (
    <Box>
      <HStack spacing={2} align="center" justify="space-between">
        <InputGroup width="60%">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            placeholder="Search for product"
            variant="filled"
            // leftIcon={<SearchIcon />}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </InputGroup>
        <Select
          isMulti
          options={getCategories.data.map((element) => {
            return {
              label: element.name,
              value: element.name,
            };
          })}
          placeholder="Filter by category"
          closeMenuOnSelect={false}
          onChange={(e) => {
            setCategory(e.map((element) => element.value));
          }}
          value={category.map((element) => {
            return {
              label: element,
              value: element,
            };
          })}
        />
        <Button
          colorScheme="green"
          leftIcon={<SearchIcon />}
          onClick={() => {
            setFinalFilter({
              searchFilter: search,
              categoryFilter: category,
            });
          }}
        >
          Search
        </Button>
        <Button
          colorScheme="yellow"
          leftIcon={<CloseIcon />}
          onClick={() => {
            setSearch("");
            setCategory([]);
            setFinalFilter({
              searchFilter: "",
              categoryFilter: [],
            });
          }}
        >
          Clear
        </Button>
      </HStack>

      {getProducts.data && (
        <Box style={{ marginTop: "1rem" }}>
          <Text fontSize="2xl">
            {JSON.stringify(getProducts.data.length)} Products Found
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SearchAndFilterNavbar;
