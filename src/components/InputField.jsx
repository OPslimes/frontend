import {
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const InputField = ({ size: _, type = "text", children, formControlWidth, ...props }) => {
  const iconSize = useBreakpointValue({
    base: 9,
    xs: 15,
    sm: 13,
    md: 15,
    "2xl": 24,
    xl: 16,
  });

  const [field, { error, touched }] = useField(props);

  useFormikContext();

  const condition = type === "password";
  if (condition) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var [show, setShow] = React.useState(false);
  }

  return (
    <FormControl w={formControlWidth} isInvalid={!!error && touched}>
      <InputGroup>
        <InputLeftElement>{children}</InputLeftElement>
        <Input
          fontWeight={500}
          fontFamily="Whitney"
          fontSize={{
            base: "xs",
            xs: "sm",
            sm: "0.9rem",
            md: "1rem",
            "2xl": "2xl",
            xl: "xl",
          }}
          _placeholder={{
            fontFamily: "Whitney",
            fontSize: {
              base: "xs",
              xs: "sm",
              sm: "0.9rem",
              md: "1rem",
              "2xl": "2xl",
              xl: "xl",
            },
          }}
          variant="filled"
          ref={props.reference}
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
          _focus={{
            borderColor: "gray.300",
          }}
          type={show || !condition ? "text" : "password"}
        />
        {condition && (
          <>
            <InputRightElement
              width={{
                base: "1.95rem",
                xs: "2rem",
                sm: "3rem",
                xl: "4.5rem",
                "2xl": "5rem",
              }}>
              <IconButton
                aria-label="eye"
                size="md"
                variant="ghost"
                _focus={{
                  outline: "none",
                  backgroundColor: "transparent",
                }}
                icon={show ? <AiFillEyeInvisible size={iconSize} /> : <AiFillEye size={iconSize} />}
                onClick={() => setShow(!show)}
              />
            </InputRightElement>
          </>
        )}
      </InputGroup>
      {touched && error ? (
        <FormErrorMessage>
          <Text fontFamily="Whitney" fontSize={{ base: "xs", xs: "sm", "2xl": "lg", xl: "sm" }} noOfLines={1}>
            {error}
          </Text>
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
