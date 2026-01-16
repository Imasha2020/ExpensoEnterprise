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
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { useAuth } from "../auth/AuthContext";

/* ================= CONSTANTS ================= */

const HEADER_HEIGHT = 74;

const COLORS = {
  bg: "#F5EFFF",
  border: "#E5D9F2",
  accent: "#CDC1FF",
  primary: "#A294F9",
};

const links = [
  { path: "/user", label: "Dashboard", icon: <DashboardRoundedIcon /> },
  { path: "/user/add", label: "Add Transaction", icon: <AddCircleRoundedIcon /> },
  { path: "/user/transactions", label: "Transactions", icon: <ListAltRoundedIcon /> },
  { path: "/user/analytics", label: "Analytics", icon: <BarChartRoundedIcon /> },
];

/* ================= COMPONENT ================= */

export default function Sidebar({ expanded, toggle }) {
  const location = useLocation();
  const { logout } = useAuth();

  const width = expanded ? 260 : 80;

  return (
    <>
      {/* ===== SIDEBAR HEADER (LOGO AREA) ===== */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width,
          height: `${HEADER_HEIGHT}px`,
          display: "flex",
          alignItems: "center",
          px: 2,
          bgcolor: "#fff",
          borderRight: `1px solid ${COLORS.border}`,
          borderBottom: `1px solid ${COLORS.border}`,
          transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1400,
        }}
      >
        <IconButton onClick={toggle} sx={{ color: COLORS.primary }}>
          <MenuIcon />
        </IconButton>

        {expanded && (
          <Typography
            variant="h6"
            fontWeight={900}
            sx={{
              ml: 1,
              color: COLORS.primary,
              letterSpacing: "-0.5px",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            Expenso
          </Typography>
        )}
      </Box>

      {/* ===== SIDEBAR BODY ===== */}
      <Box
        sx={{
          position: "fixed",
          top: `${HEADER_HEIGHT}px`,
          left: 0,
          width,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          bgcolor: "#fff",
          borderRight: `1px solid ${COLORS.border}`,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden",
          zIndex: 1300,
        }}
      >
        {/* NAVIGATION */}
        <Box sx={{ flexGrow: 1, mt: 2, px: 1.5 }}>
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
                      mb: 1,
                      borderRadius: "12px",
                      justifyContent: expanded ? "flex-start" : "center",
                      transition: "all 0.3s ease",
                      bgcolor: active ? COLORS.bg : "transparent",
                      color: active ? COLORS.primary : "#64748b",
                      "&:hover": {
                        bgcolor: COLORS.accent,
                        color: "#fff",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: expanded ? 2 : 0,
                        color: "inherit",
                        "& svg": { fontSize: 24 },
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>

                    {expanded && (
                      <ListItemText
                        primary={link.label}
                        primaryTypographyProps={{
                          fontWeight: active ? 700 : 500,
                          fontSize: "0.95rem",
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              );
            })}
          </List>
        </Box>

        <Divider sx={{ borderColor: COLORS.bg }} />

        {/* LOGOUT */}
        <Box sx={{ p: 2 }}>
          <ListItemButton
            onClick={logout}
            sx={{
              borderRadius: "12px",
              justifyContent: expanded ? "flex-start" : "center",
              color: "#ef4444",
              "&:hover": { bgcolor: "#fef2f2" },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: expanded ? 2 : 0,
                color: "inherit",
              }}
            >
              <LogoutRoundedIcon />
            </ListItemIcon>

            {expanded && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            )}
          </ListItemButton>
        </Box>
      </Box>
    </>
  );
}
