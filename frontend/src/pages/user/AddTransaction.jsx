import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// API services
import { createTransaction } from "../../api/TransactionService";
import { getCategories } from "../../api/CategoryService";

// MUI components
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Alert,
  Box,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Fade,
} from "@mui/material";

// Icons
import {
  AddCircleOutline,
  CategoryOutlined,
  CalendarTodayOutlined,
  AttachMoney,
} from "@mui/icons-material";

/* =========================================================
   🎨 CUSTOM COLOR PALETTE (matches your app theme)
   ========================================================= */
const COLORS = {
  bg: "#F5EFFF",
  light: "#E5D9F2",
  accent: "#CDC1FF",
  primary: "#A294F9",
};

/* =========================================================
   📌 MAIN COMPONENT
   ========================================================= */
function AddTransaction() {
  /* -----------------------------
     Form State
     ----------------------------- */
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "EXPENSE",
    categoryId: "",
    description: "",
    transactionDate: new Date().toISOString().split("T")[0],
  });

  /* -----------------------------
     UI State
     ----------------------------- */
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  /* =========================================================
     📡 Load categories on page load
     ========================================================= */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    loadCategories();
  }, []);

  /* =========================================================
     📝 Handle input changes
     ========================================================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================================================
     🚀 Submit transaction
     ========================================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
        categoryId: formData.categoryId
          ? Number(formData.categoryId)
          : null,
      });

      setSuccess(true);

      // Navigate after success
      setTimeout(() => navigate("/user/transactions"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create transaction"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     🧩 UI RENDER
     ========================================================= */
  return (
          <Box
          sx={{
            py: { xs: 3, md: 5 },
            overflowX: { xs: "auto", md: "hidden" }, // 👈 key
            WebkitOverflowScrolling: "touch",        // smooth iOS scroll
          }}
        >
      <Container maxWidth="sm">
        <Fade in timeout={600}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3.5, md: 4 },
              borderRadius: 4,
              background: `linear-gradient(180deg, #FFFFFF 0%, ${COLORS.bg} 100%)`,
              border: `1px solid ${COLORS.light}`,
              boxShadow: `0 16px 40px -12px rgba(162,148,249,0.25)`,
            }}
          >
            {/* ================= HEADER ================= */}
            <Box display="flex" alignItems="center" mb={3}>
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 2.5,
                  bgcolor: COLORS.primary,
                  color: "#fff",
                  mr: 1.5,
                  display: "flex",
                }}
              >
                <AddCircleOutline />
              </Box>

              <Typography
                variant="h5"
                fontWeight={800}
                letterSpacing="-0.5px"
              >
                Add Transaction
              </Typography>
            </Box>

            {/* ================= ERROR MESSAGE ================= */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* ================= FORM ================= */}
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {/* Title */}
                <TextField
                  label="Title"
                  name="title"
                  placeholder="What was this for?"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  fullWidth
                  autoFocus
                  sx={textFieldStyle}
                />

                {/* Amount + Type */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1.2fr 0.8fr",
                    },
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney sx={{ color: COLORS.primary }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyle}
                  />

                  <FormControl sx={textFieldStyle}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      label="Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="EXPENSE">Expense</MenuItem>
                      <MenuItem value="INCOME">Income</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Category + Date */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                    },
                    gap: 2,
                  }}
                >
                  <FormControl fullWidth sx={textFieldStyle}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="categoryId"
                      value={formData.categoryId}
                      label="Category"
                      onChange={handleChange}
                      startAdornment={
                        <CategoryOutlined
                          sx={{
                            mr: 1,
                            color: COLORS.primary,
                            fontSize: 20,
                          }}
                        />
                      }
                    >
                      <MenuItem value="">
                        <em>No Category</em>
                      </MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Date"
                    name="transactionDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.transactionDate}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayOutlined
                            sx={{ color: COLORS.primary, fontSize: 20 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyle}
                  />
                </Box>

                {/* Description */}
                <TextField
                  label="Description (Optional)"
                  name="description"
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  sx={textFieldStyle}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.8,
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 700,
                    bgcolor: COLORS.primary,
                    "&:hover": {
                      bgcolor: "#8B7FF0",
                      boxShadow: `0 12px 24px -6px ${COLORS.primary}`,
                    },
                    mt: 1,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Save Transaction"
                  )}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Fade>

        {/* ================= SUCCESS MESSAGE ================= */}
        <Snackbar open={success} autoHideDuration={3000}>
          <Alert
            severity="success"
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: 3,
              bgcolor: COLORS.primary,
            }}
          >
            Transaction added successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

/* =========================================================
   🎨 REUSABLE TEXTFIELD STYLE
   ========================================================= */
const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "#fff",
    "& fieldset": { borderColor: COLORS.light },
    "&:hover fieldset": { borderColor: COLORS.accent },
    "&.Mui-focused fieldset": { borderColor: COLORS.primary },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: COLORS.primary,
  },
};

export default AddTransaction;
