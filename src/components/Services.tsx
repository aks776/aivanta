import { Bot, Workflow, BarChart3, Cpu, Database, Lightbulb } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const services = [
  {
    icon: Bot,
    title: 'AI Chatbots & Virtual Assistants',
    description: 'Intelligent conversational AI for sales, support, and internal operations.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Reduce manual work and operational costs using AI-driven automation.',
  },
  {
    icon: BarChart3,
    title: 'AI Analytics & Insights',
    description: 'Turn business data into actionable insights and forecasts.',
  },
  {
    icon: Cpu,
    title: 'Custom AI Solutions',
    description: 'Tailored AI systems designed around your business needs.',
  },
  {
    icon: Database,
    title: 'AI + CRM Integration',
    description: 'Enhance CRM and internal tools with intelligent automation.',
  },
  {
    icon: Lightbulb,
    title: 'AI Strategy & Consulting',
    description: 'Clear AI roadmaps focused on measurable ROI.',
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`group relative card-gradient rounded-2xl p-8 border border-border transition-all duration-500 cursor-pointer
        hover:border-accent-glow/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-glow/10
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-glow/20 via-transparent to-accent-glow/20 blur-sm" />
      </div>
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center mb-6 
          group-hover:bg-accent-glow/20 group-hover:border-accent-glow/40 group-hover:scale-110 
          transition-all duration-300">
          <service.icon className="w-7 h-7 text-muted-foreground group-hover:text-accent-glow transition-colors duration-300" />
        </div>

        {/* Content */}
        <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-accent-glow transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
          {service.description}
        </p>
      </div>
    </div>
  );
};

const Services = () => {
  const { ref: headerRef, isInView: headerInView } = useInView();

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive AI solutions designed to transform your business operations and drive measurable results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;