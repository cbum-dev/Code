import { Component } from "@/components/ui/custom/Chart";
import { ModeToggle } from "@/components/ui/custom/DarkMode";
import Header from "@/components/ui/custom/Header";
import Hero from "@/components/ui/custom/Hero";
import TopPrompts from "@/components/ui/custom/TopPrompts";
import React from "react";

function page() {
  return (
    <div>
      {" "}
      <ModeToggle />
      <Hero />
      <TopPrompts />
    </div>
  );
}

export default page;
