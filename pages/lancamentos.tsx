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
import axios from "axios";
import ExtractoPDF from "../components/ExtractoPDF";
const Lancamentos = () => {
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  const [emprestimoLista, setEmprestimoLista] = useState<any[]>([]);
  const [totalInvestido, setTotalInvestido] = useState(0);
  const [totalAReceber, setTotalAReceber] = useState(0);
  const [totalProvJuros, setTotalProvJuros] = useState(0);
  const [totalAtraso, setTotalAtraso] = useState(0);
  const [totalRecPrincipal, setTotalRecPrincipal] = useState(0);
  const [totalRecJuros, setTotalRecJuros] = useState(0);
  var totalInvest = 0;
  var totalAReceberV = 0;
  var totalProvJurosV = 0;
  var totalAtrasoV = 0;
  var recPrincipalV = 0;
  var recPrincipalJurosV = 0;
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
      totalAReceberV = 0;
      data.map((item: any) => {
        var parcelasTT = 0;
        var tAtraso = 0;
        var tAtrasoVV = 0;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        totalInvest += parseFloat(item.totalEmprestimo);

        totalProvJurosV +=
          // eslint-disable-next-line react-hooks/exhaustive-deps
          (parseFloat(item.jurosEmprestimo) / 100) *
          parseFloat(item.totalEmprestimo);

        data2.map((item2: any) => {
          if (item.nomeCompleto === item2.nomeCompleto) {
            if (item2.tipoLancamento === "Entrada") {
              parcelasTT += parseInt(item2.totalParcelas);
              if (item2.tempoPagamento === "Com Atraso") {
                tAtrasoVV += 1;
                tAtraso +=
                  (parseFloat(item.multaDia) / 100) *
                  parseFloat(item.totalEmprestimo);
              }
            }
          }
        });
        if (listaVolatelNomes.includes(item.nomeCompleto)) {
        } else {
          listaVolatelNomes.push(item.nomeCompleto);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          totalAtrasoV += tAtraso;
          recPrincipalV +=
            // eslint-disable-next-line react-hooks/exhaustive-deps
            (parseFloat(item.totalEmprestimo) /
              parseFloat(item.totalParcelas)) *
            parcelasTT;
          recPrincipalJurosV +=
            // eslint-disable-next-line react-hooks/exhaustive-deps
            (((parseFloat(item.jurosEmprestimo) / 100) *
              parseFloat(item.totalEmprestimo)) /
              parseFloat(item.totalParcelas)) *
            parcelasTT;

          if (
            parseFloat(item.totalParcelas) === parseFloat(parcelasTT.toString())
          ) {
          } else {
            var divida =
              parseFloat(item.totalEmprestimo || "0") +
              (parseFloat(item.jurosEmprestimo || "0") / 100) *
                parseFloat(item.totalEmprestimo || "0");

            var pQitada =
              ((parseFloat(item.totalEmprestimo || "0") +
                (parseFloat(item.jurosEmprestimo || "0") / 100) *
                  parseFloat(item.totalEmprestimo || "0")) /
                parseFloat(item.totalParcelas || "0")) *
              parseFloat(item.totalParcelas2 || "0");
            totalAReceberV += divida - pQitada;
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }

          listaVolatel.push({
            nomeCompleto: item.nomeCompleto,
            totalEmprestimo: item.totalEmprestimo,
            jurosEmprestimo: item.jurosEmprestimo,
            totalParcelas: item.totalParcelas,
            totalParcelas2: parcelasTT,
            atraso: tAtraso,
            atrasoV: tAtrasoVV,
            multaDia: item.multaDia,
            createdAt: item.createdAt,
          });
        }
      });
      console.log(listaVolatel);
      setTotalRecPrincipal(recPrincipalV);
      setEmprestimoLista(listaVolatel);
      setTotalAtraso(totalAtrasoV);
      setTotalInvestido(totalInvest);
      setTotalAReceber(totalAReceberV);
      setTotalProvJuros(totalProvJurosV);
      setTotalRecJuros(recPrincipalJurosV);
    };
    if (session?.user) fetchPosts();
  }, [session?.user]);
  async function smsAtrasoFuntion() {
    toast(`O envio das sms's encontra-se temporariamente indisponível`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // const phone = "828033083";
    // toast("Enviano SMS para os clientes...", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
    // await axios({
    //   method: "post",
    //   url: `https://desktop-api-4f850b3f9733.herokuapp.com/smsAtrasoSender/${phone}`,
    //   data: { teste: "2" },
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    //   .then(function (response) {
    //     //handle success
    //     console.log(response);
    //   })
    //   .catch(function (response) {
    //     //handle error
    //     console.log(response);
    //   });
  }
  async function gerarExtractoPDF() {
    ExtractoPDF({
      emprestimoLista,
      totalInvestido,
      totalRecPrincipal,
      totalRecJuros,
      totalProvJuros,
      totalAtraso,
      totalAReceber,
    });
  }
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
                    <Text as="b">
                      {totalRecPrincipal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      Mt{" "}
                    </Text>
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
                    <Text as="b">
                      {totalRecJuros.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      Mt{" "}
                    </Text>
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
                    <Text as="b">
                      {" "}
                      {totalProvJuros.toLocaleString("en-US", {
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
                    <Text as="b">Atraso:</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text as="b">
                      {" "}
                      {totalAtraso.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      Mt{" "}
                    </Text>
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
                    <Text as="b">
                      {" "}
                      {totalAReceber.toLocaleString("en-US", {
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
              onClick={() => smsAtrasoFuntion()}
              _hover={{
                bg: "red.500",
              }}
            >
              Enviar SMS
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
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"red.400"}
              href={"#"}
              onClick={() => gerarExtractoPDF()}
              _hover={{
                bg: "red.500",
              }}
            >
              Extrato
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
                    <Box mx={4}>Multa (Mt) Dia</Box>
                  </th>
                  <th>
                    <Box mx={4}>Parcelas</Box>
                  </th>
                  <th>
                    <Box mx={4}>P. Quitadas</Box>
                  </th>
                  <th>
                    <Box mx={4}>P. Quitadas(Mt)</Box>
                  </th>
                  <th>
                    <Box mx={4}>Rec. Amort</Box>
                  </th>
                  <th>
                    <Box mx={4}>Rec. Juros</Box>
                  </th>
                  <th>
                    <Box mx={4}>T. Atraso</Box>
                  </th>
                  <th>
                    <Box mx={4}>T. Atraso(Mt)</Box>
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
                          <Box mx={4}>{ddf.createdAt.substring(0, 10)}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.nomeCompleto}</Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {parseFloat(ddf.totalEmprestimo).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}{" "}
                            Mt
                          </Box>
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
                            {(
                              parseFloat(ddf.totalEmprestimo) +
                              (parseFloat(ddf.jurosEmprestimo) / 100) *
                                parseFloat(ddf.totalEmprestimo)
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            Mt
                          </Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.multaDia}%</Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {(
                              (parseFloat(ddf.multaDia) / 100) *
                              parseFloat(ddf.totalEmprestimo)
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            Mt
                          </Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.totalParcelas}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.totalParcelas2}</Box>
                        </td>

                        <td>
                          <Box mx={4}>
                            {(
                              ((parseFloat(ddf.totalEmprestimo) +
                                (parseFloat(ddf.jurosEmprestimo) / 100) *
                                  parseFloat(ddf.totalEmprestimo)) /
                                parseFloat(ddf.totalParcelas)) *
                              parseFloat(ddf.totalParcelas2)
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            Mt
                          </Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {(
                              (parseFloat(ddf.totalEmprestimo) /
                                parseFloat(ddf.totalParcelas)) *
                              parseFloat(ddf.totalParcelas2)
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            Mt
                          </Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {(
                              (((parseFloat(ddf.jurosEmprestimo) / 100) *
                                parseFloat(ddf.totalEmprestimo)) /
                                parseFloat(ddf.totalParcelas)) *
                              parseFloat(ddf.totalParcelas2)
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            Mt
                          </Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.atrasoV}</Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {parseFloat(ddf.atraso).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            Mt
                          </Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {(
                              parseFloat(ddf.totalEmprestimo) +
                              (parseFloat(ddf.jurosEmprestimo) / 100) *
                                parseFloat(ddf.totalEmprestimo) -
                              ((parseFloat(ddf.totalEmprestimo) +
                                (parseFloat(ddf.jurosEmprestimo) / 100) *
                                  parseFloat(ddf.totalEmprestimo)) /
                                parseFloat(ddf.totalParcelas)) *
                                parseFloat(ddf.totalParcelas2) +
                              parseFloat(ddf.atraso)
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

export default Lancamentos;
