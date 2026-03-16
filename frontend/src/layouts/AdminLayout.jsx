import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

const COLORS = {
  bg: "#0F172A",
  surface: "#020617",
  border: "#1E293B",
  primary: "#38BDF8",
};

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const MINI_WIDTH = 90;
  const FULL_WIDTH = 280;

  const [expanded, setExpanded] = useState(true);

  const sidebarWidth = isMobile ? 0 : (expanded ? FULL_WIDTH : MINI_WIDTH);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: COLORS.bg,
      }}
    >
      {/* Admin Sidebar */}
      <AdminSidebar
        expanded={expanded}
        toggle={() => setExpanded(!expanded)}
        colors={COLORS}
      />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Admin Navbar */}
        <AdminNavbar sidebarWidth={sidebarWidth} colors={COLORS} />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: { xs: 0, sm: `${sidebarWidth}px` },
            mt: "74px",
            p: 3,
            transition: "all 0.3s ease",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
