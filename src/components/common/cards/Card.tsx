interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-warm p-6 hover:shadow-md transition">
      {title && (
        <h3 className="text-lg font-semibold text-primary mb-2 font-headings">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-sm text-neutral-dark mb-4 font-body">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
