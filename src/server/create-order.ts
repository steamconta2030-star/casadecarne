import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "../integrations/supabase/client.server";

const itemSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  saleUnit: z.enum(["un", "kg"]),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
});

const orderSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(8),
  fulfillmentType: z.enum(["delivery", "pickup"]),
  street: z.string().optional(),
  addressNumber: z.string().optional(),
  neighborhood: z.string().optional(),
  reference: z.string().optional(),
  items: z.array(itemSchema).min(1),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.fulfillmentType === "delivery" && (!data.street || !data.addressNumber || !data.neighborhood)) {
      throw new Error("Endereço incompleto para entrega.");
    }

    const total = Math.round(data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) * 100) / 100;

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        status: "open",
        customer_name: data.customerName.trim(),
        customer_phone: data.customerPhone.trim(),
        fulfillment_type: data.fulfillmentType,
        street: data.fulfillmentType === "delivery" ? data.street?.trim() : null,
        address_number: data.fulfillmentType === "delivery" ? data.addressNumber?.trim() : null,
        neighborhood: data.fulfillmentType === "delivery" ? data.neighborhood?.trim() : null,
        reference: data.reference?.trim() || null,
        total,
      })
      .select("id, order_number, total")
      .single();

    if (orderError || !order) throw new Error(orderError?.message || "Não foi possível criar o pedido.");

    const { error: itemsError } = await supabaseAdmin.from("order_items").insert(
      data.items.map((item) => ({
        order_id: order.id,
        product_id: null,
        product_name: item.productName,
        sale_unit: item.saleUnit,
        quantity: item.quantity,
        unit_price: item.unitPrice,
      })),
    );

    if (itemsError) {
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      throw new Error(itemsError.message);
    }

    return { id: order.id, orderNumber: order.order_number, total: Number(order.total) };
  });
