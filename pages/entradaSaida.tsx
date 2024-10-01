import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  Stack,
  Button,
  Grid,
  GridItem,
  Center,
  Select,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../components/TDataTableEntradaSaida/DataTable";
type TodoItem = {
  id: number;
  createdAt: string;
  nomeCompleto: string;
  tipoLancamento: string;
  value: string;
};
const columnHelper = createColumnHelper<TodoItem>();

// kkkkkkkkk
const EntradasSaidas = () => {
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  const [entradasSaidasLista, setEntradasSaidasLista] = useState([]);
  const [clientesLista, setClientesLista] = useState([]);
  const [clientesListaTable, setClientesListaTable] = useState([]);
  const [totalEmprestado, setTotalEmprestado] = useState(0);
  const [totalRecebido, setTotalRecebido] = useState(0);
  const [clienteClicked, setClienteClicked] = useState("");

  var totalInvest = 0;
  var totalAReceberV = 0;
  var totalProvJurosV = 0;
  var listaVolatel: any = [];
  var listaVolatelNomes: any = [];
  var listaClientesVolatel: any = [];
  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (info) => info.getValue(),
      header: "Data",
    }),
    columnHelper.accessor("nomeCompleto", {
      cell: (info) => info.getValue(),
      header: "Nome Cliente",
    }),
    columnHelper.accessor("tipoLancamento", {
      cell: (info) => info.getValue(),
      header: "Operação",
    }),
    columnHelper.accessor("value", {
      cell: (info) => info.getValue(),
      header: "Saldo",
    }),
  ];
  useEffect(() => {
    setEntradasSaidasLista([]);
    setTotalEmprestado(0);
    setTotalRecebido(0);
    listaVolatel = [];
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
            if (listaClientesVolatel.includes(item.nomeCompleto)) {
            } else {
              listaClientesVolatel.push(item.nomeCompleto);
            }
            listaVolatelNomes.push(item.nomeCompleto);
            listaVolatel.push({
              nomeCompleto: item2.nomeCompleto,
              tipoLancamento: item2.tipoLancamento,
              value: `${(
                ((parseFloat(item2.totalEmprestimo) +
                  (parseFloat(item.jurosEmprestimo) / 100) *
                    parseFloat(item2.totalEmprestimo)) /
                  parseFloat(item2.totalParcelasBaseDados)) *
                parseFloat(item2.totalParcelas)
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })} Mt`,
              tempoPagamento: item2.tempoPagamento,
              createdAt: item2.createdAt.substring(0, 10),
            });
            if (item2.tipoLancamento === "Saída") {
              totalInvest +=
                // eslint-disable-next-line react-hooks/exhaustive-deps
                ((parseFloat(item2.totalEmprestimo) +
                  (parseFloat(item.jurosEmprestimo) / 100) *
                    parseFloat(item2.totalEmprestimo)) /
                  parseFloat(item2.totalParcelasBaseDados)) *
                parseFloat(item2.totalParcelas);
            } else {
              totalAReceberV +=
                // eslint-disable-next-line react-hooks/exhaustive-deps
                ((parseFloat(item2.totalEmprestimo) +
                  (parseFloat(item.jurosEmprestimo) / 100) *
                    parseFloat(item2.totalEmprestimo)) /
                  parseFloat(item2.totalParcelasBaseDados)) *
                parseFloat(item2.totalParcelas);
            }
          }
        });
      });
      setEntradasSaidasLista(listaVolatel);
      setTotalEmprestado(totalInvest);
      setTotalRecebido(totalAReceberV);
      setClientesLista(listaClientesVolatel);
    };
    if (session?.user) fetchPosts();
  }, [session?.user]);
  useEffect(() => {
    setEntradasSaidasLista([]);
    setTotalEmprestado(0);
    setTotalRecebido(0);
    listaVolatel = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosLancamentos`, {
        cache: "no-store",
      });
      const response2 = await fetch(`/api/todasEntradasSaidas`, {
        cache: "no-store",
      });
      const data2 = await response2.json();
      const data = await response.json();
      if (clienteClicked === "Clientes") {
        data.map((item: any) => {
          data2.map((item2: any) => {
            var parcelasTT = 0;
            if (item.nomeCompleto === item2.nomeCompleto) {
              parcelasTT += item2.totalParcelas;
              if (listaClientesVolatel.includes(item.nomeCompleto)) {
              } else {
                listaClientesVolatel.push(item.nomeCompleto);
              }
              listaVolatelNomes.push(item.nomeCompleto);
              listaVolatel.push({
                nomeCompleto: item2.nomeCompleto,
                tipoLancamento: item2.tipoLancamento,
                value: `${(
                  ((parseFloat(item2.totalEmprestimo) +
                    (parseFloat(item.jurosEmprestimo) / 100) *
                      parseFloat(item2.totalEmprestimo)) /
                    parseFloat(item2.totalParcelasBaseDados)) *
                  parseFloat(item2.totalParcelas)
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })} Mt`,
                tempoPagamento: item2.tempoPagamento,
                createdAt: item2.createdAt.substring(0, 10),
              });
              if (item2.tipoLancamento === "Saída") {
                totalInvest +=
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  ((parseFloat(item2.totalEmprestimo) +
                    (parseFloat(item.jurosEmprestimo) / 100) *
                      parseFloat(item2.totalEmprestimo)) /
                    parseFloat(item2.totalParcelasBaseDados)) *
                  parseFloat(item2.totalParcelas);
              } else {
                totalAReceberV +=
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  ((parseFloat(item2.totalEmprestimo) +
                    (parseFloat(item.jurosEmprestimo) / 100) *
                      parseFloat(item2.totalEmprestimo)) /
                    parseFloat(item2.totalParcelasBaseDados)) *
                  parseFloat(item2.totalParcelas);
              }
            }
          });
        });
      } else {
        data.map((item: any) => {
          data2.map((item2: any) => {
            var parcelasTT = 0;
            if (item.nomeCompleto === item2.nomeCompleto) {
              if (clienteClicked === item2.nomeCompleto) {
                parcelasTT += item2.totalParcelas;
                if (listaClientesVolatel.includes(item.nomeCompleto)) {
                } else {
                  listaClientesVolatel.push(item.nomeCompleto);
                }
                listaVolatelNomes.push(item.nomeCompleto);
                listaVolatel.push({
                  nomeCompleto: item2.nomeCompleto,
                  tipoLancamento: item2.tipoLancamento,
                  value: `${(
                    ((parseFloat(item2.totalEmprestimo) +
                      (parseFloat(item.jurosEmprestimo) / 100) *
                        parseFloat(item2.totalEmprestimo)) /
                      parseFloat(item2.totalParcelasBaseDados)) *
                    parseFloat(item2.totalParcelas)
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })} Mt`,
                  tempoPagamento: item2.tempoPagamento,
                  createdAt: item2.createdAt.substring(0, 10),
                });
                if (item2.tipoLancamento === "Saída") {
                  totalInvest +=
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    ((parseFloat(item2.totalEmprestimo) +
                      (parseFloat(item.jurosEmprestimo) / 100) *
                        parseFloat(item2.totalEmprestimo)) /
                      parseFloat(item2.totalParcelasBaseDados)) *
                    parseFloat(item2.totalParcelas);
                } else {
                  totalAReceberV +=
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    ((parseFloat(item2.totalEmprestimo) +
                      (parseFloat(item.jurosEmprestimo) / 100) *
                        parseFloat(item2.totalEmprestimo)) /
                      parseFloat(item2.totalParcelasBaseDados)) *
                    parseFloat(item2.totalParcelas);
                }
              }
            }
          });
        });
      }

      setEntradasSaidasLista(listaVolatel);
      setTotalEmprestado(totalInvest);
      setTotalRecebido(totalAReceberV);
    };
    if (session?.user) fetchPosts();
  }, [clienteClicked]);
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
            <Select onChange={(e) => setClienteClicked(e.target.value)}>
              <option value={"Clientes"} key={"Clientes"}>
                {"Clientes"}
              </option>
              {clientesLista.map((item) => (
                <>
                  <option value={item} key={item}>
                    {item}
                  </option>
                </>
              ))}
            </Select>
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
          <DataTable
            columns={columns}
            data={entradasSaidasLista}
            title="Tabela de Entradas e Saídas de Emprestimos"
          />
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};
export default EntradasSaidas;
