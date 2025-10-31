"use client";
import React, { useEffect, useState } from 'react';
import { CreationMethodCard } from './CreationMethodCard';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import { ModalBackdrop } from './ModalBackdrop';

const WorkflowCreationMethodSelectionModal = ({ isOpen, onClose, onSelectMethod }: { isOpen: boolean, onClose: () => void, onSelectMethod: (method: string) => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const creationMethods = [
    {
      id: 'visual-canvas',
      title: 'Visual Canvas Builder',
      description: `Create workflows with an intuitive drag-and-drop interface featuring visual nodes and connections. Perfect for users who prefer visual representation and precise control over their automation logic.`,
      icon: 'GitBranch',
      path: '/visual-canvas-builder',
      buttonText: 'Start Building',
      features: [
        'Intuitive drag-and-drop interface',
        'Visual workflow representation with nodes',
        'Real-time preview and testing capabilities',
        'Advanced node configurations and settings',
        'Infinite canvas with zoom and pan controls'
      ],
      recommended: true,
      difficulty: 'Beginner Friendly'
    },
    {
      id: 'conversational-ai',
      title: 'Conversational AI Builder',
      description: `Leverage natural language processing to create workflows through conversation. Simply describe what you want to automate, and our AI will generate the workflow structure for you.`,
      icon: 'MessageSquare',
      path: '/conversational-ai-builder',
      buttonText: 'Start Chatting',
      features: [
        'Natural language workflow creation',
        'AI-powered workflow generation',
        'Conversational guidance and suggestions',
        'Smart optimization recommendations',
        'Voice and text input capabilities'
      ],
      recommended: false,
      difficulty: 'AI-Powered'
    }
  ];

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClose={onClose}>
        <div className={`
          relative w-full max-w-6xl bg-card rounded-2xl shadow-xl 
          transform transition-all duration-500 ease-out
          ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}
        `}>
          <ModalHeader onClose={onClose} />
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {creationMethods.map((method, index) => (
                <div
                  key={method.id}
                  className={`
                    transform transition-all duration-700 ease-out
                    ${isVisible 
                      ? 'translate-y-0 opacity-100' :'translate-y-12 opacity-0'
                    }
                  `}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CreationMethodCard 
                    method={method} 
                    onSelect={onSelectMethod}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border">
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Visual Canvas Builder</h4>
                  <p className="text-muted-foreground">
                    Best for users who want complete control over workflow structure and prefer visual feedback during creation.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Conversational AI Builder</h4>
                  <p className="text-muted-foreground">
                    Ideal for rapid prototyping and users who want to describe workflows in natural language.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ModalFooter onClose={onClose} />
        </div>
    </ModalBackdrop>
  );
};

export { WorkflowCreationMethodSelectionModal };
