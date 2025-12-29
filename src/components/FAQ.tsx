import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'How long does AI implementation typically take?',
    answer:
      'Implementation timelines vary based on project complexity. Simple automations can be deployed within 2-4 weeks, while comprehensive AI systems may take 2-3 months. We provide a detailed timeline during our initial consultation based on your specific requirements.',
  },
  {
    question: 'Do you build custom AI solutions or use off-the-shelf tools?',
    answer:
      'We do both. We evaluate your needs and recommend the most effective approach—whether that\'s customizing existing AI platforms, building purpose-built solutions, or integrating multiple systems. Our focus is always on delivering the best ROI for your business.',
  },
  {
    question: 'Is my business data secure with your AI solutions?',
    answer:
      'Absolutely. Security is a foundational priority. We implement enterprise-grade encryption, access controls, and compliance measures. Your data is processed securely and never used to train third-party models without explicit consent.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'We work with businesses across multiple sectors including finance, healthcare, e-commerce, manufacturing, and professional services. Our AI solutions are designed to adapt to industry-specific requirements and compliance standards.',
  },
  {
    question: 'What kind of support do you provide after deployment?',
    answer:
      'We offer ongoing support packages that include monitoring, maintenance, optimization, and updates. Our team remains available to help you scale, troubleshoot, and evolve your AI systems as your business grows.',
  },
  {
    question: 'How do you measure the success of AI implementations?',
    answer:
      'We establish clear KPIs before implementation—whether that\'s cost savings, efficiency gains, customer satisfaction improvements, or revenue growth. We provide regular reports and dashboards so you can track the tangible impact of your AI investment.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-background" />
      
      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Common questions about our AI solutions and services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-accent-glow/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-medium py-5 hover:text-accent-glow transition-colors hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;