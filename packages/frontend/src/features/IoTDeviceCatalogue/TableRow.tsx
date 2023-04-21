import React from "react";

import {
  Tr,
  Text,
  Box,
  Stack,
  Button,
  Td,
  Tag,
  Badge,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { useDeleteProduct } from "../../hooks/useProducts";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { convertToDDMMYYYY } from "../../utils/dateFormatter";
import { convertToCurrency } from "../../utils/currencyFormatter";

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
                  <Tag variant="solid" colorScheme="purple" key={index}>
                    {element}
                  </Tag>
                );
              })} */}
          <Tag variant="solid" colorScheme="purple" key={props.category}>
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
            leftIcon={<EditIcon />}
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
            leftIcon={<DeleteIcon />}
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

export default TableRow;
