import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

// Enhanced Atom Structure
export const AtomStructure = () => (
    <motion.div
        style={{
            width: 150,
            height: 150,
            position: 'relative',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
        <svg viewBox="0 0 150 150">
            {/* Nucleus */}
            <motion.circle
                cx="75"
                cy="75"
                r="10"
                fill="#64b5f6"
                animate={{
                    scale: [1, 1.2, 1],
                    filter: ['brightness(100%)', 'brightness(150%)', 'brightness(100%)'],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            {/* Electron Orbits */}
            {[0, 60, 120].map((rotation, index) => (
                <g key={index} transform={`rotate(${rotation} 75 75)`}>
                    <motion.ellipse
                        cx="75"
                        cy="75"
                        rx="30"
                        ry="60"
                        fill="none"
                        stroke="rgba(144, 202, 249, 0.5)"
                        strokeWidth="1"
                    />
                    <motion.circle
                        cx="75"
                        cy="15"
                        r="4"
                        fill="#90caf9"
                        animate={{
                            cx: ["75", "75"],
                            cy: ["15", "135", "15"],
                            filter: ['brightness(100%)', 'brightness(150%)', 'brightness(100%)'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.5
                        }}
                    />
                </g>
            ))}
        </svg>
    </motion.div>
);

// Enhanced Solar System
export const SolarSystem = () => (
    <motion.div
        style={{
            width: 200,
            height: 200,
        }}
    >
        <svg viewBox="0 0 200 200">
            {/* Sun with glowing effect */}
            <motion.circle
                cx="100"
                cy="100"
                r="20"
                fill="url(#sunGradient)"
                animate={{
                    scale: [1, 1.1, 1],
                    filter: ['brightness(100%)', 'brightness(120%)', 'brightness(100%)'],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            {/* Planets */}
            {[40, 60, 80].map((radius, index) => (
                <motion.g
                    key={index}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 15 + index * 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeDasharray="2 4"
                    />
                    <motion.circle
                        cx={100 + radius}
                        cy="100"
                        r={4 + index}
                        fill={['#ff9800', '#4caf50', '#2196f3'][index]}
                    />
                </motion.g>
            ))}
            
            {/* Gradient definitions */}
            <defs>
                <radialGradient id="sunGradient">
                    <stop offset="0%" stopColor="#ffd700" />
                    <stop offset="100%" stopColor="#ff8f00" />
                </radialGradient>
            </defs>
        </svg>
    </motion.div>
);

// Enhanced 3D Globe with more realistic effects
export const Globe3D = () => (
    <motion.div
        style={{
            width: '100px',
            height: '100px',
            opacity: 0.6,
        }}
        animate={{ 
            rotateY: 360,
            opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
        }}
    >
        <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#ffffff" strokeWidth="2" fill="none" />
            {[...Array(5)].map((_, i) => (
                <ellipse
                    key={i}
                    cx="50"
                    cy="50"
                    rx="45"
                    ry={45 * Math.cos((i * Math.PI) / 5)}
                    stroke="#ffffff"
                    strokeWidth="1"
                    fill="none"
                />
            ))}
        </svg>
    </motion.div>
);

// Enhanced DNA Structure
export const DNAHelix = () => (
    <motion.div
        style={{
            width: 100,
            height: 200,
        }}
    >
        <svg viewBox="0 0 100 200">
            {[...Array(10)].map((_, i) => (
                <React.Fragment key={i}>
                    <motion.path
                        d={`M 10 ${i * 20} Q 30 ${i * 20 + 10} 50 ${i * 20}`}
                        stroke="#90caf9"
                        strokeWidth="2"
                        fill="none"
                        animate={{
                            d: `M 10 ${i * 20} Q 30 ${i * 20 - 10} 50 ${i * 20}`
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            yoyo: true,
                            ease: "easeInOut",
                            delay: i * 0.1
                        }}
                    />
                    <motion.circle
                        cx={i % 2 ? 10 : 50}
                        cy={i * 20}
                        r="3"
                        fill="#64b5f6"
                        animate={{
                            scale: [1, 1.2, 1],
                            filter: ['brightness(100%)', 'brightness(150%)', 'brightness(100%)'],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.1
                        }}
                    />
                </React.Fragment>
            ))}
        </svg>
    </motion.div>
);

// Enhanced 3D DNA
export const DNA3D = () => (
    <motion.div
        style={{
            width: '60px',
            height: '200px',
            opacity: 0.6,
        }}
        animate={{ 
            rotateX: 360,
            opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
        }}
    >
        <svg viewBox="0 0 60 200">
            {[...Array(10)].map((_, i) => (
                <React.Fragment key={i}>
                    <motion.path
                        d={`M 10 ${i * 20} Q 30 ${i * 20 + 10} 50 ${i * 20}`}
                        stroke="#ffffff"
                        strokeWidth="2"
                        fill="none"
                        animate={{
                            d: `M 10 ${i * 20} Q 30 ${i * 20 - 10} 50 ${i * 20}`
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            yoyo: true,
                            ease: "easeInOut"
                        }}
                    />
                </React.Fragment>
            ))}
        </svg>
    </motion.div>
);

// Background Elements Container with enhanced positioning
export const BackgroundElements = () => (
    <>
        <Box sx={{ position: 'absolute', right: '10%', top: '20%', zIndex: 1 }}>
            <Globe3D />
        </Box>
        <Box sx={{ position: 'absolute', left: '15%', top: '30%', zIndex: 1 }}>
            <DNA3D />
        </Box>
    </>
);
