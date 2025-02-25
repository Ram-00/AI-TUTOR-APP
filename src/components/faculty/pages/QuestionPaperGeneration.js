import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    TextField,
    Tabs,
    Tab,
    List,
    ListItem,
    Chip,
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    Sort as SortIcon,
    Preview as PreviewIcon,
    Download as DownloadIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import gsap from 'gsap';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: 'white',
    borderRadius: theme.spacing(2),
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden'
}));

const QuestionPaperGeneration = () => {
    const [currentTab, setCurrentTab] = useState('GENERATE');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedExamType, setSelectedExamType] = useState('');
    const [generatedPapers, setGeneratedPapers] = useState(null);

    // Refs for GSAP animations
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const searchBarRef = useRef(null);
    const tabsRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        // Initial page load animation
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );

        // Title animation
        gsap.fromTo(titleRef.current,
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.8)" }
        );

        // Staggered form fields animation
        gsap.fromTo(formRef.current.children,
            { opacity: 0, x: -20 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.5, 
                stagger: 0.1,
                ease: "power2.out"
            }
        );
    }, []);

    // Hover animation for buttons
    const handleButtonHover = (e) => {
        gsap.to(e.target, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleButtonLeave = (e) => {
        gsap.to(e.target, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleGenerate = () => {
        if (selectedClass && selectedSubject && selectedExamType) {
            setGeneratedPapers({
                basic: { title: 'Basic Level' },
                intermediate: { title: 'Intermediate Level' },
                advanced: { title: 'Advanced Level' }
            });
            setCurrentTab('PREVIEW');
        }
    };

    const historyItems = [
        {
            class: 'Class 10',
            subject: 'Mathematics',
            examType: 'FA-1',
            date: '2024-03-15',
            time: '10:30 AM',
            levels: ['Basic', 'Intermediate', 'Advanced']
        },
        {
            class: 'Class 8',
            subject: 'Physics',
            examType: 'FA-2',
            date: '2024-03-14',
            time: '02:15 PM',
            levels: ['Basic', 'Intermediate', 'Advanced']
        },
    ];

    return (
        <Box ref={containerRef} sx={{ p: 4, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
            {/* Main Container */}
            <Paper 
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    backgroundColor: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}
            >
                {/* Title */}
                <Typography 
                    ref={titleRef}
                    variant="h4" 
                    sx={{ 
                        color: '#2196f3',
                        mb: 4,
                        fontWeight: 600,
                        textAlign: 'center'
                    }}
                >
                    AI Question Paper Generator
                </Typography>

                {/* Search Bar Section */}
                <Box 
                    ref={searchBarRef}
                    sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        mb: 4,
                        alignItems: 'center'
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Search papers..."
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f8fafc',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#fff',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    transform: 'translateY(-2px)'
                                }
                            }
                        }}
                    />
                    <Button
                        startIcon={<FilterIcon />}
                        variant="outlined"
                        sx={{ 
                            minWidth: '120px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)'
                            }
                        }}
                    >
                        FILTER
                    </Button>
                    <Button
                        startIcon={<SortIcon />}
                        variant="outlined"
                        sx={{ 
                            minWidth: '120px',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)'
                            }
                        }}
                    >
                        SORT
                    </Button>
                </Box>

                {/* Tabs */}
                <Box ref={tabsRef} sx={{ mb: 4 }}>
                    <Tabs 
                        value={currentTab} 
                        onChange={(e, newValue) => setCurrentTab(newValue)}
                        sx={{
                            '& .MuiTab-root': {
                                fontSize: '1rem',
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                '&.Mui-selected': {
                                    color: '#2196f3',
                                    transform: 'scale(1.05)'
                                }
                            },
                            '& .MuiTabs-indicator': {
                                height: 3,
                                borderRadius: '3px'
                            }
                        }}
                    >
                        <Tab value="GENERATE" label="GENERATE" />
                        <Tab value="PREVIEW" label="PREVIEW" disabled={!generatedPapers} />
                        <Tab value="HISTORY" label="HISTORY" />
                    </Tabs>
                </Box>

                {/* Generate Form */}
                {currentTab === 'GENERATE' && (
                    <Box ref={formRef}>
                        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Select Class</InputLabel>
                                <Select
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    label="Select Class"
                                    sx={{
                                        backgroundColor: '#f8fafc',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#fff',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    {[6, 7, 8, 9, 10].map((classNum) => (
                                        <MenuItem key={classNum} value={classNum}>
                                            Class {classNum}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Select Subject</InputLabel>
                                <Select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    label="Select Subject"
                                    sx={{
                                        backgroundColor: '#f8fafc',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#fff',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    <MenuItem value="mathematics">Mathematics</MenuItem>
                                    <MenuItem value="physics">Physics</MenuItem>
                                    <MenuItem value="chemistry">Chemistry</MenuItem>
                                    <MenuItem value="biology">Biology</MenuItem>
                                    <MenuItem value="english">English</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Exam Type</InputLabel>
                                <Select
                                    value={selectedExamType}
                                    onChange={(e) => setSelectedExamType(e.target.value)}
                                    label="Exam Type"
                                    sx={{
                                        backgroundColor: '#f8fafc',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#fff',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    <MenuItem value="FA-1">FA-1</MenuItem>
                                    <MenuItem value="FA-2">FA-2</MenuItem>
                                    <MenuItem value="self">Self Assessment</MenuItem>
                                    <MenuItem value="summative">Summative Exam</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                size="large"
                                onMouseEnter={handleButtonHover}
                                onMouseLeave={handleButtonLeave}
                                onClick={handleGenerate}
                                disabled={!selectedClass || !selectedSubject || !selectedExamType}
                                sx={{
                                    minWidth: '200px',
                                    py: 1.5,
                                    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 6px 20px rgba(33, 203, 243, .5)'
                                    },
                                    '&:active': {
                                        transform: 'translateY(-1px)'
                                    }
                                }}
                            >
                                GENERATE PAPERS
                            </Button>
                        </Box>
                    </Box>
                )}

                {currentTab === 'PREVIEW' && generatedPapers && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Grid container spacing={3}>
                            {Object.entries(generatedPapers).map(([level, data]) => (
                                <Grid item xs={12} md={4} key={level}>
                                    <StyledPaper sx={{ p: 3 }}>
                                        <Typography variant="h6" gutterBottom>
                                            {data.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<PreviewIcon />}
                                            >
                                                PREVIEW
                                            </Button>
                                            <Button
                                                variant="contained"
                                                startIcon={<DownloadIcon />}
                                            >
                                                DOWNLOAD
                                            </Button>
                                        </Box>
                                    </StyledPaper>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                )}

                {currentTab === 'HISTORY' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <StyledPaper>
                            <List>
                                {historyItems.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            borderBottom: index < historyItems.length - 1 ? 1 : 0,
                                            borderColor: 'divider',
                                            py: 2
                                        }}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <Typography variant="subtitle1">
                                                    {`${item.class} • ${item.subject}`}
                                                </Typography>
                                                <Chip 
                                                    label={item.examType} 
                                                    size="small" 
                                                    color="primary" 
                                                    variant="outlined"
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {`Generated on ${item.date} ${item.time}`}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<PreviewIcon />}
                                                size="small"
                                            >
                                                PREVIEW
                                            </Button>
                                            <Button
                                                variant="contained"
                                                startIcon={<DownloadIcon />}
                                                size="small"
                                            >
                                                DOWNLOAD
                                            </Button>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </StyledPaper>
                    </motion.div>
                )}
            </Paper>
        </Box>
    );
};

export default QuestionPaperGeneration;