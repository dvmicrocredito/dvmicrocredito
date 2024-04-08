import React from "react";
import {
  Flex,
  Heading,
  Link,
  Stack,
  Box,
  Icon,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const { colorMode } = useColorMode();

  const links = [
    {
      href: "#",
      title: "Facebook",
      icon: FaFacebook,
    },
    {
      href: "#",
      title: "Twitter",
      icon: FaTwitter,
    },
    {
      href: "#",
      title: "LinkedIn",
      icon: FaLinkedin,
    },
  ];

  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.800"} py={8}>
      <Flex direction="column" align="center">
        <Heading size="lg" color={colorMode === "light" ? "gray.700" : "white"}>
          O Parceiro Ideal Para os Seus Investimentos.
        </Heading>
        <Stack direction="row" spacing={6} mt={4}>
          <Link href="/">Início</Link>
          <Link href="/about">Sobre Nós</Link>
          <Link href="/services">Serviços</Link>
        </Stack>
        <Stack direction="row" spacing={4} mt={6}>
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              color={colorMode === "light" ? "gray.700" : "gray.300"}
            >
              <Icon as={link.icon} boxSize={6} />
            </Link>
          ))}
        </Stack>
      </Flex>
      <Flex align="center" justify="center" mt={8}>
        <Text
          fontSize="sm"
          color={colorMode === "light" ? "gray.600" : "gray.400"}
        >
          &copy; {new Date().getFullYear()} DV Microcrédito. Todos os direitos
          reservados.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
