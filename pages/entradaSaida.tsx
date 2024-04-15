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
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// kkkkkkkkk
const EntradasSaidas = () => {
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  const [entradasSaidasLista, setEntradasSaidasLista] = useState<any[]>([]);
  const [totalEmprestado, setTotalEmprestado] = useState(0);
  const [totalRecebido, setTotalRecebido] = useState(0);
  var totalInvest = 0;
  var totalAReceberV = 0;
  var totalProvJurosV = 0;
  var listaVolatel: any = [];
  var listaVolatelNomes: any = [];
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosLancamentos`, {
        cache: "no-store",
      });
      const response2 = await fetch(`/api/todasEntradasSaidas`, {
        cache: "no-store",
      });
      const data2 = await response2.json();
      const data = await response.json();
      data.map((item: any) => {
        data2.map((item2: any) => {
          var parcelasTT = 0;
          if (item.nomeCompleto === item2.nomeCompleto) {
            parcelasTT += item2.totalParcelas;
            listaVolatelNomes.push(item.nomeCompleto);
            listaVolatel.push({
              nomeCompleto: item2.nomeCompleto,
              tipoLancamento: item2.tipoLancamento,
              tempoPagamento: item2.tempoPagamento,
              totalParcelas: item2.totalParcelas,
              totalEmprestimo: item2.totalEmprestimo,
              jurosEmprestimo: item.jurosEmprestimo,
              totalParcelasBaseDados: item2.totalParcelasBaseDados,
              createdAt: item2.createdAt,
            });
          }
        });
      });
      setEntradasSaidasLista(listaVolatel);
    };
    if (session?.user) fetchPosts();
  }, [session?.user]);
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
                  <Text as="b">
                    {totalEmprestado.toLocaleString("en-US", {
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
                  <Text as="b">Valor Recebido:</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text as="b">
                    {totalRecebido.toLocaleString("en-US", {
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
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"red.400"}
                href={"/novaEntradaSaida"}
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
                {entradasSaidasLista.length > 0 &&
                  entradasSaidasLista.map((ddf) => (
                    <>
                      <tr>
                        <td>
                          <Box mx={4}>{ddf.createdAt.substring(0, 10)}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.nomeCompleto}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.tipoLancamento}</Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {(
                              ((parseFloat(ddf.totalEmprestimo) +
                                (parseFloat(ddf.jurosEmprestimo) / 100) *
                                  parseFloat(ddf.totalEmprestimo)) /
                                parseFloat(ddf.totalParcelasBaseDados)) *
                              parseFloat(ddf.totalParcelas)
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}{" "}
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

export default EntradasSaidas;
