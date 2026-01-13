"use client";

import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export function AuthBranding() {
  const avatars = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCQGNVC_QjM9eVvstnzjZ17IYwYTyy0Ou1MxPRPF-oMpKvd9Ouq7dycsXEiqYaUokjR7JaJ1-T27MzCAKvBHilzxwNjpuldD24GuuCWztAiQ1mWzwl6U9F-qP-0VGE4NrPFWCs1hFp88YAe15W5HkbFP4tqrq49Wg91nvmxokYHnh43Kb-qoQ5OF5R5xHbney8TqNldNM7loMqIl0heNJlsLkZITfozHDVVIGrW7eYqwStsa678C4KY7VSxTVIO46xZtDOBRLKZ4Dc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAJztiuG0qs0IYcWff2uW7cVdzgpCX4aSEwMPWcJyRw4xXrzm1vmI1T4HyYMgB6l1JwDRRaO_1Tm1TX_RwrWXkjB4oh66m7QBN6uWZiP1n2SWAK2z5-7NvfmefZ_cMNXT-XufAqDzPQKhFaDcU5oTIo0jomErj7q6FCV99HVNbvd8MOqpKsQY3tSTa9t74btlmOWFBfkSVJ632Du3rOLTwjNCVeaE13NMhgmMvdVPx77RvH0uiIhOpXfGg8_F8YCRKNfJuxHaqckkE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCIWEOjE9ta671TQnUjLm7FAte9w6C9a7g7rePAnHPNuhcq_gKDOMhFpPyUQXgQZRCGDKlA-tLvYVH33tfyIP1DmeKb6YBvtiVj1uphotx1N8vIms1i21_n8FgvMU9EnAcwfPEjOuktoeqPzuMyHxkdONojQOvgWUSTK-zRE-5E2as7yycTdqoQZghTNKKHv1Q-u8dDMixIpxiVdHgKkMGw3-VYNqJelYdvVBI0LdLrnM-Xs0k_4Vjz285eEzKqu6f6MnSYzOYl2Io",
  ];

  return (
    <div
      className="hidden lg:flex w-5/12 relative flex-col justify-center overflow-hidden bg-cover bg-center p-12"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(16, 34, 23, 0.6) 0%, rgba(16, 34, 23, 0.95) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZ4LkTMcdYTjfM1F2Rasj0VF9oIHy1IepaVDErbULd2DPdUSFJeVgs6Prq4LbWpywquOTE9Q5AnIQHq1paph6YyDfu_RqyyL9dnb3uVQzfcYEL_GcZVWXIiRRnzFJPf1ctuVTPU8YQrufPlwJ0C4Cvz0ELvEo50jMbt6uAv_b0R7KyG_zPKLmluco6UY_SNesclVyjBzUG16hA4Efw0FFHIloadCiJGzeX-IMu9279PSeXHXpHnoDsPUaPGBtIUJHhcxsaxejdo4A")',
      }}
    >
      <div className="relative z-10 flex flex-col gap-6 max-w-120">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="h-12 w-12 rounded-xl bg-primary-auth flex items-center justify-center text-background-auth-deep"
        >
          <Stethoscope className="w-8 h-8" />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-2"
        >
          <h2 className="text-white text-4xl font-bold leading-tight tracking-tight">
            Master your medical journey
          </h2>
          <p className="text-text-auth-light-green text-lg font-medium leading-relaxed">
            Join a community of future doctors achieving their goals with our
            comprehensive study platform.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="mt-4 flex items-center gap-3"
        >
          <div className="flex -space-x-3">
            {avatars.map((url, idx) => (
              <img
                key={idx}
                alt="User avatar"
                className="h-10 w-10 rounded-full border-2 border-surface-auth-dark object-cover"
                src={url}
              />
            ))}
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface-auth-dark bg-primary-auth text-xs font-bold text-background-auth-deep">
              +2k
            </div>
          </div>
          <p className="text-sm font-medium text-white">
            Trusted by students worldwide
          </p>
        </motion.div>
      </div>
    </div>
  );
}
