"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Divide } from "lucide-react";
import Loading from "./Loading";


const FAQItem = ({ question, answer, isOpen, onClick, index }) => (
  <motion.div
    className="overflow-hidden rounded-lg mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <div
      className={`border ${isOpen ? 'border-blue-200 shadow-md' : 'border-gray-200'} rounded-lg transition-all duration-300`}
    >
      <button
        onClick={onClick}
        className="w-full text-left p-3 flex justify-between items-center bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-textHeadingColor text-sm sm:text-base pr-2">{question}</span>
        <motion.div
          initial={false}
          animate={{
            rotate: isOpen ? 45 : 0,
            backgroundColor: isOpen ? '#3b82f6' : '#e5e7eb',
            color: isOpen ? '#ffffff' : '#6b7280'
          }}
          className="flex-shrink-0 p-1.5 rounded-full transition-colors duration-200"
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-5 pt-2 text-gray-600 text-sm border-t border-gray-100">
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="leading-relaxed"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

const Faq = () => {
  const [faq, setFaqs] = useState([]); // Fetch FAQs from API
  const [openIndex, setOpenIndex] = useState(0); // Start with first FAQ open
  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state for fetching data


  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  // fetch faq 
  useEffect(() => {
    const fetchFAQ = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://jono-db.onrender.com/v1/faq/get-faqs`);
        if (!res.ok) {
          setError('Failed to fetch data');
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setFaqs(data?.data || []);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false)
      }
    }
    fetchFAQ(); // Fetch FAQs from API
  }, [])

  return (
    <section className="py-3">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-2">
            <HelpCircle size={24} className="text-blue-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services, process, and company
          </p>
        </motion.div>

        <div className="space-y-2">

          {loading ? (
            <Loading />
          ) : faq.length > 0 ? (
            faq.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-600">
              No FAQs available.
            </div>
          )}




        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-textColor text-sm mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="btn"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
