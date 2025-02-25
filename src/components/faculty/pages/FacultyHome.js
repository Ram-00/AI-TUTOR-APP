import React from 'react';
import { 
    Box, 
    Container,
} from '@mui/material';
import QuickStats from '../dashboard/QuickStats';
import QuickAccess from '../dashboard/QuickAccess';
import RecentActivity from '../dashboard/RecentActivity';

const FacultyHome = () => {
    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <Box sx={{ width: '100%' }}>
                <QuickStats />
                <Box sx={{ mt: 4 }}>
                    <QuickAccess />
                </Box>
                <Box sx={{ mt: 4 }}>
                    <RecentActivity />
                </Box>
            </Box>
        </Container>
    );
};

export default FacultyHome;
