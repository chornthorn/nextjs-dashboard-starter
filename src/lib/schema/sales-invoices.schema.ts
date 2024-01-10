import { z } from "zod";

export const salesInvoiceSchema = z.object({
  id: z.number(),
  invoice_no: z.string(),
  status: z.number(),
  customer: z.object({
    name: z.string(),
  }),
  date: z.string(),
  base_grand_total: z.number(),
});

export type SalesInvoice = z.infer<typeof salesInvoiceSchema>;
