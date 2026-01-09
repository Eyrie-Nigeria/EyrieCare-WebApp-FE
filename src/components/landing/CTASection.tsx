'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { fadeInUp, scaleIn } from '@/lib/animations';

export default function CTASection() {
  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="layout-container flex justify-center">
        <motion.div
          variants={scaleIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col max-w-280 w-full items-center text-center"
        >
          <div className="rounded-3xl bg-surface-dark p-10 md:p-16 w-full relative overflow-hidden">
            {/* Decorative glows */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-white"
              >
                Ready to elevate your medical career?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-300 max-w-xl text-lg"
              >
                Join the platform built by medical professionals, for medical professionals. Start for free today.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center"
              >
                <Link href="/signup">
                  <Button size="lg" variant="gradient" className="min-w-40">
                    Sign Up Now
                  </Button>
                </Link>
                <Button size="lg" variant="secondary" className="min-w-40">
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}