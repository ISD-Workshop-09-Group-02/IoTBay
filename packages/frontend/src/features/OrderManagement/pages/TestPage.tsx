import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useCreateOrder } from "../../../hooks/useOrders";
import useMe from "../../../hooks/useMe";

const TestPage = () => {
  const createOrder = useCreateOrder();
  const me = useMe();

  return (
    <div>
      {/* <Button variant="contained" color="primary"
      onClick={() => {
        createOrder.mutate({
            products: [{id: "1", quantity: 1}],
            userId: me.data.me.id
      })
      >
        Create a Store
      </Button> */}

      <Text>{JSON.stringify(createOrder.data)}</Text>
    </div>
  );
};

export default TestPage;
