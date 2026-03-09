"use client";

import { motion } from "framer-motion";
import { fadeInUp, scaleIn, staggerContainer } from "@/lib/animations";
import { GalleryItem } from "./types";

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBGVcACvwCM4y9FauS4xaABUArQn-Ob6vv82j3wgQ-lKFyOfufEq9nw1fjVVbv3OK4Om8DsrZk4AhzankCtqWqzwnKN2cpvR3G3lKEafF1sEF2FIHHTpt8P4VGK1mFEKF3ZdwJ4l-cifSj974ZTeyfmLmsuWDzS581W25am8Ef2dmIoZ89NMsj3DIFrphF2lSE0PBkC5-Uq3KmDgEKXaD5GJGUGba1KxZ2tExpSEvRMPBrz-1O5aYM3iAOLZID64Sc_ftU9e2sgQ4",
    title: "Clinical Dashboard",
    subtitle: "Real-time patient updates",
  },
  {
    id: 2,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_Q-jlJf3n_wzCYGOXUUFaMyIhJ7J6bCseqgXH_0LnioGwPbk2Q8WJ5NsFOAof8XX26yuKMo0r98-gjoDwfXPuN_ChbKI7mQGsEzz848h-Q94wFo96ObbHd4qPUFDAXShWAWAG7VZ-EVvHibt71jTFot0Gm4HDSZqKQJR2u8hZBaCT2Z6cJ7CBGP0DNYOxgV9PXrnk_TOQhE_FnoEPnYRQXxPdfGn5QN2-NGc_1h6uyIEDtwvvE7g1udDIUhsDVTsFpPI1QMB0fxI",
    title: "Collaboration",
    subtitle: "Team insights",
  },
  {
    id: 3,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAog2v_MaC56gKJBAn0ep8wjS1_y8nQuGzTAbEOFtMTy28Pu5PqHjKtansfEReF0KlN_rWdh455uyW3rIjajbLOSxIbekaKhk7csdRpZbIaIRxbzYGYNIsu5u2W-J48vDyi7HKxKEwbhGbNiPluBNXwmJHX-Gbbsrwvi3we0W-F7bnt0ULXCJhW7hR3QKVf1le31fuJfgnCYxtX4qr68dA07LfskLQAw-BanEy6igr7HV8MGIzLSQbiwP12AregLOuqLd6stV971oI",
    title: "Interactive Learning",
    subtitle: "Engaging content",
  },
  {
    id: 4,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_eiRKLED7N5IcREoifbjC01aiwY8TnvDD_vycLqVzjkt8iahZufRvh4NTUnzybKILXitYzZ8Maeni7fSqLW79AIqIexu5eL-pc37MPnf9VxCESOtZnARCMgJKkpPX_SvzzwSfKDsPMUJQ_GJNDDyWCBs3cZUnnKgz_RhFu9eDuxLupuXTeKnngl63LbFrvFqtNh6kfnThIEG4BbJBu7fHNio3Nw-IP7f5YVJ3_MtjbSDnL-frSHfVMuScDkUKeaIK8kj2QEVLHxI",
    title: "Detailed Results",
    subtitle: "In-depth analytics",
  },
  {
    id: 5,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN7wplCnCxg1c9ClSvYuDYqpe0wqlay1zwQkdk157KZPCEGs_V0pN7P8SbffgeE3MUJZ8IjVb0fdRJl1Hn-YcPjflhPglMGGYVr3gOTnLfVEZ-M9UL9I2kAYZ9xieU8hpG9l4UjlQW814C5aUubk85XD0dByxKDxS-EWmih0iC8R8B-0ylB7aDR7L12JqbWs0xsNSE73YNxfs0P3e1RWbbUTAG-W3bXMdZ3eaPP0ip6woicz-qabq60T6VWM0H9I5XxR6RgyadE9w",
    title: "Digital Tools",
    subtitle: "Modern medicine",
  },
];

export function GallerySection() {
  return (
    <section className="py-12 bg-surface-light dark:bg-surface-dark border-y border-border-light dark:border-border-dark">
      <div className="layout-container">
        <div className="flex flex-col">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center pb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text-main dark:text-white text-center">
              See how it works
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-3xl">
              A user interface designed for focus and efficiency during your
              busiest rotations.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="w-full gap-4 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] md:h-125"
          >
            {/* Large Main Image */}
            <motion.div
              variants={scaleIn}
              className="w-full bg-center bg-no-repeat bg-cover rounded-xl shadow-sm md:row-span-2 relative overflow-hidden group"
              style={{ backgroundImage: `url("${galleryItems[0].url}")` }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                <span className="text-white font-bold text-lg">
                  {galleryItems[0].title}
                </span>
                <span className="text-gray-200 text-sm">
                  {galleryItems[0].subtitle}
                </span>
              </div>
            </motion.div>

            {/* Secondary Images */}
            {galleryItems.slice(1).map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="w-full bg-center bg-no-repeat bg-cover rounded-xl shadow-sm min-h-50 relative overflow-hidden group"
                style={{ backgroundImage: `url("${item.url}")` }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
