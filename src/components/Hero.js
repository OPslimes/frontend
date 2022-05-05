import React, { useEffect } from "react";
import "../styles/Home.css";
import { Signup } from "../pages";
import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { InputField } from "./InputField";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});

  const toast = useToast();

  const iconSize = useBreakpointValue({
    base: 9,
    xs: 15,
    sm: 17,
    md: 19,
    "2xl": 24,
    xl: 16,
  });

  // initial values for form fields
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // constants for validation schema
  const maxUsernameLength = 15;
  const minUsernameLength = 3;

  const maxPasswordLength = 30;
  const minPasswordLength = 6;

  async function handleAlreadyLoggedIn() {
    const response = await axios({
      method: "POST",
      baseURL: "http://localhost:4000",
      url: "/api/v1/graphql",
      withCredentials: true,
      data: {
        query: `
        query Me {
            me {
                _id
                name
                username
            }
        }
        `,
      },
    });

    if (response.data.data?.me?.username) {
      setIsLoggedIn(true);
      setUser(response.data.data.me);
    }
  }

  // this function is called when the user is logged in
  function handleUser() {
    return (
      <div>
        <Flex align="center" justify="center" direction="column" className="hero-container">
          <Box as="h1" fontSize="5xl" fontWeight="bold" color="gray.800" className="hero-title">
            Welcome, {user.username}
          </Box>
          <Box as="h2" fontSize="2xl" fontWeight="bold" color="gray.800" className="hero-subtitle">
            You are logged in!
          </Box>
          <Box as="h2" fontSize="2xl" fontWeight="bold" color="gray.800" className="hero-subtitle">
            <Link to="/">
              <Button
                variantColor="teal"
                variant="outline"
                size="lg"
                className="hero-button"
                margin={[2]}
                onClick={() => {
                  toast({
                    title: "TODO",
                    description: "DOESNT WORK HAHAHA",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                  });
                }}>
                Go to Home
              </Button>
            </Link>
          </Box>
        </Flex>
      </div>
    );
  }

  useEffect(() => {
    handleAlreadyLoggedIn();
  }, []);

  return (
    <div className="grid">
      <div>
        <h1 className="text-7xl text-white font-bold mx-24 text-center">Reviews in</h1>
        <h2 className="text-7xl text-yellow-400 font-bold mx-48 text-center">Color</h2>
        <div />
        <h2 className="text-center text-white font-bold mt-7 px-52 mb-4">
          Zeus is a peer-to-peer review website for developers to grade each other's work. We provide collaboration
          tools for students and new developers to get accurate, peer-reviewed content. Zeus utilizes "Code-Spaces"
          to work and edit other people's work. Just send the link to your code space to another person and they
          can edit it whenever!
        </h2>
        {!isLoggedIn ? (
          <Box translateY={-200}>
            <div className="content-center">
              <Center>
                <Box
                  justifyContent={{
                    base: "space-evenly",
                    sm: "space-evenly",
                    xl: "start",
                    "2xl": "start",
                  }}>
                  <Flex flexDirection={"column"} gridRowStart={2}>
                    <Box fontSize={["2xl"]} fontWeight={"800"} alignSelf={"center"}>
                      <Text color="white">Sign up below!</Text>
                    </Box>
                    <Box alignSelf={"center"}>
                      <Text
                        fontSize={{
                          base: "0.8rem",
                          xs: "sm",
                          sm: "md",
                          md: "1.5rem",
                          "2xl": "2xl",
                          xl: "lg",
                        }}
                        fontWeight="500"
                        color="gray.500"
                        letterSpacing="0.01em"
                        paddingBottom={["3"]}>
                        Already have an account?{" "}
                        <Link to="/login">
                          <Text textDecoration="underline" cursor="pointer" display="inline" color="claret.300">
                            Login.
                          </Text>
                        </Link>
                      </Text>
                    </Box>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={Yup.object({
                        username: Yup.string()
                          .required("Username is required.")
                          .max(maxUsernameLength, `Username must be less than ${maxUsernameLength} characters.`)
                          .min(minUsernameLength, `Username must be aleast ${minUsernameLength} characters long.`)
                          .matches(/^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, {
                            message: "This username is not allowed.",
                          }),
                        password: Yup.string()
                          .required("Password is required.")
                          .max(maxPasswordLength, `Password must be less than ${maxPasswordLength} characters.`)
                          .min(
                            minPasswordLength,
                            `Password must be atleast ${minPasswordLength} characters long.`
                          ),
                        email: Yup.string()
                          .required("Email Address is required.")
                          .email("Please enter a valid email address."),
                      })}
                      onSubmit={(values, { setFieldError, ...meta }) => {
                        axios({
                          baseURL: "http://localhost:4000/",
                          method: "POST",
                          url: "api/v1/graphql",
                          data: {
                            query: `
                      mutation CreateUser($name: String!, $username: String!, $email: String!, $password: String!) {
                        createUser(input: {name: $name, username: $username, email: $email, password: $password})
                      }
                    `,
                            variables: {
                              name: values.username,
                              username: values.username,
                              email: values.email,
                              password: values.password,
                            },
                          },
                        })
                          .then((res) => {
                            if (!res.data.data) {
                              const error = res.data.errors[0];
                              switch (error.extensions.code) {
                                case "INVALID_INPUT":
                                  toast({
                                    title: "Invalid Input",
                                    description: error.message,
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                                  });
                                  break;
                                case "INVALID_USERNAME":
                                  setFieldError("username", error.message);
                                  break;
                                case "INVALID_EMAIL":
                                  setFieldError("email", error.message);
                                  break;
                                case "INVALID_PASSWORD":
                                  setFieldError("password", error.message);
                                  break;
                                case "USERNAME_ALREADY_EXISTS":
                                  setFieldError("username", error.message);
                                  break;
                                case "EMAIL_ALREADY_EXISTS":
                                  setFieldError("email", error.message);
                                  break;
                                default:
                                  toast({
                                    title: "Oopsies! Something went wrong.",
                                    description: error.message,
                                    status: "error",
                                    duration: 3000,
                                    isClosable: true,
                                    position: "top",
                                  });
                              }
                            } else {
                              toast({
                                title: "Success!",
                                description: "Account created successfully.",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                                position: "top",
                              });
                              onOpen();
                              console.log(res);
                            }
                            meta.setSubmitting(false);
                          })
                          .catch((err) => {
                            toast({
                              title: "Oopsies! Something went wrong.",
                              description: err.response.data.message,
                              status: "error",
                              duration: 5000,
                              isClosable: true,
                              position: "top",
                            });

                            meta.setSubmitting(false);
                            console.log(err.response);
                          });
                      }}>
                      {({ isSubmitting, handleChange, handleBlur }) => (
                        <Form>
                          <Stack w={["72"]}>
                            <InputField placeholder="Username" name="username">
                              <AiOutlineUser size={iconSize} />
                            </InputField>
                            <Stack direction="row">
                              <InputField placeholder="Password" name="password" type="password">
                                <RiLockPasswordFill size={iconSize} />
                              </InputField>
                            </Stack>
                            <InputField name="email" placeholder="Email Address">
                              <MdEmail size={iconSize} />
                            </InputField>
                          </Stack>
                          <Button
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                            type="submit"
                            bg="white"
                            _hover={{ bg: "gray.200" }}
                            mt={[2, 2.5, 3.5, 4]}
                            w={"max-content"}>
                            Register
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </Flex>
                </Box>
              </Center>
            </div>
          </Box>
        ) : (
          handleUser()
        )}
      </div>
    </div>
  );
}

export default Hero;
