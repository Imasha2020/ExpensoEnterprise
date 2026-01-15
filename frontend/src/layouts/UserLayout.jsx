import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function UserLayout() {
  const MINI_WIDTH = 70;
  const FULL_WIDTH = 260;

  const [expanded, setExpanded] = useState(false);

  const sidebarWidth = expanded ? FULL_WIDTH : MINI_WIDTH;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Sidebar
        expanded={expanded}
        toggle={() => setExpanded(!expanded)}
      />

      <Box
        component="main"
        sx={{
          ml: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: "all 0.3s ease",
          p: { xs: 2, sm: 4 },
          overflowX: "hidden",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
