import React from "react";
import Navbar from "../shared/Navbar";
import "../styles/Home.css";
import Hero from "../components/Hero";
import {InputField} from "../components";
import {Signup} from "./Signup";

export const Home = () => {
  return <>
    <Navbar/>
    <div>
      <Hero/>
    </div>
  </>;
};

