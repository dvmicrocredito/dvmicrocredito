import React from "react";
import {
  Box,
  Flex,
  Heading,
  useColorMode,
  Table,
  Thead,
  Tbody,
  Tr,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

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
      data.map((item: any) => {
        if (item.userId === session?.user?.email) {
          var parcelasTT = 0;
          var tAtraso = 0;
          var tAtrasoVV = 0;
          totalInvest += parseFloat(item.totalEmprestimo);
          totalAReceberV +=
            parseFloat(item.totalEmprestimo) +
            (parseFloat(item.jurosEmprestimo) / 100) *
              parseFloat(item.totalEmprestimo);
          totalProvJurosV +=
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
            totalAtrasoV += tAtraso;
            recPrincipalV +=
              (parseFloat(item.totalEmprestimo) /
                parseFloat(item.totalParcelas)) *
              parcelasTT;
            recPrincipalJurosV +=
              (((parseFloat(item.jurosEmprestimo) / 100) *
                parseFloat(item.totalEmprestimo)) /
                parseFloat(item.totalParcelas)) *
              parcelasTT;
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
        }
      });
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
  return (
    <Box>
      <NavBar />
      <Box py={16} mr={16} ml={16}>
        <Flex direction="column" align="center" mb={10}>
          <br />
          <hr />
          <Heading
            size="xl"
            color={colorMode === "light" ? "gray.700" : "white"}
          >
            Meus Emprestimos Solicitados
          </Heading>
          <br />
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
