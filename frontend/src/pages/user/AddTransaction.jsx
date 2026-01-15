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

function AddTransaction() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "EXPENSE",
    categoryId: "",
    description: "",
    transactionDate: new Date().toISOString().split('T')[0] // Default to today
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
      } catch (err) {
        console.error("Failed to load categories", err);
      }
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
      // Brief delay so user sees success state before redirect
      setTimeout(() => navigate('/transactions'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Fade in={true} timeout={800}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 4, 
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)'
          }}
        >
          <Box display="flex" alignItems="center" mb={3}>
            <AddCircleOutline color="primary" sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h4" fontWeight="800" letterSpacing="-0.5px">
              New Transaction
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField 
                label="What is this for?" 
                name="title"
                placeholder="e.g. Weekly Groceries"
                value={formData.title} 
                onChange={handleChange} 
                required 
                fullWidth
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField 
                  label="Amount" 
                  name="amount"
                  type="number" 
                  value={formData.amount} 
                  onChange={handleChange} 
                  required 
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><AttachMoney size={20} /></InputAdornment>,
                  }}
                />
                
                <FormControl>
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

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select 
                  name="categoryId"
                  value={formData.categoryId} 
                  label="Category" 
                  onChange={handleChange}
                  startAdornment={<CategoryOutlined sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />}
                >
                  <MenuItem value=""><em>No Category</em></MenuItem>
                  {categories.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
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
                  startAdornment: <InputAdornment position="start"><CalendarTodayOutlined size={20} /></InputAdornment>,
                }}
              />

              <TextField
                label="Notes (Optional)"
                name="description"
                multiline
                rows={2}
                value={formData.description}
                onChange={handleChange}
                placeholder="Add more details..."
                InputProps={{
                    startAdornment: <InputAdornment position="start" sx={{ mt: -3 }}><DescriptionOutlined size={20} /></InputAdornment>,
                }}
              />

              <Button 
                variant="contained" 
                type="submit" 
                size="large"
                disabled={loading}
                sx={{ 
                  py: 1.5, 
                  borderRadius: 2, 
                  textTransform: 'none', 
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
                }}
              >
                {loading ? <CircularProgress size={26} color="inherit" /> : "Save Transaction"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Fade>

      <Snackbar 
        open={success} 
        autoHideDuration={3000} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Transaction added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AddTransaction;