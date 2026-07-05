import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const faqs = [
  {
    question: "Do you offer styling support for private events?",
    answer: "Yes. We provide design guidance, bundle recommendations, and setup support for a wide range of private celebrations.",
  },
  {
    question: "Can I book decor for both indoor and outdoor setups?",
    answer: "Absolutely. Our collections are designed to suit indoor, outdoor, and hybrid event environments with flexible planning support.",
  },
  {
    question: "How quickly can I receive a quote?",
    answer: "Most requests are reviewed quickly, and our team can guide you through the right options for your date and venue.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "We offer flexible rescheduling up to 48 hours before your event. Our team will work with you to find the best solution.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section title="Frequently asked questions" description="Everything you need to know before planning your next event experience.">
      <Container>
        <Card className="border-slate-200/70 bg-white/80">
          <CardContent className="space-y-3 p-4 sm:p-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-5"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-slate-900">{faq.question}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="px-4 pb-4 text-sm leading-7 text-slate-600 sm:px-5">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
