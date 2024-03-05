import React from "react";
import { Badge, IconButton, Switch } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import { Brightness4 as DarkIcon, WbSunny as LightIcon } from '@mui/icons-material';import "./Header.css";
import { Link } from "react-router-dom";
import { useTheme } from "../context/context";
import './Header.css'

function Header({ cartItems }) {
  const {theme,Toggletheme} = useTheme()
  console.log(theme,"sksksks")
  const cartItemCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;


  return (
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
          <IconButton onClick={Toggletheme}>
            {theme === 'Dark' ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </li>
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
  );
}

export default Header;
