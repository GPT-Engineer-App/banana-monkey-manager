import { useState } from "react";
import { Box, Heading, Text, Button, Input, FormControl, FormLabel, useToast, useColorModeValue, Container, SimpleGrid, Image } from "@chakra-ui/react";
import { FaSignInAlt, FaPlusCircle } from "react-icons/fa";

const API_URL = "https://backengine-9er0.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const toast = useToast();
  const bgColor = useColorModeValue("gray.50", "gray.800");

  const handleLogin = async () => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setAccessToken(data.accessToken);
      setLoggedIn(true);
      toast({
        title: "Logged in",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async () => {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      toast({
        title: "Signup successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Signup failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.lg" py={10}>
      <Box bg={bgColor} p={10} rounded="lg" shadow="lg">
        <Heading as="h1" size="xl" mb={6}>
          Banana & Monkey Management
        </Heading>
        {!loggedIn ? (
          <>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" mb={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin} mr={4}>
              Login
            </Button>
            <Button leftIcon={<FaPlusCircle />} colorScheme="blue" onClick={handleSignup}>
              Signup
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="xl" mb={6}>
              Welcome! You are logged in.
            </Text>
            <SimpleGrid columns={2} spacing={10}>
              <Box>
                <Heading size="lg" mb={4}>
                  Bananas
                </Heading>
                <Image src="https://images.unsplash.com/photo-1567789352758-9e3dc54b3ae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxidW5jaCUyMG9mJTIwYmFuYW5hc3xlbnwwfHx8fDE3MTExMjYwODN8MA&ixlib=rb-4.0.3&q=80&w=1080" mb={4} />
                <Button colorScheme="yellow" size="lg">
                  Manage Bananas
                </Button>
              </Box>
              <Box>
                <Heading size="lg" mb={4}>
                  Monkeys
                </Heading>
                <Image src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjdXRlJTIwbW9ua2V5fGVufDB8fHx8MTcxMTEyNjA4M3ww&ixlib=rb-4.0.3&q=80&w=1080" mb={4} />
                <Button colorScheme="orange" size="lg">
                  Manage Monkeys
                </Button>
              </Box>
            </SimpleGrid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Index;
