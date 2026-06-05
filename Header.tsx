import React from 'react';

export interface HeaderProps {
  title?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, leftAction, rightAction }) => {
  return (
    <header className="w-full relative z-10 shadow-md bg-navy text-white h-12 flex items-center justify-between px-4 border-b border-gold flex-shrink-0">
      <div className="flex items-center min-w-[50px]">
        {leftAction}
      </div>
      <div className="flex-1 text-center font-heading text-sm md:text-base font-bold truncate px-2 text-white uppercase tracking-wide">
        {title}
      </div>
      <div className="flex items-center justify-end min-w-[50px] space-x-2">
        {rightAction}
        <img 
          src="https://i.imgur.com/KUbQz08.png" 
          alt="HNRe Logo" 
          className="h-8 w-8 object-contain bg-white rounded-md p-1"
        />
      </div>
    </header>
  );
};
