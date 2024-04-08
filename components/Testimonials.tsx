import React from "react";
import {
  Container,
  Box,
  chakra,
  Flex,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

interface TestimonialAttributes {
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
}

const testimonials: TestimonialAttributes[] = [
  {
    name: "Empreendedores Iniciantes",
    position: "Até 5.000,00 Mt",
    company: "Taxa de juros: 1,5% ao mês",
    image:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
    content: `Acesso a orientação financeira e treinamento para pequenos empreendedores. Prazo de pagamento: Até 12 meses. Sem exigência de garantias`,
  },
  {
    name: "Crescimento Empresarial",
    position: "Até 15.000,00 Mt",
    company: "Taxa de juros: 1,2% ao mês",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `Suporte adicional para elaboração de planos de negócios e consultoria financeira. Prazo de pagamento: Até 24 meses. Opção de garantia flexível (ex.: garantias pessoais ou ativos da empresa)`,
  },
  {
    name: "Mulheres Empreendedoras",
    position: "Até 10.000,00 Mt",
    company: "Taxa de juros: 1,3% ao mês",
    image:
      "https://images.pexels.com/photos/2770600/pexels-photo-2770600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `Mentoria específica para mulheres empreendedoras e acesso a redes de apoio. Prazo de pagamento: Até 18 meses. Sem exigência de garantias.`,
  },
  {
    name: "Negócios Sustentáveis",
    position: "Até 8.000,00 Mt",
    company: "Taxa de juros: 1,4% ao mês",
    image:
      "https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `Incentivos adicionais para negócios que promovem práticas sustentáveis. Prazo de pagamento: Até 15 meses. Sem exigência de garantias`,
  },
];

const Testimonials = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("#eff5f1", "#252d3a");
  const blurBgColor = useColorModeValue("red.200", "gray.600");

  return (
    <Container maxW="5xl" p={6}>
      <Flex justify="center" mb={8} direction="column" alignItems="center">
        <chakra.h2 fontSize="3xl" fontWeight="bold" mb={2} color="red.500">
          Os nossos planos
        </chakra.h2>
        <chakra.p color="gray.500" fontSize="lg" textAlign="center" mt={3}>
          Conheça os nossos planos de emprestimos
        </chakra.p>
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        placeItems="center"
        spacing={8}
        mt={12}
        mb={8}
      >
        {testimonials.map((obj, index) => (
          <Stack
            key={index}
            direction="column"
            mb={5}
            spacing={0}
            alignItems="center"
          >
            <Stack
              maxW="345px"
              spacing={5}
              mb={10}
              boxShadow="lg"
              rounded="md"
              p={6}
              pos="relative"
              bg={bgColor}
              transform="rotate(-4deg)"
              _after={{
                content: `""`,
                borderColor: `${borderColor} transparent`,
                borderStyle: "solid",
                borderWidth: "25px 30px 0 0",
                position: "absolute",
                bottom: "-25px",
                left: "40px",
                display: "block",
              }}
            >
              <Box
                position="relative"
                rounded="md"
                transform="rotate(4deg)"
                _before={{
                  content: '""',
                  bg: blurBgColor,
                  filter: "blur(55px)",
                  position: "absolute",
                  top: "-0.15rem",
                  right: "-0.15rem",
                  bottom: "-0.15rem",
                  left: "-0.15rem",
                  borderRadius: "5px",
                }}
              >
                <chakra.p position="relative" fontSize="lg">
                  {obj.content}
                </chakra.p>
              </Box>
            </Stack>
            <Stack spacing={1} p={2} justify="center" alignItems="center">
              <Avatar size="xl" name={obj.name} src="/credito.jpg" />
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="xl">
                  {obj.name}
                </Text>
                <Text fontWeight="medium" fontSize="md" color="teal.500">
                  {obj.position}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {obj.company}
                </Text>
              </Box>
            </Stack>
          </Stack>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Testimonials;
