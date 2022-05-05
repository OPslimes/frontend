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
import { BsPeopleFill, BsLightningCharge } from "react-icons/bs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import "../styles/Profile.css";

import { InputField } from "../components";
import { sleep } from "../utils/utils";

export const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    return (
      <div className="bg">
        <div className="bg_profile">
          <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
          <h1>This is me, BOB!</h1>
        </div>
      </div>
    );
};