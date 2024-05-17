import React from 'react';
import clsx from 'clsx';

interface GenericButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Section({
  children,
  className,
  ...props
}: GenericButtonProps) {
  const baseClasses = 'bg-light_grey p-16';

  return (
    <section className={clsx(baseClasses, className)} {...props}>
      {children}
    </section>
  );
}
