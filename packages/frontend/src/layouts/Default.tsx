import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { trpc } from "../App";

export default function DefaultLayout() {
  const user = trpc.order.getMyOrder.useQuery({})
  console.log(user.data)
  return (
    <Flex h="full" flexDir={"column"}>
      <Navbar />
      {/* Small spacing */}
      <Box h={8} />
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
}
