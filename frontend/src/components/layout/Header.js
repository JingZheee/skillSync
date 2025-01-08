'use client';
import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Updated Navigation items with dropdown
const pages = [
  { 
    title: 'Resources',
    items: [
      { title: 'Courses', path: '/course' },
      { title: 'Roadmap', path: '/roadmap' },
      { title: 'Articles', path: '/articles' }
    ]
  },
  { title: 'Mini Challenges', path: '/challenges' },
  { title: 'Hackathon', path: '/hackathon' },
];

// Updated user menu items (keeping the same for now, but you can modify if needed)
const userMenuItems = [
  { title: 'Profile', path: '/profile' },
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Settings', path: '/settings' },
  { title: 'Logout', path: '/logout' },
];

export default function Header() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [resourcesAnchor, setResourcesAnchor] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleResourcesClick = (event) => {
    setResourcesAnchor(event.currentTarget);
  };

  const handleResourcesClose = () => {
    setResourcesAnchor(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/Brand - Desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/homepage"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            SkillSync
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => 
                page.items ? (
                  // Render dropdown items in mobile menu
                  page.items.map((item) => (
                    <MenuItem 
                      key={item.title} 
                      onClick={() => {
                        handleCloseNavMenu();
                        router.push(item.path);
                      }}
                    >
                      <Typography textAlign="center">{item.title}</Typography>
                    </MenuItem>
                  ))
                ) : (
                  // Render regular menu items
                  <MenuItem 
                    key={page.title} 
                    onClick={() => {
                      handleCloseNavMenu();
                      router.push(page.path);
                    }}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>

          {/* Logo/Brand - Mobile */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => 
              page.items ? (
                // Render dropdown for Resources
                <Box key={page.title}>
                  <Button
                    onClick={handleResourcesClick}
                    sx={{ 
                      my: 2, 
                      color: 'text.primary', 
                      display: 'flex', 
                      alignItems: 'center'
                    }}
                    endIcon={<KeyboardArrowDown />}
                  >
                    {page.title}
                  </Button>
                  <Menu
                    anchorEl={resourcesAnchor}
                    open={Boolean(resourcesAnchor)}
                    onClose={handleResourcesClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    {page.items.map((item) => (
                      <MenuItem 
                        key={item.title} 
                        onClick={() => {
                          handleResourcesClose();
                          router.push(item.path);
                        }}
                      >
                        {item.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                // Render regular menu items
                <Button
                  key={page.title}
                  onClick={() => router.push(page.path)}
                  sx={{ my: 2, color: 'text.primary', display: 'block' }}
                >
                  {page.title}
                </Button>
              )
            )}
          </Box>

          {/* Right Side - Search & User Menu */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                borderRadius: '20px',
                px: 3,
              }}
            >
              Join Now
            </Button>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Name" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userMenuItems.map((item) => (
                  <MenuItem 
                    key={item.title} 
                    onClick={() => {
                      handleCloseUserMenu();
                      router.push(item.path);
                    }}
                  >
                    <Typography textAlign="center">{item.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 