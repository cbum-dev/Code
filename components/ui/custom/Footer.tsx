"use client";
import React from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Separator } from "../separator";
import { Badge } from "../badge";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Globe,
  Zap,
  Heart,
  ArrowRight,
  MapPin,
  Phone,
  MessageSquare,
  Code2,
  Users,
  Shield,
  Lightbulb,
  BookOpen,
  HelpCircle,
  FileText,
  Settings,
  Smartphone
} from "lucide-react";

const FooterSection = ({ title, children }:{title:string,children:React.ReactNode}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const FooterLink = ({ href, icon: Icon, children, external = false }: { href: string; icon?: any; children: React.ReactNode; external?: boolean }) => (
  <a 
    href={href} 
    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm group"
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
  >
    {Icon && <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />}
    <span>{children}</span>
    {external && <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
  </a>
);

const SocialLink = ({ href, icon: Icon, label }:{href:string,icon?: any;label:string}) => (
  <Button 
    variant="ghost" 
    size="sm" 
    asChild
    className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
  >
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Icon className="w-4 h-4" />
    </a>
  </Button>
);

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  <Mail className="w-3 h-3 mr-1" />
                  Newsletter
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Stay in the loop
              </h3>
              <p className="text-muted-foreground">
                Get the latest updates, tips, and exclusive content delivered straight to your inbox. 
                Join thousands of developers and creators.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email address" 
                  type="email"
                  className="flex-1"
                />
                <Button className="px-6">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">React.flow</span>
            </div>
            
            <p className="text-muted-foreground max-w-md">
              Empowering developers and creators with AI-powered tools to build, deploy, 
              and scale applications faster than ever before.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA & Remote</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>hello@React.flow</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Follow us:</span>
              <SocialLink href="https://twitter.com" icon={Twitter} label="Twitter" />
              <SocialLink href="https://github.com" icon={Github} label="GitHub" />
              <SocialLink href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="mailto:hello@React.flow" icon={Mail} label="Email" />
            </div>
          </div>

          {/* Product Links */}
          <FooterSection title="Product">
            <FooterLink href="/features" icon={Lightbulb}>Features</FooterLink>
            <FooterLink href="/pricing" icon={Zap}>Pricing</FooterLink>
            <FooterLink href="/templates" icon={Code2}>Templates</FooterLink>
            <FooterLink href="/integrations" icon={Settings}>Integrations</FooterLink>
            <FooterLink href="/api" icon={Globe}>API Docs</FooterLink>
            <FooterLink href="/mobile" icon={Smartphone}>Mobile App</FooterLink>
          </FooterSection>

          {/* Resources Links */}
          <FooterSection title="Resources">
            <FooterLink href="/docs" icon={BookOpen}>Documentation</FooterLink>
            <FooterLink href="/help" icon={HelpCircle}>Help Center</FooterLink>
            <FooterLink href="/community" icon={Users}>Community</FooterLink>
            <FooterLink href="/blog" icon={FileText}>Blog</FooterLink>
            <FooterLink href="/tutorials" icon={Lightbulb}>Tutorials</FooterLink>
            <FooterLink href="/status" icon={Shield}>Status Page</FooterLink>
          </FooterSection>

          {/* Company Links */}
          <FooterSection title="Company">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/press">Press Kit</FooterLink>
            <FooterLink href="/partners">Partners</FooterLink>
            <FooterLink href="/contact" icon={MessageSquare}>Contact</FooterLink>
            <FooterLink href="/security" icon={Shield}>Security</FooterLink>
          </FooterSection>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span>© {currentYear} React.flow. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service  
              </a>
              <a href="/cookies" className="hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by the React.flow team</span>
          </div>
        </div>
      </div>

      <div className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>All systems operational</span>
            <Badge variant="outline" className="text-xs">
              99.9% uptime
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;