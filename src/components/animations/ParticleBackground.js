import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const ParticleContainer = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0
});

export const ParticleBackground = () => {
    return (
        <ParticleContainer>
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, Math.random() * 100 - 50],
                        x: [0, Math.random() * 100 - 50],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            ))}
        </ParticleContainer>
    );
}; 