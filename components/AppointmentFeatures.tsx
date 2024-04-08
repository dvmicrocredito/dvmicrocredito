import {
  Container,
  Box,
  chakra,
  Text,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  MdEventAvailable,
  MdAssignment,
  MdLocalHospital,
  MdLibraryBooks,
} from "react-icons/md";

interface IFeature {
  heading: string;
  content: string;
  icon: React.ElementType;
}

const features: IFeature[] = [
  {
    heading: "Agendamentos Simples",
    content:
      "Agende emprestimos facilmente usando nosso sistema de agendamento intuitivo, disponível 24 horas por dia, 7 dias por semana.",
    icon: MdEventAvailable,
  },
  {
    heading: "Emprestimos Directos",
    content:
      "Obtenha emprestimos rápidos através dos nossos pacotes economicos.",
    icon: MdAssignment,
  },
  {
    heading: "Juros Baixos",
    content: "Temos para si as taxas de juros mais baixos do mercado.",
    icon: MdLocalHospital,
  },
  {
    heading: "Pagamento Simplificado",
    content: "Temos para si o metodo de pagamento mais simples da praça",
    icon: MdLibraryBooks,
  },
];

const AppointmentFeatures = () => {
  const headingColor = useColorModeValue("red.600", "red.200");
  const textColor = useColorModeValue("gray.500", "gray.300");
  const iconColor = useColorModeValue("red.400", "teal.400");
  const titleSize = "4xl";
  const contentSize = "md";

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="6xl" p={{ base: 5, md: 10 }}>
        <chakra.h3
          fontSize={titleSize}
          fontWeight="bold"
          mb={3}
          textAlign="center"
          color={headingColor}
        >
          Por que nos escolher?
        </chakra.h3>
        <chakra.p
          fontSize={contentSize}
          color={textColor}
          mb={8}
          textAlign="center"
        >
          Descubra os benefícios dos nossos serviços que nos destacam.
        </chakra.p>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          placeItems="center"
          spacing={16}
          mt={4}
          mb={8}
        >
          {features.map((feature, index) => (
            <Box key={index} textAlign="center">
              <Icon as={feature.icon} w={10} h={10} color={iconColor} />
              <chakra.h3 fontWeight="semibold" fontSize="2xl">
                {feature.heading}
              </chakra.h3>
              <Text fontSize={contentSize} color={textColor}>
                {feature.content}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AppointmentFeatures;
