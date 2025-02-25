import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Avatar,
    Grid,
    IconButton,
    Divider,
    Tooltip,
    Badge,
    Alert,
    Snackbar,
    Chip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { 
    PhotoCamera,
    Save,
    Edit,
    Person,
    Email,
    Phone,
    School,
    Class,
    LocationOn,
    CalendarToday,
    Badge as BadgeIcon,
    Groups,
    Home,
    Book
} from '@mui/icons-material';

const StudentProfile = () => {
    const [profileData, setProfileData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        class: 'X',
        section: 'A',
        rollNo: '2024001',
        admissionNo: 'ADM2024001',
        dateOfBirth: '2005-05-15',
        bloodGroup: 'O+',
        address: '123 Student Lane, Education City',
        parentName: 'James Doe',
        parentPhone: '+91 9876543211',
        parentEmail: 'james.doe@example.com',
        academicYear: '2023-2024',
        house: 'Blue House',
        achievements: ['Science Olympiad Winner', 'Class Representative']
    });

    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfileImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        setShowSuccess(true);
    };

    return (
        <Box sx={{ p: 3 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 4,
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
                    }}
                >
                    {/* Profile Header with Animation */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 4
                    }}>
                        <Player
                            autoplay
                            loop
                            src="https://assets9.lottiefiles.com/packages/lf20_xyadoh9h.json"
                            style={{ height: '100px', marginBottom: '20px' }}
                        />
                        
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <IconButton
                                        component="label"
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '&:hover': { bgcolor: 'primary.dark' }
                                        }}
                                    >
                                        <PhotoCamera />
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            onChange={handleImageChange}
                                        />
                                    </IconButton>
                                }
                            >
                                <Avatar
                                    src={profileImage}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        border: 3,
                                        borderColor: 'primary.main'
                                    }}
                                />
                            </Badge>
                        </motion.div>

                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography variant="h5" fontWeight="bold" color="primary">
                                Student Profile
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
                                <Chip 
                                    icon={<Class />} 
                                    label={`Class ${profileData.class}-${profileData.section}`} 
                                    color="primary" 
                                    variant="outlined" 
                                />
                                <Chip 
                                    icon={<BadgeIcon />} 
                                    label={`Roll No: ${profileData.rollNo}`} 
                                    color="primary" 
                                    variant="outlined" 
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Basic Information */}
                    <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 3 }}>
                        Basic Information
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    value={profileData.firstName}
                                    disabled={!isEditing}
                                    InputProps={{
                                        startAdornment: <Person sx={{ mr: 1, color: 'primary.main' }} />
                                    }}
                                />
                            </motion.div>
                        </Grid>
                        
                        {/* Add more fields with animations */}
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    value={profileData.lastName}
                                    disabled={!isEditing}
                                    InputProps={{
                                        startAdornment: <Person sx={{ mr: 1, color: 'primary.main' }} />
                                    }}
                                />
                            </motion.div>
                        </Grid>

                        {/* Academic Information */}
                        <Grid item xs={12}>
                            <Divider sx={{ my: 3 }}>
                                <Typography color="primary">Academic Information</Typography>
                            </Divider>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Class"
                                value={profileData.class}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: <Class sx={{ mr: 1, color: 'primary.main' }} />
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Section"
                                value={profileData.section}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: <Groups sx={{ mr: 1, color: 'primary.main' }} />
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Academic Year"
                                value={profileData.academicYear}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                                }}
                            />
                        </Grid>

                        {/* Contact Information */}
                        <Grid item xs={12}>
                            <Divider sx={{ my: 3 }}>
                                <Typography color="primary">Contact Information</Typography>
                            </Divider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={profileData.email}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: <Email sx={{ mr: 1, color: 'primary.main' }} />
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                value={profileData.phone}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: <Phone sx={{ mr: 1, color: 'primary.main' }} />
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                value={profileData.address}
                                disabled={!isEditing}
                                multiline
                                rows={2}
                                InputProps={{
                                    startAdornment: <Home sx={{ mr: 1, color: 'primary.main' }} />
                                }}
                            />
                        </Grid>

                        {/* Parent Information */}
                        <Grid item xs={12}>
                            <Divider sx={{ my: 3 }}>
                                <Typography color="primary">Parent Information</Typography>
                            </Divider>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Parent Name"
                                value={profileData.parentName}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: <Person sx={{ mr: 1, color: 'primary.main' }} />
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Parent Phone"
                                value={profileData.parentPhone}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: <Phone sx={{ mr: 1, color: 'primary.main' }} />
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Parent Email"
                                value={profileData.parentEmail}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: <Email sx={{ mr: 1, color: 'primary.main' }} />
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="outlined"
                                startIcon={<Edit />}
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </Button>
                        </motion.div>
                        
                        <AnimatePresence>
                            {isEditing && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="contained"
                                        startIcon={<Save />}
                                        onClick={handleSave}
                                    >
                                        Save Changes
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>
                </Paper>
            </motion.div>

            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={() => setShowSuccess(false)} 
                    severity="success" 
                    sx={{ width: '100%' }}
                >
                    Profile updated successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default StudentProfile; 