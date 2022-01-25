import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./global";

const formValidationSchema = yup.object({
  description: yup.string().required("Required"),
  rate: yup.string().required("Required"),
  duration: yup.string().required("Required"),
  pic: yup.string().required("Required"),
});

export function EditProduct() {
  const [equipment, setEquipmentList] = useState(null);
  console.log("Edit products");
  const getEquipment = () => {
    fetch(`${API}/equipments/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((item) => setEquipmentList(item));
  };
  useEffect(getEquipment, []);

  const { id } = useParams();

  return equipment ? (
    <UpdateEquipment equipment={equipment} />
  ) : (
    <h1>Loading...</h1>
  );
}

export function UpdateEquipment({ equipment }) {
  console.log(`${API}/${equipment.id}`);
  //   const [name, setName] = useState(movie.name);
  //   const [poster, setPoster] = useState(movie.poster);
  //   const [rating, setRating] = useState(movie.rating);
  //   const [summary, setSummary] = useState(movie.summary);
  //   const [trailer, setTrailer] = useState(movie.trailer);

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        description: equipment.description,
        duration: equipment.duration,
        rate: equipment.rate,
        pic: equipment.pic,
      },
      validationSchema: formValidationSchema,
      onSubmit: (updatedEquipment) => {
        addEquipment(updatedEquipment);
      },
    });

  const addEquipment = (updatedEquipment) => {
    console.log("updated");
    fetch(`${API}/${equipment.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedEquipment),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then(() => history.push("/equipments"));
  };

  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <div className="addproduct-container">
        <TextField
          id="description"
          name="description"
          label="Product Name"
          variant="standard"
          onBlur={handleBlur}
          value={values.description}
          onChange={handleChange}
          error={touched.description && errors.description}
          helperText={touched.description && errors.description}
        />
        {touched.description && errors.description ? errors.description : ""}

        <TextField
          id="duration"
          name="duration"
          label="Duration"
          variant="standard"
          onBlur={handleBlur}
          value={values.duration}
          onChange={handleChange}
          error={touched.duration && errors.duration}
          helperText={touched.duration && errors.duration}
        />
        {touched.duration && errors.duration ? errors.duration : ""}

        <TextField
          id="rate"
          name="rate"
          label="Enter the amount"
          variant="standard"
          onBlur={handleBlur}
          value={values.rate}
          onChange={handleChange}
          error={touched.rate && errors.rate}
          helperText={touched.rate && errors.rate}
        />
        {touched.rate && errors.rate ? errors.rate : ""}

        <TextField
          id="pic"
          name="pic"
          label="Enter pic URL"
          variant="standard"
          onBlur={handleBlur}
          value={values.pic}
          onChange={handleChange}
          error={touched.pic && errors.pic}
          helperText={touched.pic && errors.pic}
        />
        {touched.pic && errors.pic ? errors.pic : ""}

        <Button variant="outlined" type="submit">
          Save changes
        </Button>
      </div>
    </form>
  );
}
