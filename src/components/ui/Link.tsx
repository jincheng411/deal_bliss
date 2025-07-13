import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className = '',
  ...props
}) => {
  // This is a simple Link component that can be extended later with React Router
  return (
    <RouterLink to={href} className={className} {...props}>
      {children}
    </RouterLink>
  );
};
