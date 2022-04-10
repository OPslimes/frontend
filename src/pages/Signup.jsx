import React from "react";
import {
  Flex,
  Stack,
  Text,
  Box,
  useBreakpointValue,
  Center,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import * as Yup from "yup";
import axios from "axios";

import { InputField } from "../components";

import "../styles/Signup.css";

export const Signup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <div className="centered_container">
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
                <Link to="/">
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
                  .min(minPasswordLength, `Password must be atleast ${minPasswordLength} characters long.`),
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
  );
};
