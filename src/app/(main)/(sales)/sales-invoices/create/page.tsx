"use client";

import BackButton from "@/components/back-button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "@phosphor-icons/react";
import { Textarea } from "@/components/ui/textarea";

interface Item {
  name: string;
  tax: number;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface ItemRecord {
  id: number;
  item: Item;
}

const Page = () => {
  const [invoiceDate, setInvoiceDate] = useState<Date>();

  const [items, setItems] = useState<ItemRecord[]>([
    {
      id: 1,
      item: {
        name: "",
        tax: 0,
        quantity: 0,
        unitPrice: 0,
        amount: 0,
      },
    },
  ]);

  const handleRemoveItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        item: {
          name: "",
          tax: 0,
          quantity: 0,
          unitPrice: 0,
          amount: 0,
        },
      },
    ]);
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setItems((prev) => {
      const item = prev.find((item) => item.id === id);

      if (item) {
        item.item[field] = value;
        item.item.amount = parseFloat(
          (item.item.quantity * item.item.unitPrice).toFixed(2),
        );

        return [...prev];
      }

      return prev;
    });
  };

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
            <p>New Sales Invoice</p>
            <div>
              Status: <Badge variant="outline">Draft</Badge>
            </div>
          </div>
          <Separator className="mb-2" />
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 px-4 pb-4">
              <div className="space-y-2">
                <Label htmlFor="number_series">Number Series</Label>
                <Input id="number_series" placeholder="PAY-###" />
              </div>
              <div className="space-y-2">
                <Label>Customer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue>Customer name</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Customer name</SelectLabel>
                      <SelectItem value="Customer name">
                        Customer name
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chart_of_account">Account</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue>Account name</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Account name</SelectLabel>
                      <SelectItem value="Account name">Account name</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="flex flex-col space-y-4">
                  <Popover key={invoiceDate?.getDate()}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !invoiceDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {invoiceDate ? (
                          format(invoiceDate, "PPP")
                        ) : (
                          <span>Select Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={invoiceDate}
                        onSelect={setInvoiceDate}
                        captionLayout="dropdown-buttons"
                        fromYear={1960}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>Items</div>
              <Button variant="outline" onClick={handleAddItem}>
                Add Item
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead className="min-w-60">Item</TableHead>
                  <TableHead className="min-w-60">Tax</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead
                    style={{
                      width: "1px",
                    }}
                  >
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <Select
                        name="name"
                        onValueChange={(value) =>
                          handleItemChange(item.id, "name", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue>Item name</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Item name</SelectLabel>
                            <SelectItem value="Item name">Item name</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        name="tax"
                        onValueChange={(value) =>
                          handleItemChange(item.id, "tax", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue>0%</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>0%</SelectLabel>
                            <SelectItem value="0%">0%</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        name="quantity"
                        type="number"
                        placeholder="0"
                        min={0}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "quantity",
                            parseFloat(e.target.value),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name="unitPrice"
                        type="number"
                        placeholder="0"
                        min={0}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "unitPrice",
                            parseFloat(e.target.value),
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name="amount"
                        type="number"
                        placeholder="0"
                        value={parseFloat(item.item.amount.toFixed(2))}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <X />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end items-center mt-4 space-x-4">
              <div>Total</div>
              <div>
                {!isNaN(total) ? (
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(total) || 0
                ) : (
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(0) || 0}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 px-4 pb-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Notes" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments</Label>
                <Input id="attachments" placeholder="Attachments" />
              </div>
            </div>
          </div>
          <Separator className="mb-2" />
          <div>
            <div className="flex justify-end p-4 ">
              <Button variant="default" className="min-w-60">
                Save
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Page;
