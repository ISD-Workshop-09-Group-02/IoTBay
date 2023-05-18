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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import BreadCrumbRoute from "../../../components/BreadCrumbRoute";
import PageTitle from "../../../components/PageTitle";
import { useForm } from "react-hook-form";
import FormErrorNotification from "../../../components/Form/FormErrorNotification";
import type { RouterInput, RouterOutput } from "backend/src";
import { Link } from "react-router-dom";


export type FormValues = {
  sex: string;
  isAnonymous: boolean;
};

interface IEditUpdateCustomerProps {

  updateCustomer?: (data: RouterInput["customer"]["edit"]) => void;

  initialFormValues?: FormValues;

  editId?: string;
}

const EditCustomersDetail: React.FC<IEditUpdateCustomerProps> = (props) => {
  const initialDefaultValues = {
    sex: "",
    isAnonymous: false
  } as FormValues;

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
    setValue,
  } = useForm({
    defaultValues: isPropsNull()
      ? initialDefaultValues
      : props.initialFormValues,
  });

  const onSubmit = (data: any) => {
    const dataFormatted = { ...data };
    props.updateCustomer && props.updateCustomer(dataFormatted);
  };

  useEffect(() => {
    if (props.initialFormValues) {
      reset(props.initialFormValues);
    }
  }, [props.initialFormValues]);
  


  return (
    <Container maxW={"container.xl"}>
      <Stack spacing={4}>
        <PageTitle
          title={
            "Edit Customer"
          }
        />
        <BreadCrumbRoute
          parameters={[
            { paths: "Manage Customers Detail", links: "/staff/customerDetail" },
            {
              paths:
                    "Edit Customer",
              links:
                `/staff/customerDetail/edit/${props.editId}`,
            },
          ]}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
                <FormErrorNotification errors={errors} />
                  <FormControl isInvalid={errors.sex ? true : false}>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      placeholder="Filter by sex"
                      variant="filled"
                      id="sex"
                      {...register("sex", {
                        required: "Gender must be required",
                      })}
                      defaultValue={
                        defaultValues !== undefined && defaultValues.sex
                          ? defaultValues.sex
                          : initialDefaultValues.sex
                      }
                    >
                        return (
                          <option value= "male">male</option>
                          <option value= "female">female</option>
                          <option value= "other">other</option>
                        );  
                    </Select>
                    <FormErrorMessage>
                      {errors.sex && errors.sex.message}
                    </FormErrorMessage>
                  </FormControl>

              <FormControl isInvalid={errors.isAnonymous ? true : false}>
                <FormLabel>Anonymous</FormLabel>
                <Select
                  placeholder="Anonymous Statement"
                  variant="filled"
                  id="isAnonymous"
                  {...register("isAnonymous", {
                    required: "Anonymous Statement",
                  })}
                  >
                  return (
                    <option value= "true">Anonymouse</option>
                    <option value= "false">Onymouse</option>
                  ); 
                  </Select>
                <FormErrorMessage>
                  {errors.isAnonymous && errors.isAnonymous.message}
                </FormErrorMessage>
              </FormControl>
      <Box>
      <HStack spacing={2} align="center" justify="flex-end">
          <Button
            colorScheme="blue"
            size="lg"
            leftIcon={<AddIcon />}
            type="submit"
          >
            Update Customer
          </Button>
        <Button
          colorScheme="red"
          variant={"outline"}
          size="lg"
          leftIcon={<CloseIcon />}
          as={Link}
          to="/staff/customerDetail"
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


export default EditCustomersDetail;
