import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    ToggleButtonGroup,
    ToggleButton,
    IconButton,
    InputAdornment,
    Link,
    Divider,
    Card,
    CardContent,
    Container,
    CircularProgress,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Avatar,
    Snackbar
} from '@mui/material';
import {
    School as SchoolIcon,
    Visibility,
    VisibilityOff,
    Person as PersonIcon,
    Lock as LockIcon,
    Email as EmailIcon,
    AccountBox as TeacherIcon,
} from '@mui/icons-material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BackgroundElements } from '../animations/EducationalElements';
import EducationalLoader from '../animations/EducationalLoader';
import { Globe3D, DNA3D } from '../animations/EducationalElements';
import { ParticleBackground } from '../animations/ParticleBackground';
import { LoaderAnimation } from '../animations/LoaderAnimation';
import '@fontsource/poppins';
import AtomLoader from '../animations/AtomLoader';
import schoolLogo from '../../images/school-logo1.png';

const sketchElements = [
    // Basic educational items
    {
        path: `
            <g stroke="#ffffff" fill="none" stroke-width="1.5" style="stroke-linecap: round; stroke-linejoin: round">
                <path d="M2,12 L7,2 L12,12 Z M4.5,7 L9.5,7" /> <!-- Pencil -->
                <path d="M15,2 C17,2 19,4 19,6 C19,8 17,10 15,10 C13,10 11,8 11,6 C11,4 13,2 15,2" /> <!-- Apple -->
                <path d="M15,10 L15,12" /> <!-- Apple stem -->
            </g>
        `,
        width: 30,
        position: { top: '10%', left: '15%' }
    },
    // Globe
    {
        path: `
            <g stroke="#ffffff" fill="none" stroke-width="1.5">
                <circle cx="12" cy="12" r="8" />
                <path d="M12,4 C14.5,4 17,5 17,8 M12,4 C9.5,4 7,5 7,8" />
                <path d="M12,20 C14.5,20 17,19 17,16 M12,20 C9.5,20 7,19 7,16" />
                <path d="M4,12 L20,12" style="stroke-dasharray: 2,2" />
            </g>
        `,
        width: 40,
        position: { top: '20%', right: '25%' }
    },
    // Robot
    {
        path: `
            <g stroke="#ffffff" fill="none" stroke-width="1.5">
                <rect x="8" y="6" width="8" height="8" rx="1" />
                <circle cx="10" cy="9" r="1" />
                <circle cx="14" cy="9" r="1" />
                <path d="M11,12 L13,12" />
                <path d="M12,14 L12,17" />
                <path d="M10,17 L14,17" />
            </g>
        `,
        width: 35,
        position: { bottom: '30%', right: '15%' }
    },
    // Music notes
    {
        path: `
            <g stroke="#ffffff" fill="none" stroke-width="1.5">
                <path d="M8,4 L8,13 C8,14.5 6.5,16 5,16 C3.5,16 2,14.5 2,13 C2,11.5 3.5,10 5,10 C6,10 7,10.5 8,11" />
                <path d="M16,2 L16,11 C16,12.5 14.5,14 13,14 C11.5,14 10,12.5 10,11 C10,9.5 11.5,8 13,8 C14,8 15,8.5 16,9" />
            </g>
        `,
        width: 25,
        position: { top: '40%', left: '20%' }
    },
    // Test tubes
    {
        path: `
            <g stroke="#ffffff" fill="none" stroke-width="1.5">
                <path d="M8,2 L8,12 C8,14 6,16 4,16 M12,2 L12,14 C12,16 14,18 16,18" />
                <path d="M6,6 L10,6 M10,10 L14,10" style="stroke-dasharray: 1,1" />
            </g>
        `,
        width: 30,
        position: { top: '60%', left: '30%' }
    },
    // Soccer ball
    {
        path: `
            <g stroke="#ffffff" fill="none" stroke-width="1.5">
                <circle cx="12" cy="12" r="8" />
                <path d="M12,4 L12,20 M4,12 L20,12" />
                <path d="M7,7 L17,17 M17,7 L7,17" style="stroke-dasharray: 2,2" />
            </g>
        `,
        width: 35,
        position: { bottom: '40%', right: '35%' }
    }
    // ... Add about 15-20 more elements with different positions
];

// Update the SketchedElements component to create multiple instances
const SketchedElements = () => {
    // Create multiple layers of elements with different scales and positions
    const createLayer = (scale = 1, count = 20) => {
        return Array.from({ length: count }, (_, index) => {
            const element = sketchElements[index % sketchElements.length];
            return (
                <FloatingElement
                    key={`layer-${scale}-${index}`}
                    style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: element.width * scale,
                        height: element.width * scale,
                        opacity: 0.4 + (Math.random() * 0.3)
                    }}
                    animate={{
                        y: [0, Math.random() * 30 - 15],
                        x: [0, Math.random() * 30 - 15],
                        rotate: [0, Math.random() * 40 - 20],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        style={{
                            filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.3))',
                        }}
                        dangerouslySetInnerHTML={{ __html: element.path }}
                    />
                </FloatingElement>
            );
        });
    };

    return (
        <>
            {createLayer(0.8, 25)} {/* Small background elements */}
            {createLayer(1, 20)}   {/* Medium elements */}
            {createLayer(1.2, 15)} {/* Larger foreground elements */}
        </>
    );
};

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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(3),
    '& .MuiToggleButton-root': {
        width: '50%',
        padding: theme.spacing(1.5),
        fontSize: '1rem',
        textTransform: 'none',
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    },
}));

// Add new styled components for animated elements
const FloatingElement = styled(motion.div)({
    position: 'absolute',
    pointerEvents: 'none',
});

const AnimatedLoader = styled(motion.div)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
});

const LoadingAnimation = () => (
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
            backgroundColor: 'rgba(255,255,255,0.8)',
            zIndex: 10,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
            }}
        >
            <EducationalLoader />
            <Typography variant="h6" color="primary">
                Logging you in...
            </Typography>
        </motion.div>
    </motion.div>
);

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

                <AnimatePresence>
                    {/* Placeholder for loading animation */}
                </AnimatePresence>
            </LoginContainer>

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

// Animation Components
const AtomAnimation = () => (
    <motion.div
        style={{
            position: 'absolute',
            left: '10%',
            top: '25%',
            width: '100px',
            height: '100px',
        }}
        animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
        }}
        transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
        }}
    >
        <svg viewBox="0 0 100 100">
            <motion.circle cx="50" cy="50" r="45" stroke="#1976d2" strokeWidth="2" fill="none" />
            <motion.circle cx="50" cy="50" r="30" stroke="#1976d2" strokeWidth="2" fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle cx="50" cy="5" r="5" fill="#1976d2" />
        </svg>
    </motion.div>
);

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

