import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  useColorMode,
  Button,
  Link,
} from "@chakra-ui/react";
import { IoMdMedkit, IoIosMedkit, IoIosHeart, IoIosBody } from "react-icons/io";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Services = () => {
  const { colorMode } = useColorMode();

  const services = [
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Donec orci dui, ultrices at turpis laoreet, condimentum laoreet mauris. Ut euismod massa nec libero aliquet eleifend. Proin mollis turpis eros, a viverra neque venenatis eget.",
      icon: <IoMdMedkit size="2em" />,
    },
    {
      title: "Lorem ipsum dolor sit amets",
      description:
        "Donec orci dui, ultrices at turpis laoreet, condimentum laoreet mauris. Ut euismod massa nec libero aliquet eleifend. Proin mollis turpis eros, a viverra neque venenatis eget.",
      icon: <IoIosMedkit size="2em" />,
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Donec orci dui, ultrices at turpis laoreet, condimentum laoreet mauris. Ut euismod massa nec libero aliquet eleifend. Proin mollis turpis eros, a viverra neque venenatis eget.",
      icon: <IoIosHeart size="2em" />,
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Donec orci dui, ultrices at turpis laoreet, condimentum laoreet mauris. Ut euismod massa nec libero aliquet eleifend. Proin mollis turpis eros, a viverra neque venenatis eget.",
      icon: <IoIosBody size="2em" />,
    },
  ];

  return (
    <Box>
      <NavBar />
      <Box py={16} mr={16} ml={16}>
        <Flex direction="column" align="center" mb={10}>
          <Heading
            size="xl"
            color={colorMode === "light" ? "gray.700" : "white"}
          >
            Nossos Serviços
          </Heading>
          <Text mt={2} color={colorMode === "light" ? "gray.600" : "gray.400"}>
            É com muito prazer que apresentamos a lista dos nossos serviços.
          </Text>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {services.map((service) => (
            <Box
              key={service.title}
              bg={colorMode === "light" ? "white" : "gray.700"}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
            >
              <Flex justify="center" mb={4}>
                {service.icon}
              </Flex>
              <Heading
                size="md"
                mb={2}
                color={colorMode === "light" ? "gray.800" : "white"}
              >
                {service.title}
              </Heading>
              <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>
                {service.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
        {/* <Flex justify="center" mt={8}>
          <Button
            as={Link}
            href="/#BookAppointment"
            colorScheme="teal"
            size="lg"
          >
            Book Appointment
          </Button>
        </Flex> */}
      </Box>
      <Footer />
    </Box>
  );
};

export default Services;
