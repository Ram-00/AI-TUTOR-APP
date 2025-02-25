import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
    Email, 
    Phone, 
    Facebook, 
    Twitter, 
    Instagram,
    KeyboardArrowUp,
    School,
    LocationOn,
} from '@mui/icons-material';

const StyledFooter = styled(Box)(({ theme }) => ({
    backgroundColor: '#1a237e',
    color: 'white',
    padding: theme.spacing(6, 0, 4),
    position: 'relative',
    zIndex: 1200,
    boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #2196F3 0%, #4CAF50 33%, #FF9800 66%, #F44336 100%)',
    },
}));

const FooterSection = styled(Box)(({ theme }) => ({
    '&:hover': {
        transform: 'translateY(-5px)',
        transition: 'transform 0.3s ease',
    },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: theme.spacing(0.5),
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.2)',
        transform: 'scale(1.1)',
    },
    transition: 'all 0.3s ease',
}));

const ScrollTopButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: -20,
    right: 20,
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: '#f5f5f5',
        transform: 'translateY(-3px)',
    },
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
}));

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <StyledFooter>
            <ScrollTopButton onClick={scrollToTop}>
                <KeyboardArrowUp />
            </ScrollTopButton>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <FooterSection>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <School sx={{ mr: 1, fontSize: 28 }} />
                                <Typography variant="h6">
                                    Sanghamitra Vidyalayam
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LocationOn sx={{ mr: 1 }} />
                                <Typography variant="body2">
                                    123 Education Street, Knowledge City
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Email sx={{ mr: 1 }} />
                                <Typography variant="body2">support@sanghamitra.edu.in</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Phone sx={{ mr: 1 }} />
                                <Typography variant="body2">+91 123-456-7890</Typography>
                            </Box>
                        </FooterSection>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FooterSection>
                            <Typography variant="h6" gutterBottom>
                                Quick Links
                            </Typography>
                            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>Help Center</Link>
                            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>Documentation</Link>
                            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>Privacy Policy</Link>
                            <Link href="#" color="inherit" sx={{ display: 'block' }}>Terms of Service</Link>
                        </FooterSection>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FooterSection>
                            <Typography variant="h6" gutterBottom>
                                Connect With Us
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <SocialButton>
                                    <Facebook />
                                </SocialButton>
                                <SocialButton>
                                    <Twitter />
                                </SocialButton>
                                <SocialButton>
                                    <Instagram />
                                </SocialButton>
                            </Box>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Version 1.0.0
                            </Typography>
                        </FooterSection>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3, backgroundColor: 'rgba(255,255,255,0.1)' }} />

                <Typography 
                    variant="body2" 
                    align="center"
                    sx={{ 
                        opacity: 0.8,
                        '&:hover': {
                            opacity: 1,
                        },
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    © 2024 Sanghamitra Vidyalayam. All rights reserved.
                </Typography>
            </Container>
        </StyledFooter>
    );
};

export default Footer; 