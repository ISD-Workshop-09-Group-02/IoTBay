import React, { useState, useEffect } from "react";
import CreateEditInventory from "./Components/CreateEditInventory";
import { useCreateProduct } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";

export default function CreateInventory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const createProduct = useCreateProduct();

  const navigate = useNavigate();

  useEffect(() => {
    if (createProduct.isSuccess) {
      navigate("/staff/inventory/manage");
    }
  }, [createProduct.isSuccess, navigate]);

  const createProductFunction = () => {
    if (!name || !description || !price || !stock || !category || !image) {
      return;
    }

    createProduct.mutate({
      name: name,
      price: price,
      image: image,
      description: description,
      stock: stock,
      category: category,
    });
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
