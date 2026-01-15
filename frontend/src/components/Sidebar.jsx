import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Typography,
  Divider,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../auth/AuthContext";

const links = [
  { path: "/user", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "/user/add", label: "Add Transaction", icon: <AddCircleOutlineIcon /> },
  { path: "/user/transactions", label: "Transactions", icon: <ListAltIcon /> },
  { path: "/user/analytics", label: "Analytics", icon: <BarChartIcon /> },
];

export default function Sidebar({ expanded, toggle }) {
  const location = useLocation();
  const { logout } = useAuth();
  const width = expanded ? 260 : 70;

  return (
    <Box
      sx={{
        width,
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        transition: "width 0.3s ease",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", px: 1, py: 1 }}>
        <IconButton onClick={toggle}>
          <MenuIcon />
        </IconButton>

        {expanded && (
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ ml: 1, whiteSpace: "nowrap" }}
          >
            Expenso
          </Typography>
        )}
      </Box>

      <Divider />

      {/* NAVIGATION */}
      <Box sx={{ flexGrow: 1, mt: 1 }}>
        <List>
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Tooltip
                key={link.path}
                title={!expanded ? link.label : ""}
                placement="right"
              >
                <ListItemButton
                  component={NavLink}
                  to={link.path}
                  sx={{
                    mx: 1,
                    mb: 1,
                    borderRadius: 2,
                    justifyContent: expanded ? "flex-start" : "center",
                    bgcolor: active ? "primary.light" : "transparent",
                    color: active ? "primary.main" : "text.secondary",
                    "&:hover": { bgcolor: "primary.light" },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: expanded ? 2 : 0,
                      color: "inherit",
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>

                  {expanded && (
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* LOGOUT */}
      <Box sx={{ p: 1 }}>
        <Tooltip title={!expanded ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={logout}
            sx={{
              mx: 1,
              borderRadius: 2,
              justifyContent: expanded ? "flex-start" : "center",
              color: "error.main",
              "&:hover": {
                bgcolor: "error.light",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: expanded ? 2 : 0,
                color: "error.main",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            {expanded && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
