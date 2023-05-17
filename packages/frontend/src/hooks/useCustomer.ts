import { trpcReact } from "../App";
import React from "react";

const customerKey = "customer";

// getMycustomer (currenty logged in)
export function useGetMyCustomer() {
  return trpcReact.customer.myCustomer.useQuery();
}

// getCustomers (GET for customers management by staffs) /
export function useGetCustomers({
  customerFilter
}: {
  customerFilter?: string;
}) {
  const { data, ...rest } = trpcReact.customer.customers.useQuery();

  const filteredData = React.useMemo(() => {
    if (customerFilter) {
      return data?.filter((customer) =>
        customer.customerId.toLowerCase().includes(customerFilter.toLowerCase())
      ) || [];
    }
    return data || [];
  }, [data, customerFilter]);

  return {
    data: filteredData,
    ...rest,
  };
}

// createCustomer (CREATE) /
export function useCreateProduct() {
  const context = trpcReact.useContext();

  return trpcReact.products.create.useMutation({
    onSuccess: () => {
      context.products.products.invalidate();
    }
  });
}

// deleteProduct (DELETE) /
export function useDeleteProduct() {
  const context = trpcReact.useContext();

  return trpcReact.products.delete.useMutation({
    onSuccess: () => {
      context.products.products.invalidate();
    },
  });
}

// deleteProducts (DELETE) /
export function useDeleteProducts() {
  // const queryClient = useQueryClient();
  // return useMutation<ProductsCollectionSchema, ApiError, string[]>(
  //   (productId) =>
  //     api.products.deleteProducts({
  //       products: productId,
  //     }),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries([productKey]);
  //     },
  //     onMutate: async (productId) => {
  //       await queryClient.cancelQueries([productKey]);
  //       const previousProducts = queryClient.getQueryData([productKey]);
  //       queryClient.setQueryData([productKey], (old: any) => {
  //         return old.filter((product: ProductsSchema) => {
  //           return !productId.includes(product.productId);
  //         });
  //       });
  //       return { previousProducts };
  //     },
  //   }
  // );

  const context = trpcReact.useContext();

  return trpcReact.products.deleteMany.useMutation({
    onSuccess: () => {
      context.products.products.invalidate();
    }
  });
}

// updateProduct (PUT) /
export function useUpdateProduct() {
  const context = trpcReact.useContext();

  return trpcReact.products.update.useMutation({
    onSuccess: () => {
      context.products.products.invalidate();
    }
  });
}