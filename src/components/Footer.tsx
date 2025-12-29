const Footer = () => {
  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Features', href: '#features' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-xl font-heading font-bold gradient-text">Aivanta</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Practical AI solutions for modern businesses
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Powered by Nexamor
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground/60">
            © {new Date().getFullYear()} Aivanta. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
