import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getServerSession } from "@/lib/auth";
import CustomizedTables from "./_components/Table";

export default async function Home() {
  const { user } = await getServerSession();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ my: 2 }}>
          Hi! {user ? user.username : "Guest"}
        </Typography>
        <CustomizedTables />
      </Box>
    </Container>
  );
}
