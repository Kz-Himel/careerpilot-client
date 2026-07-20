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
    <section className="pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center sm:mb-10"
          >
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-blue-600">
              FAQ
            </span>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              Everything you need to know before you start.
            </p>
          </motion.div>

          {/* Accordion Wrapper */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="flex min-h-[46px] w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-gray-50/50 sm:p-6"
                  >
                    <span className="text-base font-bold text-gray-900">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isOpen ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <FiChevronDown className="h-4 w-4" />
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
                        <p className="border-t border-gray-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-gray-500 sm:px-6 sm:pb-6">
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
      </div>
    </section>
  );
}