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

import useMe from "../../hooks/useMe";

import reactImage from "../../assets/react.svg";
import { Icon } from "@chakra-ui/react";
import React from "react";
import CreateEditInventory from "./Components/CreateEditInventory";

export default function EditInventory() {
  const { data: me } = useMe();

  return <CreateEditInventory createOrUpdate="edit" />;
}
