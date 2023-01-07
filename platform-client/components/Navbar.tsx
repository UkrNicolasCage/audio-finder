import * as React from "react";
import {
  ListItemText,
  ListItemButton,
  CssBaseline,
  AppBar,
  Drawer,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
} from "@mui/material";
import { ChevronLeft, Inbox, Mail, Menu } from "@mui/icons-material";
import { useRouter } from "next/router";

const menuItems = [
  { text: "Home", href: "/" },
  { text: "Tracks List", href: "/tracks" },
  { text: "Albums List", href: "/albums" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={open}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <List>
          {menuItems.map(({ text, href }, index) => (
            <ListItemButton key={href} onClick={() => router.push(href)}>
              <ListItem>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItem>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
