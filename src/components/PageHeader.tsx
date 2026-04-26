interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => (
  <section className="gradient-hero text-primary-foreground">
    <div className="container py-16 md:py-24">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-3xl md:text-5xl font-bold max-w-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base md:text-lg text-primary-foreground/80">
          {description}
        </p>
      )}
    </div>
  </section>
);
