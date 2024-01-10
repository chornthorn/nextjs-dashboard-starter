import salesInvoices from "@/lib/data/sales-invoices.json";

export async function GET(req: Request) {
  return Response.json({
    statusCode: 200,
    message: "Sales invoices retrieved successfully",
    data: salesInvoices,
  });
}
