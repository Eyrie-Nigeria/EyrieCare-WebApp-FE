'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Stethoscope, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heightExpand, buttonTap } from '@/lib/animations';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-light dark:border-border-dark bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm transition-all duration-300">
      <div className="layout-container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-text-main dark:text-white cursor-pointer group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap="tap"
            variants={buttonTap}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-text-main"
          >
            <Stethoscope className="w-5 h-5" />
          </motion.div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">EyrieCare</h2>
        </Link>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors text-text-main dark:text-gray-300 dark:hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            <Button variant="ghost" className="hidden md:flex">
              Login
            </Button>
            <Button>
              Sign Up
            </Button>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={heightExpand}
              initial="initial"
              animate="animate"
              exit="initial"
              className="absolute top-full left-0 right-0 md:hidden overflow-hidden border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark"
            >
              <div className="flex flex-col gap-4 py-6 px-4">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="py-2 text-base font-medium text-text-main hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors border-b border-border-light dark:border-border-dark last:border-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="outline" className="w-full py-6">
                    Login
                  </Button>
                  <Button className="w-full py-6">
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
