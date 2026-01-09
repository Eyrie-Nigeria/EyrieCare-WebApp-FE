'use client';

import { motion } from 'framer-motion';
import { ClipboardList, MessageSquare, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Feature } from './types';

const features: Feature[] = [
  {
    icon: ClipboardList,
    title: 'Case Management',
    description: 'Track patient interactions, log clinical hours, and manage your SOAP notes securely in one place compliant with education standards.',
  },
  {
    icon: MessageSquare,
    title: 'Secure Chat',
    description: 'Collaborate with peers on complex cases and get mentorship from attending physicians through encrypted, real-time messaging.',
  },
  {
    icon: GraduationCap,
    title: 'Practice Tests',
    description: 'Prepare for your board exams with our adaptive question bank containing thousands of high-yield practice questions.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
      <div className="layout-container">
        <div className="flex flex-col">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col gap-4 mb-12 text-center md:text-left"
          >
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm">Features</h2>
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-text-main dark:text-white max-w-180">
              Core Tools for Medical Success
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-150">
              Everything you need to succeed in your medical journey, from your first year to residency.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Card className="group h-full border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-text-main transition-colors">
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-text-main dark:text-white">{feature.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}