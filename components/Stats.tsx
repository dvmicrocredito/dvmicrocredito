import * as React from "react";
import {
  Container,
  Text,
  SimpleGrid,
  Box,
  chakra,
  Stack,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { FaUsers, FaTwitter } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";

interface StatData {
  label: string;
  score: string;
  icon: React.ReactElement;
}

const statData: StatData[] = [
  {
    label: "Agendam. Mensais",
    score: "> 100",
    icon: <BsPerson size={24} color="#FFF" />,
  },
  {
    label: "Avaliações Positivas",
    score: "4.9/5",
    icon: <AiFillStar size={24} color="#f2de76" />,
  },
  {
    label: "Clientes Satisfeitos",
    score: " > 1K",
    icon: <FaUsers size={24} color="#68d391" />,
  },
  {
    label: "Seguidores do Twitter",
    score: "2K",
    icon: <FaTwitter size={24} color="#3182ce" />,
  },
];

const Stats = () => {
  const textColor = useColorModeValue("white", "white");
  const tealColor = useColorModeValue("red.600", "red.500");

  return (
    <Container maxW="5xl" p={{ base: 4, sm: 10 }}>
      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <Stack spacing={4}>
          <chakra.h1
            fontSize="2xl"
            lineHeight={1.2}
            fontWeight="bold"
            color={tealColor}
          >
            Nossas Conquistas
          </chakra.h1>
          <Text fontSize="md" color="gray" maxW="480px">
            Nós nos orgulhamos imensamente da nossa jornada em fornecer os nosso
            serviços com a mais alta qualidade do mercado. Nosso compromisso com
            a excelência e a satisfação do cliente impulsiona nosso sucesso.
          </Text>
        </Stack>
        <SimpleGrid columns={2} spacing={6} pt={8} pl={{ base: 0, md: 10 }}>
          {statData.map((data, index) => (
            <Stack
              key={index}
              p={4}
              border="1px solid"
              borderColor={textColor}
              borderRadius="md"
              align="center"
              spacing={1}
              bg={tealColor}
            >
              <Box fontSize="2xl" fontWeight="bold" color={textColor}>
                {data.score}
              </Box>
              <Box fontSize="lg" color={tealColor}>
                {data.icon}
              </Box>
              <Text fontSize="md" color={textColor}>
                {data.label}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default Stats;
