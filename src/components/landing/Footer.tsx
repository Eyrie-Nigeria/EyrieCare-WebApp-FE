"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { FooterLinks } from "./types";
import { fadeInUp } from "@/lib/animations";

const footerLinks: FooterLinks = {
  product: [
    { label: "Early Access", href: "/waitlist" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-12">
      <div className="layout-container">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between w-full gap-10"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-4 max-w-xs"
          >
            <div className="flex items-center gap-2 text-text-main dark:text-white">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-text-main">
                <Stethoscope className="w-4 h-4" />
              </div>
              <h3 className="font-bold">
                Eyrie<span className="text-primary">Care</span>
              </h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Empowering the next generation of healthcare providers with
              cutting-edge educational tools.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-12 md:gap-24">
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div
                variants={fadeInUp}
                key={category}
                className="flex flex-col gap-3"
              >
                <h4 className="font-bold text-text-main dark:text-white text-sm uppercase tracking-wider">
                  {category}
                </h4>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="mt-12 text-center text-xs text-gray-400">
        © {currentYear} EyrieCare Inc. All rights reserved.
      </div>
    </footer>
  );
}
