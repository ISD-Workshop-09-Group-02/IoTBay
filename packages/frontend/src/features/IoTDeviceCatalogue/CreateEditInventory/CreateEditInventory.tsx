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
import { useGetCategories } from "../../../hooks/useCategories";

import { useEffect, useState } from "react";
import {
  AddIcon,
  CloseIcon,
  DownloadIcon,
  InfoIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import BreadCrumbRoute from "../../../components/BreadCrumbRoute";
import PageTitle from "../../../components/PageTitle";
import { useForm } from "react-hook-form";
import CreateEditCancelButtons from "./CreateEditCancelButtons";
import FormErrorNotification from "../../../components/Form/FormErrorNotification";
import { ProductsSchema } from "../../../api/generated";

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

  createProduct?: (data: ProductsSchema) => void;
  updateProduct?: (data: ProductsSchema) => void;

  editId?: string;
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

  const {
    handleSubmit, // function to invoke when the form is submitted
    register, // register the input into the hook by invoking the "register" function
    formState: { errors, isSubmitting }, // errors object contains all errors
  } = useForm();

  const onSubmit = (data: any) => {
    // alert(JSON.stringify(errors));
    // alert(JSON.stringify(data));

    props.createProduct && props.createProduct(data);
    props.updateProduct && props.updateProduct(data);
  };

  return (
    <Container maxW={"container.xl"}>
      <Stack spacing={4}>
        {/* Manage Inventory Header, Create, Delete */}
        <PageTitle
          title={
            props.createOrUpdate === "create"
              ? "Create Product"
              : "Edit Product"
          }
        />

        {/* Breadcrumb */}
        <BreadCrumbRoute
          parameters={[
            { paths: "Manage Inventory", links: "/staff/inventory/manage" },
            {
              paths:
                props.createOrUpdate === "create"
                  ? "Create Product"
                  : "Edit Product",
              links:
                props.createOrUpdate === "create"
                  ? "/staff/inventory/create"
                  : `/staff/inventory/edit/${props.editId}`,
            },
          ]}
        />

        {/* Product Info */}
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <FormErrorNotification errors={errors} />
                {/* In other file */}

                <Stack spacing={4}>
                  {/* Name */}
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      variant="filled"
                      id="name"
                      {...register("name", {
                        required: "This is required",
                        maxLength: {
                          value: 20,
                          message: "Max length exceeded",
                        },
                      })}
                      defaultValue={props.name}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Image */}
                  <FormControl isInvalid={errors.image}>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      variant="filled"
                      id="image"
                      {...register("image", {
                        required: "This is required",
                        maxLength: {
                          value: 20,
                          message: "Max length exceeded",
                        },
                      })}
                      defaultValue={props.image}
                    />
                    <FormErrorMessage>
                      {errors.image && errors.image.message}
                    </FormErrorMessage>
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
                          setPreviewImage(defaultPreviewImage);
                        }}
                      >
                        Clear
                      </Button>
                    </HStack>
                  </Box>

                  {/* Stock */}
                  <FormControl isInvalid={errors.stock}>
                    <FormLabel>Stock</FormLabel>
                    <NumberInput
                      width="100%"
                      variant="filled"
                      id="stock"
                      {...register("stock", {
                        required: "This is required",
                        maxLength: {
                          value: 20,
                          message: "Max length exceeded",
                        },
                        validate: (value) =>
                          value > 0 || "Stock must be greater than 0",
                      })}
                      defaultValue={props.stock}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <FormErrorMessage>
                      {errors.stock && errors.stock.message}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Price */}
                  <FormControl isInvalid={errors.price}>
                    <FormLabel>Price</FormLabel>
                    <NumberInput
                      width="100%"
                      variant="filled"
                      id="price"
                      {...register("price", {
                        required: "This is required",
                        maxLength: {
                          value: 20,
                          message: "Max length exceeded",
                        },
                        validate: (value) =>
                          value > 0 || "Price must be greater than 0",
                      })}
                      defaultValue={props.price}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <FormErrorMessage>
                      {errors.price && errors.price.message}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Category */}
                  <FormControl isInvalid={errors.category}>
                    <FormLabel>Category</FormLabel>
                    <Select
                      placeholder="Filter by category"
                      variant="filled"
                      id="category"
                      {...register("category", {
                        required: "This is required",
                        maxLength: {
                          value: 20,
                          message: "Max length exceeded",
                        },
                      })}
                      defaultValue={props.category}
                    >
                      {getCategories.data?.map((category) => {
                        return (
                          <option value={category.name}>{category.name}</option>
                        );
                      })}
                    </Select>
                    <FormErrorMessage>
                      {errors.category && errors.category.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </Box>
            </Flex>

            {/* Description */}
            <Box>
              <FormControl isInvalid={errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Product Description"
                  variant="filled"
                  id="description"
                  {...register("description", {
                    required: "This is required",
                    maxLength: {
                      value: 20,
                      message: "Max length exceeded",
                    },
                  })}
                  defaultValue={props.description}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Box>

          <CreateEditCancelButtons createOrUpdate={props.createOrUpdate} />
        </form>
      </Stack>
    </Container>
  );
};

export default EditUpdateInventory;
