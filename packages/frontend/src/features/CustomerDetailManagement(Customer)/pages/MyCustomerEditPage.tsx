import { useNavigate, useParams } from "react-router-dom";
import EditMyCustomerDetail, {
  FormValues,
} from "../components/EditMyCustomerDetail";
import { useMyCustomer } from "../../../hooks/useCustomer";
import { useToast } from "@chakra-ui/react";
import { RouterInput } from "backend/src";
import { isTRPCClientError } from "../../../utils/trpc";

export default function EditMyCustomer() {
  //const customerId: string = useParams().id as string;
  const getCustomer = useMyCustomer();

  if (getCustomer.isLoading || !getCustomer.data) {
    return <div>Loading...</div>;
  }

  return (
    <EditMyCustomerDetail
      initialCustomer={getCustomer.data}
    />
  );
}