import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    TextField,
    Grid
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const Help = () => {
    const faqs = [
        {
            question: 'How do I evaluate papers?',
            answer: 'Navigate to Paper Evaluation section, upload the answer sheets, and follow the guided evaluation process.'
        },
        {
            question: 'How to generate question papers?',
            answer: 'Use the Question Paper Generation tool, select the subject and topics, and let AI assist in creating balanced question papers.'
        },
        {
            question: 'How to access homework corrections?',
            answer: 'Go to Homework Correction section, view pending assignments, and use the automated correction features.'
        }
    ];

    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 4 }}>Help & Support</Typography>
            
            <Typography variant="h6" sx={{ mb: 2 }}>Frequently Asked Questions</Typography>
            {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ mb: 1, borderRadius: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            {faq.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Paper sx={{ mt: 4, p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Contact Support</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Subject"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Message"
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Send Message
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Help; 