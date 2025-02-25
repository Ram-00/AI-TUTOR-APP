import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AcademicPerformance = () => {
    const performanceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Grade Performance',
                data: [85, 88, 92, 90, 95],
                borderColor: '#1a237e',
                backgroundColor: 'rgba(26, 35, 126, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 20
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUpIcon sx={{ mr: 1, color: '#1a237e' }} />
                    <Typography variant="h6">Academic Performance</Typography>
                </Box>
                <Box sx={{ height: 300, position: 'relative' }}>
                    <Line data={performanceData} options={chartOptions} />
                </Box>
            </Paper>
        </motion.div>
    );
};

export default AcademicPerformance;
