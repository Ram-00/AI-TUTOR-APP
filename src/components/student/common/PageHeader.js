import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const PageHeader = ({ icon: Icon, title }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                mb: 4
            }}>
                <Icon sx={{ 
                    fontSize: 40,
                    color: 'primary.main'
                }} />
                <Typography 
                    variant="h4" 
                    sx={{ 
                        color: 'primary.main',
                        fontWeight: 500
                    }}
                >
                    {title}
                </Typography>
            </Box>
        </motion.div>
    );
};

export default PageHeader; 