import danishPhoto from './images/danish_png.png';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, User, Phone, MapPin, Loader2, Mail } from 'lucide-react';
import AnimatedGlobe from './AnimatedGlobe';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useInView } from '@/hooks/use-in-view';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref: formRef, isInView: formInView } = useInView();
  const { ref: infoRef, isInView: infoInView } = useInView();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || null,
          message: formData.message.trim(),
        });

      if (error) throw error;

      toast({
        title: 'Message sent successfully!',
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Let's Build <span className="gradient-text">Smarter Systems</span> Together
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us about your challenges and we'll show you how AI can help.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Contact Form */}
          <div
            ref={formRef}
            className={`order-2 lg:order-1 transition-all duration-700 ${formInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-secondary/50 border-border focus:border-accent-glow transition-all duration-300 hover:border-accent-glow/50"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="bg-secondary/50 border-border focus:border-accent-glow transition-all duration-300 hover:border-accent-glow/50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="bg-secondary/50 border-border focus:border-accent-glow transition-all duration-300 hover:border-accent-glow/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your AI needs..."
                  className="bg-secondary/50 border-border focus:border-accent-glow resize-none transition-all duration-300 hover:border-accent-glow/50"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Request AI Consultation
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Animated Globe */}
          <div className="order-1 lg:order-2 h-[400px] lg:h-[500px]">
            <AnimatedGlobe />
          </div>
        </div>
{/* Company Info Card */}
<div
  ref={infoRef}
  className={`mt-16 max-w-4xl mx-auto transition-all duration-700 delay-200 ${infoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
>
  <div className="bg-card border border-border rounded-xl p-6 sm:p-8 hover:border-accent-glow/30 transition-colors duration-300">
    <h3 className="font-heading text-xl font-semibold mb-6 text-center">
      Get in Touch
    </h3>
    <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-6">

      {/* Founder */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-glow">
          <img
            src={danishPhoto}
            alt="Danish"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Founder</p>
        <p className="font-medium">Danish</p>
      </div>

      {/* Phone */}
      <a href="tel:+447510696722" className="flex flex-col items-center group">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent-glow/20 transition-colors duration-300">
          <Phone className="w-5 h-5 text-muted-foreground group-hover:text-accent-glow transition-colors duration-300" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Phone</p>
        <p className="font-medium hover:underline">+44 7510 696722</p>
      </a>

      {/* Location */}
      <div className="flex flex-col items-center group">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent-glow/20 transition-colors duration-300">
          <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-accent-glow transition-colors duration-300" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Location</p>
        <p className="font-medium">Lahore, Pakistan</p>
      </div>

      {/* Email */}
      <a href="mailto:danish@example.com" className="flex flex-col items-center group">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent-glow/20 transition-colors duration-300">
          <Mail className="w-5 h-5 text-muted-foreground group-hover:text-accent-glow transition-colors duration-300" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Email</p>
        <p className="font-medium hover:underline">daneshali1039@gmail.com</p>
      </a>

    </div>
  </div>
</div>



      </div>
    </section>
  );
};

export default Contact;