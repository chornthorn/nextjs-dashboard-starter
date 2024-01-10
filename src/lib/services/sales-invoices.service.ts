import { BaseService } from "./abstract.base.service";
import { SalesInvoice } from "@/lib/schema";

//TODO: Using fetch or axios, is up to you

//TODO: I'm from OOP world, so I like to use kind of service,
// but you can use whatever you want
export class SalesInvoicesService extends BaseService<
  SalesInvoice, //TODO: change this to your request type
  SalesInvoice //TODO: change this to your response type
> {
  // singleton pattern
  private static instance: SalesInvoicesService;
  private constructor() {
    super();
  }

  public static getInstance(): SalesInvoicesService {
    if (!SalesInvoicesService.instance) {
      SalesInvoicesService.instance = new SalesInvoicesService();
    }
    return SalesInvoicesService.instance;
  }

  async create(req: SalesInvoice): Promise<SalesInvoice> {
    try {
      const res = await fetch("/api/sales-invoices", {
        method: "POST",
        body: JSON.stringify(req),
      });
      return await res.json();
    } catch (error) {
      throw new Error("Error creating sales invoice");
    }
  }

  async find(id: number): Promise<SalesInvoice> {
    try {
      const res = await fetch(`/api/sales-invoices/${id}`);
      return await res.json();
    } catch (error) {
      throw new Error("Error reading sales invoice");
    }
  }

  async finds(): Promise<SalesInvoice[]> {
    try {
      const res = await fetch(`/api/sales-invoices`);
      const { data } = await res.json();
      return data;
    } catch (error) {
      throw new Error("Error reading sales invoices");
    }
  }

  async update(id: number, req: SalesInvoice): Promise<SalesInvoice> {
    try {
      const res = await fetch(`/api/sales-invoices/${id}`, {
        method: "PUT",
        body: JSON.stringify(req),
      });
      return await res.json();
    } catch (error) {
      throw new Error("Error updating sales invoice");
    }
  }

  async delete(id: number): Promise<SalesInvoice> {
    try {
      const res = await fetch(`/api/sales-invoices/${id}`, {
        method: "DELETE",
      });
      return await res.json();
    } catch (error) {
      throw new Error("Error deleting sales invoice");
    }
  }
}
