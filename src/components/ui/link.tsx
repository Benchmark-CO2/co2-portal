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
  <a href={to} className={cn('text-sm flex gap-2 max-md:gap-3 items-center hover:bg-zinc-700/30 rounded-md transition-colors w-full max-md:py-2 max-md:px-4 max-md:text-base!', className, activeProps)} onClick={onClick ? onClick : () => null}>
    {children}
  </a>
)