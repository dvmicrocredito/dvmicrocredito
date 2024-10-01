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
  Input,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import ExtractoPDF from "../components/ExtractoPDF";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../components/TDataTableEntradaSaida/DataTable";
type TodoItem = {
  createdAt: string;
  nomeCompleto: string;
  totalEmprestimo: string;
  jurosEmprestimo: string;
  multaDia: string;
  totalParcelas: string;
  totalParcelas2: string;
  jurosMt: string;
  dividaTotal: string;
  multaDiaMt: string;
  totalParcelasMt: string;
  totalParcelas2Mt: string;
  recAmort: string;
  totalDivida: string;
  recJuros: string;
  atrasoVMt: string;
  atrasoV: string;
  value: string;
};
const columnHelper = createColumnHelper<TodoItem>();
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
            totalEmprestimo: `${parseFloat(item.totalEmprestimo).toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
              }
            )}`,
            jurosEmprestimo: `${item.jurosEmprestimo}%`,
            jurosMt: `${(
              (parseFloat(item.jurosEmprestimo) / 100) *
              parseFloat(item.totalEmprestimo)
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`,
            dividaTotal: `${(
              parseFloat(item.totalEmprestimo) +
              (parseFloat(item.jurosEmprestimo) / 100) *
                parseFloat(item.totalEmprestimo)
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`,
            totalParcelas: item.totalParcelas,
            totalParcelasMt: `${(
              ((parseFloat(item.totalEmprestimo) +
                (parseFloat(item.jurosEmprestimo) / 100) *
                  parseFloat(item.totalEmprestimo)) /
                parseFloat(item.totalParcelas)) *
              parseFloat(item.totalParcelas2)
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`,
            totalParcelas2: parcelasTT,
            totalParcelas2Mt: `${(
              ((parseFloat(item.totalEmprestimo) +
                (parseFloat(item.jurosEmprestimo) / 100) *
                  parseFloat(item.totalEmprestimo)) /
                parseFloat(item.totalParcelas)) *
              parcelasTT
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`,
            recAmort: `${(
              (parseFloat(item.totalEmprestimo) /
                parseFloat(item.totalParcelas)) *
              parcelasTT
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`,
            recJuros: `${(
              (((parseFloat(item.jurosEmprestimo) / 100) *
                parseFloat(item.totalEmprestimo)) /
                parseFloat(item.totalParcelas)) *
              parcelasTT
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`,
            atraso: tAtraso,
            atrasoV: tAtrasoVV,
            atrasoVMt: `${tAtrasoVV.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`,
            multaDia: `${item.multaDia}%`,
            totalDivida: `${(
              parseFloat(item.totalEmprestimo) +
              (parseFloat(item.jurosEmprestimo) / 100) *
                parseFloat(item.totalEmprestimo) -
              ((parseFloat(item.totalEmprestimo) +
                (parseFloat(item.jurosEmprestimo) / 100) *
                  parseFloat(item.totalEmprestimo)) /
                parseFloat(item.totalParcelas)) *
                parcelasTT +
              tAtraso
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`,
            multaDiaMt: `${(
              (parseFloat(item.multaDia) / 100) *
              parseFloat(item.totalEmprestimo)
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`,
            createdAt: item.createdAt.substring(0, 10),
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
  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (info) => info.getValue(),
      header: "Data",
    }),
    columnHelper.accessor("nomeCompleto", {
      cell: (info) => info.getValue(),
      header: "Nome Cliente",
    }),
    columnHelper.accessor("totalEmprestimo", {
      cell: (info) => info.getValue(),
      header: "Empréstimo",
    }),
    columnHelper.accessor("jurosEmprestimo", {
      cell: (info) => info.getValue(),
      header: "Juros(%)",
    }),
    columnHelper.accessor("jurosMt", {
      cell: (info) => info.getValue(),
      header: "Juros(Mt)",
    }),
    columnHelper.accessor("dividaTotal", {
      cell: (info) => info.getValue(),
      header: "Dívida Total",
    }),
    columnHelper.accessor("multaDia", {
      cell: (info) => info.getValue(),
      header: "Multa % Dia",
    }),
    columnHelper.accessor("multaDiaMt", {
      cell: (info) => info.getValue(),
      header: "Multa (Mt) Dia",
    }),
    columnHelper.accessor("totalParcelas", {
      cell: (info) => info.getValue(),
      header: "Parcelas",
    }),
    columnHelper.accessor("totalParcelas2", {
      cell: (info) => info.getValue(),
      header: "P. Quitadas",
    }),
    columnHelper.accessor("totalParcelas2Mt", {
      cell: (info) => info.getValue(),
      header: "P. Quitadas(Mt)",
    }),
    columnHelper.accessor("recAmort", {
      cell: (info) => info.getValue(),
      header: "Rec. Amort",
    }),
    columnHelper.accessor("recJuros", {
      cell: (info) => info.getValue(),
      header: "Rec. Juros",
    }),
    columnHelper.accessor("atrasoV", {
      cell: (info) => info.getValue(),
      header: "T. Atraso",
    }),
    columnHelper.accessor("atrasoVMt", {
      cell: (info) => info.getValue(),
      header: "T. Atraso(Mt)",
    }),
    columnHelper.accessor("totalDivida", {
      cell: (info) => info.getValue(),
      header: "Dívida Actual",
    }),
  ];
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
          <DataTable
            columns={columns}
            data={emprestimoLista}
            title="Tabela dos Lançamentos"
          />
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default Lancamentos;
