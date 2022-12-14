import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { API } from "../../libs/axios";

const useCreateProduct = () => {
  const [images, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(5).label("Title"),
    description: Yup.string().required().min(5).label("Description"),
    images: Yup.array()
      .min(1, "Please provide at least 1 images")
      .required("images is required")
      .label("images"),
    category: Yup.string(),
    price: Yup.number().min(0).required(),
    location: Yup.string().min(10).required(),
    Bathrooms: Yup.number().required(),
    livingRoom: Yup.number().required(),
    phoneNumber: Yup.number().min(11).required(),
  });

  const createProductImagesChange = (e, setFiledValue) => {
    const files = Array.from(e.target.files);

    const finalBuffer = [];
    setImage([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const extension = reader.result?.split(";")[0]?.split("/")[1];
        if (reader.readyState === 2) {
          if (
            extension === "jpeg" ||
            extension === "png" ||
            extension === "jpg"
          ) {
            setImage((old) => [...old, reader.result]);
            finalBuffer.push(reader.result);
          } else return toast.error("Only images is valid for thumbnails");
        }
      };
      reader.readAsDataURL(file);
    });
    setFiledValue(e.target.name, finalBuffer);
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await API.createProduct({ data: values });
      toast.success(response?.data);
      resetForm();
      setImage([]);
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    images,
    validationSchema,
    createProductImagesChange,
    handleSubmit,
    loading,
  };
};

export default useCreateProduct;
