import { Counter } from "./Counter";

export function Equipment({
  deleteButton,
  editButton,
  id,
  description,
  duration,
  rate,
  pic,
}) {
  return (
    <div className="equipment_container">
      <img className="pic_container" src={pic} alt={description} />
      <div className="spec">
        <h5 className="description">{description}</h5>
        <div className="rate_container">
          <h3 sx={{ marginLeft: "auto" }} className="duration">
            {duration}
          </h3>
          <h3>{rate}</h3>
          <Counter />
          {deleteButton}
          {editButton}
        </div>
      </div>
    </div>
  );
}
