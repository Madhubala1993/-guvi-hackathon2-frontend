import { Equipment } from "./Equipment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API } from "./global";

export function EquipmentsList() {
  const [equipments, setEquipmentsList] = useState([]);
  const history = useHistory();

  const getEquipments = () => {
    fetch(`${API}/equipments`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((items) => setEquipmentsList(items));
  };
  useEffect(getEquipments, []);

  const deleteProduct = (id) => {
    fetch(`${API}/equipments/${id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(() => getEquipments());
  };

  return (
    <div className="equipment-list ">
      {equipments.map(({ id, description, duration, rate, pic }, index) => (
        <Equipment
          key={id}
          deleteButton={
            <IconButton
              sx={{ marginLeft: "auto" }}
              aria-label="delete"
              color="error"
              onClick={() => deleteProduct(id)}
            >
              <DeleteIcon />
            </IconButton>
          }
          editButton={
            <IconButton
              color="secondary"
              aria-label="edit-product"
              onClick={() => history.push(`/equipment/edit/${id}`)}
            >
              <EditIcon />
            </IconButton>
          }
          id={id}
          description={description}
          duration={duration}
          rate={rate}
          pic={pic}
        />
      ))}
    </div>
  );
}
