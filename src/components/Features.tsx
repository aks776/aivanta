import { Zap, Scale, Clock, Shield, Users } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const features = [
  {
    icon: Zap,
    title: 'Production-Ready AI',
    description: 'Designed for live business environments',
  },
  {
    icon: Scale,
    title: 'Scalable Systems',
    description: 'Grow without rebuilding from scratch',
  },
  {
    icon: Clock,
    title: 'Fast Implementation',
    description: 'From idea to deployment quickly',
  },
  {
    icon: Shield,
    title: 'Secure by Design',
    description: 'Enterprise-grade security standards',
  },
  {
    icon: Users,
    title: 'Human-Guided AI',
    description: 'Control and transparency at every step',
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`group text-center p-6 rounded-2xl bg-secondary/30 border border-border cursor-pointer
        hover:border-accent-glow/40 hover:bg-secondary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-glow/5
        transition-all duration-500
        ${isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary border border-border flex items-center justify-center mb-5 
        group-hover:scale-110 group-hover:bg-accent-glow/20 group-hover:border-accent-glow/40 group-hover:shadow-lg group-hover:shadow-accent-glow/20
        transition-all duration-300">
        <feature.icon className="w-8 h-8 text-muted-foreground group-hover:text-accent-glow transition-colors duration-300" />
      </div>

      {/* Content */}
      <h3 className="font-heading text-lg font-semibold mb-2 text-foreground group-hover:text-accent-glow transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
        {feature.description}
      </p>
    </div>
  );
};

const Features = () => {
  const { ref: headerRef, isInView: headerInView } = useInView();

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Built for <span className="gradient-text">Real-World Performance</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI solutions are engineered for reliability, scale, and seamless integration with your existing systems.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;