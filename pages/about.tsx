import React from "react";
import { useRouter } from "next/router";
import {
  Container,
  VStack,
  Text,
  Heading,
  Box,
  Avatar,
  Button,
  Link,
} from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AboutPage: React.FC = () => {
  const router = useRouter();

  const handleBookAppointment = () => {
    router.push("/#BookAppointment"); // Navigate to the contact page
  };

  return (
    <>
      <NavBar />
      <Container maxW="3xl" mt={10} mb={10} centerContent>
        <VStack spacing={10} align="stretch">
          <Heading size="xl" textAlign="center" color="gray.700">
            DV Microcrédito
          </Heading>
          <Box>
            <Avatar size="xl" name="DV" src="/credito.jpg" mb={4} />
            <Text fontSize="lg" color="gray.600">
              Bem-vindo à DV Microcrédito, líder em soluções de microcrédito
              para empreendedores visionários como você. Com uma missão dedicada
              a impulsionar o potencial empreendedor e promover o crescimento
              econômico em comunidades locais, estamos comprometidos em oferecer
              acesso justo e acessível ao financiamento para transformar ideias
              inovadoras em realidade.
            </Text>
            <Text fontSize="lg" color="gray.600" mt={4}>
              Desde a nossa fundação, buscamos ser mais do que apenas uma
              instituição financeira. Somos uma rede de apoio para aqueles que
              têm o desejo de construir um futuro melhor para si e suas
              comunidades. Nossa abordagem centrada no cliente se reflete em
              cada aspecto do nosso trabalho, desde a aplicação simplificada até
              o suporte contínuo ao longo do ciclo de vida do empréstimo.
            </Text>
            <Text fontSize="lg" color="gray.600" mt={4}>
              O que nos diferencia é o nosso compromisso com a transparência,
              integridade e responsabilidade. Valorizamos a confiança que nossos
              clientes depositam em nós e nos esforçamos para superar suas
              expectativas em cada interação. Além disso, estamos empenhados em
              promover a educação financeira e o desenvolvimento de habilidades
              empresariais para capacitar ainda mais nossos clientes a alcançar
              o sucesso sustentável.
            </Text>
            <Text fontSize="lg" color="gray.600" mt={4}>
              Junte-se a nós em nossa jornada para capacitar empreendedores e
              fortalecer comunidades. Seja você um aspirante a proprietário de
              uma pequena empresa ou um investidor social consciente, estamos
              aqui para apoiá-lo em cada passo do caminho. Juntos, podemos fazer
              a diferença e criar um impacto positivo duradouro.
            </Text>
            {/* <Button
              leftIcon={<FaCalendarAlt />}
              colorScheme="teal"
              variant="solid"
              mt={6}
              alignSelf="center"
              onClick={handleBookAppointment}
            >
              <Link href='/#BookAppointment'>
                Book Appointment
              </Link>
            </Button> */}
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default AboutPage;
