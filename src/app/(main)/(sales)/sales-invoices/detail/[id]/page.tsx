'use client';

import BackButton from '@/components/back-button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Item {
  name: string;
  tax: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface ItemRecord {
  id: number;
  item: Item;
}

interface Props {
  params: {
    id: number;
  };
}

const Page = ({ params }: Props) => {
  const [items, setItems] = useState<ItemRecord[]>([
    {
      id: 1,
      item: {
        name: 'Item name 1',
        tax: '10%',
        quantity: 1,
        unitPrice: 29.99,
        amount: 29.99,
      },
    },
    {
      id: 2,
      item: {
        name: 'Item name 2',
        tax: '10%',
        quantity: 1,
        unitPrice: 29.99,
        amount: 29.99,
      },
    },
    {
      id: 3,
      item: {
        name: 'Item name 3',
        tax: '10%',
        quantity: 1,
        unitPrice: 29.99,
        amount: 29.99,
      },
    },
  ]);

  // calculate total
  const total = items.reduce((total, item) => {
    return total + item.item.amount;
  }, 0);

  return (
    <>
      <div>
        <BackButton />
        <Card>
          <div className="p-4 flex justify-between items-center">
            <p>Sales Invoice</p>
            <div>
              Status: <Badge variant="default">Paid</Badge>
            </div>
          </div>
          <Separator className="mb-2" />
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 px-4 pb-4">
              <div className="space-y-2">
                <Label
                  className="text-gray-500 font-normal text-sm dark:text-gray-400
                "
                >
                  Number Series
                </Label>
                <div className="flex justify-between items-center w-full border  rounded-md px-4 py-2">
                  INV-0001
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-500 font-normal text-sm dark:text-gray-400">
                  Customer
                </Label>
                <div className="flex justify-between items-center w-full border  rounded-md px-4 py-2">
                  Customer name 1
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-500 font-normal text-sm dark:text-gray-400">
                  Account
                </Label>
                <div className="flex justify-between items-center w-full border  rounded-md px-4 py-2">
                  Account name 1
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-500 font-normal text-sm dark:text-gray-400">
                  Date
                </Label>
                <div className="flex justify-between items-center w-full border  rounded-md px-4 py-2">
                  {format(new Date(), 'MM/dd/yyyy') || ''}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead className="min-w-60">Item</TableHead>
                  <TableHead className="min-w-24">Tax</TableHead>
                  <TableHead style={{ minWidth: '1px' }}>Quantity</TableHead>
                  <TableHead className="min-w-32 md:min-w-14">
                    Unit Price
                  </TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.item.name}</TableCell>
                    <TableCell>{item.item.tax}</TableCell>
                    <TableCell>{item.item.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(item.item.unitPrice) || 0}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(item.item.amount) || 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 px-4 pb-4">
              <div className="space-y-2">
                <Label className="text-gray-500 font-normal text-sm dark:text-gray-400">
                  Net Total
                </Label>
                <div
                  className="flex justify-end items-center w-full border rounded-md px-4 py-2 bg-gray-50
                dark:bg-gray-950
                "
                >
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(total) || 0}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Page;
