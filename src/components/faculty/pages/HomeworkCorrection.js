import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    Button,
    Avatar,
    Chip,
    IconButton,
    TextField,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Rating,
    TextareaAutosize,
    Tabs,
    Tab,
    CircularProgress,
    Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Grade,
    Search,
    FilterList,
    AccessTime,
    CheckCircle,
    PendingActions,
    Class,
    Sort,
    Download,
    Star,
    CalendarToday,
} from '@mui/icons-material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

// Debug mounting
console.log("HomeworkCorrection component is mounting");

const PageContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
}));

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    },
}));

const SearchBar = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 600,
    borderRadius: theme.spacing(2),
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
}));

const HomeworkCorrection = () => {
    console.log("HomeworkCorrection is rendering"); // Debug log

    const [isLoading, setIsLoading] = useState(true);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);
    const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
    const [selectedHomework, setSelectedHomework] = useState(null);
    const [tempScore, setTempScore] = useState(0);
    const [tempFeedback, setTempFeedback] = useState('');
    const [criteriaScores, setCriteriaScores] = useState({});

    const stats = [
        { title: 'Pending Review', count: 12, icon: PendingActions, color: '#FF9800' },
        { title: 'Completed Today', count: 8, icon: CheckCircle, color: '#4CAF50' },
        { title: 'Due Today', count: 5, icon: AccessTime, color: '#F44336' },
        { title: 'Total Classes', count: 6, icon: Class, color: '#2196F3' },
    ];

    const homeworks = [
        {
            id: 1,
            student: 'Alice Johnson',
            class: '10-A',
            subject: 'Mathematics',
            topic: 'Quadratic Equations',
            status: 'pending',
            submittedDate: '2024-03-15',
            dueDate: '2024-03-20',
        },
        {
            id: 2,
            student: 'Bob Smith',
            class: '10-B',
            subject: 'Physics',
            topic: 'Newton\'s Laws',
            status: 'completed',
            submittedDate: '2024-03-14',
            dueDate: '2024-03-19',
        },
    ];

    // Simulate data loading with proper error handling
    useEffect(() => {
        console.log("Starting data loading...");
        const loadData = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsLoading(false);
                console.log("Data loaded successfully");
            } catch (error) {
                console.error("Error loading data:", error);
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // Fixed grading criteria with proper weight handling
    const gradingCriteria = [
        { name: 'Understanding', weight: 0.3 },
        { name: 'Accuracy', weight: 0.3 },
        { name: 'Presentation', weight: 0.2 },
        { name: 'Completion', weight: 0.2 },
    ];

    // Handle criteria rating change with fixed calculation
    const handleCriteriaRatingChange = (criteriaName, newValue) => {
        console.log(`Updating criteria ${criteriaName} with value ${newValue}`);
        
        // Update individual criteria score
        setCriteriaScores(prev => ({
            ...prev,
            [criteriaName]: newValue
        }));

        // Calculate total score based on all criteria
        const criteria = gradingCriteria.find(c => c.name === criteriaName);
        if (criteria) {
            const newScore = newValue * 20 * criteria.weight;
            setTempScore(newScore);
            console.log(`New temp score: ${newScore}`);
        }
    };

    if (isLoading) {
        return (
            <PageContainer>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress />
                </Box>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a237e', mb: 1 }}>
                    Homework Correction
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Manage and grade student submissions
                </Typography>
            </Box>

            {/* Stats Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat) => (
                    <Grid item xs={12} sm={6} md={3} key={stat.title}>
                        <StyledCard>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ bgcolor: `${stat.color}15`, color: stat.color, mr: 2 }}>
                                    <stat.icon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600, color: stat.color }}>
                                        {stat.count}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stat.title}
                                    </Typography>
                                </Box>
                            </Box>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            {/* Search and Filter Section */}
            <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                <SearchBar>
                    <IconButton sx={{ p: 1 }}>
                        <Search />
                    </IconButton>
                    <TextField
                        variant="standard"
                        placeholder="Search by student name, class, or subject..."
                        fullWidth
                        InputProps={{
                            disableUnderline: true,
                        }}
                    />
                </SearchBar>
                <IconButton 
                    sx={{ bgcolor: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                    onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                >
                    <FilterList />
                </IconButton>
                <IconButton 
                    sx={{ bgcolor: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                >
                    <Sort />
                </IconButton>
            </Box>

            {/* Tabs Section */}
            <Box sx={{ mb: 4 }}>
                <Tabs 
                    value={selectedTab} 
                    onChange={(e, newValue) => setSelectedTab(newValue)}
                    sx={{ 
                        borderBottom: 1, 
                        borderColor: 'divider',
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
                        },
                    }}
                >
                    <Tab label="All Submissions" />
                    <Tab label="Pending Review" />
                    <Tab label="Completed" />
                </Tabs>
            </Box>

            {/* Homework List */}
            <Grid container spacing={2}>
                {homeworks.map((homework) => (
                    <Grid item xs={12} key={homework.id}>
                        <StyledCard>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar 
                                            sx={{ 
                                                width: 56, 
                                                height: 56, 
                                                bgcolor: '#1a237e',
                                                fontSize: '1.5rem',
                                            }}
                                        >
                                            {homework.student.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {homework.student}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                                <Chip 
                                                    size="small" 
                                                    label={homework.class}
                                                    sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }}
                                                />
                                                <Chip 
                                                    size="small" 
                                                    label={homework.subject}
                                                    sx={{ bgcolor: '#f3e5f5', color: '#7b1fa2' }}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        Due: {homework.dueDate}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, alignItems: 'center' }}>
                                        <Chip
                                            label={homework.status}
                                            color={homework.status === 'pending' ? 'warning' : 'success'}
                                            sx={{ textTransform: 'capitalize' }}
                                        />
                                        <Button 
                                            variant="contained" 
                                            startIcon={<Grade />}
                                            sx={{ 
                                                textTransform: 'none',
                                                bgcolor: '#1a237e',
                                                '&:hover': {
                                                    bgcolor: '#0d1b60',
                                                },
                                            }}
                                            disabled={homework.status === 'completed'}
                                        >
                                            Grade Homework
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            {/* Filter Menu */}
            <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={() => setFilterAnchorEl(null)}
            >
                <MenuItem onClick={() => setFilterAnchorEl(null)}>All</MenuItem>
                <MenuItem onClick={() => setFilterAnchorEl(null)}>Pending</MenuItem>
                <MenuItem onClick={() => setFilterAnchorEl(null)}>Completed</MenuItem>
                <MenuItem onClick={() => setFilterAnchorEl(null)}>Late Submissions</MenuItem>
            </Menu>

            {/* Fixed Rating component in Dialog */}
            <Dialog 
                open={gradeDialogOpen} 
                onClose={() => setGradeDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h6">
                        Comprehensive Grading System
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2 }}>
                        {gradingCriteria.map((criteria) => (
                            <Box key={criteria.name} sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {criteria.name} ({criteria.weight * 100}%)
                                </Typography>
                                <Rating
                                    name={`criteria-${criteria.name}`}
                                    value={criteriaScores[criteria.name] || 0}
                                    onChange={(_, newValue) => {
                                        handleCriteriaRatingChange(criteria.name, newValue);
                                    }}
                                    precision={0.5}
                                    max={5}
                                />
                            </Box>
                        ))}

                        <Box sx={{ my: 3, p: 2, bgcolor: '#f5f7fa', borderRadius: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Final Score: {Math.round(tempScore)}/100
                            </Typography>
                            <TextareaAutosize
                                minRows={4}
                                placeholder="Overall feedback for the student..."
                                style={{ width: '100%', padding: '8px', marginTop: '8px' }}
                                value={tempFeedback}
                                onChange={(e) => setTempFeedback(e.target.value)}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setGradeDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setGradeDialogOpen(false)}>
                        Submit Grade
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
};

export default HomeworkCorrection; 