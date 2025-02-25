import React from 'react';
import { motion } from 'framer-motion';

export const LoaderAnimation = () => (
    <motion.div
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(25, 118, 210, 0.15)',
            backdropFilter: 'blur(8px)',
            perspective: '1200px',
            zIndex: 1000,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.div
            style={{
                width: 300,
                height: 300,
                position: 'relative',
                transformStyle: 'preserve-3d',
            }}
            animate={{ 
                rotateY: 360,
                rotateX: [10, -10, 10]
            }}
            transition={{
                rotateY: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                },
                rotateX: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
        >
            {/* Enhanced Nucleus */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #64b5f6, #1976d2)',
                    transform: 'translate(-50%, -50%) translateZ(30px)',
                    boxShadow: '0 0 50px rgba(100, 181, 246, 0.8)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                        '0 0 50px rgba(100, 181, 246, 0.8)',
                        '0 0 80px rgba(100, 181, 246, 0.8)',
                        '0 0 50px rgba(100, 181, 246, 0.8)',
                    ],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Enhanced 3D Electron Orbits */}
            {[0, 45, 90, 135].map((rotation, index) => (
                <motion.div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        transformStyle: 'preserve-3d',
                        transform: `rotateX(${rotation}deg) rotateY(${rotation * 2}deg)`,
                    }}
                >
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: '3px solid rgba(144, 202, 249, 0.3)',
                            borderRadius: '50%',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle at 30% 30%, #90caf9, #42a5f5)',
                                boxShadow: '0 0 25px rgba(144, 202, 249, 0.8)',
                                transform: 'translate(-50%, -50%)',
                            }}
                            animate={{
                                rotateZ: 360,
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                rotateZ: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: index * 0.2
                                },
                                scale: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.2
                                }
                            }}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
); 