import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { logout } from '@/toolkit/authSlice';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import img from '../../public/Images/download.png'

const pages = ['HOME', 'ABOUT','DEPARTMENT', 'BLOG', 'CONTACT'];
// const settings = ['Register'];

export default function Header() {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const router = useRouter();
 
  const [anchorElNav, setAnchorElNav] = useState(null);
  //const [anchorElUser, setAnchorElUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState();
 
  const token = cookie.get("token", {path:"/"});
  const id =  cookie.get("_id", {path:"/"});
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }
  
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  }

  useEffect(() => {
    const email = cookie.get("email", {path:"/"});
    const name = cookie.get("name", {path:"/"});
    setEmail(email);
    setName(name);
  },[token]);
 
  return (

<AppBar position="static">
  <Container maxWidth="xl">
    <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      
      {/* Mobile Menu Icon (Left for smaller screens) */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start' }}>
        <IconButton
          size="large"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          sx={{ marginRight: 2 }}
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
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                <Link href={`/cms/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {page}
                </Link>
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Icon and Clickshop (Left for larger screens) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
         <Box
         component="img"
    src="/Images/4228730.png"
    alt="Medical Icon"
    sx={{ display: { xs: 'none', md: 'block'}, width: "30px", height: "30px", padding: 0  }}
  />
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            textAlign: 'left', 
          }}
        >
          Medinest
        </Typography>
      </Box>

      {/* Menu (Centered for larger screens) */}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            <Link href={`/cms/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'white' }}>
              {page}
            </Link>
          </Button>
        ))}
      </Box>

      {/* Profile and Logout (Right) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' } }}>
          {name}
        </Typography>
        <Link href={`/cms/profile/${id}`}>
          <IconButton sx={{ padding: 0 }}>
            <img
              style={{
                width: "25px", 
                height: "25px",
                borderRadius: "50%",
              }}
              src={"/Images/download.png"}
            />
          </IconButton>
        </Link>
        <IconButton
          onClick={handleLogout}
          sx={{
            fontSize: { xs: '1rem', sm: '1.2rem' },
            padding: 0,
          }}
        >
          <LogoutIcon fontSize='inherit' />
        </IconButton>
      </Box>
    </Toolbar>
  </Container>
</AppBar>
  );
}


