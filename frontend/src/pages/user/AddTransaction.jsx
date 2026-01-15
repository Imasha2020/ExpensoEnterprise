import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTransaction } from '../../api/TransactionService';
import { getCategories } from '../../api/CategoryService';
import {
  Container, Paper, Typography, TextField, Button, MenuItem, Select,
  FormControl, InputLabel, Stack, Alert, Box, InputAdornment, 
  CircularProgress, Snackbar, Fade
} from "@mui/material";
import { 
  AddCircleOutline, 
  DescriptionOutlined, 
  CategoryOutlined, 
  CalendarTodayOutlined,
  AttachMoney
} from '@mui/icons-material';

// Custom Palette Constants
const COLORS = {
  bg: "#F5EFFF",
  light: "#E5D9F2",
  accent: "#CDC1FF",
  primary: "#A294F9",
};

function AddTransaction() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "EXPENSE",
    categoryId: "",
    description: "",
    transactionDate: new Date().toISOString().split('T')[0]
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.data || []);
      } catch (err) { console.error(err); }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
        categoryId: formData.categoryId ? Number(formData.categoryId) : null,
      });
      setSuccess(true);
      setTimeout(() => navigate('/transactions'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 6 }}>
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: 6, 
              background: `linear-gradient(135deg, #FFFFFF 0%, ${COLORS.bg} 100%)`,
              border: `1px solid ${COLORS.light}`,
              boxShadow: `0px 24px 48px -12px rgba(162, 148, 249, 0.25)`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Accent Blob */}
            <Box sx={{
              position: 'absolute', top: -50, right: -50, width: 150, height: 150,
              borderRadius: '50%', background: COLORS.accent, filter: 'blur(60px)', opacity: 0.6
            }} />

            <Box display="flex" alignItems="center" mb={4} position="relative">
              <Box sx={{ 
                p: 1.5, borderRadius: 3, bgcolor: COLORS.primary, color: '#fff', 
                mr: 2, display: 'flex', boxShadow: `0 8px 16px -4px ${COLORS.primary}`
              }}>
                <AddCircleOutline />
              </Box>
              <Typography variant="h4" fontWeight="900" sx={{ color: '#2D2D2D', letterSpacing: '-1px' }}>
                New <span style={{ color: COLORS.primary }}>Transaction</span>
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 3, bgcolor: '#ffedeb' }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3.5}>
                <TextField 
                  label="Title" name="title" placeholder="What was this for?"
                  value={formData.title} onChange={handleChange} required fullWidth
                  sx={textFieldStyle}
                />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 2.5 }}>
                  <TextField 
                    label="Amount" name="amount" type="number" 
                    value={formData.amount} onChange={handleChange} required 
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><AttachMoney sx={{ color: COLORS.primary }} /></InputAdornment>,
                    }}
                    sx={textFieldStyle}
                  />
                  
                  <FormControl sx={textFieldStyle}>
                    <InputLabel>Type</InputLabel>
                    <Select name="type" value={formData.type} label="Type" onChange={handleChange}>
                      <MenuItem value="EXPENSE">Expense</MenuItem>
                      <MenuItem value="INCOME">Income</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <FormControl fullWidth sx={textFieldStyle}>
                  <InputLabel>Category</InputLabel>
                  <Select 
                    name="categoryId" value={formData.categoryId} label="Category" onChange={handleChange}
                    startAdornment={<CategoryOutlined sx={{ mr: 1, color: COLORS.primary, fontSize: 20 }} />}
                  >
                    <MenuItem value=""><em>No Category</em></MenuItem>
                    {categories.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
                  </Select>
                </FormControl>

                <TextField
                  label="Date" name="transactionDate" type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.transactionDate} onChange={handleChange} required
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><CalendarTodayOutlined sx={{ color: COLORS.primary, fontSize: 20 }} /></InputAdornment>,
                  }}
                  sx={textFieldStyle}
                />

                <TextField
                  label="Description (Optional)" name="description" multiline rows={2}
                  value={formData.description} onChange={handleChange}
                  sx={textFieldStyle}
                />

                <Button 
                  variant="contained" type="submit" size="large" disabled={loading}
                  sx={{ 
                    py: 2, borderRadius: 3, textTransform: 'none', fontSize: '1.1rem', fontWeight: 700,
                    bgcolor: COLORS.primary,
                    '&:hover': { bgcolor: '#8B7FF0', boxShadow: `0 12px 24px -6px ${COLORS.primary}` },
                    boxShadow: `0 8px 20px -4px ${COLORS.primary}`,
                    mt: 2
                  }}
                >
                  {loading ? <CircularProgress size={26} color="inherit" /> : "Complete Transaction"}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Fade>

        <Snackbar open={success} autoHideDuration={3000}>
          <Alert severity="success" variant="filled" sx={{ width: '100%', borderRadius: 3, bgcolor: COLORS.primary }}>
            Transaction recorded successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

// Reusable custom style for TextFields to match the palette
const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    backgroundColor: '#fff',
    '& fieldset': { borderColor: COLORS.light },
    '&:hover fieldset': { borderColor: COLORS.accent },
    '&.Mui-focused fieldset': { borderColor: COLORS.primary },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: COLORS.primary },
};

export default AddTransaction;