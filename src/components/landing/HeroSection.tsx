"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, scaleIn, staggerContainer } from "@/lib/animations";

export default function HeroSection() {
  const avatars = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDYo5VfKXNr4UqcrYkbxy5oP0aQOz0GR8Ka0NKxQQe9lNtPfMII2z_ZuUXE_ccspaNhGqTtRz6DeJOIKAMjGvWZf5JHFdPAP2MTjfQPwDCqr0ClvkuowZi23CY-JEZcrtMmHDgCAfwbrmeEKgiUGQc1DU-BIALGBgWXWyXfPflmbnOhfyLrj7DRGA8xrkylDDIXE-3krjJ1A35p7sTou-QyA06TxrmzyR68_4q3EOqlLdWBc1jostFGLu0_b44wgZV0Aps-dyzMcHY",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBo6XX2swkW8dhkp-IExxflBcCKVj9T3k7PVH2hboRejPmpUUPGpjzdwq3H6gaJYFx9iSGtlMhOJ5F4jHM-FuMJzNV4rYLFP3AbH7Ux-KFq65XolYQm_v04tddg0m8RPVJ6lFAvikxOPK1927Fkeq2Oc4lGqJ5qWDNQ1uKKCCwLe-cx6ygG8AJLcySgkSbhtA740mZBVSoi6wPxcGNQunIC3RoYTiEu1XemOBbsscjJUoRp5UBkZeO2uaRBotQPKGtoiJ1whr-t4nE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC4GmxY_k_6sJN9FqrftHH_9mc6-Bx3l1CpiovOZzoD79aRNtH4ptDfNKmcJCZmMZ6YLEQo93zdRe5Up4QeiyFbojmTRLJ_bk1I8yaCPSPPrqIJkw2o48omv0pbdgwJQQr7XufdMEofN8_2-aQ4Hne92h78Ec9tGZXgtANw_XXXdk4oKnNeoreujnTuTsOBa6KTSBjKxl9rlXfT0oRUtmdtGDq6GjdTSGfUwaUMgG8tH7v30a9Tn_zVUahF3IkmvKawdpCZB0Pw2KA",
  ];

  return (
    <section className="relative">
      <div className="layout-container py-12 md:py-20 lg:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Hero Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-6 lg:w-1/2 lg:gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-4 text-left"
            >
              <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-text-main dark:text-white md:text-5xl lg:text-7xl">
                Master Your Medical{" "}
                <span className="text-gradient">Education</span>
              </h1>
              <h2 className="text-lg font-normal leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
                Join thousands of medical students using our tools to manage
                clinical cases, collaborate securely, and ace their exams with
                confidence.
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <Link href="/signup">
                <Button size="lg" variant="gradient">
                  Get Started for Free
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 pt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex -space-x-2">
                {avatars.map((url, idx) => (
                  <div
                    key={idx}
                    className="h-8 w-8 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-300 bg-cover bg-center"
                    style={{ backgroundImage: `url("${url}")` }}
                  />
                ))}
              </div>
              <span>Trusted by 5,000+ students</span>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            className="lg:w-1/2 w-full"
          >
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-2xl bg-surface-dark/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 group">
              <div
                className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYoKKx8dyAGkexV9TOMm9l-9M5Q68v3aCN2Ndt9rYEXEf6QOq8C7hjgGquqy6MFsgXTVI-wWQ59-4EVhIKi2EL3FEqqHKLMWn07VH0OkKZCctcqpVyayVYGH4BJWgLJRqnbG9UNvHrzeasPXHVIuh9DSfLDh3zbjpC-UhDssyL8upvBx3I9yLdR_dvZWodYnszcte7S6ilowbxMut9YSPMqwIo9ge2aJFmLPpXWyJuhrr5u03E1lHVCJw-ofgU0yu__ReALaWQxBQ")',
                }}
              />
              {/* UI Mockup Overlay Effect */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-4 right-4 left-4 p-4 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md rounded-xl shadow-lg border border-white/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text-main dark:text-white">
                      Cardiology Review
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Due Today • 15 Questions
                    </div>
                  </div>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "67%" }}
                    transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-primary"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
