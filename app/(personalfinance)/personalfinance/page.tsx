'use client';

import { useEffect, useMemo, useState } from 'react';
import { set as idbSet, get as idbGet } from 'idb-keyval';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

type ExpenseField = {
  key: string;
  label: string;
  placeholder?: string;
};

type ExpenseSection = {
  id: string;
  title: string;
  fields: ExpenseField[];
};

const SECTIONS: ExpenseSection[] = [
  {
    id: 'home',
    title: 'Home',
    fields: [
      { key: 'mortgage', label: 'Mortgage', placeholder: 'e.g., 3000' },
      { key: 'rent', label: 'Rent', placeholder: 'e.g., 3200' },
      { key: 'propertyTaxes', label: 'Property Taxes', placeholder: 'e.g., 409' },
    ],
  },
  {
    id: 'hoa',
    title: 'HOA',
    fields: [
      { key: 'hoaDuesMain', label: 'HOA Dues Main', placeholder: 'e.g., 417.75' },
      { key: 'hoaRoofNote', label: 'HOA Dues Roof Note', placeholder: 'e.g., 192.79' },
      { key: 'hoaAdminFee', label: 'HOA Dues Admin fee', placeholder: 'e.g., 15' },
      { key: 'talusHoaQuarterly', label: 'Talus HOA (Quarterly → enter monthly avg)', placeholder: 'e.g., 58.65' },
    ],
  },
  {
    id: 'insurance',
    title: 'Insurance',
    fields: [
      { key: 'homeInsurance', label: 'Home Insurance', placeholder: 'e.g., 38.5' },
      { key: 'personalUmbrella', label: 'Personal Umbrella', placeholder: 'e.g., 17.25' },
    ],
  },
  {
    id: 'utilities',
    title: 'House Utilities',
    fields: [
      { key: 'electricGas', label: 'Electric + Natural Gas', placeholder: 'e.g., 131.01' },
      { key: 'internet', label: 'Internet (Comcast)', placeholder: 'e.g., 99' },
      { key: 'garbage', label: 'Garbage', placeholder: 'e.g., 117' },
      { key: 'water', label: 'Water (enter 0 if “Included HOA”)', placeholder: 'e.g., 0' },
    ],
  },
];

const PLACEHOLDERS: ExpenseSection[] = [
  { id: 'maintenance', title: 'Maintenance & Repairs (placeholder)', fields: [] },
  { id: 'appliances', title: 'Appliances & Warranties (placeholder)', fields: [] },
  { id: 'landscaping', title: 'Landscaping / Garden (placeholder)', fields: [] },
  { id: 'security', title: 'Home Security / Monitoring (placeholder)', fields: [] },
  { id: 'misc', title: 'Miscellaneous (placeholder)', fields: [] },
];

const STORAGE_KEY = 'personalFinance.houseUpkeep.v1';

export default function PersonalFinancePage() {
  const [values, setValues] = useState<Record<string, string>>({});

  // Load from IndexedDB on mount
  useEffect(() => {
    (async () => {
      const saved = await idbGet(STORAGE_KEY);
      if (saved && typeof saved === 'object') setValues(saved as Record<string, string>);
    })();
  }, []);

  const setAndPersist = async (next: Record<string, string>) => {
    setValues(next);
    // write-through save
    await idbSet(STORAGE_KEY, next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value && isNaN(Number(value))) {
      alert('Please enter a valid number');
      const next = { ...values, [name]: '' };
      await setAndPersist(next);
      return;
    }
    await idbSet(STORAGE_KEY, { ...values, [name]: value });
  };

  // Sum all numeric monthly fields
  const monthlyTotal = useMemo(() => {
    const numeric = Object.values(values).map((v) => Number(v || 0));
    return numeric.reduce((a, b) => a + (isFinite(b) ? b : 0), 0);
  }, [values]);

  const yearlyTotal = useMemo(() => monthlyTotal * 12, [monthlyTotal]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>

      <Card>
        <CardHeader>
          <CardTitle>House Upkeep</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={['home', 'hoa']}>
            {[...SECTIONS, ...PLACEHOLDERS].map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="text-lg">{section.title}</AccordionTrigger>
                <AccordionContent>
                  {section.fields.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                      Placeholder for future fields.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.fields.map((f) => (
                        <div key={f.key} className="flex flex-col">
                          <Label htmlFor={f.key}>{f.label} (per month)</Label>
                          <Input
                            id={f.key}
                            name={f.key}
                            inputMode="decimal"
                            type="number"
                            step="any"
                            placeholder={f.placeholder}
                            value={values[f.key] ?? ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-1"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SummaryBox label="House Subtotal — Per Month" amount={monthlyTotal} />
            <SummaryBox label="House Subtotal — Per Year" amount={yearlyTotal} />
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              type="button"
              onClick={async () => {
                const snapshot = values;
                await navigator.clipboard?.writeText(JSON.stringify(snapshot, null, 2));
              }}
            >
              Copy JSON
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={async () => {
                const cleared: Record<string, string> = {};
                await setAndPersist(cleared);
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryBox({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold mt-1">
        {amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
      </div>
    </div>
  );
}
