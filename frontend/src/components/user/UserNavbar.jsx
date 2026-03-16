import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  Avatar,
  Tooltip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

// Your Custom Color Palette
const COLORS = {
  bg: "#F5EFFF",      // Lightest Purple
  border: "#E5D9F2",  // Soft Border
  accent: "#CDC1FF",  // Medium Accent
  primary: "#A294F9", // Brand Purple
};

const HEADER_HEIGHT = 74; // Increased slightly for a more spacious, premium feel

export default function UserNavbar({ sidebarWidth, username }) {
  return (
    <AppBar
  position="fixed"
  sx={{
    height: `${HEADER_HEIGHT}px`,
    left: { xs: 0, sm: `${sidebarWidth}px` },
    width: { xs: "100%", sm: `calc(100% - ${sidebarWidth}px)` },
    bgcolor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(12px)",
    boxShadow: "none",
    borderBottom: `1px solid ${COLORS.border}`,
    zIndex: 1200,
  }}
>
      <Toolbar
    sx={{
      minHeight: `${HEADER_HEIGHT}px !important`,
      height: `${HEADER_HEIGHT}px`,
      display: "flex",
      justifyContent: "space-between",
      px: { xs: 2, md: 4 },
    }}
  >
        {/* Left Side: Welcome Message */}
        <Box>
          <Typography 
            variant="h6" 
            fontWeight="700" 
            sx={{ 
              color: "#334155", 
              letterSpacing: "-0.5px",
              fontSize: { xs: "1rem", sm: "1.25rem" }
            }}
          >
            Welcome, <span style={{ color: COLORS.primary }}>{username}</span> 👋
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}
          >
            Here’s what’s happening with your money today.
          </Typography>
        </Box>

        {/* Right Side: Actions & Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
          
          {/* Search Button (Optional Aesthetic addition) */}
          <IconButton 
            sx={{ 
              display: { xs: "none", md: "flex" },
              color: "text.secondary",
              "&:hover": { color: COLORS.primary, bgcolor: COLORS.bg } 
            }}
          >
            <SearchRoundedIcon />
          </IconButton>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton 
              sx={{ 
                bgcolor: COLORS.bg, 
                color: COLORS.primary,
                width: 42,
                height: 42,
                transition: "all 0.2s",
                "&:hover": { 
                  bgcolor: COLORS.accent, 
                  color: "#fff",
                  transform: "translateY(-2px)" 
                } 
              }}
            >
              <Badge 
                badgeContent={3} 
                sx={{ 
                  "& .MuiBadge-badge": { 
                    bgcolor: "#FF6B6B", 
                    color: "#fff",
                    fontWeight: "bold",
                    border: "2px solid #fff"
                  } 
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User Profile Avatar */}
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1.5,
              ml: 1,
              pl: 1,
              borderLeft: { sm: `1px solid ${COLORS.border}` }
            }}
          >
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                bgcolor: COLORS.primary,
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: `0 4px 10px rgba(162, 148, 249, 0.4)`,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" }
              }}
            >
              {username ? username[0].toUpperCase() : "U"}
            </Avatar>
            
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              <Typography variant="subtitle2" fontWeight="700" sx={{ color: "#334155", lineHeight: 1 }}>
                {username}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Pro Plan
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}