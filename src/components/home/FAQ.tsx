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
    <section className="section-alt">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header-center"
        >
          <span className="eyebrow mb-3">FAQ</span>
          <h2 className="heading-section">Frequently Asked Questions</h2>
          <p className="text-body">Everything you need to know before you start.</p>
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
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`card overflow-hidden transition-shadow duration-200 ${isOpen ? "shadow-md ring-1 ring-indigo-100" : ""}`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/50"
                >
                  <span className="text-sm font-semibold text-slate-900 sm:text-base">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${isOpen ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"}`}
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
                      <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-500">
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
