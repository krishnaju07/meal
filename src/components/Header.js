import React from "react";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Header() {
  const { state } = useAppContext();
  const cartItemCount = state.cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <>
      <div className="navbar">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <img
            src="/icon/logo-black.svg"
            alt="Logo"
            className="logo"
            style={{ height: "120px" }}
          />
        </Link>
        <ul>
          <li>
            <Link
              to="/CartPage"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton aria-label="cart">
                <Badge badgeContent={cartItemCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          </li>
          <li>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
