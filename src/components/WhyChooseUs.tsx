import { Target, Puzzle, Building2, Handshake } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const reasons = [
  {
    icon: Target,
    title: 'ROI Over Hype',
    description: 'Every solution solves a real business problem.',
  },
  {
    icon: Puzzle,
    title: 'Fits Your Existing Workflow',
    description: "We improve systems, we don't disrupt them.",
  },
  {
    icon: Building2,
    title: 'Business-First Approach',
    description: 'Strategy comes before technology.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnership',
    description: 'Support continues beyond deployment.',
  },
];

const ReasonCard = ({ reason, index }: { reason: typeof reasons[0]; index: number }) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Card */}
      <div className="relative h-full p-8 rounded-2xl card-gradient border border-border cursor-pointer
        hover:border-accent-glow/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-glow/10
        transition-all duration-300">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center mb-6
          group-hover:bg-accent-glow/20 group-hover:border-accent-glow/40 group-hover:scale-110 transition-all duration-300">
          <reason.icon className="w-6 h-6 text-muted-foreground group-hover:text-accent-glow transition-colors duration-300" />
        </div>

        {/* Content */}
        <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-accent-glow transition-colors duration-300">
          {reason.title}
        </h3>
        <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
          {reason.description}
        </p>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-accent-glow/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const { ref: headerRef, isInView: headerInView } = useInView();

  return (
    <section id="why-us" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why Businesses <span className="gradient-text">Trust Aivanta</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We focus on delivering tangible results, not empty promises.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard key={reason.title} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;