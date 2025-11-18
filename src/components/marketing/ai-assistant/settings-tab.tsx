"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type ChannelSettings = {
  whatsapp: {
    enabled: boolean;
    templates: {
      welcome: string;
      followUp: string;
      bookingConfirmation: string;
      priceQuote: string;
      paymentPlan: string;
    };
    businessHours: string;
    responseTime: string;
    greetingMessage: string;
    quickReplies: string[];
  };
  webchat: {
    enabled: boolean;
    widget: {
      position: string;
      theme: string;
      primaryColor: string;
      welcomeMessage: string;
      showTypingIndicator: boolean;
      autoOpenDelay: number;
      customCSS: string;
      branding: {
        showPoweredBy: boolean;
        companyName: string;
        logoUrl: string;
      };
    };
    behavior: {
      proactiveGreeting: boolean;
      greetingDelay: number;
      exitIntentTrigger: boolean;
      scrollTrigger: number;
      timeOnSiteTrigger: number;
    };
    integrations: {
      googleAnalytics: boolean;
      facebookPixel: boolean;
      customEvents: string[];
    };
  };
  sms: {
    enabled: boolean;
    templates: {
      welcome: string;
      followUp: string;
      urgent: string;
      confirmation: string;
    };
    characterLimit: number;
    optOutMessage: string;
    senderId: string;
    rateLimit: string;
  };
};

type Settings = { 
  name: string; 
  style: string; 
  languages: string[]; 
  responseSpeed: string; 
  typingIndicator: boolean; 
  messageLength: string; 
  workingHours: string;
  channels: ChannelSettings;
};

export function SettingsTab() {
  const [s, setS] = useState<Settings | null>(null);
  useEffect(() => { (async () => { const res = await fetch('/api/terra/settings'); const j = await res.json(); setS(j); })(); }, []);
  const save = async () => { await fetch('/api/terra/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) }); };
  if (!s) return <p className="text-sm text-muted-foreground">Loading settings...</p>;
  
  const updateChannelSetting = (channel: keyof ChannelSettings, path: string, value: any) => {
    setS(prev => {
      if (!prev) return prev;
      const newChannels = { ...prev.channels };
      const keys = path.split('.');
      let current: any = newChannels[channel];
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return { ...prev, channels: newChannels };
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2"><Label>Name</Label><Input value={s.name} onChange={e=>setS({...s, name: e.target.value})}/></div>
          <div className="space-y-2"><Label>Style</Label><Select value={s.style} onValueChange={v=>setS({...s, style:v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{['Professional','Friendly','Balanced'].map(x=> <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label>Response Speed</Label><Select value={s.responseSpeed} onValueChange={v=>setS({...s, responseSpeed:v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{['Instant','Natural','Delayed'].map(x=> <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label>Typing Indicator</Label><div className="flex items-center gap-2"><Switch checked={s.typingIndicator} onCheckedChange={v=>setS({...s, typingIndicator: v})}/><span className="text-sm">Show "Terra is typing..."</span></div></div>
          <div className="space-y-2"><Label>Message Length</Label><Select value={s.messageLength} onValueChange={v=>setS({...s, messageLength:v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{['Concise','Standard','Detailed'].map(x=> <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label>Working Hours</Label><Select value={s.workingHours} onValueChange={v=>setS({...s, workingHours:v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{['24/7','Business','Custom'].map(x=> <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></div>
        </CardContent>
      </Card>

      <Tabs defaultValue="whatsapp" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="webchat">Webchat</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>WhatsApp Settings</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Enable WhatsApp</Label>
                <Switch 
                  checked={s.channels.whatsapp.enabled} 
                  onCheckedChange={v => updateChannelSetting('whatsapp', 'enabled', v)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Hours</Label>
                  <Input 
                    value={s.channels.whatsapp.businessHours} 
                    onChange={e => updateChannelSetting('whatsapp', 'businessHours', e.target.value)}
                    placeholder="9 AM - 6 PM IST"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Response Time</Label>
                  <Input 
                    value={s.channels.whatsapp.responseTime} 
                    onChange={e => updateChannelSetting('whatsapp', 'responseTime', e.target.value)}
                    placeholder="< 2 minutes"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Greeting Message</Label>
                <Textarea 
                  value={s.channels.whatsapp.greetingMessage}
                  onChange={e => updateChannelSetting('whatsapp', 'greetingMessage', e.target.value)}
                  placeholder="Welcome message"
                  rows={3}
                />
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="templates">
                  <AccordionTrigger>Message Templates</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Welcome Template</Label>
                      <Textarea 
                        value={s.channels.whatsapp.templates.welcome}
                        onChange={e => updateChannelSetting('whatsapp', 'templates.welcome', e.target.value)}
                        placeholder="Hello {{name}}! Welcome message..."
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Follow-up Template</Label>
                      <Textarea 
                        value={s.channels.whatsapp.templates.followUp}
                        onChange={e => updateChannelSetting('whatsapp', 'templates.followUp', e.target.value)}
                        placeholder="Hi {{name}}, following up..."
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Booking Confirmation Template</Label>
                      <Textarea 
                        value={s.channels.whatsapp.templates.bookingConfirmation}
                        onChange={e => updateChannelSetting('whatsapp', 'templates.bookingConfirmation', e.target.value)}
                        placeholder="🎉 Great choice {{name}}! Your site visit..."
                        rows={2}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webchat" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Webchat Settings</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Enable Webchat</Label>
                <Switch 
                  checked={s.channels.webchat.enabled} 
                  onCheckedChange={v => updateChannelSetting('webchat', 'enabled', v)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Widget Position</Label>
                  <Select 
                    value={s.channels.webchat.widget.position} 
                    onValueChange={v => updateChannelSetting('webchat', 'widget.position', v)}
                  >
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select 
                    value={s.channels.webchat.widget.theme} 
                    onValueChange={v => updateChannelSetting('webchat', 'widget.theme', v)}
                  >
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <Input 
                    type="color"
                    value={s.channels.webchat.widget.primaryColor} 
                    onChange={e => updateChannelSetting('webchat', 'widget.primaryColor', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Welcome Message</Label>
                <Textarea 
                  value={s.channels.webchat.widget.welcomeMessage}
                  onChange={e => updateChannelSetting('webchat', 'widget.welcomeMessage', e.target.value)}
                  placeholder="Hi! I'm Terra 👋 How can I help you..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Auto Open Delay (ms)</Label>
                  <Input 
                    type="number"
                    value={s.channels.webchat.widget.autoOpenDelay} 
                    onChange={e => updateChannelSetting('webchat', 'widget.autoOpenDelay', parseInt(e.target.value))}
                    placeholder="3000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input 
                    value={s.channels.webchat.widget.branding.companyName} 
                    onChange={e => updateChannelSetting('webchat', 'widget.branding.companyName', e.target.value)}
                    placeholder="TerraFlow Properties"
                  />
                </div>
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="behavior">
                  <AccordionTrigger>Behavior Settings</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Proactive Greeting</Label>
                      <Switch 
                        checked={s.channels.webchat.behavior.proactiveGreeting} 
                        onCheckedChange={v => updateChannelSetting('webchat', 'behavior.proactiveGreeting', v)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Greeting Delay (ms)</Label>
                      <Input 
                        type="number"
                        value={s.channels.webchat.behavior.greetingDelay} 
                        onChange={e => updateChannelSetting('webchat', 'behavior.greetingDelay', parseInt(e.target.value))}
                        placeholder="5000"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Exit Intent Trigger</Label>
                      <Switch 
                        checked={s.channels.webchat.behavior.exitIntentTrigger} 
                        onCheckedChange={v => updateChannelSetting('webchat', 'behavior.exitIntentTrigger', v)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>SMS Settings</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Enable SMS</Label>
                <Switch 
                  checked={s.channels.sms.enabled} 
                  onCheckedChange={v => updateChannelSetting('sms', 'enabled', v)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sender ID</Label>
                  <Input 
                    value={s.channels.sms.senderId} 
                    onChange={e => updateChannelSetting('sms', 'senderId', e.target.value)}
                    placeholder="TERRAFLW"
                    maxLength={11}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Character Limit</Label>
                  <Input 
                    type="number"
                    value={s.channels.sms.characterLimit} 
                    onChange={e => updateChannelSetting('sms', 'characterLimit', parseInt(e.target.value))}
                    placeholder="160"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rate Limit</Label>
                <Input 
                  value={s.channels.sms.rateLimit} 
                  onChange={e => updateChannelSetting('sms', 'rateLimit', e.target.value)}
                  placeholder="1 msg per 5 minutes"
                />
              </div>

              <div className="space-y-2">
                <Label>Opt-out Message</Label>
                <Textarea 
                  value={s.channels.sms.optOutMessage}
                  onChange={e => updateChannelSetting('sms', 'optOutMessage', e.target.value)}
                  placeholder="You have been unsubscribed..."
                  rows={2}
                />
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="templates">
                  <AccordionTrigger>SMS Templates</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Welcome Template</Label>
                      <Textarea 
                        value={s.channels.sms.templates.welcome}
                        onChange={e => updateChannelSetting('sms', 'templates.welcome', e.target.value)}
                        placeholder="Hi {{name}}, this is Terra from TerraFlow..."
                        rows={2}
                      />
                      <p className="text-xs text-muted-foreground">
                        Characters: {s.channels.sms.templates.welcome.length}/{s.channels.sms.characterLimit}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Follow-up Template</Label>
                      <Textarea 
                        value={s.channels.sms.templates.followUp}
                        onChange={e => updateChannelSetting('sms', 'templates.followUp', e.target.value)}
                        placeholder="{{name}}, following up on {{property}}..."
                        rows={2}
                      />
                      <p className="text-xs text-muted-foreground">
                        Characters: {s.channels.sms.templates.followUp.length}/{s.channels.sms.characterLimit}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={save} className="w-full">Save All Settings</Button>
    </div>
  );
}

