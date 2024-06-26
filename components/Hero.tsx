import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Link,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMdOptions } from "react-icons/io";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
// updates
export default function Hero() {
  const { data: session } = useSession();
  const [emailLista, setEmailLista] = useState<any[]>([]);
  const [isEmail, setIsEmail] = useState(false);
  const [isActive, setIsActive] = useState(false);
  var listaVolatel: any = [];
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/todosEmprestimos`, {
        cache: "no-store",
      });
      const data = await response.json();
      data.map((item: any) => {
        if (item.userId === session?.user?.email) {
          setIsEmail(true);
          if (item.status) {
            setIsActive(true);
          }
        }
      });
    };
    if (session?.user) fetchPosts();
  }, [session?.user]);
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
            >
              DV Microcrédito
            </Text>
          </Heading>
          {/* <Heading
            lineHeight={0.1}
            fontWeight={400}
            fontSize={{ base: "3xl", sm: "4xl", lg: "3xl" }}
          >
            <Text as={"span"} color={"red.400"}>
              O Parceiro Ideal Para os Seus Investimentos.
            </Text>
          </Heading> */}

          <Text color={"gray.500"} fontSize="lg">
            Você tem grandes planos para o futuro, mas às vezes o acesso ao
            capital necessário pode parecer fora de alcance. É aí que entramos!
            Na DV Microcrédito, entendemos que cada sonho merece uma chance
            justa de se tornar realidade.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            {session?.user ? (
              <>
                {isEmail ? (
                  <>
                    {isActive ? (
                      <>
                        <Button
                          rounded={"full"}
                          size={"lg"}
                          fontWeight={"normal"}
                          px={6}
                          colorScheme={"red"}
                          bg={"red.400"}
                          _hover={{ bg: "red.500" }}
                        >
                          <Link href="/userStatus">Histórico</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          rounded={"full"}
                          size={"lg"}
                          fontWeight={"normal"}
                          px={6}
                          colorScheme={"blue"}
                          bg={"blue.400"}
                          _hover={{ bg: "blue.500" }}
                        >
                          <Link href="#">
                            O seu pedido de emprestimo está a ser avaliado!
                          </Link>
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      rounded={"full"}
                      size={"lg"}
                      fontWeight={"normal"}
                      px={6}
                      colorScheme={"red"}
                      bg={"red.400"}
                      _hover={{ bg: "red.500" }}
                    >
                      <Link href="/solicitarEmprestimo">
                        Solicitar Emprestimo
                      </Link>
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                  colorScheme={"blue"}
                  bg={"blue.400"}
                  onClick={() => signIn()}
                  _hover={{ bg: "blue.500" }}
                >
                  <Link href="#">LogIn</Link>
                </Button>
              </>
            )}
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={{ base: "200px", md: "350px", lg: "450px" }}
            rounded={"lg"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src="/credito.jpg"
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});
