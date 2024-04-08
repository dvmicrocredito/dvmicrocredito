import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Faq = () => {
  return (
    <Container maxW="container.lg" mt={16} mb={16}>
      <Box textAlign="center">
        <Heading
          as="h2"
          size="xl"
          mb={8}
          color={useColorModeValue("red.600", "red.300")}
        >
          Perguntas Frequentes
        </Heading>
      </Box>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Quais serviços vocês oferecem?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color={useColorModeValue("gray.600", "gray.300")}>
              Nós oferecemos uma ampla gama de serviços financeiros, incluindo
              emprestimos e muito mais. Sinta-se à vontade para entrar em
              contato conosco para perguntas específicas.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Como faço para ter um emprestimo?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color={useColorModeValue("gray.600", "gray.300")}>
              Agendar uma consulta é fácil. Você pode ligar para a nossa
              recepção nos números (+258) 84 298 0946 / (+258) 86 2682152 ou
              usar o nosso sistema de agendamento de consultas online em nosso
              site.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Estão disponíveis consultas virtuais?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color={useColorModeValue("gray.600", "gray.300")}>
              Sim, consultas virtuais estão disponíveis. Você pode agendar uma
              consulta virtual entrando em contato conosco por telefone ou
              usando nosso sistema de agendamento de consultas online.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        {/* Add more FAQ items as needed */}
      </Accordion>
    </Container>
  );
};

export default Faq;
