// chakra ui navbar

import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useMe from "../hooks/useMe";
import { UserDto } from "../api/generated";
import reactImage from "../assets/react.svg";

// Path: packages\frontend\src\components\Navbar.tsx

export default function Navbar() {
  const { data, isError } = useMe();

  return (
    <Box>
      <Flex
        bg="gray.800"
        color="white"
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor="gray.700"
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={"white"}
            as={Link}
            to="/"
          >
            IoTBay -{" "}
            {data?.userType === UserDto.userType.STAFF ? "Staff" : "Customer"}
          </Text>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!data ? (
            <>
              <Button
                as={Link}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                to="/login"
              >
                Login
              </Button>
              <Button
                as={Link}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"gray.900"}
                to={"/register"}
                _hover={{
                  bg: "gray.700",
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              {data.userType === UserDto.userType.STAFF && (
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<Icon>{reactImage}</Icon>}
                        color="black"
                      >
                        Manage Inventory
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          as={"a"}
                          href="/staff/inventory/manage"
                          color="black"
                        >
                          Manage Inventory
                        </MenuItem>

                        <MenuItem
                          as={"a"}
                          href="/staff/inventory/create"
                          color="black"
                        >
                          Create Inventory
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              )}
              <Button
                as={Link}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                to="/profile"
              >
                Profile
              </Button>
              <Button
                as={Link}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                to="/logout"
              >
                Logout
              </Button>
            </>
          )}
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href="/docs"
          >
            Docs
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
