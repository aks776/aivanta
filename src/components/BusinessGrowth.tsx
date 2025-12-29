import { TrendingDown, HeartHandshake, Rocket, Brain, Clock } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const impacts = [
  {
    icon: TrendingDown,
    text: 'Reduce operational costs',
  },
  {
    icon: HeartHandshake,
    text: 'Improve customer experience',
  },
  {
    icon: Rocket,
    text: 'Scale faster with automation',
  },
  {
    icon: Brain,
    text: 'Make smarter, data-driven decisions',
  },
  {
    icon: Clock,
    text: 'Free teams from repetitive tasks',
  },
];

const BusinessGrowth = () => {
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: itemsRef, isInView: itemsInView } = useInView();

  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How Aivanta Helps Your <span className="gradient-text">Business Grow</span>
          </h2>
        </div>

        {/* Impact Items */}
        <div ref={itemsRef} className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {impacts.map((impact, index) => (
            <div
              key={impact.text}
              className={`group flex items-center gap-3 px-6 py-4 rounded-full bg-secondary/40 border border-border cursor-pointer
                hover:border-accent-glow/50 hover:bg-secondary/60 hover:scale-105 hover:shadow-lg hover:shadow-accent-glow/10
                transition-all duration-300
                ${itemsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center 
                group-hover:bg-accent-glow/20 group-hover:border-accent-glow/40 transition-all duration-300">
                <impact.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent-glow transition-colors duration-300" />
              </div>
              <span className="font-medium text-foreground group-hover:text-accent-glow transition-colors duration-300">
                {impact.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessGrowth;