"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Check, 
  Star, 
  Zap, 
  Crown,
  Headphones
} from "lucide-react";

interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  buttonText: string;
  features: string[];
  limitations?: string[];
  originalPrice?: number;
}

const PricingCard = ({ tier, isPopular = false }:{tier: PricingTier, isPopular: boolean}) => {
  const getIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'free':
        return <Star className="w-6 h-6" />;
      case 'pro':
        return <Zap className="w-6 h-6" />;
      case 'enterprise':
        return <Crown className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getButtonVariant = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'free':
        return 'outline';
      case 'pro':
        return 'default';
      case 'enterprise':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="relative">
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-medium">
            Most Popular
          </Badge>
        </div>
      )}
      
      <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isPopular 
          ? 'ring-2 ring-blue-500/20 border-blue-200 dark:border-blue-800' 
          : 'border-border hover:border-primary/20'
      }`}>
        <CardHeader className="text-center pb-4">
          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 ${
            tier.name.toLowerCase() === 'free' 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' 
              : tier.name.toLowerCase() === 'pro'
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
          }`}>
            {getIcon(tier.name)}
          </div>
          
          <CardTitle className="text-2xl font-bold text-foreground">
            {tier.name}
          </CardTitle>
          
          <div className="mt-4">
            <div className="flex items-center justify-center gap-1">
              <span className="text-4xl font-bold text-foreground">
                {tier.price === 0 ? 'Free' : `$${tier.price}`}
              </span>
              {tier.price > 0 && (
                <span className="text-muted-foreground">/{tier.period}</span>
              )}
            </div>
            {tier.originalPrice && (
              <div className="text-sm text-muted-foreground line-through mt-1">
                ${tier.originalPrice}/{tier.period}
              </div>
            )}
          </div>
          
          <p className="text-muted-foreground mt-2">
            {tier.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button 
            className="w-full" 
            variant={getButtonVariant(tier.name)}
            size="lg"
          >
            {tier.buttonText}
          </Button>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Features included:
            </h4>
            
            <ul className="space-y-3">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {tier.limitations && tier.limitations.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <h4 className="font-semibold text-muted-foreground text-sm">
                    Limitations:
                  </h4>
                  <ul className="space-y-2">
                    {tier.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full mx-auto mt-1.5" />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {limitation}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function PricingSection() {
  const pricingTiers = [
    {
      name: "Free",
      price: 0,
      period: "",
      description: "Perfect for getting started with basic features",
      buttonText: "Get Started Free",
      features: [
        "Up to 5 prompts per day",
        "Basic workspace access",
        "Community support",
        "Standard response time",
        "Basic templates",
        "Personal use only"
      ],
      limitations: [
        "Limited to 5 prompts daily",
        "No priority support",
        "Basic features only"
      ]
    },
    {
      name: "Pro",
      price: 29,
      originalPrice: 49,
      period: "month",
      description: "Ideal for professionals and growing teams",
      buttonText: "Start Pro Trial",
      features: [
        "Unlimited prompts",
        "Advanced workspace features",
        "Priority email support",
        "Faster response times",
        "Premium templates library",
        "Team collaboration (up to 5 members)",
        "Advanced analytics",
        "Custom integrations",
        "Export capabilities",
        "Version history"
      ]
    },
    {
      name: "Enterprise",
      price: 99,
      period: "month",
      description: "For large teams requiring advanced features",
      buttonText: "Contact Sales",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "24/7 dedicated support",
        "Custom deployment options",
        "Advanced security features",
        "SSO integration",
        "Custom branding",
        "API access",
        "Advanced reporting",
        "Dedicated account manager",
        "Custom training sessions",
        "SLA guarantee"
      ]
    }
  ];

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Pricing Plans
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include our core features 
            with different limits and support levels.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard 
              key={tier.name}
              tier={tier}
              isPopular={index === 1} // Make Pro plan popular
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-muted/30 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Can I upgrade or downgrade anytime?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can change your plan at any time. Changes take effect immediately 
                  and we&apos;ll prorate any charges.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Is there a free trial for paid plans?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Pro plan comes with a 14-day free trial. No credit card required 
                  to get started.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and wire transfers 
                  for Enterprise plans.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Do you offer discounts for annual billing?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes! Save 20% when you choose annual billing on any paid plan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">
              Ready to get started?
            </h3>
            <p className="text-blue-100 mb-6">
              Join thousands of users who trust our platform for their projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Headphones className="w-4 h-4 mr-2" />
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;