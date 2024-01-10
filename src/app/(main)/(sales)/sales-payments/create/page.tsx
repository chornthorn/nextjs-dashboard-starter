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
import { useEffect, useState } from "react";
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

interface PaymentType {
  id: number;
  name: string; // Cash, Bank
}

const paymentTypes: PaymentType[] = [
  {
    id: 1,
    name: "Cash",
  },
  {
    id: 2,
    name: "Bank",
  },
];

interface Sale {
  id: number;
  name: string; // Sale, Purchase
}

const salesTypes: Sale[] = [
  {
    id: 1,
    name: "Sale",
  },
  {
    id: 2,
    name: "Purchase",
  },
];

interface SaleItem {
  id: number;
  name: string;
  amount: number;
}

const saleItems: SaleItem[] = [
  {
    id: 1,
    name: "Sale Item",
    amount: 100,
  },
  {
    id: 2,
    name: "Purchase Item",
    amount: 200,
  },
];

interface Item {
  sale: Sale;
  saleItem: SaleItem;
}

interface ItemRecord {
  id: number;
  item: Item;
}

const Page = () => {
  const [invoiceDate, setInvoiceDate] = useState<Date>();
  const [referenceDate, setReferenceDate] = useState<Date>();
  const [writeOff, setWriteOff] = useState<number>(0.0);
  const [amountPaid, setAmountPaid] = useState<number>(0.0);

  const [items, setItems] = useState<ItemRecord[]>([
    {
      id: 1,
      item: {
        sale: {
          id: 0,
          name: "",
        },
        saleItem: {
          id: 0,
          name: "",
          amount: 0,
        },
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
          sale: {
            id: 0,
            name: "",
          },
          saleItem: {
            id: 0,
            name: "",
            amount: 0,
          },
        },
      },
    ]);
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            item: {
              ...item.item,
              [field]: value,
            },
          };
        }
        return item;
      });
    });
  };

  // calculate total
  const total = items.reduce((total, item) => {
    return total + item.item.saleItem.amount;
  }, 0);

  const handleCalculateAmountPaid = (
    total: number,
    writeOff: number,
  ): number => {
    return total - writeOff;
  };

  useEffect(() => {
    setAmountPaid(handleCalculateAmountPaid(total, writeOff));

    if (items.length === 0) {
      setItems((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          item: {
            sale: {
              id: 0,
              name: "",
            },
            saleItem: {
              id: 0,
              name: "",
              amount: 0,
            },
          },
        },
      ]);

      setWriteOff(0);
      setAmountPaid(0);
    }
  }, [items, total, writeOff]);

  return (
    <>
      <div>
        <BackButton />
        <Card>
          <div className="p-4 flex justify-between items-center">
            <p>Create Sales Payment</p>
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

          <div className="px-4">
            <div className="font-medium text-black">Details</div>
            <div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2  pb-4 pt-1">
                <div className="space-y-2">
                  <Label
                    className="
                    text-sm text-gray-500
                    font-normal
                  "
                  >
                    From Account
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue>Account name</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Account name</SelectLabel>
                        <SelectItem value="Account name">
                          Account name
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    className="
                    text-sm text-gray-500
                    font-normal
                  "
                  >
                    To Account
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue>Account name</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Account name</SelectLabel>
                        <SelectItem value="Account name">
                          Account name
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-500 font-normal">
                    Payment Method
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue>Payment Method</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Payment Method</SelectLabel>
                        {paymentTypes.map((paymentType) => (
                          <SelectItem
                            key={paymentType.id}
                            value={paymentType.name}
                          >
                            {paymentType.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-500 font-normal">
                    Reference Date
                  </Label>
                  <div className="flex flex-col space-y-4">
                    <Popover key={referenceDate?.getDate()}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !referenceDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {referenceDate ? (
                            format(referenceDate, "PPP")
                          ) : (
                            <span>Select Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={referenceDate}
                          onSelect={setReferenceDate}
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
          </div>

          <div className="px-4">
            <div className="font-medium text-black">Amounts</div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2  pb-4 pt-1">
              <div className="space-y-2">
                <Label
                  htmlFor="amount"
                  className="text-sm text-gray-500 font-normal"
                >
                  Amount
                </Label>
                <Input
                  id="amount"
                  placeholder="0.00"
                  value={
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(total) || 0
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="text-sm text-gray-500 font-normal"
                  htmlFor="write_off"
                >
                  Write Off
                </Label>
                <Input
                  id="write_off"
                  placeholder="0.00"
                  type="number"
                  value={writeOff > 0 ? writeOff : ""}
                  onChange={(e) => {
                    // check if write off is greater than total
                    if (parseFloat(e.target.value) > total) {
                      setWriteOff(total);
                      setAmountPaid(0);
                    } else {
                      setWriteOff(parseFloat(e.target.value));
                      setAmountPaid(
                        handleCalculateAmountPaid(
                          total,
                          parseFloat(e.target.value),
                        ),
                      );
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                {writeOff > 0 && (
                  <>
                    <Label
                      htmlFor="amount_paid"
                      className="text-sm text-gray-500 font-normal"
                    >
                      Amount Paid
                    </Label>
                    <Input
                      id="amount_paid"
                      placeholder="0.0"
                      value={
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(amountPaid) || 0
                      }
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <Separator className="mb-2" />
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>Payment Reference</div>
              <Button variant="outline" onClick={handleAddItem}>
                Add Item
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead className="min-w-60">Type</TableHead>
                  <TableHead className="min-w-60">Name</TableHead>
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
                        onValueChange={(value) =>
                          handleItemChange(
                            item.id,
                            "sale",
                            salesTypes.find((sale) => sale.name === value),
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {item.item.sale.name || "Select Type"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sale Type</SelectLabel>
                            {salesTypes.map((sale) => (
                              <SelectItem key={sale.id} value={sale.name}>
                                {sale.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        onValueChange={(value) =>
                          handleItemChange(
                            item.id,
                            "saleItem",
                            saleItems.find(
                              (saleItem) => saleItem.name === value,
                            ),
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {item.item.saleItem.name || "Select Item"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sale Item</SelectLabel>
                            {saleItems.map((saleItem) => (
                              <SelectItem
                                key={saleItem.id}
                                value={saleItem.name}
                              >
                                {saleItem.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(item.item.saleItem.amount) || 0
                        }
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
          </div>

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
