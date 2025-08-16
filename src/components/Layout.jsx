import { useContext, useState } from "react";
import { AppContext } from "../context/provider";
import { Dashboard as DashboardIcon , FolderOpen, Assignment, People, BarChart, Settings, Menu as MenuIcon, AccountCircle, Logout, Notifications, DarkMode, LightMode } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Drawer, List, ListItemIcon, ListItemText, Box, Menu, MenuItem, IconButton, Badge, Divider, ListItemButton } from '@mui/material';

const Layout = ({ children }) => {
  const { user, logout, theme: appTheme, toggleTheme, notifications } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, roles: ['Admin', 'Manager', 'Employee'] },
    { id: 'projects', label: 'Projects', icon: <FolderOpen />, roles: ['Admin', 'Manager', 'Employee'] },
    { id: 'tasks', label: 'Tasks', icon: <Assignment />, roles: ['Admin', 'Manager', 'Employee'] },
    { id: 'users', label: 'Users', icon: <People />, roles: ['Admin'] },
    { id: 'reports', label: 'Reports', icon: <BarChart />, roles: ['Admin', 'Manager'] },
    { id: 'settings', label: 'Settings', icon: <Settings />, roles: ['Admin', 'Manager', 'Employee'] }
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(!drawerOpen)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Work Management System
          </Typography>

          <IconButton color="inherit" onClick={toggleTheme}>
            {appTheme === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <AccountCircle />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem>
              <Typography variant="subtitle2">{user?.name}</Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="caption" color="textSecondary">{user?.role}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {filteredMenuItems.map((item) => (
              <ListItemButton
                key={item.id}
                selected={currentPage === item.id}
                onClick={() => setCurrentPage(item.id)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: drawerOpen ? 0 : '-240px', transition: 'margin 0.3s' }}>
        <Toolbar />
        {children({ currentPage, setCurrentPage })}
      </Box>
    </Box>
  );
};

export default Layout
