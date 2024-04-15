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

const NovaEntradaSaida = () => {
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
  const [processando, setProcessando] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [totalEmprestimo, setTotalEmprestimo] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [totalParcelas, setTotalParcelas] = useState("");
  const [totalParcelasBaseDados, setTotalParcelasBaseDados] = useState("");
  const [tipoLancamento, setTipoLancamento] = useState("");
  const [tempoPagamento, setTempoPagamento] = useState("");
  var funcionariosVolatel: any = [];
  useEffect(() => {
    funcionariosVolatel = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosLancamentos`, {
        cache: "no-store",
      });
      const data = await response.json();
      data.map((funcionario: any) => {
        funcionariosVolatel.push(funcionario.nomeCompleto);
      });
      setEmprestimoLista(data);
      setClientesLista(funcionariosVolatel);
    };
    if (session?.user) fetchPosts();
  }, [session?.user]);
  useEffect(() => {
    emprestimoLista.map((lect: any) => {
      if (nomeCompleto === lect.nomeCompleto) {
        setTotalEmprestimo(lect.totalEmprestimo);
        setTotalParcelasBaseDados(lect.totalParcelas);
      }
    });
  }, [nomeCompleto]);
  function novoLancamento() {
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
        tipoLancamento === "" ||
        tempoPagamento === "" ||
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
        toast("Registrando a Entrada ou Saída", {
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
          const response = fetch("/api/novaEntradaSaida", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nomeCompleto,
              tipoLancamento,
              tempoPagamento,
              totalParcelas,
              totalEmprestimo,
              totalParcelasBaseDados,
              userId: session?.user?.email,
            }),
          });

          setProcessando(false);
          setFormularioEnviado(true);
          toast("Entrada ou Saída Registrada Com Sucesso!", {
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
          setTipoLancamento("");
          setTempoPagamento("");
          setTotalParcelas("");
          router.push("/entradaSaida");
        } catch (error) {
          toast("Erro ao Registrar Entrada ou Saída!", {
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
      toast("Faça LogIn Para Poder Registrar Entrada ou Saída!", {
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
  return (
    <Box>
      <NavBar />
      <Box py={16} mr={16} ml={16}>
        <Flex direction="column" align="center" mb={10}>
          <Heading
            size="xl"
            color={colorMode === "light" ? "gray.700" : "white"}
          >
            Lançar Nova Entrada ou Saída de Saldo
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
              Tipo de Lançamento
            </Text>
            <Select
              placeholder="Tipo de Lançamento"
              value={tipoLancamento}
              onChange={(e) => setTipoLancamento(e.target.value)}
            >
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </Select>
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Total de Parcelas Pagas
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
              Tempo do Pagamento
            </Text>
            <Select
              placeholder="Tempo do Pagamento"
              value={tempoPagamento}
              onChange={(e) => setTempoPagamento(e.target.value)}
            >
              <option value="A Tempo">A Tempo</option>
              <option value="Com Atraso">Com Atraso</option>
            </Select>
            <hr />
            <br />
            {processando ? (
              <>
                <small>Enviando...</small>
              </>
            ) : (
              <>
                <Button colorScheme="blue" onClick={() => novoLancamento()}>
                  Confirmar
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

export default NovaEntradaSaida;
