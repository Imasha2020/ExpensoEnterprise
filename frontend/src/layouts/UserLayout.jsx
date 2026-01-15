import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserNavbar from "../components/UserNavbar";

const COLORS = {
  bg: "#F5EFFF",      // Lightest
  surface: "#FFFFFF", // White for content
  border: "#E5D9F2",  // Soft purple border
  accent: "#CDC1FF",  // Medium purple
  primary: "#A294F9", // Brand color
};

export default function UserLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const MINI_WIDTH = 80; // Slightly wider for better icon spacing
  const FULL_WIDTH = 260;

  const [expanded, setExpanded] = useState(false);
  
  // Logic: On mobile, sidebar overlaps (0px margin). On desktop, it pushes content.
  const sidebarWidth = isMobile ? 0 : (expanded ? FULL_WIDTH : MINI_WIDTH);

  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      bgcolor: COLORS.bg, // Base background color
      backgroundImage: `radial-gradient(at 0% 0%, ${COLORS.light} 0px, transparent 50%), radial-gradient(at 100% 100%, ${COLORS.bg} 0px, transparent 50%)`,
    }}>
      {/* Sidebar - Pass state and colors */}
      <Sidebar
        expanded={expanded}
        toggle={() => setExpanded(!expanded)}
        colors={COLORS}
      />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <UserNavbar
          sidebarWidth={sidebarWidth}
          username="Imasha"
          colors={COLORS}
        />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: { xs: 0, sm: `${sidebarWidth}px` },
            mt: "74px", // Matches navbar height + gap
            p: { xs: 2, sm: 3, md: 4 },
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", // Smoother animation
            width: { 
              xs: "100%", 
              sm: `calc(100% - ${sidebarWidth}px)` 
            },
            boxSizing: "border-box",
          }}
        >
          {/* Content Wrapper for a "Floating" look */}
          <Box sx={{
            bgcolor: "transparent",
            minHeight: "calc(100vh - 120px)",
            borderRadius: "24px",
          }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}