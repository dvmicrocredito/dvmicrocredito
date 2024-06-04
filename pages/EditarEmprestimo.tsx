"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  Button,
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
  Image,
  Center,
  Square,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const anexosVolatel: any = [];
const listLinks: any = [];
const EditarEmprestimo = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { data: session } = useSession();
  const [emprestimoLista, setEmprestimoLista] = useState([]);
  const [anexosLista, setAnexosLista] = useState<any[]>([]);
  const [processando, setProcessando] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [isAnexos, setIsAnexos] = useState(true);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeCompletoAvalista, setNomeCompletoAvalista] = useState("");
  const [bI, setBI] = useState("");
  const [juro, setJuro] = useState("0");
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
  const [id, setId] = useState("");
  const [status, setStatus] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState();
  const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];
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
        if (listLinks.length === 0) {
          setProcessando(false);
          toast(
            "Deve anexar dois ou mais documentos ao formulario em formato de imagem...",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
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
                juro,
                userId: session?.user?.email,
              }),
            });
            toast(
              `O Emprestimo do(a) ${nomeCompleto} foi actualizado com sucesso!`,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            router.reload();
          } catch (error) {
            setProcessando(false);
          }
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
  var bodyFormData = new FormData();

  async function imageChange(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      const fileSelected = e.target.files[0];
      anexosVolatel.push(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
      bodyFormData.append("file", fileSelected);
      await axios({
        method: "post",
        url: "https://desktop-api-4f850b3f9733.herokuapp.com/docUpload",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          listLinks.push({ link: response.data });
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  }
  useEffect(() => {
    setAnexosLista(anexosVolatel);
  }, [selectedImage]);
  useEffect(() => {
    setAnexosLista(anexosVolatel);
  }, [selectedImage]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setNomeCompleto(`${localStorage.getItem("nomeCompleto")}`);
      setNomeCompletoAvalista(
        `${localStorage.getItem("nomeCompletoAvalista")}`
      );
      setBI(`${localStorage.getItem("bI")}`);
      setBIAvalista(`${localStorage.getItem("bIAvalista")}`);
      setContacto(`${localStorage.getItem("contacto")}`);
      setContactoAvalista(`${localStorage.getItem("contactoAvalista")}`);
      setSaldo(`${localStorage.getItem("saldo")}`);
      setEndereco(`${localStorage.getItem("endereco")}`);
      setEnderecoAvalista(`${localStorage.getItem("enderecoAvalista")}`);
      setNumeroQuarteirao(`${localStorage.getItem("numeroQuarteirao")}`);
      setNumeroQuarteiraoAvalista(
        `${localStorage.getItem("numeroQuarteiraoAvalista")}`
      );
      setNumeroCasa(`${localStorage.getItem("numeroCasa")}`);
      setNumeroCasaAvalista(`${localStorage.getItem("numeroCasaAvalista")}`);
      setBairroAvalista(`${localStorage.getItem("bairroAvalista")}`);
      setBairro(`${localStorage.getItem("bairro")}`);
      setDistrito(`${localStorage.getItem("distrito")}`);
      setDistritoAvalista(`${localStorage.getItem("distritoAvalista")}`);
      setFonteRendimento(`${localStorage.getItem("fonteRendimento")}`);
      setGarantias(`${localStorage.getItem("garantias")}`);
      setGenero2(`${localStorage.getItem("genero2")}`);
      setGenero2Avalista(`${localStorage.getItem("genero2Avalista")}`);
      setNUIT(`${localStorage.getItem("nUIT")}`);
      setNUITAvalista(`${localStorage.getItem("nUITAvalista")}`);
      setDataNascimento(`${localStorage.getItem("dataNascimento")}`);
      setDataNascimentoAvalista(
        `${localStorage.getItem("dataNascimentoAvalista")}`
      );
      setEstadoCivil(`${localStorage.getItem("estadoCivil")}`);
      setEstadoCivilAvalista(`${localStorage.getItem("estadoCivilAvalista")}`);
      setNacionalidade(`${localStorage.getItem("nacionalidade")}`);
      setId(`${localStorage.getItem("id")}`);
      setNacionalidadeAvalista(
        `${localStorage.getItem("nacionalidadeAvalista")}`
      );
    }
  }, []);
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
              Juros (%)
            </Text>
            <Input
              placeholder="Juros (%)"
              value={juro}
              type="number"
              onChange={(e) => setJuro(e.target.value)}
            />
            <br />
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
            <Input
              placeholder="NUIT"
              type="text"
              value={nUIT}
              onChange={(e) => setNUIT(e.target.value)}
            />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Contacto
            </Text>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon>+258</InputLeftAddon>
                <Input
                  placeholder="Contacto"
                  type="text"
                  value={contacto}
                  onChange={(e) => setContacto(e.target.value)}
                />
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
            <Input
              placeholder="Valor do Emprestimo a Solicitar"
              type="text"
              value={saldo}
              onChange={(e) => setSaldo(e.target.value)}
            />

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
            <Input
              placeholder="NUIT"
              value={nUITAvalista}
              onChange={(e) => setNUITAvalista(e.target.value)}
            />
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Contacto
            </Text>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon>+258</InputLeftAddon>
                <Input
                  placeholder="Contacto"
                  value={contactoAvalista}
                  onChange={(e) => setContactoAvalista(e.target.value)}
                />
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
            <Text
              mt={2}
              color={colorMode === "light" ? "gray.600" : "gray.400"}
            >
              Anexos
            </Text>
            <div>
              <input accept="image/*" type="file" onChange={imageChange} />
              <Flex color="white">
                <Center w="600px">
                  {anexosLista.length > 0 &&
                    anexosLista.map((anexo: any) => (
                      <>
                        <Image
                          boxSize="100px"
                          src={URL.createObjectURL(anexo)}
                          alt={`${anexo.name}`}
                          // width={100}
                          // height={100}
                        />
                      </>
                    ))}
                </Center>
              </Flex>
            </div>
            <br />
            <br />
            <small>
              Nota: Os dados e ficheiros fornecidos serão usados para avaliar o
              seu pedido, garanta que os mesmo estejam correctamente
              preenchidos...
            </small>
            <br />
            <br />
            <hr />
            <br />
            <Button colorScheme="blue" onClick={() => novoLancamento()}>
              Submeter Pedido
            </Button>
          </Container>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default EditarEmprestimo;
