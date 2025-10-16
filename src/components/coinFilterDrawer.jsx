import {
  Drawer,
  Box,
  Typography,
  Divider,
  TextField,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CoinFilterDrawer({
  open,
  onClose,
  limit,
  onLimitChange,
  sortOrder,
  onSortChange,
}) {
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

      {/* 🔹 Botones de ordenamiento */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Ordenar por precio:
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button
          variant={sortOrder === "asc" ? "contained" : "outlined"}
          color="primary"
          fullWidth
          onClick={() => onSortChange("asc")}
        >
          Ascendente
        </Button>
        <Button
          variant={sortOrder === "desc" ? "contained" : "outlined"}
          color="primary"
          fullWidth
          onClick={() => onSortChange("desc")}
        >
          Descendente
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* 🔹 Input de límite */}
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
