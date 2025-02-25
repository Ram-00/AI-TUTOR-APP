import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Divider,
    Avatar,
    Snackbar,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {
    School as SchoolIcon,
    Email as EmailIcon,
} from '@mui/icons-material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ParticleBackground } from '../animations/ParticleBackground';
import '@fontsource/poppins';

// Update LoginContainer styling
const LoginContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.primary.dark} 100%)`,
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing(3),
}));

// Update LoginCard to ensure it stands out from the background
const LoginCard = styled(motion.div)(({ theme }) => ({
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1.0),
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    position: 'relative',
    zIndex: 2,
}));

// Update LogoContainer styling
const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '& img': {
        height: '60px',
        marginBottom: theme.spacing(1)
    },
    '& .app-name': {
        fontSize: '1.4rem',
        fontWeight: 600,
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(0.5)
    },
    '& .tagline': {
        fontSize: '0.9rem',
        color: theme.palette.text.secondary
    }
}));

// Update background animations styling
const BackgroundAnimations = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 1,
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
});

// Add new styled components for enhanced 3D effects
const GlowingElement = styled(motion.div)`
  filter: drop-shadow(0 0 10px rgba(0, 195, 255, 0.5));
`;

// Update the Login component
const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [userType, setUserType] = useState('student');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any existing errors

        try {
            await login({ ...credentials, type: userType });
            
            // Navigate based on user type
            if (userType === 'faculty') {
                navigate('/faculty-home');
            } else {
                navigate('/student-home');
            }
        } catch (error) {
            setError(error.message);
            console.error('Login failed:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <LoginContainer>
                {/* Background Animations */}
                <BackgroundAnimations>
                    <Educational3DElements />
                    <ParticleBackground />
                </BackgroundAnimations>
                
                <LoginCard>
                    <LogoContainer>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                            <SchoolIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h4" color="primary" sx={{ textAlign: 'center' }}>
                            Sanghamitra Vidyalayam
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Empowering Education with AI
                        </Typography>
                    </LogoContainer>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        {/* User Type Selection */}
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="user-type-label">User Type</InputLabel>
                            <Select
                                labelId="user-type-label"
                                id="userType"
                                name="userType"
                                value={userType}
                                label="User Type"
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <MenuItem value="faculty">Faculty</MenuItem>
                                <MenuItem value="student">Student</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            type="email"
                            value={credentials.username}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                username: e.target.value
                            })}
                            margin="normal"
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 1.5 }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                password: e.target.value
                            })}
                            margin="normal"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                        >
                                            {/* Placeholder for password visibility toggle */}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 1.5 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ 
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                mb: 1.5
                            }}
                        >
                            Login
                        </Button>

                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Link href="#" color="primary">
                                Forgot Password?
                            </Link>
                        </Box>
                    </form>

                    {/* Footer - Now inside the LoginCard */}
                    <Divider sx={{ width: '100%', my: 1 }} />
                    <Box sx={{ 
                        width: '100%',
                        textAlign: 'center',
                        mt: 1 
                    }}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center',
                            gap: 2,
                            mb: 1,
                            '& a': {
                                color: 'text.secondary',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }
                        }}>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                            <Link href="/terms">Terms of Use</Link>
                            <Link href="/support">Support</Link>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            © 2024 Sanghamitra Vidyalam. All rights reserved.
                        </Typography>
                    </Box>
                </LoginCard>

                {/* Error Snackbar */}
                <Snackbar 
                    open={!!error} 
                    autoHideDuration={6000} 
                    onClose={() => setError('')}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert 
                        onClose={() => setError('')} 
                        severity="error" 
                        sx={{ width: '100%' }}
                    >
                        {error}
                    </Alert>
                </Snackbar>
            </LoginContainer>
        </ThemeProvider>
    );
};

// Updated Educational3DElements with realistic animations
const Educational3DElements = () => {
  return (
    <>
      {/* Enhanced Atom Animation */}
      <GlowingElement
        style={{
          position: 'absolute',
          left: '5%',
          top: '20%',
          width: '200px',
          height: '200px',
        }}
      >
        <motion.svg
          viewBox="0 0 200 200"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Nucleus with particles */}
          <motion.g>
            {/* Protons */}
            {[...Array(3)].map((_, i) => (
              <motion.circle
                key={`proton-${i}`}
                cx={100 + Math.cos(i * Math.PI * 2/3) * 8}
                cy={100 + Math.sin(i * Math.PI * 2/3) * 8}
                r="6"
                fill="url(#protonGradient)"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
            {/* Neutrons */}
            {[...Array(4)].map((_, i) => (
              <motion.circle
                key={`neutron-${i}`}
                cx={100 + Math.cos(i * Math.PI/2) * 5}
                cy={100 + Math.sin(i * Math.PI/2) * 5}
                r="5"
                fill="url(#neutronGradient)"
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.g>

          {/* Electron orbits with particles */}
          {[0, 1, 2].map((orbitIndex) => (
            <motion.g
              key={`orbit-${orbitIndex}`}
              animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: orbitIndex * 2
              }}
            >
              <ellipse
                cx="100"
                cy="100"
                rx={40 + orbitIndex * 20}
                ry={40 + orbitIndex * 20}
                fill="none"
                stroke="url(#orbitGradient)"
                strokeWidth="1"
                opacity="0.3"
              />
              
              {/* Electrons on each orbit */}
              {[...Array(2)].map((_, electronIndex) => (
                <motion.g
                  key={`electron-${orbitIndex}-${electronIndex}`}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8 - orbitIndex * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <circle
                    cx={100 + (40 + orbitIndex * 20)}
                    cy="100"
                    r="4"
                    fill="#00ffff"
                    filter="url(#electronGlow)"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.5;1;0.5"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </motion.g>
              ))}
            </motion.g>
          ))}

          {/* Enhanced gradients and filters */}
          <defs>
            <radialGradient id="protonGradient">
              <stop offset="0%" stopColor="#ff1744"/>
              <stop offset="100%" stopColor="#d50000"/>
            </radialGradient>
            <radialGradient id="neutronGradient">
              <stop offset="0%" stopColor="#651fff"/>
              <stop offset="100%" stopColor="#6200ea"/>
            </radialGradient>
            <linearGradient id="orbitGradient">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0"/>
              <stop offset="50%" stopColor="#00ffff" stopOpacity="1"/>
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0"/>
            </linearGradient>
            <filter id="electronGlow">
              <feGaussianBlur stdDeviation="3" result="glow"/>
              <feColorMatrix
                in="glow"
                type="matrix"
                values="0 0 0 0 0
                        0 1 0 0 0
                        1 0 1 0 0
                        0 0 0 1 0"
              />
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </motion.svg>
      </GlowingElement>

      {/* Enhanced 3D Book Animation */}
      <motion.div
        style={{
          position: 'absolute',
          right: '10%',
          top: '15%',
          width: '120px',
          height: '160px',
          perspective: '1500px'
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transformOrigin: 'left'
          }}
          animate={{
            rotateY: [0, -180]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {/* Book cover */}
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, #9c27b0, #673ab7)',
              borderRadius: '3px 12px 12px 3px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          />
          
          {/* Pages */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`page-${i}`}
              style={{
                position: 'absolute',
                width: '98%',
                height: '98%',
                background: 'white',
                transformOrigin: 'left',
                borderRadius: '2px 8px 8px 2px',
              }}
              animate={{
                rotateY: [-180, 0],
                opacity: [0.5, 1]
              }}
              transition={{
                duration: 2,
                delay: i * 0.15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced DNA Helix */}
      <motion.div
        style={{
          position: 'absolute',
          right: '15%',
          bottom: '5%',
          width: '150px',
          height: '300px',
          perspective: '2000px'
        }}
      >
        <motion.svg
          viewBox="0 0 150 300"
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 0 15px rgba(0,149,255,0.4))'
          }}
          animate={{ rotateY: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Updated DNA structure with more depth */}
          {[...Array(25)].map((_, i) => (
            <g key={`dna-segment-${i}`}>
              <motion.path
                d={`M 30 ${i * 12} Q 75 ${i * 12 + 6} 120 ${i * 12}`}
                stroke="url(#dnaStrandGradient)"
                strokeWidth="3"
                fill="none"
                animate={{
                  d: `M 30 ${i * 12} Q 75 ${i * 12 - 6} 120 ${i * 12}`,
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
              
              {/* Enhanced base pairs */}
              <motion.line
                x1="45"
                y1={i * 12}
                x2="105"
                y2={i * 12}
                stroke="url(#dnaBaseGradient)"
                strokeWidth="2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  strokeWidth: [1.5, 2.5, 1.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.05
                }}
              />
            </g>
          ))}
          
          {/* Enhanced gradients */}
          <defs>
            <linearGradient id="dnaStrandGradient">
              <stop offset="0%" stopColor="#00e5ff"/>
              <stop offset="50%" stopColor="#00b0ff"/>
              <stop offset="100%" stopColor="#2979ff"/>
            </linearGradient>
            <linearGradient id="dnaBaseGradient">
              <stop offset="0%" stopColor="#18ffff"/>
              <stop offset="100%" stopColor="#00e5ff"/>
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.div>
    </>
  );
};

// Create a custom theme
const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h4: {
            fontWeight: 600,
            letterSpacing: 0.5,
        },
        subtitle1: {
            fontSize: '1.1rem',
            opacity: 0.8,
        },
        button: {
            fontWeight: 500,
            letterSpacing: 1,
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label': {
                        fontFamily: 'Poppins, sans-serif',
                    },
                    '& input': {
                        fontFamily: 'Poppins, sans-serif',
                    },
                },
            },
        },
    },
});

export default Login;

