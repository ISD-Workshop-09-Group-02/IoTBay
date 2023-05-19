import {
  Box,
  Container,
  Stack,
  Button,
  HStack,
  Select,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import BreadCrumbRoute from "../../../components/BreadCrumbRoute";
import PageTitle from "../../../components/PageTitle";
import { useForm } from "react-hook-form";
import FormErrorNotification from "../../../components/Form/FormErrorNotification";
import type { RouterInput, RouterOutput } from "backend/src";
import { Link } from "react-router-dom";
import useZodForm from "../../../hooks/useZodForm";
import { CustomerEditSchema } from "backend/src/schema";
import { SubmitHandler } from "react-hook-form";
import { useEditMyCustomer, useGetCustomer } from "../../../hooks/useCustomer";
import { isTRPCClientError } from "../../../utils/trpc";

export type FormValues = {
  sex: string;
  isAnonymous: boolean;
};

interface IEditUpdateCustomerProps {
  initialCustomer: RouterOutput["customer"]["myCustomer"];
}

const EditMyCustomersDetail: React.FC<IEditUpdateCustomerProps> = (props) => {
  const customer = useGetCustomer(props.initialCustomer.userId);

  const updateCustomer = useEditMyCustomer();

  const toast = useToast()

  const {
    handleSubmit, // function to invoke when the form is submitted
    register, // register the input into the hook by invoking the "register" function
    formState: { errors, defaultValues, isSubmitting },
    reset,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      isAnonymous: props.initialCustomer.isAnonymous,
      sex: props.initialCustomer.sex,
    },
  });

  useEffect(() => {
    reset(customer.data)
  }, [customer.data])

  return (
    <Container maxW={"container.xl"}>
      <Stack spacing={4}>
        <PageTitle title={"Edit My Detail"} />
        <BreadCrumbRoute
          parameters={[
            {
              paths: "My Detail",
              links: "/profile/myDetail",
            },
            {
              paths: "Edit Customer",
              links: "/profile/myDetail/edit",
            },
          ]}
        />

        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await updateCustomer.mutateAsync({
                ...data,
              });
              toast({
                title: "Success",
                description: "Successfully updated detail",
                colorScheme: "green"
              })
  
            } catch (error) {
              if (isTRPCClientError(error)) {
                toast({
                  title: "Error",
                  description: error.message,
                  colorScheme: "red"
                })
              } else {
                toast({
                  title: "Error",
                  description: "Something went wrong",
                  colorScheme: "red"
                })
              }
            }
            
            
          })}
        >
          <FormErrorNotification errors={errors} />
          <FormControl isInvalid={errors.sex ? true : false}>
            <FormLabel>Gender</FormLabel>
            <Select
              variant="filled"
              id="sex"
              {...register("sex", {
                required: "Gender must be required",
              })}
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </Select>
            <FormErrorMessage>
              {errors.sex && errors.sex.message}
            </FormErrorMessage>
          </FormControl>

          <Checkbox {...register("isAnonymous")}>Anonymous</Checkbox>
          <Box>
            <HStack spacing={2} align="center" justify="flex-end">
              <Button
                colorScheme="blue"
                size="lg"
                leftIcon={<AddIcon />}
                type="submit"
                isLoading={isSubmitting}
              >
                Update Detail
              </Button>
              <Button
                colorScheme="red"
                variant={"outline"}
                size="lg"
                leftIcon={<CloseIcon />}
                as={Link}
                to="/profile/myDetail"
              >
                Cancel
              </Button>
            </HStack>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};

export default EditMyCustomersDetail;
