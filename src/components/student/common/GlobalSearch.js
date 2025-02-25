import React, { useState, useRef, useEffect } from 'react';
import { 
    Box, 
    Paper, 
    InputBase, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText,
    Popper,
    Fade,
    Typography,
    Tooltip
} from '@mui/material';
import { 
    Search as SearchIcon, 
    Mic as MicIcon, 
    Assignment,
    MenuBook,
    Assessment,
    Dashboard,
    AttachFile,
    Image as ImageIcon,
    PictureAsPdf,
    Description
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const searchSuggestions = {
    'assignment': {
        path: '/student-home/assignments',
        icon: Assignment,
        matches: ['homework', 'task', 'submission', 'assignment', 'project']
    },
    'learning': {
        path: '/student-home/learning-resources',
        icon: MenuBook,
        matches: ['study', 'material', 'book', 'resource', 'learn', 'course']
    },
    'exams': {
        path: '/student-home/exam-results',
        icon: Assessment,
        matches: ['test', 'exam', 'score', 'result', 'grade', 'performance']
    },
    'dashboard': {
        path: '/student-home/dashboard',
        icon: Dashboard,
        matches: ['overview', 'summary', 'home', 'main', 'dashboard']
    }
};

const GlobalSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(240); // Default sidebar width
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const searchContainerRef = useRef(null);

    // Track sidebar state and width
    useEffect(() => {
        const updateSearchPosition = () => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                const computedStyle = window.getComputedStyle(sidebar);
                const width = computedStyle.getPropertyValue('width');
                const transform = computedStyle.getPropertyValue('transform');
                
                // Check if sidebar is visible and not transformed out of view
                const isVisible = transform === 'none' || !transform.includes('translate(-');
                setSidebarWidth(isVisible ? parseInt(width) : 0);
            }
        };

        // Initial update
        updateSearchPosition();

        // Listen for sidebar changes
        const resizeObserver = new ResizeObserver(updateSearchPosition);
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            resizeObserver.observe(sidebar);
        }

        // Listen for window resize
        window.addEventListener('resize', updateSearchPosition);

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateSearchPosition);
        };
    }, []);

    const handleSearchFocus = () => {
        setIsExpanded(true);
    };

    const handleSearchBlur = () => {
        if (!searchQuery) {
            setIsExpanded(false);
        }
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        
        if (query.length > 0) {
            // Generate suggestions based on query
            const matchedSuggestions = Object.entries(searchSuggestions)
                .filter(([key, value]) => {
                    return value.matches.some(match => 
                        match.includes(query) || query.includes(match)
                    );
                })
                .map(([key, value]) => ({
                    title: key.charAt(0).toUpperCase() + key.slice(1),
                    path: value.path,
                    icon: value.icon,
                    description: `Navigate to ${key} section`
                }));
            
            setSuggestions(matchedSuggestions);
            setAnchorEl(event.currentTarget);
        } else {
            setSuggestions([]);
            setAnchorEl(null);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle the file upload logic here
            console.log('File selected:', file.name);
            // You can add more file handling logic here
        }
    };

    const handleSuggestionClick = (path) => {
        navigate(path);
        setSearchQuery('');
        setSuggestions([]);
        setAnchorEl(null);
    };

    return (
        <Box
            component={motion.div}
            ref={searchContainerRef}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: `${sidebarWidth}px`, // Dynamic left position
                right: 0,
                zIndex: 1000,
                bgcolor: 'background.paper',
                borderTop: 1,
                borderColor: 'divider',
                p: 2,
                transition: 'left 0.3s ease', // Smooth transition
                '@media (max-width: 600px)': {
                    left: 0
                }
            }}
        >
            <motion.div
                animate={{
                    width: isExpanded ? '100%' : '90%',
                    margin: '0 auto'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <Paper
                    elevation={isExpanded ? 3 : 1}
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    <IconButton sx={{ p: '10px' }}>
                        <SearchIcon />
                    </IconButton>

                    <InputBase
                        sx={{ 
                            ml: 1, 
                            flex: 1,
                            '& input': {
                                padding: '12px 0',
                                transition: 'all 0.3s ease'
                            }
                        }}
                        placeholder="Search or ask anything..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                    />

                    <IconButton sx={{ p: '10px' }}>
                        <AttachFile />
                    </IconButton>

                    <IconButton sx={{ p: '10px' }}>
                        <MicIcon />
                    </IconButton>
                </Paper>
            </motion.div>

            <AnimatePresence>
                {suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                mt: 1,
                                borderRadius: 2,
                                overflow: 'hidden',
                                maxHeight: '300px',
                                overflowY: 'auto'
                            }}
                        >
                            <List>
                                {suggestions.map((suggestion, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <ListItem
                                            button
                                            onClick={() => handleSuggestionClick(suggestion.path)}
                                        >
                                            <ListItemIcon>
                                                <suggestion.icon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={suggestion.title}
                                                secondary={suggestion.description}
                                            />
                                        </ListItem>
                                    </motion.div>
                                ))}
                            </List>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default GlobalSearch; 