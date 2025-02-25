import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import {
    Assignment as PaperIcon,
    School as StudentsIcon,
    Class as ClassesIcon,
    Assessment as AssessmentIcon
} from '@mui/icons-material';

const QuickStats = () => {
    const stats = [
        {
            icon: <PaperIcon />,
            count: '25',
            label: 'Papers to Evaluate'
        },
        {
            icon: <StudentsIcon />,
            count: '150',
            label: 'Total Students'
        },
        {
            icon: <ClassesIcon />,
            count: '8',
            label: 'Classes'
        },
        {
            icon: <AssessmentIcon />,
            count: '12',
            label: 'Pending Assignments'
        }
    ];

    return (
        <Grid container spacing={3}>
            {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: 'background.default'
                        }}
                    >
                        {stat.icon}
                        <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                            {stat.count}
                        </Typography>
                        <Typography color="textSecondary">
                            {stat.label}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default QuickStats;
