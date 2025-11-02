"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const FinancialsCalculator = ({ price }: { price: number }) => {
  const [downPayment, setDownPayment] = useState(price * 0.2);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyEMI, setMonthlyEMI] = useState(0);

  useEffect(() => {
    const principal = price - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyEMI(emi);
    } else {
      setMonthlyEMI(0);
    }
  }, [price, downPayment, interestRate, loanTerm]);

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financials Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label>Down Payment ({((downPayment/price)*100).toFixed(0)}%)</Label>
            <Slider
                value={[downPayment]}
                min={price * 0.1}
                max={price * 0.8}
                step={price * 0.01}
                onValueChange={(val) => setDownPayment(val[0])}
            />
            <div className="text-right font-medium">{formatCurrency(downPayment)}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                <Input id="interest-rate" type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} step="0.1" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="loan-term">Loan Term (Years)</Label>
                <Input id="loan-term" type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
            </div>
        </div>
        <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-muted-foreground text-sm">Estimated Monthly EMI</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyEMI)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
