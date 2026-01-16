import React from "react";
import { Card, Box, Typography, Stack } from "@mui/material";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

/* ================= THEME COLORS ================= */
// Using a professional, high-contrast palette
const COLORS = ["#4318FF", "#6AD2FF", "#05CD99", "#FFA500", "#EE5D50"];
const TEXT_PRIMARY = "#1B2559";
const TEXT_SECONDARY = "#A3AED0";

/**
 * A Modern, Professional Donut Chart for Financial Categories
 * title → Chart title
 * data → Category totals array
 */
export default function CategoryChart({ title, data }) {
  
  // Calculate total for the center label
  const totalValue = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <Card sx={{ 
      p: 3, 
      borderRadius: "30px", 
      boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.12)",
      bgcolor: "#FFFFFF"
    }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" fontWeight={800} sx={{ color: TEXT_PRIMARY, letterSpacing: "-0.5px" }}>
          {title}
        </Typography>
      </Stack>

      <Box sx={{ position: "relative", width: "100%", height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              innerRadius={70} // Makes it a donut
              outerRadius={95}
              paddingAngle={3} // Adds modern spacing between slices
              stroke="none"    // Removes the default white border
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{ filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.05))" }}
                />
              ))}
            </Pie>
            
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: 'transparent' }} 
            />
          </PieChart>
        </ResponsiveContainer>

        {/* ================= CENTER LABEL ================= */}
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none" // Ensures tooltip still works
        }}>
          <Typography variant="caption" fontWeight={700} sx={{ color: TEXT_SECONDARY, textTransform: "uppercase", letterSpacing: "1px" }}>
            Total
          </Typography>
          <Typography variant="h5" fontWeight={800} sx={{ color: TEXT_PRIMARY }}>
            {totalValue.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* ================= MODERN LEGEND ================= */}
      <Stack spacing={1.5} sx={{ mt: 1 }}>
        {data.slice(0, 4).map((entry, index) => (
          <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: COLORS[index % COLORS.length] }} />
              <Typography variant="body2" fontWeight={700} sx={{ color: TEXT_SECONDARY }}>
                {entry.category}
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={800} sx={{ color: TEXT_PRIMARY }}>
              {((entry.total / totalValue) * 100).toFixed(1)}%
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

/* ================= CUSTOM TOOLTIP ================= */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{
        bgcolor: "#FFFFFF",
        p: 1.5,
        borderRadius: "12px",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
        border: "1px solid #F0F0F0"
      }}>
        <Typography variant="body2" fontWeight={800} sx={{ color: TEXT_PRIMARY }}>
          {payload[0].name}
        </Typography>
        <Typography variant="body2" fontWeight={700} sx={{ color: COLORS[0] }}>
          Rs. {payload[0].value.toLocaleString()}
        </Typography>
      </Box>
    );
  }
  return null;
};