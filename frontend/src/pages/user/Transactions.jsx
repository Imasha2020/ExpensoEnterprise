/**
 * Transactions Page
 * -----------------
 * Purpose:
 * - Display user's financial activity
 * - Show net balance, income, expense summary
 * - Show expandable transaction timeline
 * - Mobile-first premium UI
 */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";

import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


import {
  Box,
  Typography,
  Card,
  Stack,
  CircularProgress,
  Alert,
  Container,
  Avatar,
  Fade,
  IconButton,
  Collapse,
  Chip,
} from "@mui/material";

/* ================= ICONS ================= */
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

/* ================= API ================= */
import { getAllTransactions , deleteTransaction } from "../../api/TransactionService";

/* =========================================================
   🎨 GLOBAL THEME COLORS
   ---------------------------------------------------------
   Centralized color system for consistency and easy theming
   ========================================================= */
const COLORS = {
  bg: "#F4F7FE",             // Page background
  primary: "#4318FF",        // Primary brand color
  income: "#05CD99",         // Income indicator
  expense: "#EE5D50",        // Expense indicator
  textPrimary: "#1B2559",    // Main text
  textSecondary: "#A3AED0",  // Secondary text
  white: "#FFFFFF",          // Card background
};

/* =========================================================
   🧠 MAIN TRANSACTIONS COMPONENT
   ========================================================= */
export default function Transactions() {

  /* ---------------- STATE ---------------- */
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getAllTransactions();
        setTransactions(res.data?.data || []);
      } catch {
        setError("Unable to sync financial data.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Delete Transaction Handler
  const handleDeleteTransaction = async (id) => {
  try {
    await deleteTransaction(id);

    // Optimistic UI update
    setTransactions((prev) =>
      prev.filter((tx) => tx.id !== id)
    );
  } catch (error) {
    setError("Failed to delete transaction. Please try again.");
  }
};


  /* ---------------- CALCULATIONS ---------------- */
  const totalIncome = transactions
    .filter(tx => tx.type === "INCOME")
    .reduce((a, b) => a + Number(b.amount), 0);

  const totalExpense = transactions
    .filter(tx => tx.type === "EXPENSE")
    .reduce((a, b) => a + Number(b.amount), 0);

  const netBalance = totalIncome - totalExpense;

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <Box
        height="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress
          thickness={6}
          size={45}
          sx={{
            color: COLORS.primary,
            borderRadius: "10px",
          }}
        />
      </Box>
    );
  }

  return (
    // Container is a Material UI layout component
    <Container maxWidth="lg"  >

      {/* =================================================
         🧾 HEADER SECTION
         ================================================= */}
      <Stack
        direction="row" //Arrange children horizontally
        justifyContent="space-between" //Space between left and right
        alignItems="center" //Vertically center items
        mb={5} // Margin bottom (Adds space below the Stack)
      >
        <Box> 
          {/* Box is Used to group elements together */}
          <Typography //MUI text component
            variant="h4" //large heading text
            fontWeight={800} //bold (professional look)
            sx={{
              color: COLORS.textPrimary,
              letterSpacing: "-1.5px", // tighter modern heading
            }}
          >
            Your Transactions
          </Typography>

          <Typography
            variant="body2"
            color={COLORS.textSecondary}
            fontWeight={600}
          >
            Transaction Insights
          </Typography>
        </Box>

        {/* Filter Button */}
        <IconButton
          sx={{
            bgcolor: COLORS.white,
            p: 1.5, //padding
            borderRadius: "15px",
            boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.12)", //Indicates the button is clickable
          }}
        >
          <FilterListRoundedIcon sx={{ color: COLORS.primary }} />
        </IconButton>
      </Stack>

      {/* =================================================
         💳 PREMIUM BALANCE CARD
         ================================================= */}
      <Card
        sx={{
          p: 3.5,
          mb: 6,
          borderRadius: "30px",
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, #707EFE 100%)`,
          boxShadow: "0px 45px 60px -20px rgba(67, 24, 255, 0.35)",
          color: COLORS.white,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative floating circle */}
        <Box
          sx={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />

        <Stack spacing={4}>
          {/* Net Balance */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.8,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Net Worth
              </Typography>

              <Typography
                variant="h3"
                fontWeight={800}
                sx={{ letterSpacing: "-1px" }}
              >
                Rs. {netBalance.toLocaleString()}
              </Typography>
            </Box>

            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                width: 56,
                height: 56,
                borderRadius: "18px",
                backdropFilter: "blur(10px)",
              }}
            >
              <AccountBalanceWalletRoundedIcon fontSize="large" />
            </Avatar>
          </Stack>

          {/* Income & Expense Summary */}
          <Stack direction="row" spacing={2}>
            <SummaryBlock
              type="Income"
              amount={totalIncome}
              icon={<TrendingUpRoundedIcon fontSize="small" />}
            />
            <SummaryBlock
              type="Expense"
              amount={totalExpense}
              icon={<TrendingDownRoundedIcon fontSize="small" />}
            />
          </Stack>
        </Stack>
      </Card>

      {/* Error Message */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: "15px",
            fontWeight: 600,
          }}
        >
          {error}
        </Alert>
      )}

      {/* =================================================
         📜 TRANSACTION TIMELINE
         ================================================= */}
      <Typography
        variant="h6"
        fontWeight={800}
        sx={{
          mb: 3,
          color: COLORS.textPrimary,
          pl: 1,
        }}
      >
        Recent Transactions
      </Typography>

      <Stack spacing={2.5}>
        {transactions.length === 0 ? (
          <EmptyState text="Your financial timeline is empty." />
        ) : (
          transactions.map((tx, index) => (
            <TransactionCard
              key={tx.id}
              tx={tx}
              index={index}
              onDelete={handleDeleteTransaction}
            />

          ))
        )}
      </Stack>
    </Container>
  );
}

/* =========================================================
   🧩 SUMMARY BLOCK (Income / Expense)
   ========================================================= */
function SummaryBlock({ type, amount, icon }) {
  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        borderRadius: "20px",
        bgcolor: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 0.5,
          borderRadius: "8px",
          bgcolor: "rgba(255,255,255,0.2)",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography variant="caption" fontWeight={700} sx={{ opacity: 0.7 }}>
          {type}
        </Typography>
        <Typography variant="body1" fontWeight={800}>
          Rs. {amount.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
}

/* =========================================================
   🧾 TRANSACTION CARD
   ========================================================= */
function TransactionCard({ tx, index  , onDelete}) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [expanded, setExpanded] = useState(false); //To hidden transaction description
  const isIncome = tx.type === "INCOME";
  const accentColor = isIncome ? COLORS.income : COLORS.expense;
  const [confirmOpen, setConfirmOpen] = useState(false);


  return (
    <Fade in timeout={500 + index * 100}> 
    {/* in -> Animation is active , timeout -> animation duration */}
      <Card
        onClick={() => setExpanded(!expanded)}
        sx={{
          borderRadius: "24px",
          cursor: "pointer", //Changes mouse cursor //Tells user “this is clickable”
          transition: "all 0.3s ease", //Smooth animation for hover / expand
          boxShadow: expanded
            ? "0px 20px 40px rgba(112,144,176,0.15)" //deeper shadow
            : "0px 10px 20px rgba(112,144,176,0.05)", //lighter shadow
          border: "1px solid",
          borderColor: expanded ? accentColor : "transparent",
          position: "relative",
          background: COLORS.white,
        }}
      >
        {/* Accent side bar */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            bgcolor: accentColor,
          }}
        />

        <Box sx={{ p: 2.5 }}> 
          {/* Padding inside the card */}
          {/* Main Row */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: `${accentColor}12`,
                  color: accentColor,
                  width: 50,
                  height: 50,
                  borderRadius: "16px",
                }}
              >
                {isIncome ? <TrendingUpRoundedIcon /> : <TrendingDownRoundedIcon />}
              </Avatar>

              <Box>
                <Typography fontWeight={800}>{tx.title}</Typography>
                <Typography variant="caption" color={COLORS.textSecondary} fontWeight={700}>
                  {tx.categoryName || "Uncategorized"} • {tx.transactionDate}
                </Typography>
              </Box>
            </Stack>

            {/* Amount */}
            <Box textAlign="right">
  {/* Amount */}
  <Typography fontWeight={900} color={accentColor} variant="h6">
    {isIncome ? "+" : "-"} {Number(tx.amount).toLocaleString()}
  </Typography>

  {/* More options (⋮) */}
  <IconButton
    size="small"
    onClick={(e) => {
      e.stopPropagation(); // prevent card expand
      setMenuAnchor(e.currentTarget);
    }}
  >
    <MoreVertIcon fontSize="small" />
  </IconButton>

  {/* Note Indicator */}
  {tx.description && (
    <Chip
      icon={<InfoOutlinedIcon sx={{ fontSize: 12 }} />}
      label="Note"
      size="small"
      sx={{
        height: 18,
        fontSize: 10,
        fontWeight: 700,
        bgcolor: COLORS.bg,
        border: "none",
        mt: 0.5,
      }}
    />
  )}

  {/* Options Menu */}
  <Menu
    anchorEl={menuAnchor}
    open={Boolean(menuAnchor)}
    onClose={() => setMenuAnchor(null)}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <MenuItem
      onClick={(e) => {
        e.stopPropagation();
        setMenuAnchor(null);
        console.log("Edit transaction", tx.id);
      }}
    >
      <EditOutlinedIcon fontSize="small" style={{ marginRight: 8 }} />
      Edit
    </MenuItem>

    <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          setMenuAnchor(null);
          setConfirmOpen(true);
        }}
        sx={{ color: COLORS.expense }}
      >
        <DeleteOutlineOutlinedIcon fontSize="small" style={{ marginRight: 8 }} />
        Delete
    </MenuItem>

  </Menu>

  <Dialog
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
>
  <DialogTitle>Delete Transaction?</DialogTitle>

  <DialogContent>
    <Typography variant="body2" color="text.secondary">
      This action cannot be undone. Are you sure you want to delete
      <strong> {tx.title}</strong>?
    </Typography>
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() => setConfirmOpen(false)}
      variant="outlined"
    >
      Cancel
    </Button>

    <Button
      onClick={() => {
        onDelete(tx.id);
        setConfirmOpen(false);
      }}
      variant="contained"
      color="error"
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>

</Box>


          </Stack>

          {/* Expandable Description */}
          <Collapse in={expanded}>
            <Box
              sx={{
                mt: 2.5,
                pt: 2.5,
                borderTop: `1px dashed ${COLORS.bg}`,
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: COLORS.textSecondary,
                }}
              >
                "{tx.description || "No additional details provided."}"
              </Typography>
            </Box>
          </Collapse>
        </Box>
      </Card>
    </Fade>
  );
}

/* =========================================================
   📭 EMPTY STATE
   ========================================================= */
function EmptyState({ text }) {
  return (
    <Box
      p={6}
      textAlign="center"
      borderRadius="30px"
      bgcolor={COLORS.white}
      boxShadow="0px 10px 20px rgba(112,144,176,0.05)"
    >
      <Typography color={COLORS.textSecondary} fontWeight={700}>
        {text}
      </Typography>
    </Box>
  );
}
