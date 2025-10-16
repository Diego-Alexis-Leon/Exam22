// 📁 src/components/CoinFilterDrawer.jsx
import { Drawer, Box, Typography, Divider, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CoinFilterDrawer({ open, onClose, limit, onLimitChange }) {
  const drawerWidth = 280;

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          p: 3,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Filtro de monedas</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      <TextField
        label="Cantidad de coins"
        type="number"
        variant="outlined"
        value={limit}
        onChange={(e) => {
          const val = Number(e.target.value);
          onLimitChange(val >= 0 ? val : 0);
        }}
        fullWidth
        inputProps={{ min: 0 }}
        helperText="0 = mostrar todas"
      />
    </Drawer>
  );
}
