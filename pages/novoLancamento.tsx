"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  Button,
  Link,
  Input,
  Container,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  InputGroup,
  InputLeftAddon,
  Select,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";

const SolicitarEmprestimo = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  var volatelEmpr = [];
  var incrMet = 0;
  var investTotal = 0;
  var jurosFuturo = 0;
  var recPrincipalTotal = 0;
  var recJurosTotal = 0;
  var totalDivida = 0;
  var totalDividaAtrasado = 0;
  const { data: session } = useSession();
  const [emprestimoLista, setEmprestimoLista] = useState([]);
  const [clientesLista, setClientesLista] = useState([]);
  const [cNomesLista, setCNomesLista] = useState([]);
  const [processando, setProcessando] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [jurosEmprestimo, setJurosEmprestimo] = useState("");
  const [totalEmprestimo, setTotalEmprestimo] = useState("");
  const [totalParcelas, setTotalParcelas] = useState("");
  const [multaDia, setMultaDia] = useState("");
  const [isNomeIncluded, setIsNomeIncluded] = useState(false);
  const [isLancar, setIsLancar] = useState(false);
  var funcionariosVolatel: any = [];
  var listaVolatelNomes: any = [];
  useEffect(() => {
    funcionariosVolatel = [];
    listaVolatelNomes = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosEmprestimos`, {
        cache: "no-store",
      });
      const response2 = await fetch(`/api/todosLancamentos`, {
        cache: "no-store",
      });
      const data = await response.json();
      const data2 = await response2.json();
      data.map((funcionario: any) => {
        funcionariosVolatel.push(funcionario.nomeCompleto);
      });
      data2.map((item: any) => {
        if (listaVolatelNomes.includes(item.nomeCompleto)) {
        } else {
          listaVolatelNomes.push(item.nomeCompleto);
        }
      });
      setEmprestimoLista(data);
      setClientesLista(funcionariosVolatel);
      setCNomesLista(listaVolatelNomes);
    };
    if (session?.user) fetchPosts();
  }, [session?.user]);
  useEffect(() => {
    emprestimoLista.map((lect: any) => {
      if (nomeCompleto === lect.nomeCompleto) {
        if (lect.status) {
          setTotalEmprestimo(lect.saldo);
        } else {
          toast("Emprestimo Não Aprovado", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    });
  }, [nomeCompleto]);
  function novoLancamento() {
    var listaVolatelNomesVolatel: any = [];
    cNomesLista.map((item) => {
      if (listaVolatelNomesVolatel.includes(item)) {
      } else {
        listaVolatelNomesVolatel.push(item);
      }
    });
    if (listaVolatelNomesVolatel.includes(nomeCompleto)) {
      toast(`Já existe um lançamento com o nome ${nomeCompleto}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      if (true) {
        setProcessando(true);
        if (session?.user?.email) {
          toast("Processando", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          if (
            nomeCompleto === "" ||
            jurosEmprestimo === "" ||
            totalEmprestimo === "" ||
            multaDia === "" ||
            totalParcelas === ""
          ) {
            toast("Todos os campos devem ser preenchidos", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setProcessando(false);
          } else {
            toast("Enviando Solicitação de Emprestimo", {
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
              const response = fetch("/api/novoLancamento", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  nomeCompleto,
                  totalEmprestimo,
                  jurosEmprestimo,
                  totalParcelas,
                  multaDia,
                  userId: session?.user?.email,
                }),
              });

              setProcessando(false);
              setFormularioEnviado(true);
              toast("Solicitação Enviada", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setNomeCompleto("");
              setJurosEmprestimo("");
              setTotalEmprestimo("");
              setTotalParcelas("");
              setMultaDia("");
              router.push("/lancamentos");
            } catch (error) {
              toast("Erro ao enviar pedido!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setProcessando(false);
            }
          }
        } else {
          toast("Faça LogIn Para Poder Submeter o Pedido!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }
  }
  return (
    <Box>
      <NavBar />
      <Box py={16} mr={16} ml={16}>
        <Flex direction="column" align="center" mb={10}>
          <Heading
            size="xl"
            color={colorMode === "light" ? "gray.700" : "white"}
          >
            Lançamento de Novo Emprestimo
          </Heading>
          <br />
          <br />
          <Container maxW="container.sm" color="red">
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Nome do Cliente
            </Text>
            <Select
              placeholder="Nome do Cliente"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
            >
              {clientesLista.length > 0 &&
                clientesLista.map((func) => (
                  <option key={func} value={func}>
                    {func}
                  </option>
                ))}
            </Select>
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Total do Emprestimo
            </Text>
            <Input
              placeholder="Total do Emprestimo"
              value={totalEmprestimo}
              onChange={(e) => setTotalEmprestimo(e.target.value)}
            />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Juros do Emprestimo(%)
            </Text>
            <Input
              placeholder="Juros do Emprestimo(%)"
              value={jurosEmprestimo}
              onChange={(e) => setJurosEmprestimo(e.target.value)}
            />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Total de Parcelas
            </Text>
            <NumberInput>
              <NumberInputField
                value={totalParcelas}
                onChange={(e) => setTotalParcelas(e.target.value)}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Multa por Atrazo
            </Text>
            <NumberInput>
              <NumberInputField
                value={multaDia}
                onChange={(e) => setMultaDia(e.target.value)}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <hr />
            <br />
            {processando ? (
              <>
                <small>Enviando...</small>
              </>
            ) : (
              <>
                <Button colorScheme="blue" onClick={() => novoLancamento()}>
                  Submeter Pedido
                </Button>
              </>
            )}
          </Container>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default SolicitarEmprestimo;
