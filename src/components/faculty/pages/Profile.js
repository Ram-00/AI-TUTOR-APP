import React from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Avatar,
    Grid,
    IconButton
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';

const Profile = () => {
    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 4 }}>Profile Settings</Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mb: 2
                                }}
                            />
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: 'primary.main',
                                    '&:hover': { backgroundColor: 'primary.dark' }
                                }}
                            >
                                <PhotoCameraIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 2 }}
                        >
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Profile;
