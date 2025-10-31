"use client";
import React from 'react';
import AppIcon from '@/components/contacts/app-icon';
import { Button } from '@/components/ui/button';

const CreationMethodCard = ({ method, onSelect }: { method: any; onSelect: (method: string) => void; }) => {

  const handleSelect = () => {
    onSelect(method.id);
  };

  return (
    <div
      className={`
        relative p-8 rounded-xl border-2 transition-all duration-300 cursor-pointer group
        hover:border-primary hover:shadow-xl hover:scale-[1.02]
        ${method.recommended 
          ? 'border-primary bg-primary/5 shadow-lg' 
          : 'border-border bg-card hover:bg-muted/30'
        }
      `}
      onClick={handleSelect}
    >
      {/* Recommended Badge */}
      {method.recommended && (
        <div className="absolute -top-4 left-8">
          <span className="inline-flex items-center px-4 py-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full shadow-md">
            <AppIcon name="Star" size={14} className="mr-1.5" />
            Recommended
          </span>
        </div>
      )}

      {/* Method Header */}
      <div className="flex items-start space-x-5 mb-6">
        <div className={`
          flex items-center justify-center w-16 h-16 rounded-xl transition-all duration-300
          ${method.recommended 
            ? 'bg-primary text-primary-foreground shadow-lg' 
            : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'
          }
        `}>
          <AppIcon name={method.icon} size={28} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {method.title}
          </h3>
          <span className={`
            inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full
            ${method.recommended 
              ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
            }
          `}>
            {method.difficulty}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-6 leading-relaxed text-base">
        {method.description}
      </p>

      {/* Features */}
      <div className="space-y-3 mb-8">
        {method.features.map((feature: string, index: number) => (
          <div key={index} className="flex items-start space-x-3">
            <AppIcon 
              name="Check" 
              size={18} 
              className={`mt-0.5 flex-shrink-0 ${
                method.recommended ? 'text-primary' : 'text-green-500 group-hover:text-primary'
              }`}
            />
            <span className="text-foreground font-medium leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Button
        variant={method.recommended ? 'default' : 'outline'}
        size="lg"
        fullWidth
        iconName="ArrowRight"
        iconPosition="right"
        className="transition-all duration-300 group-hover:scale-105"
      >
        {method.buttonText}
      </Button>

      {/* Hover Glow Effect */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
        ${method.recommended 
          ? 'bg-gradient-to-br from-primary/10 to-secondary/10' :'bg-gradient-to-br from-primary/5 to-secondary/5'
        }
      `} />
    </div>
  );
};

export { CreationMethodCard };
