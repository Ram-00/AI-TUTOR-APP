import React, { useState } from 'react';
import {
    Box,
    Paper,
    IconButton,
    TextField,
    Dialog,
    DialogContent,
    DialogTitle,
    Fab,
    Typography
} from '@mui/material';
import {
    Close as CloseIcon,
    Send as SendIcon,
    SmartToy as RobotIcon
} from '@mui/icons-material';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        {
            type: 'bot',
            message: "I'm here to help you with your teaching needs. What can I assist you with?"
        }
    ]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message to chat
        setChatHistory([...chatHistory, { type: 'user', message }]);
        
        // Add bot response (you can implement actual AI logic here)
        setChatHistory([
            ...chatHistory,
            { type: 'user', message },
            { type: 'bot', message: "I'm processing your request..." }
        ]);
        
        setMessage('');
    };

    return (
        <>
            {/* Floating Chat Button */}
            <Fab
                color="primary"
                aria-label="chat"
                onClick={() => setIsOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: 80, // Position above search bar
                    right: 20,
                    backgroundColor: '#1a237e'
                }}
            >
                <RobotIcon />
            </Fab>

            {/* Chat Dialog */}
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        position: 'fixed',
                        bottom: 100, // Position above search bar
                        right: 20,
                        m: 0,
                        width: '400px',
                        maxHeight: '600px',
                        borderRadius: 2
                    }
                }}
            >
                <DialogTitle sx={{ 
                    backgroundColor: '#1a237e', 
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RobotIcon />
                        <Typography>AI Assistant</Typography>
                    </Box>
                    <IconButton 
                        onClick={() => setIsOpen(false)}
                        sx={{ color: 'white' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 2 }}>
                    {/* Chat Messages */}
                    <Box sx={{ 
                        height: '400px', 
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mb: 2
                    }}>
                        {chatHistory.map((chat, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: chat.type === 'user' ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <Paper
                                    sx={{
                                        p: 1,
                                        maxWidth: '80%',
                                        backgroundColor: chat.type === 'user' ? '#1a237e' : '#f5f5f5',
                                        color: chat.type === 'user' ? 'white' : 'black'
                                    }}
                                >
                                    <Typography>{chat.message}</Typography>
                                </Paper>
                            </Box>
                        ))}
                    </Box>

                    {/* Message Input */}
                    <Box
                        component="form"
                        onSubmit={handleSend}
                        sx={{
                            display: 'flex',
                            gap: 1
                        }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <IconButton 
                            type="submit" 
                            color="primary"
                            disabled={!message.trim()}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AIAssistant;
