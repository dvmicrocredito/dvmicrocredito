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
      <br />
      <br />

      <Box textAlign="center">
        <Heading
          as="h2"
          size="xl"
          mb={8}
          color={useColorModeValue("red.600", "red.300")}
        >
          Termos e Condições
        </Heading>
      </Box>
      <Heading
        as="h2"
        size="sm"
        mb={8}
        color={useColorModeValue("red.600", "red.300")}
      >
        Estes termos e condições regem o uso dos nossos serviços de microcrédito
        oferecidos pela DV Microcrédito. Ao utilizar nossos Serviços, o cliente
        concorda em cumprir e ficar vinculado a estes Termos.
      </Heading>
      <Heading
        as="h2"
        size="sm"
        mb={2}
        color={useColorModeValue("black", "black")}
      >
        1. Elegibilidade
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        1.1 Para ser elegível para nossos Serviços de microcrédito, o cliente
        deve atender aos critérios de elegibilidade estabelecidos pela DV
        Microcrédito.
      </Text>
      <Heading
        as="h2"
        size="sm"
        mb={2}
        mt={6}
        color={useColorModeValue("black", "black")}
      >
        2. Solicitação e Concessão de Microcrédito
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        2.1 O cliente pode solicitar um microcrédito preenchendo o formulário de
        inscrição fornecido pela DV Microcrédito.
      </Text>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        2.2 A concessão de microcrédito está sujeita à análise de crédito e
        aprovação da DV Microcrédito.
      </Text>
      <Heading
        as="h2"
        size="sm"
        mb={2}
        mt={6}
        color={useColorModeValue("black", "black")}
      >
        3. Taxas e Encargos
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        3.1 Ao utilizar nossos Serviços de microcrédito, você concorda em pagar
        todas as taxas e encargos aplicáveis conforme estabelecido pela DV
        Microcrédito.
      </Text>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        3.2 Além disso, o Cliente será responsável por pagar uma taxa de 15mt
        (Quinze Meticais) por cada mensagem de texto (SMS) enviada pela DV
        Microcrédito em caso de atrasos no pagamento relacionados aos serviços
        de microcrédito.
      </Text>
      <Heading
        as="h2"
        size="sm"
        mb={2}
        mt={6}
        color={useColorModeValue("black", "black")}
      >
        4.Pagamentos
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        4.1 Os pagamentos devidos nos termos do microcrédito concedido serão
        conforme acordado entre o cliente e a DV Microcrédito e especificados no
        contracto de microcrédito.
      </Text>
      <Heading
        as="h2"
        size="sm"
        mb={2}
        mt={6}
        color={useColorModeValue("black", "black")}
      >
        5.Prazos e Condições
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        5.1 Os prazos e condições do microcrédito serão conforme estabelecidos
        no contracto de microcrédito celebrado entre o cliente e a DV
        Microcrédito.
      </Text>
      <Heading
        as="h2"
        size="sm"
        mb={2}
        mt={6}
        color={useColorModeValue("black", "black")}
      >
        6.Alterações nos Termos
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        6.1 A DV Microcrédito se reserva ao direito de alterar estes Termos a
        qualquer momento, mediante aviso prévio aos clientes.
      </Text>
      <Heading
        as="h2"
        size="sm"
        mb={2}
        mt={6}
        color={useColorModeValue("black", "black")}
      >
        7.Disposições Gerais
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>
        7.1 Estes Termos constituem o acordo integral entre o cliente e a DV
        Microcrédito no que diz respeito aos Serviços de microcrédito e
        substituem todos os acordos anteriores ou contemporâneos e
        entendimentos, sejam escritos ou verbais, relacionados aos mesmos.
      </Text>
    </Container>
  );
};

export default Faq;
