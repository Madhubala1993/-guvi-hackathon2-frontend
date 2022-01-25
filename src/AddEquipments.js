import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./global";

const formValidationSchema = yup.object({
  description: yup.string().required("Required"),
  rate: yup.string().required("Required"),
  duration: yup.string().required("Required"),
  pic: yup.string().required("Required"),
});

export function AddEquipments() {
  // const [name, setName] = useState("");
  // const [poster, setPoster] = useState("");
  // const [rating, setRating] = useState("");
  // const [summary, setSummary] = useState("");
  // const [trailer, setTrailer] = useState("");

  const history = useHistory();

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        description: "",
        duration: "",
        rate: "",
        pic: "",
      },
      // validate : validateForm,
      validationSchema: formValidationSchema,
      onSubmit: (newEquipment) => {
        addEquipment(newEquipment);
      },
    });

  const addEquipment = (newEquipment) => {
    // console.log(name, poster, rating, summary, trailer);

    fetch(`${API}/equipments`, {
      method: "POST",
      body: JSON.stringify(newEquipment),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then(() => history.push("/equipments"));
  };

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
          Add Product
        </Button>
      </div>
    </form>
  );
}
