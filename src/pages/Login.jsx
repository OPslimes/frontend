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

import "../styles/Login.css";

export const Login = () => {
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
    input: "",
    password: "",
  };

  // constants for validation schema
  const maxUsernameLength = 15;
  const minUsernameLength = 3;

  const maxPasswordLength = 30;
  const minPasswordLength = 6;

  const validationSchema = Yup.object({
    input: Yup.string().required("Username/Email Address is required."),

    password: Yup.string()
      .required("Password is required.")
      .max(maxPasswordLength, `Password must be less than ${maxPasswordLength} characters.`)
      .min(minPasswordLength, `Password must be at least ${minPasswordLength} characters long.`),
  });

  // function to handle form submission
  const handleSubmit = async (values, { setFieldError, ...meta }) => {
    try {
      console.log("Hello!");
      const res = await axios({
        baseURL: "http://localhost:4000/",
        method: "POST",
        url: "api/v1/graphql",
        data: {
          query: `
          mutation Login($input: String!, $password: String!) {
            loginByUsernameorEmailAndPassword(input: $input, password: $password) {
                username
            }
          }
        `,
          variables: {
            input: values.input,
            password: values.password,
          },
        },
      });
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
            setFieldError("input", error.message);
            break;
          case "INVALID_EMAIL":
            setFieldError("input", error.message);
            break;
          case "INVALID_PASSWORD":
            setFieldError("password", error.message);
            break;
          case "USERNAME_ALREADY_EXISTS":
            setFieldError("input", error.message);
            break;
          case "EMAIL_ALREADY_EXISTS":
            setFieldError("input", error.message);
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
          description: "Welcome back! " + res.data.data.loginByUsernameorEmailAndPassword.username,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        onOpen();
        console.log(res);
      }
      meta.setSubmitting(false);
    } catch (err) {
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
    }
  };

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
              <Text color="white">Login</Text>
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
                Don't have an account?{" "}
                <Link to="/signup">
                  <Text textDecoration="underline" cursor="pointer" display="inline" color="claret.300">
                    Signup.
                  </Text>
                </Link>
              </Text>
            </Box>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setFieldError, ...meta }) =>
                await handleSubmit(values, { setFieldError, ...meta })
              }>
              {({ isSubmitting, handleChange, handleBlur }) => (
                <Form>
                  <Stack w={["72"]}>
                    <InputField placeholder="Username/Email Address" name="input">
                      <AiOutlineUser size={iconSize} />
                    </InputField>
                    <Stack direction="row">
                      <InputField placeholder="Password" name="password" type="password">
                        <RiLockPasswordFill size={iconSize} />
                      </InputField>
                    </Stack>
                  </Stack>
                  <Button
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    type="submit"
                    bg="white"
                    _hover={{ bg: "gray.200" }}
                    mt={[2, 2.5, 3.5, 4]}
                    w={"max-content"}>
                    Login
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
