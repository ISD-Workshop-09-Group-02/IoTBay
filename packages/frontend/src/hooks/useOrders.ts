import { trpcReact } from "../App";
import React from "react";

const ordersKey = "orders";

// getProduct (GET) /:productId
export function useCreateOrder() {
    const context = trpcReact.useContext();

    return trpcReact.orders.createOrder.useMutation({
        onSuccess: (data) => {
            context.orders.invalidate();
            console.log("Order created", data);
        },
    });
}