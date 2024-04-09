import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  Button,
  Grid,
  GridItem,
  Center,
  Input,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// kkkkkk
const EntradasSaidas = () => {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <NavBar />
      <Box py={16} mr={16} ml={16}>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem w="100%" h="10">
            <Center>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text as="b">Valor Emprestado:</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text as="b">0.00 Mt</Text>
                </GridItem>
              </Grid>
            </Center>
          </GridItem>
          <GridItem w="100%" h="10">
            <Center>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text as="b">Valor Recebido:</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text as="b">0.00 Mt</Text>
                </GridItem>
              </Grid>
            </Center>
          </GridItem>
          <GridItem w="100%" h="10">
            <Center>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"red.400"}
                href={"#"}
                _hover={{
                  bg: "red.500",
                }}
              >
                Add Entrada/Saída
              </Button>
            </Center>
          </GridItem>
          <GridItem w="100%" h="10">
            <Input placeholder="Filtrar Pelo Nome do Cliente" />
          </GridItem>
        </Grid>
        <br />
        <hr />
        <Flex direction="column" align="center" mb={10}>
          <Stack direction="row" spacing={6} mt={4}>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"red.400"}
              href={"/emprestimosSolicitados"}
              _hover={{
                bg: "red.500",
              }}
            >
              Emprestimos Solicitados
            </Button>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"red.400"}
              href={"/lancamentos"}
              _hover={{
                bg: "red.500",
              }}
            >
              Lançamentos
            </Button>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"red.400"}
              href={"/entradaSaida"}
              _hover={{
                bg: "red.500",
              }}
            >
              Entradas/Saídas
            </Button>
          </Stack>
          <br />

          <Heading
            size="xl"
            color={colorMode === "light" ? "gray.700" : "white"}
          >
            Entradas e Saídas
          </Heading>

          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>DV Microcrédito</TableCaption>
              <Thead>
                <Tr>
                  <th>Data</th>
                  <th>Nome Cliente</th>
                  <th>Operação</th>
                  <th>Saldo</th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default EntradasSaidas;
