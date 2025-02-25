import React, { useState } from 'react';
import { 
    Box, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    CardActionArea,
    IconButton,
    Chip,
    Button,
    TextField,
    InputAdornment
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
    MenuBook, 
    VideoLibrary, 
    Quiz, 
    Science,
    Language,
    Calculate,
    Search as SearchIcon,
    PlayCircleOutline,
    PictureAsPdf,
    OpenInNew
} from '@mui/icons-material';
import PageHeader from '../common/PageHeader';

const resourceCategories = [
    {
        id: 'textbooks',
        title: 'Digital Textbooks',
        icon: MenuBook,
        color: '#2196f3',
        resources: [
            {
                title: 'Mathematics Grade 10',
                type: 'PDF',
                size: '15 MB',
                chapters: 12,
                icon: PictureAsPdf
            },
            // Add more resources
        ]
    },
    {
        id: 'videos',
        title: 'Video Lectures',
        icon: VideoLibrary,
        color: '#4caf50',
        resources: [
            {
                title: 'Science Experiments',
                type: 'Video',
                duration: '45 mins',
                topics: 8,
                icon: PlayCircleOutline
            },
            // Add more resources
        ]
    },
    {
        id: 'practice',
        title: 'Practice Tests',
        icon: Quiz,
        color: '#ff9800',
        resources: [
            {
                title: 'English Grammar Quiz',
                type: 'Interactive',
                questions: 50,
                time: '60 mins',
                icon: Language
            },
            // Add more resources
        ]
    }
];

const ResourceCard = ({ resource, category }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card
                sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${category.color}10, ${category.color}05)`,
                    border: `1px solid ${category.color}20`,
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: `0 8px 24px ${category.color}20`
                    }
                }}
            >
                <CardActionArea sx={{ height: '100%', p: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <resource.icon 
                                sx={{ 
                                    fontSize: 40, 
                                    color: category.color,
                                    mr: 2
                                }} 
                            />
                            <Box>
                                <Typography variant="h6" color={category.color}>
                                    {resource.title}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                    <Chip 
                                        label={resource.type}
                                        size="small"
                                        sx={{ 
                                            bgcolor: `${category.color}20`,
                                            color: category.color
                                        }}
                                    />
                                    {resource.size && (
                                        <Chip 
                                            label={resource.size}
                                            size="small"
                                            variant="outlined"
                                            sx={{ color: 'text.secondary' }}
                                        />
                                    )}
                                    {resource.duration && (
                                        <Chip 
                                            label={resource.duration}
                                            size="small"
                                            variant="outlined"
                                            sx={{ color: 'text.secondary' }}
                                        />
                                    )}
                                </Box>
                            </Box>
                            <IconButton 
                                sx={{ 
                                    ml: 'auto',
                                    color: category.color
                                }}
                            >
                                <OpenInNew />
                            </IconButton>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </motion.div>
    );
};

const LearningResources = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Box>
            <PageHeader icon={MenuBook} title="Learning Resources" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ 
                    textAlign: 'center', 
                    mb: 6
                }}>
                    <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{ 
                            color: 'primary.main',
                            fontWeight: 600
                        }}
                    >
                        Explore Learning Materials
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Access digital textbooks, video lectures, and interactive practice tests
                    </Typography>

                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ 
                            maxWidth: 500,
                            mb: 4,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>

                {resourceCategories.map((category, categoryIndex) => (
                    <Box key={category.id} sx={{ mb: 6 }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: category.color,
                                mb: 3,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <category.icon />
                            {category.title}
                        </Typography>

                        <Grid container spacing={3}>
                            {category.resources.map((resource, resourceIndex) => (
                                <Grid item xs={12} md={6} lg={4} key={resourceIndex}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ 
                                            delay: categoryIndex * 0.2 + resourceIndex * 0.1 
                                        }}
                                    >
                                        <ResourceCard 
                                            resource={resource} 
                                            category={category}
                                        />
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </motion.div>
        </Box>
    );
};

export default LearningResources;
