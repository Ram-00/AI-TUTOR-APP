import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

const EducationalLoader = () => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
        }}
    >
        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <SchoolIcon sx={{ fontSize: 60, color: '#1976d2' }} />
        </motion.div>
    </Box>
);

export default EducationalLoader;