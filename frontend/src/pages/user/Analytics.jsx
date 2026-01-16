import { useEffect, useState } from "react";
import {
  Box, Tabs, Tab, Typography, Grid, Container, Stack, Fade
} from "@mui/material";

// Icons for a modern touch
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

import {
  getExpensesByCategory,
  getIncomeByCategory,
} from "../../api/analyticsApi";

import CategoryChart from "../../components/CategoryChart";

const COLORS = {
  bg: "#F4F7FE",
  primary: "#4318FF",
  textPrimary: "#1B2559",
  textSecondary: "#A3AED0",
};

export default function Analytics() {
  const [tab, setTab] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    getExpensesByCategory().then(res => setExpenseData(res.data.data));
    getIncomeByCategory().then(res => setIncomeData(res.data.data));
  }, []);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="xl">
        
        {/* ================= HEADER ================= */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={6}>
          <Box>
            <Typography variant="h4" fontWeight={900} sx={{ color: COLORS.textPrimary, letterSpacing: "-2px" }}>
              Financial Analytics
            </Typography>
            <Typography variant="h6" color={COLORS.textSecondary} fontWeight={500}>
              Deep dive into your spending and earning patterns.
            </Typography>
          </Box>

          {/* MODERN SEGMENTED TABS */}
          <Box sx={{ 
            bgcolor: "#E0E5F2", 
            p: 0.5, 
            borderRadius: "20px",
            display: "inline-flex"
          }}>
            <Tabs 
              value={tab} 
              onChange={(e, v) => setTab(v)}
              sx={{
                minHeight: "48px",
                "& .MuiTabs-indicator": {
                  height: "100%",
                  borderRadius: "16px",
                  bgcolor: "#FFFFFF",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.05)"
                },
                "& .MuiTab-root": {
                  zIndex: 1,
                  minHeight: "48px",
                  fontWeight: 700,
                  borderRadius: "16px",
                  textTransform: "none",
                  color: COLORS.textSecondary,
                  transition: "0.2s",
                  "&.Mui-selected": { color: COLORS.primary }
                }
              }}
            >
              <Tab icon={<DonutLargeRoundedIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Categories" />
              <Tab icon={<BarChartRoundedIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Monthly Flow" />
            </Tabs>
          </Box>
        </Stack>

        {/* ================= TAB CONTENT ================= */}
        
        {tab === 0 && (
          <Fade in timeout={600}>
            <Grid container spacing={5}>
              <Grid item xs={12} lg={6}>
                <CategoryChart title="Expenses by Category" data={expenseData} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CategoryChart title="Income by Category" data={incomeData} />
              </Grid>
            </Grid>
          </Fade>
        )}

        {tab === 1 && (
          <Fade in timeout={600}>
            <Box sx={{ 
              mt: 2, 
              p: 10, 
              borderRadius: "40px", 
              bgcolor: "#FFF", 
              textAlign: "center",
              border: "2px dashed #E0E5F2"
            }}>
              <BarChartRoundedIcon sx={{ fontSize: 80, color: COLORS.textSecondary, mb: 2, opacity: 0.5 }} />
              <Typography variant="h4" fontWeight={800} color={COLORS.textPrimary}>
                Monthly Comparison UI
              </Typography>
              <Typography variant="body1" color={COLORS.textSecondary}>
                We are currently processing your historical data for this view.
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
}