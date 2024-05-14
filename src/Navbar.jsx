import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import styled from 'styled-components';

const NavbarWrapper = styled(AppBar)`
    background-color: #2196f3;
`;

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMoreClose = () => {
        setAnchorEl(null);
    };

    return (
        <NavbarWrapper position="static">
            <Toolbar>
                <Avatar
                    alt="Avatar"
                    src="https://via.placeholder.com/40"
                    sx={{ marginRight: 2 }}
                />
                <div style={{ flexGrow: 1 }}></div>
                <Button color="inherit">Home</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Services</Button>
                <Button color="inherit">Contact</Button>
                <IconButton
                    color="inherit"
                    onClick={handleMoreClick}
                    edge="end"
                    aria-haspopup="true"
                >
                    <MoreVertIcon />
                </IconButton>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleMoreClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Menu>
                        <MenuItem onClick={handleMoreClose}>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography>Edit Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleMoreClose}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography>Delete Account</Typography>
                        </MenuItem>
                    </Menu>
                </Popover>
            </Toolbar>
        </NavbarWrapper>
    );
};

export default Navbar;