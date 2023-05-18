import { useNavigate, useParams } from "react-router-dom";
import EditCustomerDetail, {
  FormValues,
} from "../components/EditCustomersDetail";
import { useEditCustomers, useGetCustomer } from "../../../hooks/useCustomer";
import { useToast } from "@chakra-ui/react";
import { RouterInput } from "backend/src";
import { TRPCClientError } from "@trpc/client";
import { isTRPCClientError } from "../../../utils/trpc";

export default function EditCustomer() {
  const customerId: string = useParams().id as string;
  const getCustomer = useGetCustomer(customerId);
  const updateCustomer = useEditCustomers();

  const toast = useToast();
  const navigate = useNavigate();

  const updateCustomerFunction = async (data: RouterInput["customer"]["edit"]) => {
    try {
      updateCustomer.mutateAsync({
        userId: data.userId,
        sex: data.sex,
        isAnonymous: data.isAnonymous
        
      });
      toast({
        title: "Customer updated",
        description: "Record has been updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/staff/customerDetail");
    } catch (error) {
      if (isTRPCClientError(error)) {
        toast({
          title: "Customer update failed",
          description: error.message,
          status: "error",
          duration: 5000,
        });
      } else {
        toast({
          title: "Customer update failed",
          description: "Unknown error",
          status: "error",
          duration: 5000,
        });
      }
      
    }
  };

  if (getCustomer.isLoading || !getCustomer.data) {
    return <div>Loading...</div>;
  }

  const initialDefaultValues = {
    isAnonymous: getCustomer.data.isAnonymous,
    sex: getCustomer.data.sex
  } as FormValues;

  return (
    <EditCustomerDetail
      updateCustomer={updateCustomerFunction}
      initialFormValues={initialDefaultValues}
    />
  );
}
