"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, styled } from "@mui/material/styles";
import type * as React from "react";

import FiberNewIcon from "@mui/icons-material/FiberNew";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";

import theme from "@/theme";
import { Divider } from "@mui/material";
import Link from "next/link";

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
    title: "アカウント",
    items: [
      { text: "Signup", icon: <FiberNewIcon />, link: "/signup" },
      { text: "ログイン", icon: <LoginIcon />, link: "/login" },
      { text: "ログアウト", icon: <LogoutIcon />, link: "/logout" },
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
              <Link href={item.link} passHref legacyBehavior>
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
const appBarHeight = 64;

const AppBar_ = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: appBarHeight,
}));

const Drawer_ = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  [`& .${drawerClasses.paper}`]: {
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
                    サンプル
                  </Typography>
                </Toolbar>
              </AppBar_>
              <Drawer_ variant="permanent">
                <Toolbar />
                <NavGroups navGroups={navGroups} />
              </Drawer_>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  height: "100%",
                  maxWidth: `calc(100% - ${drawerWidth}px)`,
                }}
              >
                <Toolbar />
                {props.children}
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
