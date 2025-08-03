/**
 * Reusable card component
 */
import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'md',
  shadow = 'md',
  hover = false 
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6', 
    lg: 'p-8'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';

  return (
    <div className={`
      bg-white rounded-xl border border-gray-100 
      ${paddingClasses[padding]} 
      ${shadowClasses[shadow]} 
      ${hoverClass} 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;
