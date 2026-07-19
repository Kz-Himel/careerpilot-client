// components/home/FAQ.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "How does CareerPilot AI generate my roadmap?",
    answer:
      "Our AI analyzes your current skills, target role, experience level, and available study time to build a personalized 3-6 month roadmap with weekly milestones, recommended projects, and certifications.",
  },
  {
    question: "Is CareerPilot AI free to use?",
    answer:
      "Yes! You can create an account, generate roadmaps, and chat with the AI career coach completely free. A demo login is also available so you can try it instantly without signing up.",
  },
  {
    question: "Can I talk to the AI coach anytime?",
    answer:
      "Absolutely. The AI Career Coach remembers your conversation context, so you can ask follow-up questions, get resume feedback, or check if you're ready for a job — anytime you like.",
  },
  {
    question: "Do I need coding experience to get started?",
    answer:
      "Not at all. Whether you're a complete beginner or an experienced professional, CareerPilot AI adjusts recommendations based on your selected experience level.",
  },
  {
    question: "Can I track multiple career goals at once?",
    answer:
      "Yes, you can create and manage multiple career goals from your dashboard, each with its own progress tracker, due date, and priority.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-sm text-gray-500">Everything you need to know before you start.</p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5"
                >
                  <span className="text-sm font-semibold text-gray-900 sm:text-base">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <FiChevronDown className="h-4 w-4 text-gray-400" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-4 pb-4 text-sm leading-relaxed text-gray-500 sm:px-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}