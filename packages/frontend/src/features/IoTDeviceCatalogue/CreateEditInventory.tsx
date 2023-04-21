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
  HStack,
  Select,
  Input,
  Flex,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Textarea,
  useColorMode,
  FormErrorMessage,
  FormControl,
  FormLabel,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useGetCategories } from "../../hooks/useCategories";

import { useEffect, useState } from "react";
import {
  AddIcon,
  CloseIcon,
  DownloadIcon,
  InfoIcon,
  MinusIcon,
} from "@chakra-ui/icons";

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
    props.image ? props.image : defaultPreviewImage
  );

  useEffect(() => {
    if (props.image) {
      setPreviewImage(props.image);
    }
  }, [props.image]);

  interface IFormErrorMessage {
    name: IErrorMessage;
    description: IErrorMessage;
    price: IErrorMessage;
    stock: IErrorMessage;
    category: IErrorMessage;
    image: IErrorMessage;
  }

  interface IErrorMessage {
    isError: boolean;
    message: string;
  }

  const initialFormErrorMessage: IFormErrorMessage = {
    name: { isError: false, message: "" },
    description: { isError: false, message: "" },
    price: { isError: false, message: "" },
    stock: { isError: false, message: "" },
    category: { isError: false, message: "" },
    image: { isError: false, message: "" },
  };

  const [formErrorMessage, setFormErrorMessage] = useState<IFormErrorMessage>(
    initialFormErrorMessage
  );

  const validateForm = () => {
    let newFormErrorMessage: IFormErrorMessage = initialFormErrorMessage;

    if (props.name === "") {
      newFormErrorMessage.name = {
        isError: true,
        message: "Name is required",
      };
    }

    if (props.description === "") {
      newFormErrorMessage.description = {
        isError: true,
        message: "Description is required",
      };
    }

    if (props.price === 0) {
      newFormErrorMessage.price = {
        isError: true,
        message: "Price is required",
      };
    }

    if (props.stock === 0) {
      newFormErrorMessage.stock = {
        isError: true,
        message: "Stock is required",
      };
    }

    if (props.category === "") {
      newFormErrorMessage.category = {
        isError: true,
        message: "Category is required",
      };
    }

    if (props.image === "") {
      newFormErrorMessage.image = {
        isError: true,
        message: "Image is required",
      };
    }

    setFormErrorMessage(newFormErrorMessage);
  };

  const isFormValid = () => {
    if (
      formErrorMessage.name.isError ||
      formErrorMessage.description.isError ||
      formErrorMessage.price.isError ||
      formErrorMessage.stock.isError ||
      formErrorMessage.category.isError ||
      formErrorMessage.image.isError
    ) {
      return false;
    }

    return true;
  };

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
        <Box
          background={
            useColorMode().colorMode === "light" ? "gray.100" : "gray.900"
          }
          padding={4}
        >
          <Flex
            direction="row"
            alignItems={"start"}
            justifyContent={"space-between"}
            w="100%"
            m={4}
          >
            {/* Preview Image */}
            <Box width="100%" margin={2}>
              <img
                src={previewImage}
                width="100%"
                height="100%"
                alt="Preview Image"
              />
            </Box>

            <Box width="100%" margin={2}>
              {/* Notification Message */}
              {!isFormValid() && (
                <Box
                  borderWidth="2px"
                  borderRadius="lg"
                  overflow="hidden"
                  borderColor={"red.400"}
                  borderStyle={"solid"}
                  padding={4}
                >
                  <Stack spacing={2}>
                    {/* Header with icon */}
                    <Flex
                      direction="row"
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                    >
                      <InfoIcon
                        // color={"red.400"}
                        marginRight={4}
                        height="25px"
                        width="25px"
                      />
                      <Heading as="h4" size="lg">
                        Invalid Form
                      </Heading>
                    </Flex>

                    <Heading as="h6" size="sm">
                      Please fix the following errors:
                    </Heading>

                    <Box>
                      <UnorderedList>
                        {Object.keys(formErrorMessage).map((key) => {
                          if (formErrorMessage[key].isError) {
                            return (
                              <ListItem key={key}>
                                <Text>{formErrorMessage[key].message}</Text>
                              </ListItem>
                            );
                          }
                        })}
                      </UnorderedList>
                    </Box>
                  </Stack>
                </Box>
              )}

              <Stack spacing={4}>
                {/* Name */}
                <FormControl isInvalid={formErrorMessage.name.isError}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    variant="filled"
                    onChange={(e) => {
                      let newFormErrorMessage: IFormErrorMessage = {
                        ...formErrorMessage,
                        name: {
                          isError: false,
                          message: "",
                        },
                      };

                      setFormErrorMessage(newFormErrorMessage);

                      props.setName(e.target.value);
                    }}
                    value={props.name}
                    isInvalid={formErrorMessage.name.isError}
                  />
                  <FormErrorMessage>Name is required.</FormErrorMessage>
                </FormControl>

                {/* Image */}
                <FormControl isInvalid={formErrorMessage.image.isError}>
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    variant="filled"
                    onChange={(e) => {
                      let newFormErrorMessage: IFormErrorMessage = {
                        ...formErrorMessage,
                        image: {
                          isError: false,
                          message: "",
                        },
                      };

                      setFormErrorMessage(newFormErrorMessage);

                      props.setImage(e.target.value);
                    }}
                    value={props.image}
                  />
                  <FormErrorMessage>Image is required.</FormErrorMessage>
                </FormControl>

                <Box>
                  <HStack spacing={2} align="center">
                    <Button
                      colorScheme="green"
                      leftIcon={<DownloadIcon />}
                      onClick={() => {
                        setPreviewImage(props.image);
                      }}
                    >
                      Upload Image
                    </Button>

                    <Button
                      colorScheme="red"
                      variant={"outline"}
                      leftIcon={<MinusIcon />}
                      onClick={() => {
                        props.setImage("");
                        setPreviewImage(defaultPreviewImage);
                      }}
                    >
                      Clear
                    </Button>
                  </HStack>
                </Box>

                {/* Stock */}
                <FormControl isInvalid={formErrorMessage.stock.isError}>
                  <FormLabel>Stock</FormLabel>
                  <NumberInput
                    width="100%"
                    variant="filled"
                    onChange={(e) => {
                      let newFormErrorMessage: IFormErrorMessage = {
                        ...formErrorMessage,
                        stock: {
                          isError: false,
                          message: "",
                        },
                      };

                      setFormErrorMessage(newFormErrorMessage);

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

                  <FormErrorMessage>Stock is required.</FormErrorMessage>
                </FormControl>

                {/* Price */}
                <FormControl isInvalid={formErrorMessage.price.isError}>
                  <FormLabel>Price</FormLabel>
                  <NumberInput
                    width="100%"
                    variant="filled"
                    onChange={(e) => {
                      let newFormErrorMessage: IFormErrorMessage = {
                        ...formErrorMessage,
                        price: {
                          isError: false,
                          message: "",
                        },
                      };

                      setFormErrorMessage(newFormErrorMessage);

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

                  <FormErrorMessage>Price is required.</FormErrorMessage>
                </FormControl>

                {/* Category */}
                <FormControl isInvalid={formErrorMessage.category.isError}>
                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder="Filter by category"
                    variant="filled"
                    onChange={(e) => {
                      let newFormErrorMessage: IFormErrorMessage = {
                        ...formErrorMessage,
                        category: {
                          isError: false,
                          message: "",
                        },
                      };

                      setFormErrorMessage(newFormErrorMessage);

                      props.setCategory(e.target.value);
                    }}
                    value={props.category}
                  >
                    {getCategories.data?.map((category) => {
                      return (
                        <option value={category.name}>{category.name}</option>
                      );
                    })}
                  </Select>
                  <FormErrorMessage>Category is required.</FormErrorMessage>
                </FormControl>
              </Stack>
            </Box>
          </Flex>

          {/* Description */}
          <Box>
            <FormControl isInvalid={formErrorMessage.description.isError}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Product Description"
                variant="filled"
                onChange={(e) => {
                  let newFormErrorMessage: IFormErrorMessage = {
                    ...formErrorMessage,
                    description: {
                      isError: false,
                      message: "",
                    },
                  };

                  setFormErrorMessage(newFormErrorMessage);

                  props.setDescription(e.target.value);
                }}
                value={props.description}
              />
              <FormErrorMessage>Description is required.</FormErrorMessage>
            </FormControl>
          </Box>
        </Box>

        <Box>
          <HStack spacing={2} align="center" justify="flex-end">
            {props.createOrUpdate === "create" ? (
              <Button
                colorScheme="green"
                size="lg"
                leftIcon={<AddIcon />}
                onClick={(e) => {
                  validateForm();
                  props.createProduct && props.createProduct();
                }}
              >
                Create Product
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                size="lg"
                leftIcon={<AddIcon />}
                onClick={(e) => {
                  validateForm();
                  props.updateProduct && props.updateProduct();
                }}
              >
                Update Product
              </Button>
            )}
            <Button
              colorScheme="red"
              variant={"outline"}
              size="lg"
              leftIcon={<CloseIcon />}
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
