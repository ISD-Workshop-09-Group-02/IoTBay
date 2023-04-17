import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import {
  ApiError,
  CategoryCollectionSchema,
  CategorySchema,
} from "../api/generated";

const categoryKey = "category";

// getCategory (GET) /:categoryId
export function useGetCategory(categoryId: string) {
  return useQuery<CategorySchema, ApiError>([categoryKey, categoryId], () =>
    api.categories.getCategory(categoryId)
  );
}

// getCategories (GET) /
export function useGetCategories() {
  return useQuery<CategoryCollectionSchema, ApiError>([categoryKey], () =>
    api.categories.getCategories()
  );
}

// createCategory (POST) /
interface ICreateCategory {
  name: string;
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategorySchema, ApiError, ICreateCategory>(
    (data) => api.categories.createCategory(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([categoryKey]);
      },
    }
  );
}

// deleteCategory (DELETE) /
// Overcomplicated the routes so this one isn't being generated correctly
// Will have to refactor categories.router.ts to fix this & controllers to fix

// export function useDeleteCategory(categoryId: string) {
//     const queryClient = useQueryClient();
//     return useMutation<unknown, ApiError, string>(
//         (categoryId) => api.categories.deleteCategory(categoryId),
//         {
//         onSuccess: () => {
//             queryClient.invalidateQueries(["categories"]);
//         },
//         }
//     );
// }

// deleteCategories (DELETE) /

// updateCategory (PUT) /
// export function useUpdateCategory(categoryId: string, name: string) {
//   const queryClient = useQueryClient();
//   return useMutation<CategorySchema, ApiError, CategorySchema>(
//     (category) => api.categories.updateCategory(categoryId, { name }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["categories"]);
//       },
//     }
//   );
// }

interface IUpdateCategory {
  categoryId: string;
  requestBody: {
    name: string;
  };
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation<CategorySchema, ApiError, IUpdateCategory>(
    (data) => api.categories.updateCategory(data.categoryId, data.requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([categoryKey]);
      },
    }
  );
}
