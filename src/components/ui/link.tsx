import type React from 'react';
import { cn } from '../../../lib/utils';

type LinkProps = {
  to: string
  activeProps?: string
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}
export const Link = ({ to, children, className, activeProps, onClick}: LinkProps) => (
  <a href={to} className={cn(className, activeProps)} onClick={onClick ? onClick : () => null}>
    {children}
  </a>
)