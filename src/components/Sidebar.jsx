import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DescriptionIcon from "@mui/icons-material/Description";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 280;

const menus = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin",
  },
  {
    text: "Leads",
    icon: <PeopleIcon />,
    path: "/admin/leads",
  },
  {
    text: "Customers",
    icon: <PersonIcon />,
    path: "/admin/customers",
  },
  {
    text: "Categories",
    icon: <CategoryIcon />,
    path: "/admin/categories",
  },
  {
    text: "Products",
    icon: <Inventory2Icon />,
    path: "/admin/products",
  },
  {
    text: "Inventory",
    icon: <InventoryIcon />,
    path: "/admin/inventory",
  },
  {
    text: "Projects",
    icon: <EngineeringIcon />,
    path: "/admin/projects",
  },
  {
    text: "Quotations",
    icon: <DescriptionIcon />,
    path: "/admin/quotations",
  },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();

  return (
    <Drawer open={open} onClose={onClose}>
      <Box sx={{ width: drawerWidth }}>
        <Box
          sx={{
            p: 3,
            bgcolor: "#1B5E20",
            color: "white",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            🌿 Munder OS
          </Typography>

          <Typography variant="body2">
            Landscape Management
          </Typography>
        </Box>

        <Divider />

        <List>
          {menus.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={onClose}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
