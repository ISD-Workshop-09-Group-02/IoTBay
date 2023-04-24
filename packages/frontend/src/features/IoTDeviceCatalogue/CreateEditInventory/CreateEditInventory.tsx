import {
  Box,
  Container,
  Stack,
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
} from "@chakra-ui/react";

import { useGetCategories } from "../../../hooks/useCategories";

import { useEffect, useState } from "react";
import { DownloadIcon, MinusIcon } from "@chakra-ui/icons";
import BreadCrumbRoute from "../../../components/BreadCrumbRoute";
import PageTitle from "../../../components/PageTitle";
import { useForm } from "react-hook-form";
import CreateEditCancelButtons from "./CreateEditCancelButtons";
import FormErrorNotification from "../../../components/Form/FormErrorNotification";
import { ProductsSchema } from "../../../api/generated";

export type FormValues = {
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: string;
};

interface IEditUpdateInventoryProps {
  createOrUpdate: "create" | "edit";

  createProduct?: (data: ProductsSchema) => void;
  updateProduct?: (data: ProductsSchema) => void;

  initialFormValues?: FormValues;

  editId?: string;
}

const EditUpdateInventory: React.FC<IEditUpdateInventoryProps> = (props) => {
  const initialDefaultValues = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "https://via.placeholder.com/150",
  } as FormValues;

  const getCategories = useGetCategories();

  const isPropsNull = () => {
    if (!props.initialFormValues) return true;
    if (Object.keys(props.initialFormValues).length === 0) return true;

    const value = Object.values(props.initialFormValues).some(
      (value) => value === null || value === undefined || value === ""
    );

    return value;
  };

  const {
    handleSubmit, // function to invoke when the form is submitted
    register, // register the input into the hook by invoking the "register" function
    formState: { errors, defaultValues },
    reset,
  } = useForm({
    defaultValues: isPropsNull()
      ? initialDefaultValues
      : props.initialFormValues,
  });

  const defaultPreviewImage: string = "https://via.placeholder.com/150";

  const [imageURL, setImageURL] = useState<string | undefined>("");
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    defaultValues.image ? defaultValues.image : defaultPreviewImage
  );

  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const onSubmit = (data: any) => {
    const dataFormatted = { ...data, image: previewImage };
    props.createProduct && props.createProduct(dataFormatted);
    props.updateProduct && props.updateProduct(dataFormatted);
  };

  useEffect(() => {
    if (props.initialFormValues && props.createOrUpdate === "edit") {
      reset(props.initialFormValues);
      setPreviewImage(props.initialFormValues.image);
      setImageURL(props.initialFormValues.image);

      setStock(props.initialFormValues.stock);
      setPrice(props.initialFormValues.price);
    }
  }, [props.initialFormValues]);

  // if (!getCategories.isSuccess) return <div>Loading...</div>;

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
                      defaultValue={defaultValues.name}
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
                          value: 255,
                          message: "Max length exceeded",
                        },
                      })}
                      defaultValue={defaultValues.image}
                      onChange={(e) => {
                        setImageURL(e.target.value);
                      }}
                      value={imageURL}
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
                          setPreviewImage(imageURL);
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
                          setImageURL(defaultPreviewImage);
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
                      defaultValue={defaultValues.stock}
                      value={stock}
                      onChange={(value) => {
                        setStock(parseFloat(value));
                      }}
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
                      defaultValue={defaultValues.price}
                      value={price}
                      onChange={(value) => {
                        setPrice(parseFloat(value));
                      }}
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
                      defaultValue={defaultValues.category}
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
                  defaultValue={defaultValues.description}
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
