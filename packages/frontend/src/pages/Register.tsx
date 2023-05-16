import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { isTRPCClientError } from "../utils/trpc";
import useZodForm from "../hooks/useZodForm";
import { RegisterSchema } from "backend/src/schema";

export default function Register() {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useZodForm({
    schema: RegisterSchema
  });

  const navigate = useNavigate();

  const toast = useToast();

  const onSubmit: SubmitHandler<Zod.infer<typeof RegisterSchema>> = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      toast({
        title: "Registration successful",
        description: "You have been registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/profile`);
    } catch (error) {
      if (isTRPCClientError(error)) {
        toast({
          title: "Login failed",
          description: "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="3xl" fontWeight="bold">
          Register
        </Text>
        <FormControl isInvalid={!!errors.address}>
          <FormLabel>Address</FormLabel>
          <Input {...register("address", { required: "Address is required." })} />
          {errors.address ? (
            <FormErrorMessage>{errors.address.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Mailing address.</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input {...register("name", { required: "Name is required" })} />
          {errors.name ? (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Name.</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Phone</FormLabel>
          <Input {...register("phone", { required: "Phone is required" })} />
          {errors.phone ? (
            <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Phone</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" {...register("email", { required: "Email is required" })} />
          {errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : (
            <FormHelperText>We'll never share your email.</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password ? (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Enter your password.</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.sex } isRequired>
                    <FormLabel>Sex</FormLabel>
                    <Select
                      variant="filled"
                      id="category"
                      {...register("sex", {
                        required: "Sex is required",
                      })}
                      
                    >
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                     <option value={"other"}>Other</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.sex && errors.sex.message}
                    </FormErrorMessage>
                  </FormControl>
        <Button type="submit" isLoading={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </Container>
  );
}
