import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../auth/AuthContext";

const links = [
  { path: "/admin", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "/admin/users", label: "Users", icon: <PeopleIcon /> },
  { path: "/admin/transactions", label: "Transactions", icon: <ReceiptLongIcon /> },
  { path: "/admin/categories", label: "Categories", icon: <CategoryIcon /> },
];

export default function AdminSidebar({ expanded, toggle }) {
  const location = useLocation();
  const { logout } = useAuth();
  const width = expanded ? 260 : 80;

  return (
    <Box
      sx={{
        position: "fixed",
        width,
        height: "100vh",
        bgcolor: "#020617",
        borderRight: "1px solid #1E293B",
        transition: "width 0.3s",
      }}
    >
      {/* Header */}
      <Box sx={{ height: 74, display: "flex", alignItems: "center", px: 2 }}>
        <IconButton onClick={toggle} sx={{ color: "#38BDF8" }}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Menu */}
      <List>
        {links.map((link) => {
          const active = location.pathname === link.path;
          return (
            <Tooltip title={!expanded ? link.label : ""} placement="right" key={link.path}>
              <ListItemButton
                component={NavLink}
                to={link.path}
                sx={{
                  bgcolor: active ? "#020617" : "transparent",
                  color: active ? "#38BDF8" : "#94A3B8",
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>{link.icon}</ListItemIcon>
                {expanded && <ListItemText primary={link.label} />}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      {/* Logout */}
      <ListItemButton onClick={logout} sx={{ color: "#F87171", mt: "auto" }}>
        <ListItemIcon sx={{ color: "inherit" }}>
          <LogoutIcon />
        </ListItemIcon>
        {expanded && <ListItemText primary="Logout" />}
      </ListItemButton>
    </Box>
  );
}
