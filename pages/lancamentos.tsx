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
  Tfoot,
  Tr,
  Th,
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
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Lancamentos = () => {
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  const [emprestimoLista, setEmprestimoLista] = useState<any[]>([]);
  const [totalInvestido, setTotalInvestido] = useState(0);
  var totalInvest = 0;
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosLancamentos`, {
        cache: "no-store",
      });
      const data = await response.json();
      data.map((item: any) => {
        totalInvest += parseFloat(item.totalEmprestimo);
      });
      setEmprestimoLista(data);
      setTotalInvestido(totalInvest);
    };
    if (session?.user) fetchPosts();
  }, [session?.user]);
  return (
    <Box>
      <NavBar />
      <Box py={16} mr={16} ml={16}>
        <Flex direction="column" align="center" mb={10}>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem w="100%" h="10">
              <Center>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem w="100%" h="10">
                    <Text as="b">Total Investido:</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text as="b">
                      {totalInvestido.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      Mt
                    </Text>
                  </GridItem>
                </Grid>
              </Center>
            </GridItem>
            <GridItem w="100%" h="10">
              <Center>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem w="100%" h="10">
                    <Text as="b">Rec. Principal:</Text>
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
                    <Text as="b">Rec. Juros:</Text>
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
                    <Text as="b">Prov. Juros:</Text>
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
                    <Text as="b">Atraso:</Text>
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
                    <Text as="b">Total a Receber:</Text>
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
                  href={"/novoLancamento"}
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Add Lançamento
                </Button>
              </Center>
            </GridItem>
            <GridItem w="100%" h="10">
              <Input placeholder="Filtrar Pelo Nome do Cliente" />
            </GridItem>
          </Grid>
          <br />
          <hr />
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
          <Heading
            size="xl"
            color={colorMode === "light" ? "gray.700" : "white"}
          >
            Lançamentos
          </Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>DV Microcrédito</TableCaption>
              <Thead>
                <Tr>
                  <th>
                    <Box mx={4}>Data</Box>
                  </th>
                  <th>
                    <Box mx={4}>Nome Cliente</Box>
                  </th>
                  <th>
                    <Box mx={4}>Empréstimo</Box>
                  </th>
                  <th>
                    <Box mx={4}>Juros(%)</Box>
                  </th>
                  <th>
                    <Box mx={4}>Juros(Mt)</Box>
                  </th>
                  <th>
                    <Box mx={4}>Dívida Total</Box>
                  </th>
                  <th>
                    <Box mx={4}>Multa % Dia</Box>
                  </th>
                  <th>
                    <Box mx={4}>Parcelas</Box>
                  </th>
                  <th>
                    <Box mx={4}>P. Quitadas</Box>
                  </th>
                  <th>
                    <Box mx={4}>Parcela(Mt)</Box>
                  </th>
                  <th>
                    <Box mx={4}>Rec. Amort</Box>
                  </th>
                  <th>
                    <Box mx={4}>Rec. Juros</Box>
                  </th>
                  <th>
                    <Box mx={4}>T Atrasos</Box>
                  </th>
                  <th>
                    <Box mx={4}>Atrasado</Box>
                  </th>
                  <th>
                    <Box mx={4}>Dívida Actual</Box>
                  </th>
                </Tr>
              </Thead>
              <Tbody>
                {emprestimoLista.length > 0 &&
                  emprestimoLista.map((ddf) => (
                    <>
                      <tr>
                        <td>
                          <Box mx={4}>{ddf.createdAt}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.nomeCompleto}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.totalEmprestimo}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.jurosEmprestimo}%</Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {(
                              (parseFloat(ddf.jurosEmprestimo) / 100) *
                              parseFloat(ddf.totalEmprestimo)
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            Mt
                          </Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {parseFloat(ddf.totalEmprestimo).toLocaleString(
                              "en-US",
                              { minimumFractionDigits: 2 }
                            )}{" "}
                            Mt
                          </Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.multaDia}%</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.totalParcelas}</Box>
                        </td>
                        <td>
                          <Box mx={4}>0</Box>
                        </td>
                        <td>
                          <Box mx={4}></Box>
                        </td>
                        <td>
                          <Box mx={4}></Box>
                        </td>
                        <td>
                          <Box mx={4}></Box>
                        </td>
                        <td>
                          <Box mx={4}></Box>
                        </td>
                        <td>
                          <Box mx={4}></Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {parseFloat(ddf.totalEmprestimo).toLocaleString(
                              "en-US",
                              { minimumFractionDigits: 2 }
                            )}{" "}
                            Mt
                          </Box>
                        </td>
                      </tr>
                    </>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default Lancamentos;
