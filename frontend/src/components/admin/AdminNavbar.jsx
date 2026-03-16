import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

export default function AdminNavbar({ sidebarWidth }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        left: sidebarWidth,
        width: `calc(100% - ${sidebarWidth}px)`,
        bgcolor: "#020617",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <Toolbar sx={{ height: 74, display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight={700} color="#E5E7EB">
          Admin Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ bgcolor: "#38BDF8" }}>A</Avatar>
          <Typography color="#E5E7EB">Admin</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
