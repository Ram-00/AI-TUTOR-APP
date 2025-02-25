import React from 'react';
import { motion } from 'framer-motion';
import { Box, styled } from '@mui/material';

const LoaderContainer = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9999,
});

const AtomLoader = () => {
    return (
        <LoaderContainer>
            <Box
                sx={{
                    width: '150px',
                    height: '150px',
                    position: 'relative',
                }}
            >
                {/* Nucleus */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#1976d2',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 20px #1976d2',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Orbits */}
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            border: '2px solid rgba(25, 118, 210, 0.3)',
                            borderRadius: '50%',
                            top: '0',
                            left: '0',
                        }}
                        animate={{
                            rotateX: [0, 360],
                            rotateY: [0, 360],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.2,
                        }}
                    >
                        {/* Electron */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: '#90caf9',
                                top: '-6px',
                                left: 'calc(50% - 6px)',
                                boxShadow: '0 0 10px #90caf9',
                            }}
                        />
                    </motion.div>
                ))}
            </Box>
        </LoaderContainer>
    );
};

export default AtomLoader; 