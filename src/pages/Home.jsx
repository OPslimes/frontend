import React from "react";
import Navbar from "../shared/Navbar";
import Hero from "../components/Hero";
import { InputField } from "../components";
import { Signup } from "./Signup";

export const Home = () => {
  return (
    <div
      style={{
        width: "auto",
        height: "auto",
        "background-color": "#374355",
      }}>
      <Navbar />
      <div>
        <Hero />
      </div>
    </div>
  );
};
