import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import CoinFilterDrawer from "./coinFilterDrawer";
export default function Home() {
  const [coins, setCoins] = useState([]);
  const [limit, setLimit] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc"); // 🔹 nuevo estado
  const drawerWidth = 280;

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((response) => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return response.json();
      })
      .then((data) => setCoins(data))
      .catch((err) => console.log(err.message));
  }, []);

  // 🔹 Ordenamiento
  const sortedCoins = [...coins].sort((a, b) => {
    if (sortOrder === "asc") return b.current_price - a.current_price; // de mayor a menor
    else return a.current_price - b.current_price; // de menor a mayor
  });

  // 🔹 Aplicar límite
  const filteredCoins = limit > 0 ? sortedCoins.slice(0, limit) : sortedCoins;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer */}
      <CoinFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        limit={limit}
        onLimitChange={setLimit}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin-right 0.3s",
          mr: drawerOpen ? `${drawerWidth}px` : 0,
        }}
      >
        {!drawerOpen && (
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ mb: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h4" sx={{ mb: 2 }}>
          Lista de criptomonedas
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{
            display: "grid",
            gridTemplateColumns: drawerOpen
              ? "repeat(3, 1fr)"
              : "repeat(4, 1fr)",
            gap: "20px",
            transition: "grid-template-columns 0.3s ease",
          }}
        >
          {filteredCoins.map((coin) => (
            <Grid key={coin.id} item sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 320,
                  boxShadow: 3,
                  borderRadius: 3,
                }}
              >
                <CardActionArea
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  component={Link}
                  to={`/detail/${coin.id}`}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent>
                      <Typography component="div" variant="h6">
                        {coin.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        {coin.symbol.toUpperCase()}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: "green" }}>
                        ${coin.current_price} USD
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: "contain",
                      m: 1,
                    }}
                    image={coin.image}
                    alt={coin.name}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
