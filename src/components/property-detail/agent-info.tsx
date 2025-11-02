"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImagePlaceholder } from '@/lib/placeholder-images';

export const AgentInfo = ({ agentName }: { agentName: string }) => {
    const agentAvatarId = agentName.toLowerCase().replace(' ', '-').substring(0, agentName.indexOf(' ') > -1 ? agentName.indexOf(' ') : 1);
    const agentAvatar = getImagePlaceholder(`avatar-${agentAvatarId}`) || getImagePlaceholder('avatar-generic');
  return (
    <Card>
      <CardHeader>
        <CardTitle>Listing Agent</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={agentAvatar?.imageUrl} alt={agentName} />
          <AvatarFallback>{agentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg">{agentName}</h3>
        <p className="text-muted-foreground text-sm">Senior Property Consultant</p>
        <div className="flex justify-center space-x-2 mt-4">
            <Button variant="outline" size="icon"><Phone size={16}/></Button>
            <Button variant="outline" size="icon"><Mail size={16}/></Button>
            <Button variant="outline" size="icon"><MessageSquare size={16}/></Button>
        </div>
      </CardContent>
    </Card>
  );
};
