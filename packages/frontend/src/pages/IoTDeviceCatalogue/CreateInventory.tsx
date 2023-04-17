import React, { useState, useEffect } from "react";
import CreateEditInventory from "./Components/CreateEditInventory";
import { useCreateProduct } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { ApiError } from "../../api/generated";

export default function CreateInventory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const createProduct = useCreateProduct();
  const toast = useToast();
  const navigate = useNavigate();

  const createProductFunction = async () => {
    if (!name || !description || !price || !stock || !category || !image) {
      return;
    }

    try {
      await createProduct.mutateAsync({
        name: name,
        price: price,
        image: image,
        description: description,
        stock: stock,
        category: category,
      });
      toast({
        title: "Inventory created",
        description: "Record has been created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/staff/inventory/manage");
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: "Inventory creation failed",
          description: error.body?.message ?? "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Inventory creation failed",
          description: "Unknown error",
          status: "error",
          duration: 5000,
        });
      }
    }
  };

  return (
    <CreateEditInventory
      createOrUpdate="create"
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
      createProduct={createProductFunction}
    />
  );
}
