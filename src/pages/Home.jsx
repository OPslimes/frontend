import React from "react";
import Navbar from "../shared/Navbar";
import Hero from "../components/Hero";
import { InputField } from "../components";
import { Signup } from "./Signup";

export const Home = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "96.7vh",
        "background-color": "#374355",
      }}>
      <Navbar />
      <div>
        <Hero />
      </div>
    </div>
  );
};
