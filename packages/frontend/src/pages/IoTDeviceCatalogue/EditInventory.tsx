import { useNavigate, useParams } from "react-router-dom";
import CreateEditInventory from "./Components/CreateEditInventory";
import { useEffect, useState } from "react";
import { useUpdateProduct, useGetProduct } from "../../hooks/useProducts";
import { useToast } from "@chakra-ui/react";
import { ApiError } from "../../api/generated";

export default function EditInventory() {
  const productId: string = useParams().id as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const getProduct = useGetProduct(productId);
  const updateProduct = useUpdateProduct();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (getProduct.isSuccess) {
      setName(getProduct.data.name);
      setDescription(getProduct.data.description);
      setPrice(getProduct.data.price);
      setStock(getProduct.data.stock);
      setCategory(getProduct.data.category);
      setImage(getProduct.data.image);
    }
  }, [getProduct.isSuccess, getProduct.data]);

  const updateProductFunction = async () => {
    try {
      updateProduct.mutateAsync({
        productId: productId,
        name: name,
        price: price,
        image: image,
        description: description,
        stock: stock,
        category: category,
      });
      toast({
        title: "Inventory updated",
        description: "Record has been updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/staff/inventory/manage");
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: "Inventory update failed",
          description: error.body?.message ?? "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Inventory update failed",
          description: "Unknown error",
          status: "error",
          duration: 5000,
        });
      }
    }
  };

  return (
    <CreateEditInventory
      createOrUpdate="edit"
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      price={price}
      setPrice={setPrice}
      stock={stock}
      setStock={setStock}
      category={category}
      setCategory={setCategory}
      image={image}
      setImage={setImage}
      updateProduct={updateProductFunction}
    />
  );
}
