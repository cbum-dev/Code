import Hero from "@/components/ui/custom/Hero";
import MetricsDashboard from "@/components/ui/custom/Metrics";
import PricingSection from "@/components/ui/custom/PricingSection";
import TopPrompts from "@/components/ui/custom/TopPrompts";
import React from "react";

function page() {
  return (
    <div>
      {" "}
      <Hero />
      <TopPrompts />
      <PricingSection/>
      <MetricsDashboard/>
    </div>
  );
}

export default page;
