import { useNavigate, useParams } from "react-router-dom";
import CreateEditInventory from "./Components/CreateEditInventory";
import { useEffect, useState } from "react";
import { useUpdateProduct, useGetProduct } from "../../hooks/useProducts";

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

  useEffect(() => {
    if (updateProduct.isSuccess) {
      navigate("/staff/inventory/manage");
    }
  }, [updateProduct.isSuccess, navigate]);

  const updateProductFunction = () => {
    if (!name || !description || !price || !stock || !category || !image) {
      return;
    }

    updateProduct.mutate({
      productId: productId,
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
