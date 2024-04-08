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
  const [processando, setProcessando] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeCompletoAvalista, setNomeCompletoAvalista] = useState("");
  const [bI, setBI] = useState("");
  const [bIAvalista, setBIAvalista] = useState("");
  const [contacto, setContacto] = useState("");
  const [contactoAvalista, setContactoAvalista] = useState("");
  const [saldo, setSaldo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [enderecoAvalista, setEnderecoAvalista] = useState("");
  const [numeroQuarteirao, setNumeroQuarteirao] = useState("");
  const [numeroQuarteiraoAvalista, setNumeroQuarteiraoAvalista] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [numeroCasaAvalista, setNumeroCasaAvalista] = useState("");
  const [bairroAvalista, setBairroAvalista] = useState("");
  const [bairro, setBairro] = useState("");
  const [distrito, setDistrito] = useState("");
  const [distritoAvalista, setDistritoAvalista] = useState("");
  const [fonteRendimento, setFonteRendimento] = useState("");
  const [garantias, setGarantias] = useState("");
  const [genero2, setGenero2] = useState("");
  const [genero2Avalista, setGenero2Avalista] = useState("");
  const [nUIT, setNUIT] = useState("");
  const [nUITAvalista, setNUITAvalista] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [dataNascimentoAvalista, setDataNascimentoAvalista] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [nacionalidadeAvalista, setNacionalidadeAvalista] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [estadoCivilAvalista, setEstadoCivilAvalista] = useState("");
  const [status, setStatus] = useState(false);

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
        nomeCompletoAvalista === "" ||
        bI === "" ||
        bIAvalista === "" ||
        contacto === "" ||
        contactoAvalista === "" ||
        saldo === "" ||
        endereco === "" ||
        enderecoAvalista === "" ||
        numeroQuarteirao === "" ||
        numeroQuarteiraoAvalista === "" ||
        numeroCasa === "" ||
        numeroCasaAvalista === "" ||
        bairro === "" ||
        bairroAvalista === "" ||
        distrito === "" ||
        distritoAvalista === "" ||
        fonteRendimento === "" ||
        garantias === "" ||
        genero2 === "" ||
        genero2Avalista === "" ||
        nUIT === "" ||
        nUITAvalista === "" ||
        dataNascimentoAvalista === "" ||
        dataNascimento === "" ||
        dataNascimentoAvalista === "" ||
        nacionalidade === "" ||
        nacionalidadeAvalista === "" ||
        estadoCivil === "" ||
        estadoCivilAvalista === ""
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
          const response = fetch("/api/emprestimoSolicitado", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nomeCompleto,
              nomeCompletoAvalista,
              bI,
              bIAvalista,
              contacto,
              contactoAvalista,
              saldo,
              endereco,
              enderecoAvalista,
              numeroQuarteirao,
              numeroQuarteiraoAvalista,
              numeroCasa,
              numeroCasaAvalista,
              bairro,
              bairroAvalista,
              distrito,
              distritoAvalista,
              fonteRendimento,
              garantias,
              genero2,
              genero2Avalista,
              nUIT,
              nUITAvalista,
              dataNascimento,
              dataNascimentoAvalista,
              nacionalidade,
              nacionalidadeAvalista,
              estadoCivil,
              estadoCivilAvalista,
              status,
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
          setNomeCompletoAvalista("");
          setBI("");
          setBIAvalista("");
          setContacto("");
          setContactoAvalista("");
          setSaldo("");
          setEndereco("");
          setEnderecoAvalista("");
          setNumeroQuarteirao("");
          setNumeroQuarteiraoAvalista("");
          setNumeroCasa("");
          setNumeroCasaAvalista("");
          setBairroAvalista("");
          setBairro("");
          setDistrito("");
          setDistritoAvalista("");
          setFonteRendimento("");
          setGarantias("");
          setGenero2("");
          setGenero2Avalista("");
          setNUIT("");
          setNUITAvalista("");
          setDataNascimento("");
          setDataNascimentoAvalista("");
          setNacionalidade("");
          setNacionalidadeAvalista("");
          setEstadoCivil("");
          setEstadoCivilAvalista("");
          router.push("/");
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
  return (
    <Box>
      <NavBar />
      <Box py={16} mr={16} ml={16}>
        <Flex direction="column" align="center" mb={10}>
          <Heading
            size="xl"
            color={colorMode === "light" ? "gray.700" : "white"}
          >
            Fomulário de Pré-Registro Para Solicitação de Emprestimo
          </Heading>
          <Text mt={2} color={colorMode === "light" ? "gray.600" : "gray.400"}>
            Preencha o formulário para solicitar o seu emprestimo.
          </Text>
          <br />
          <br />
          <Container maxW="container.sm" color="red">
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Nome Completo
            </Text>
            <Input
              placeholder="Nome Completo"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
            />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Número de BI
            </Text>
            <Input
              placeholder="Número de BI"
              value={bI}
              onChange={(e) => setBI(e.target.value)}
            />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              NUIT
            </Text>
            <NumberInput>
              <NumberInputField
                value={nUIT}
                onChange={(e) => setNUIT(e.target.value)}
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
              Contacto
            </Text>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon>+258</InputLeftAddon>
                <NumberInput>
                  <NumberInputField
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </Stack>
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Data de Nascimento
            </Text>
            <Input
              placeholder="Data de Nascimento"
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Gênero
            </Text>
            <Select
              placeholder="Gênero"
              value={genero2}
              onChange={(e) => setGenero2(e.target.value)}
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </Select>
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Nacionalidade
            </Text>
            <Input
              placeholder="Nacionalidade"
              value={nacionalidade}
              onChange={(e) => setNacionalidade(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Estado Civil
            </Text>
            <Select
              placeholder="Estado Civil"
              value={estadoCivil}
              onChange={(e) => setEstadoCivil(e.target.value)}
            >
              <option value="Solteiro(a)">Solteiro(a)</option>
              <option value="Casado(a)">Casado(a)</option>
            </Select>
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Residência
            </Text>
            <Input
              placeholder="Residência"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Distrito Municipal
            </Text>
            <Input
              placeholder="Distrito Municipal"
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Bairro
            </Text>
            <Input
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Número do Quarteirão
            </Text>
            <Input
              placeholder="Número do Quarteirão"
              value={numeroQuarteirao}
              onChange={(e) => setNumeroQuarteirao(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Número da Casa
            </Text>
            <Input
              placeholder="Número da Casa"
              value={numeroCasa}
              onChange={(e) => setNumeroCasa(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Fonte de Rendimento
            </Text>
            <Input
              placeholder="Fonte de Rendimento"
              value={fonteRendimento}
              onChange={(e) => setFonteRendimento(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Valor do Emprestimo a Solicitar
            </Text>
            <NumberInput>
              <NumberInputField
                value={saldo}
                onChange={(e) => setSaldo(e.target.value)}
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
              Garantias de Pagamento do Emprestimo
            </Text>
            <Input
              placeholder="Garantias de Pagamento do Emprestimo"
              value={garantias}
              onChange={(e) => setGarantias(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              align="center"
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Dados do Avalista.
            </Text>
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Nome Completo
            </Text>
            <Input
              placeholder="Nome Completo"
              value={nomeCompletoAvalista}
              onChange={(e) => setNomeCompletoAvalista(e.target.value)}
            />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Número de BI
            </Text>
            <Input
              placeholder="Número de BI"
              value={bIAvalista}
              onChange={(e) => setBIAvalista(e.target.value)}
            />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              NUIT
            </Text>
            <NumberInput>
              <NumberInputField
                value={nUITAvalista}
                onChange={(e) => setNUITAvalista(e.target.value)}
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
              Contacto
            </Text>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon>+258</InputLeftAddon>
                <NumberInput>
                  <NumberInputField
                    value={contactoAvalista}
                    onChange={(e) => setContactoAvalista(e.target.value)}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </Stack>
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Data de Nascimento
            </Text>
            <Input
              placeholder="Data de Nascimento"
              type="date"
              value={dataNascimentoAvalista}
              onChange={(e) => setDataNascimentoAvalista(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Gênero
            </Text>
            <Select
              placeholder="Gênero"
              value={genero2Avalista}
              onChange={(e) => setGenero2Avalista(e.target.value)}
            >
              <option value="option1">Masculino</option>
              <option value="option2">Femenino</option>
            </Select>
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Nacionalidade
            </Text>
            <Input
              placeholder="Nacionalidade"
              value={nacionalidadeAvalista}
              onChange={(e) => setNacionalidadeAvalista(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Estado Civil
            </Text>
            <Select
              placeholder="Estado Civil"
              value={estadoCivilAvalista}
              onChange={(e) => setEstadoCivilAvalista(e.target.value)}
            >
              <option value="option1">Solteiro(a)</option>
              <option value="option2">Casado(a)</option>
            </Select>
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Residência
            </Text>
            <Input
              placeholder="Residência"
              value={enderecoAvalista}
              onChange={(e) => setEnderecoAvalista(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Distrito Municipal
            </Text>
            <Input
              placeholder="Distrito Municipal"
              value={distritoAvalista}
              onChange={(e) => setDistritoAvalista(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Bairro
            </Text>
            <Input
              placeholder="Bairro"
              value={bairroAvalista}
              onChange={(e) => setBairroAvalista(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Número do Quarteirão
            </Text>
            <Input
              placeholder="Número do Quarteirão"
              value={numeroQuarteiraoAvalista}
              onChange={(e) => setNumeroQuarteiraoAvalista(e.target.value)}
            />
            <br />
            <br />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Número da Casa
            </Text>
            <Input
              placeholder="Número da Casa"
              value={numeroCasaAvalista}
              onChange={(e) => setNumeroCasaAvalista(e.target.value)}
            />
            <br />
            <br />
            <small>
              Nota: Os dados fornecidos serão usados para avaliar o seu pedido,
              garanta que os mesmo estejam correctamente preenchidos...
            </small>
            <br />
            <br />
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
