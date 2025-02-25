import React, { useRef } from 'react';
import { Paper, InputBase, IconButton, Box, Tooltip } from '@mui/material';
import { 
    Search as SearchIcon, 
    Mic as MicIcon,
    AttachFile as AttachFileIcon 
} from '@mui/icons-material';

const SearchBar = ({ drawerOpen, drawerWidth }) => {
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File uploaded:', file);
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: drawerOpen ? drawerWidth : 0,
                right: 0,
                padding: '16px',
                backgroundColor: '#f5f5f5',
                transition: 'left 0.3s ease-in-out',
                zIndex: 1100,
            }}
        >
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '800px',
                    margin: '0 auto',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search anything..."
                    inputProps={{ 'aria-label': 'search' }}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                />
                <Tooltip title="Attach file">
                    <IconButton onClick={() => fileInputRef.current.click()}>
                        <AttachFileIcon />
                    </IconButton>
                </Tooltip>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default SearchBar; 