import React, { useState } from 'react';
import { 
    Box, 
    Paper, 
    Typography, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails,
    Button,
    Chip,
    IconButton,
    Alert,
    CircularProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { 
    ExpandMore as ExpandMoreIcon,
    CloudUpload as UploadIcon,
    Schedule as ScheduleIcon,
    Description as DescriptionIcon,
    CheckCircle as CheckIcon,
    ArrowBack as ArrowBackIcon,
    Delete as DeleteIcon,
    PictureAsPdf as PdfIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

const SubjectAssignments = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const [expandedPanel, setExpandedPanel] = useState(false);
    const [uploadStates, setUploadStates] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // Mock data with actual PDF URLs
    const subjectData = {
        math: {
            name: 'Mathematics',
            color: '#1a237e',
            assignments: [
                {
                    id: 1,
                    title: 'Quadratic Equations',
                    description: 'Complete exercises on quadratic equations and submit your solutions.',
                    status: 'Pending',
                    dueDate: '2024-03-20T23:59:59',
                    guidelines: 'Solve all problems showing complete work. Use proper mathematical notation.',
                    requirements: [
                        'Clear handwriting',
                        'Step-by-step solutions',
                        'Final answers boxed'
                    ]
                },
                {
                    id: 2,
                    title: 'Linear Algebra',
                    description: 'Practice problems on matrices and determinants.',
                    status: 'Submitted',
                    dueDate: '2024-03-20T23:59:59',
                    submittedFile: 'linear_algebra_homework.pdf',
                    fileUrl: '/sample.pdf', // Replace with actual PDF URL
                    requirements: [
                        'Include all steps',
                        'Box final answers',
                        'Use proper notation'
                    ]
                }
            ]
        },
        science: {
            name: 'Science',
            color: '#2e7d32',
            assignments: [
                {
                    id: 3,
                    title: 'Renewable Energy',
                    description: 'Research and prepare a presentation on renewable energy sources.',
                    status: 'Pending',
                    dueDate: 'Next Week',
                    guidelines: 'Include current statistics and future projections.',
                    requirements: [
                        'Minimum 10 slides',
                        'Include diagrams',
                        'Cite sources'
                    ]
                }
            ]
        }
    };

    const subject = subjectData[subjectId];

    const handleFileChange = (assignmentId, event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadStates(prev => ({
                ...prev,
                [assignmentId]: {
                    file,
                    uploading: false
                }
            }));
        }
    };

    const handleSubmit = async (assignmentId) => {
        setUploadStates(prev => ({
            ...prev,
            [assignmentId]: {
                ...prev[assignmentId],
                uploading: true
            }
        }));

        // Simulate upload
        await new Promise(resolve => setTimeout(resolve, 2000));

        setUploadStates(prev => ({
            ...prev,
            [assignmentId]: {
                ...prev[assignmentId],
                uploading: false,
                success: true
            }
        }));
    };

    const handlePreview = (fileUrl) => {
        setPreviewUrl(fileUrl);
        setShowPreview(true);
    };

    const isDeadlinePassed = (dueDate) => {
        return new Date(dueDate) < new Date();
    };

    // Move renderSubmittedAssignment inside the component
    const renderSubmittedAssignment = (assignment) => (
        <Box>
            <Typography variant="subtitle2" gutterBottom>
                Submitted File:
            </Typography>
            <Paper 
                sx={{ 
                    p: 2, 
                    bgcolor: `${subject.color}05`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <PdfIcon sx={{ color: subject.color }} />
                <Typography>{assignment.submittedFile}</Typography>
                <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                    <Button 
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handlePreview(assignment.fileUrl)}
                        sx={{ 
                            color: subject.color,
                            borderColor: subject.color,
                            '&:hover': {
                                bgcolor: `${subject.color}10`
                            }
                        }}
                    >
                        Preview
                    </Button>
                    {!isDeadlinePassed(assignment.dueDate) && (
                        <Button 
                            variant="outlined"
                            size="small"
                            startIcon={<UploadIcon />}
                            component="label"
                            sx={{ 
                                color: subject.color,
                                borderColor: subject.color,
                                '&:hover': {
                                    bgcolor: `${subject.color}10`
                                }
                            }}
                        >
                            Reupload
                            <input
                                type="file"
                                hidden
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileChange(assignment.id, e)}
                            />
                        </Button>
                    )}
                </Box>
            </Paper>
            {isDeadlinePassed(assignment.dueDate) && (
                <Typography 
                    variant="caption" 
                    color="error"
                    sx={{ display: 'block', mt: 1 }}
                >
                    Deadline passed. Reupload not available.
                </Typography>
            )}
        </Box>
    );

    // PDF Preview Dialog Component
    const PreviewDialog = ({ open, onClose }) => (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    height: '90vh',
                    maxHeight: '90vh'
                }
            }}
        >
            <DialogTitle sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                bgcolor: subject.color,
                color: 'white'
            }}>
                <Typography variant="h6">Assignment Preview</Typography>
                <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
                    <ArrowBackIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ height: '100%', p: 0 }}>
                <iframe
                    src={`${previewUrl}#toolbar=0`}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    title="PDF Preview"
                />
            </DialogContent>
        </Dialog>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4,
                gap: 2
            }}>
                <Button
                    onClick={() => navigate('/student-home/assignments')}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        color: subject.color,
                        bgcolor: `${subject.color}10`,
                        '&:hover': {
                            bgcolor: `${subject.color}20`,
                        },
                        borderRadius: '8px',
                        px: 2,
                        py: 1
                    }}
                >
                    Back to Assignments
                </Button>
            </Box>

            <Typography variant="h4" color={subject.color} gutterBottom>
                {subject.name} Assignments
            </Typography>

            {subject.assignments.map((assignment) => (
                <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Accordion
                        expanded={expandedPanel === assignment.id}
                        onChange={() => setExpandedPanel(expandedPanel === assignment.id ? false : assignment.id)}
                        sx={{ 
                            mt: 2,
                            '&:before': { display: 'none' },
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            borderRadius: '8px !important'
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{ 
                                bgcolor: `${subject.color}05`,
                                borderRadius: '8px'
                            }}
                        >
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                width: '100%',
                                pr: 2
                            }}>
                                <Typography variant="h6" color={subject.color}>
                                    {assignment.title}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        Due: {assignment.dueDate}
                                    </Typography>
                                    <Chip 
                                        label={assignment.status}
                                        size="small"
                                        color={assignment.status === 'Pending' ? 'error' : 'success'}
                                    />
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 3 }}>
                            <Typography variant="body1" paragraph>
                                {assignment.description}
                            </Typography>

                            <Typography variant="h6" color={subject.color} gutterBottom>
                                Guidelines
                            </Typography>
                            <Typography variant="body2" paragraph>
                                {assignment.guidelines}
                            </Typography>

                            <Typography variant="h6" color={subject.color} gutterBottom>
                                Requirements
                            </Typography>
                            <List>
                                {assignment.requirements.map((req, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <CheckIcon sx={{ color: subject.color }} />
                                        </ListItemIcon>
                                        <ListItemText primary={req} />
                                    </ListItem>
                                ))}
                            </List>

                            <Box sx={{ mt: 3 }}>
                                {assignment.status === 'Submitted' ? (
                                    <Box>
                                        {renderSubmittedAssignment(assignment)}
                                    </Box>
                                ) : (
                                    <Box>
                                        <input
                                            accept=".pdf,.doc,.docx"
                                            style={{ display: 'none' }}
                                            id={`assignment-file-${assignment.id}`}
                                            type="file"
                                            onChange={(e) => handleFileChange(assignment.id, e)}
                                        />
                                        
                                        <label htmlFor={`assignment-file-${assignment.id}`}>
                                            <Button
                                                variant="outlined"
                                                component="span"
                                                startIcon={<UploadIcon />}
                                                fullWidth
                                                sx={{
                                                    color: subject.color,
                                                    borderColor: subject.color,
                                                    '&:hover': {
                                                        borderColor: subject.color,
                                                        bgcolor: `${subject.color}10`
                                                    }
                                                }}
                                            >
                                                Upload Assignment
                                            </Button>
                                        </label>

                                        {uploadStates[assignment.id]?.file && (
                                            <Box sx={{ mt: 2 }}>
                                                <Paper 
                                                    sx={{ 
                                                        p: 2, 
                                                        bgcolor: `${subject.color}05`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <PdfIcon sx={{ color: subject.color }} />
                                                        <Typography>
                                                            {uploadStates[assignment.id].file.name}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        <IconButton 
                                                            onClick={() => handlePreview(URL.createObjectURL(uploadStates[assignment.id].file))}
                                                            size="small"
                                                        >
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                        <IconButton 
                                                            onClick={() => {
                                                                setUploadStates(prev => ({
                                                                    ...prev,
                                                                    [assignment.id]: undefined
                                                                }));
                                                            }}
                                                            size="small"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Paper>

                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleSubmit(assignment.id)}
                                                    disabled={uploadStates[assignment.id]?.uploading}
                                                    fullWidth
                                                    sx={{
                                                        mt: 2,
                                                        bgcolor: subject.color,
                                                        '&:hover': {
                                                            bgcolor: subject.color
                                                        }
                                                    }}
                                                >
                                                    {uploadStates[assignment.id]?.uploading ? (
                                                        <CircularProgress size={24} color="inherit" />
                                                    ) : 'Submit Assignment'}
                                                </Button>
                                            </Box>
                                        )}

                                        {uploadStates[assignment.id]?.success && (
                                            <Alert 
                                                severity="success" 
                                                sx={{ mt: 2 }}
                                            >
                                                Assignment submitted successfully!
                                            </Alert>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </motion.div>
            ))}

            <PreviewDialog 
                open={showPreview}
                onClose={() => {
                    setShowPreview(false);
                    setPreviewUrl(null);
                }}
            />
        </motion.div>
    );
};

export default SubjectAssignments; 