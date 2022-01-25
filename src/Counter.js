import { useState } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function Counter() {
  const [cart, setCart] = useState(0);

  return (
    <div className="counter-container">
      <IconButton
        color="success"
        aria-label="cart-button"
        onClick={() => setCart(cart + 1)}
      >
        <Badge badgeContent={cart} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </div>
  );
}
