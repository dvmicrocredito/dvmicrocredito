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
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PDFContrato from "../components/PDFContrato";
import EditarEmprestimo from "./EditarEmprestimo";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
var listaVolatel: any = [];
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../components/TDataTableEntradaSaida/DataTable";
type TodoItem = {
  id: number;
  bI: string;
  nomeCompleto: string;
  nUIT: string;
  value: string;
  contacto: string;
  dataNascimento: string;
  nacionalidade: string;
  estadoCivil: string;
  endereco: string;
  fonteRendimento: string;
  saldo: string;
  status: string;
  anexos: string;
};
const columnHelper = createColumnHelper<TodoItem>();
const columns = [
  columnHelper.accessor("nomeCompleto", {
    cell: (info) => info.getValue(),
    header: "Nome Completo",
  }),
  columnHelper.accessor("bI", {
    cell: (info) => info.getValue(),
    header: "Número de BI",
  }),
  columnHelper.accessor("nUIT", {
    cell: (info) => info.getValue(),
    header: "NUIT",
  }),
  columnHelper.accessor("contacto", {
    cell: (info) => info.getValue(),
    header: "Contacto",
  }),
  columnHelper.accessor("dataNascimento", {
    cell: (info) => info.getValue(),
    header: "Data de Nascimento",
  }),
  columnHelper.accessor("nacionalidade", {
    cell: (info) => info.getValue(),
    header: "Nacionalidade",
  }),
  columnHelper.accessor("estadoCivil", {
    cell: (info) => info.getValue(),
    header: "Estado Civil",
  }),
  columnHelper.accessor("endereco", {
    cell: (info) => info.getValue(),
    header: "Residência",
  }),
  columnHelper.accessor("fonteRendimento", {
    cell: (info) => info.getValue(),
    header: "Fonte de Rendimento",
  }),
  columnHelper.accessor("saldo", {
    cell: (info) => info.getValue(),
    header: "Emprestimo a Solicitado",
  }),
  columnHelper.accessor("anexos", {
    cell: (info) => info.getValue(),
    header: "Anexos",
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    header: "Status",
  }),
];

function EmprestimosSolicitados() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { data: session } = useSession();
  const [emprestimoLista, setEmprestimoLista] = useState<any[]>([]);
  const [processando, setProcessando] = useState(false);
  useEffect(() => {
    listaVolatel = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosEmprestimos`, {
        cache: "no-store",
      });
      const data = await response.json();
      data.map((item: any) => {
        var anexoT = item.anexos.map((anexo: any) => (
          <>
            {" "}
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={anexo.link}
            >
              Anexo
            </Button>{" "}
            |
          </>
        ));
        var statusT = item.status ? (
          <>
            <td>
              Aprovado |{" "}
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"red.400"}
                onClick={() =>
                  gerarPDF(
                    item.nomeCompleto,
                    item.nomeCompletoAvalista,
                    item.bI,
                    item.bIAvalista,
                    item.contacto,
                    item.contactoAvalista,
                    item.saldo,
                    item.endereco,
                    item.enderecoAvalista,
                    item.numeroQuarteirao,
                    item.numeroQuarteiraoAvalista,
                    item.numeroCasa,
                    item.numeroCasaAvalista,
                    item.bairro,
                    item.bairroAvalista,
                    item.distrito,
                    item.distritoAvalista,
                    item.fonteRendimento,
                    item.garantias,
                    item.genero2,
                    item.genero2Avalista,
                    item.nUIT,
                    item.nUITAvalista,
                    item.dataNascimento,
                    item.dataNascimentoAvalista,
                    item.nacionalidade,
                    item.nacionalidadeAvalista,
                    item.estadoCivil,
                    item.estadoCivilAvalista,
                    item.juro
                  )
                }
                _hover={{
                  bg: "blue.500",
                }}
              >
                Contracto
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.400"}
                onClick={() => EditarEmp(item._id)}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Editar
              </Button>
            </td>
          </>
        ) : (
          <>
            <td>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.400"}
                onClick={() =>
                  verLisa(
                    item._id,
                    item.nomeCompleto,
                    item.nomeCompletoAvalista,
                    item.bI,
                    item.bIAvalista,
                    item.contacto,
                    item.contactoAvalista,
                    item.saldo,
                    item.endereco,
                    item.enderecoAvalista,
                    item.numeroQuarteirao,
                    item.numeroQuarteiraoAvalista,
                    item.numeroCasa,
                    item.numeroCasaAvalista,
                    item.bairro,
                    item.bairroAvalista,
                    item.distrito,
                    item.distritoAvalista,
                    item.fonteRendimento,
                    item.garantias,
                    item.genero2,
                    item.genero2Avalista,
                    item.nUIT,
                    item.nUITAvalista,
                    item.dataNascimento,
                    item.dataNascimentoAvalista,
                    item.nacionalidade,
                    item.nacionalidadeAvalista,
                    item.estadoCivil,
                    item.estadoCivilAvalista
                  )
                }
                _hover={{
                  bg: "red.500",
                }}
              >
                Aprovar Pedido
              </Button>
            </td>
          </>
        );
        listaVolatel.push({
          nomeCompleto: item.nomeCompleto,
          bI: item.bI,
          nUIT: item.nUIT,
          contacto: item.contacto,
          dataNascimento: item.dataNascimento,
          nacionalidade: item.nacionalidade,
          estadoCivil: item.estadoCivil,
          endereco: item.endereco,
          fonteRendimento: item.fonteRendimento,
          saldo: `${parseFloat(item.saldo).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })} Mt`,
          anexos: anexoT,
          status: statusT,
        });
      });
      setEmprestimoLista(listaVolatel);
    };
    if (session?.user) fetchPosts();
  }, [session?.user]);
  function verLisa(
    id: any,
    nomeCompleto: any,
    nomeCompletoAvalista: any,
    bI: any,
    bIAvalista: any,
    contacto: any,
    contactoAvalista: any,
    saldo: any,
    endereco: any,
    enderecoAvalista: any,
    numeroQuarteirao: any,
    numeroQuarteiraoAvalista: any,
    numeroCasa: any,
    numeroCasaAvalista: any,
    bairro: any,
    bairroAvalista: any,
    distrito: any,
    distritoAvalista: any,
    fonteRendimento: any,
    garantias: any,
    genero2: any,
    genero2Avalista: any,
    nUIT: any,
    nUITAvalista: any,
    dataNascimento: any,
    dataNascimentoAvalista: any,
    nacionalidade: any,
    nacionalidadeAvalista: any,
    estadoCivil: any,
    estadoCivilAvalista: any
  ) {
    toast("Actualizando...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    try {
      const response = fetch(`/api/${id}/updatepedido`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idVerify: id,
          nomeCompleto: nomeCompleto,
          nomeCompletoAvalista: nomeCompletoAvalista,
          bI: bI,
          bIAvalista: bIAvalista,
          contacto: contacto,
          contactoAvalista: contactoAvalista,
          saldo: saldo,
          endereco: endereco,
          enderecoAvalista: enderecoAvalista,
          numeroQuarteirao: numeroQuarteirao,
          numeroQuarteiraoAvalista: numeroQuarteiraoAvalista,
          numeroCasa: numeroCasa,
          numeroCasaAvalista: numeroCasaAvalista,
          bairro: bairro,
          bairroAvalista: bairroAvalista,
          distrito: distrito,
          distritoAvalista: distritoAvalista,
          fonteRendimento: fonteRendimento,
          garantias: garantias,
          genero2: genero2,
          genero2Avalista: genero2Avalista,
          nUIT: nUIT,
          nUITAvalista: nUITAvalista,
          dataNascimento: dataNascimento,
          dataNascimentoAvalista: dataNascimentoAvalista,
          nacionalidade: nacionalidade,
          nacionalidadeAvalista: nacionalidadeAvalista,
          estadoCivil: estadoCivil,
          estadoCivilAvalista: estadoCivilAvalista,
          status: true,
          userId: session?.user?.email,
        }),
      });
      toast(`O Emprestimo do(a) ${nomeCompleto} foi actualizado com sucesso!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.reload();
    } catch (error) {
      setProcessando(false);
    }
  }
  async function gerarPDF(
    nomeCompleto: any,
    nomeCompletoAvalista: any,
    bI: any,
    bIAvalista: any,
    contacto: any,
    contactoAvalista: any,
    saldo: any,
    endereco: any,
    enderecoAvalista: any,
    numeroQuarteirao: any,
    numeroQuarteiraoAvalista: any,
    numeroCasa: any,
    numeroCasaAvalista: any,
    bairro: any,
    bairroAvalista: any,
    distrito: any,
    distritoAvalista: any,
    fonteRendimento: any,
    garantias: any,
    genero2: any,
    genero2Avalista: any,
    nUIT: any,
    nUITAvalista: any,
    dataNascimento: any,
    dataNascimentoAvalista: any,
    nacionalidade: any,
    nacionalidadeAvalista: any,
    estadoCivil: any,
    estadoCivilAvalista: any,
    juro: any
  ) {
    PDFContrato({
      nomeCompleto: nomeCompleto,
      nomeCompletoAvalista: nomeCompletoAvalista,
      bI: bI,
      bIAvalista: bIAvalista,
      contacto: contacto,
      contactoAvalista: contactoAvalista,
      saldo: saldo,
      endereco: endereco,
      enderecoAvalista: enderecoAvalista,
      numeroQuarteirao: numeroQuarteirao,
      numeroQuarteiraoAvalista: numeroQuarteiraoAvalista,
      numeroCasa: numeroCasa,
      numeroCasaAvalista: numeroCasaAvalista,
      bairro: bairro,
      bairroAvalista: bairroAvalista,
      distrito: distrito,
      distritoAvalista: distritoAvalista,
      fonteRendimento: fonteRendimento,
      garantias: garantias,
      genero2: genero2,
      genero2Avalista: genero2Avalista,
      nUIT: nUIT,
      nUITAvalista: nUITAvalista,
      dataNascimento: dataNascimento,
      dataNascimentoAvalista: dataNascimentoAvalista,
      nacionalidade: nacionalidade,
      nacionalidadeAvalista: nacionalidadeAvalista,
      estadoCivil: estadoCivil,
      estadoCivilAvalista: estadoCivilAvalista,
      juro: juro,
    });
  }
  function EditarEmp(id: any) {
    toast(`Processando...`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    emprestimoLista.map((emprestimo) => {
      if (emprestimo._id === id) {
        localStorage.setItem("id", id);
        localStorage.setItem("nomeCompleto", `${emprestimo.nomeCompleto}`);
        localStorage.setItem(
          "nomeCompletoAvalista",
          `${emprestimo.nomeCompletoAvalista}`
        );
        localStorage.setItem("bI", `${emprestimo.bI}`);
        localStorage.setItem("bIAvalista", `${emprestimo.bIAvalista}`);
        localStorage.setItem("contacto", `${emprestimo.contacto}`);
        localStorage.setItem(
          "contactoAvalista",
          `${emprestimo.contactoAvalista}`
        );
        localStorage.setItem("saldo", `${emprestimo.saldo}`);
        localStorage.setItem("endereco", `${emprestimo.endereco}`);
        localStorage.setItem(
          "enderecoAvalista",
          `${emprestimo.enderecoAvalista}`
        );
        localStorage.setItem(
          "numeroQuarteirao",
          `${emprestimo.numeroQuarteirao}`
        );
        localStorage.setItem(
          "numeroQuarteiraoAvalista",
          `${emprestimo.numeroQuarteiraoAvalista}`
        );
        localStorage.setItem("numeroCasa", `${emprestimo.numeroCasa}`);
        localStorage.setItem(
          "numeroCasaAvalista",
          `${emprestimo.numeroCasaAvalista}`
        );
        localStorage.setItem("bairroAvalista", `${emprestimo.bairroAvalista}`);
        localStorage.setItem("bairro", `${emprestimo.bairro}`);
        localStorage.setItem("distrito", `${emprestimo.distrito}`);
        localStorage.setItem(
          "distritoAvalista",
          `${emprestimo.distritoAvalista}`
        );
        localStorage.setItem(
          "fonteRendimento",
          `${emprestimo.fonteRendimento}`
        );
        localStorage.setItem("garantias", `${emprestimo.garantias}`);
        localStorage.setItem("genero2", `${emprestimo.genero2}`);
        localStorage.setItem(
          "genero2Avalista",
          `${emprestimo.genero2Avalista}`
        );
        localStorage.setItem("nUIT", `${emprestimo.nUIT}`);
        if (emprestimo.juro) {
          localStorage.setItem("juro", `${emprestimo.juro}`);
        } else {
          localStorage.setItem("juro", "0");
        }

        localStorage.setItem("nUITAvalista", `${emprestimo.nUITAvalista}`);
        localStorage.setItem("dataNascimento", `${emprestimo.dataNascimento}`);
        localStorage.setItem(
          "dataNascimentoAvalista",
          `${emprestimo.dataNascimentoAvalista}`
        );
        localStorage.setItem("nacionalidade", `${emprestimo.nacionalidade}`);
        localStorage.setItem(
          "nacionalidadeAvalista",
          `${emprestimo.nacionalidadeAvalista}`
        );
        localStorage.setItem("estadoCivil", `${emprestimo.estadoCivil}`);
        localStorage.setItem(
          "estadoCivilAvalista",
          `${emprestimo.estadoCivilAvalista}`
        );
        router.push("/EditarEmprestimo");
      } else {
        // toast(`Erro ao carregar formulário!`, {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    });
  }
  return (
    <Box>
      <NavBar />
      <Box py={16} mr={16} ml={16}>
        <Flex direction="column" align="center" mb={10}>
          <Stack direction="row" spacing={6} mt={4}>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"red.400"}
              href={"/solicitarEmprestimo"}
              _hover={{
                bg: "red.500",
              }}
            >
              Novo Emprestimo
            </Button>
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
            Emprestimos Solicitados
          </Heading>
          <DataTable
            columns={columns}
            data={emprestimoLista}
            title="Tabela dos Emprestimos Solicitados"
          />
          {/* <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>DV Microcrédito</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nome Completo</Th>
                  <Th>Número de BI</Th>
                  <Th>NUIT</Th>
                  <Th>Contacto</Th>
                  <Th>Data de Nascimento</Th>
                  <Th>Nacionalidade</Th>
                  <Th>Estado Civil</Th>
                  <Th>Residência</Th>
                  <Th>Fonte de Rendimento</Th>
                  <Th>Emprestimo a Solicitado</Th>
                  <Th>Anexos</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {emprestimoLista.length > 0 &&
                  emprestimoLista.map((ddf) => (
                    <>
                      <tr>
                        <td>
                          <Box mx={4}>{ddf.nomeCompleto}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.bI}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.nUIT}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.contacto}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.dataNascimento}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.nacionalidade}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.estadoCivil}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.endereco}</Box>
                        </td>
                        <td>
                          <Box mx={4}>{ddf.fonteRendimento}</Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {parseFloat(ddf.saldo).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            Mt
                          </Box>
                        </td>
                        <td>
                          <Box mx={4}>
                            {ddf.anexos.map((anexo: any) => (
                              <>
                                {" "}
                                <Button
                                  as={"a"}
                                  fontSize={"sm"}
                                  fontWeight={400}
                                  variant={"link"}
                                  href={anexo.link}
                                >
                                  Anexo
                                </Button>{" "}
                                |
                              </>
                            ))}
                          </Box>
                        </td>
                        {ddf.status ? (
                          <>
                            <td>
                              Aprovado |{" "}
                              <Button
                                as={"a"}
                                display={{ base: "none", md: "inline-flex" }}
                                fontSize={"sm"}
                                fontWeight={600}
                                color={"white"}
                                bg={"red.400"}
                                onClick={() =>
                                  gerarPDF(
                                    ddf.nomeCompleto,
                                    ddf.nomeCompletoAvalista,
                                    ddf.bI,
                                    ddf.bIAvalista,
                                    ddf.contacto,
                                    ddf.contactoAvalista,
                                    ddf.saldo,
                                    ddf.endereco,
                                    ddf.enderecoAvalista,
                                    ddf.numeroQuarteirao,
                                    ddf.numeroQuarteiraoAvalista,
                                    ddf.numeroCasa,
                                    ddf.numeroCasaAvalista,
                                    ddf.bairro,
                                    ddf.bairroAvalista,
                                    ddf.distrito,
                                    ddf.distritoAvalista,
                                    ddf.fonteRendimento,
                                    ddf.garantias,
                                    ddf.genero2,
                                    ddf.genero2Avalista,
                                    ddf.nUIT,
                                    ddf.nUITAvalista,
                                    ddf.dataNascimento,
                                    ddf.dataNascimentoAvalista,
                                    ddf.nacionalidade,
                                    ddf.nacionalidadeAvalista,
                                    ddf.estadoCivil,
                                    ddf.estadoCivilAvalista,
                                    ddf.juro
                                  )
                                }
                                _hover={{
                                  bg: "blue.500",
                                }}
                              >
                                Baixar Contacto
                              </Button>
                              <Button
                                as={"a"}
                                display={{ base: "none", md: "inline-flex" }}
                                fontSize={"sm"}
                                fontWeight={600}
                                color={"white"}
                                bg={"blue.400"}
                                onClick={() => EditarEmp(ddf._id)}
                                _hover={{
                                  bg: "blue.500",
                                }}
                              >
                                Editar
                              </Button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>
                              <Button
                                as={"a"}
                                display={{ base: "none", md: "inline-flex" }}
                                fontSize={"sm"}
                                fontWeight={600}
                                color={"white"}
                                bg={"blue.400"}
                                onClick={() =>
                                  verLisa(
                                    ddf._id,
                                    ddf.nomeCompleto,
                                    ddf.nomeCompletoAvalista,
                                    ddf.bI,
                                    ddf.bIAvalista,
                                    ddf.contacto,
                                    ddf.contactoAvalista,
                                    ddf.saldo,
                                    ddf.endereco,
                                    ddf.enderecoAvalista,
                                    ddf.numeroQuarteirao,
                                    ddf.numeroQuarteiraoAvalista,
                                    ddf.numeroCasa,
                                    ddf.numeroCasaAvalista,
                                    ddf.bairro,
                                    ddf.bairroAvalista,
                                    ddf.distrito,
                                    ddf.distritoAvalista,
                                    ddf.fonteRendimento,
                                    ddf.garantias,
                                    ddf.genero2,
                                    ddf.genero2Avalista,
                                    ddf.nUIT,
                                    ddf.nUITAvalista,
                                    ddf.dataNascimento,
                                    ddf.dataNascimentoAvalista,
                                    ddf.nacionalidade,
                                    ddf.nacionalidadeAvalista,
                                    ddf.estadoCivil,
                                    ddf.estadoCivilAvalista
                                  )
                                }
                                _hover={{
                                  bg: "red.500",
                                }}
                              >
                                Aprovar Pedido
                              </Button>
                            </td>
                          </>
                        )}
                      </tr>
                    </>
                  ))}
              </Tbody>
            </Table>
          </TableContainer> */}
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
}

export default EmprestimosSolicitados;
