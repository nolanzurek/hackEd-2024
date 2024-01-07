import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import MapIcon from "@mui/icons-material/Map"; // Import the MapIcon from Material-UI
import PollIcon from "@mui/icons-material/Poll"; // Import the ClipboardIcon from Material-UI

import MapView from "./components/MapView.tsx";
import IntakeForm from "./components/IntakeForm.tsx";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [view, setView] = useState("map");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#004a14" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Edmonton Sustainability Map
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItemButton onClick={() => setView("form")}>
              <ListItem>
                <ListItemIcon>
                  <PollIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Intake Form"
                  secondary="Describe your sustainability priorities"
                />
              </ListItem>
            </ListItemButton>
            <ListItemButton onClick={() => setView("map")}>
              <ListItem>
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Map View"
                  secondary="View sustainability attractions"
                />
              </ListItem>
            </ListItemButton>
          </List>
        </Drawer>
        {/* BEGIN: main content slot */}
        {/* Replace this comment with your main content */}
        {/* END: main content slot */}
      </Box>
      {view == "map" ? <MapView /> : <IntakeForm></IntakeForm>}
    </>
  );
};

export default App;
