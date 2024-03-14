"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

import theme from "@/theme";
import Link from "next/link";
import { Card, CardContent, Divider } from "@mui/material";

type NavItem = {
  text: string;
  icon: React.ReactNode;
  link: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: "メニュー",
    items: [
      { text: "About", icon: <StarIcon />, link: "/about" },
      { text: "検索", icon: <SearchIcon />, link: "/about" },
      { text: "設定", icon: <SettingsIcon />, link: "/about" },
    ],
  },
  {
    title: "メニュー",
    items: [
      { text: "About", icon: <StarIcon />, link: "/about" },
      { text: "検索", icon: <SearchIcon />, link: "/about" },
      { text: "設定", icon: <SettingsIcon />, link: "/about" },
    ],
  },
];

function NavGroups({ navGroups }: { navGroups: NavGroup[] }) {
  return (
    <Box sx={{ overflow: "auto" }}>
      {navGroups.map((navGroup, i) => (
        <List key={navGroup.title}>
          {i > 0 && <Divider />}
          <Typography variant="h6" sx={{ pt: 1, pl: 2 }}>
            {navGroup.title}
          </Typography>
          {navGroup.items.map((item) => (
            <ListItem key={item.text} disablePadding>
              <Link href="/about" passHref legacyBehavior>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      ))}
    </Box>
  );
}

const drawerWidth = 240;

const AppBar_ = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Drawer_ = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
              <AppBar_ position="fixed">
                <Toolbar>
                  <Typography variant="h6" noWrap component="div">
                    メガロパ音頭
                  </Typography>
                </Toolbar>
              </AppBar_>
              <Drawer_ variant="permanent">
                <Toolbar />
                <NavGroups navGroups={navGroups} />
              </Drawer_>
              <Box
                component="main"
                sx={{ flexGrow: 1, px: 1, minHeight: "100vh" }}
              >
                <Toolbar />
                <Card sx={{ m: 2, my: 3 }}>
                  <CardContent>{props.children}</CardContent>
                </Card>
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
