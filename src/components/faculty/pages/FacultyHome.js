import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { 
    Box, 
    Typography, 
    IconButton, 
    Badge,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Paper,
    useMediaQuery,
    useTheme,
    Container,
    Tooltip,
    Zoom,
    Link,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Switch,
    AppBar,
    Toolbar,
    Card,
    CardContent,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home as HomeIcon,
    Description as PaperIcon,
    QuestionAnswer as QuestionIcon,
    School as SchoolIcon,
    Assignment as HomeworkIcon,
    Book as LessonIcon,
    Chat as ChatIcon,
    Menu as MenuIcon,
    Notifications as NotificationIcon,
    Person as PersonIcon,
    Support as SupportIcon,
    Info as InfoIcon,
    Close as CloseIcon,
    Settings as SettingsIcon,
    Help as HelpIcon,
    Logout as LogoutIcon,
    Dashboard as DashboardIcon,
    Assignment as AssignmentIcon,
    AutoStories as AutoStoriesIcon,
    Timeline,
    Assessment,
    Schedule,
    MenuBook,
    Science,
    Psychology,
    Lightbulb,
    Calculate,
    LocalLibrary,
    Functions,
    Architecture,
    Biotech,
    AssignmentOutlined,
    NotificationsOutlined,
    BookOutlined,
    Create,
    Grade,
    People,
    AutoAwesome as AIIcon,
    Description as SynapsisIcon,
} from '@mui/icons-material';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import schoolLogo from '../../../images/school-logo1.png';
import QuickStats from '../dashboard/QuickStats';
import AIAssistant from '../../common/AIAssistant';
import QuickAccess from '../dashboard/QuickAccess';
import RecentActivity from '../dashboard/RecentActivity';

// Theme Configuration
const themeColors = {
    primary: {
        main: '#1E88E5', // Professional blue
        light: '#64B5F6',
        dark: '#1565C0',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#43A047', // Educational green
        light: '#76D275',
        dark: '#2E7D32',
        contrastText: '#FFFFFF'
    },
    accent: {
        orange: '#FB8C00',
        purple: '#8E24AA',
        red: '#E53935',
        teal: '#00897B'
    },
    background: {
        default: '#F5F7FA',
        paper: '#FFFFFF',
        gradient: 'linear-gradient(135deg, #F5F7FA 0%, #E4E9F2 100%)'
    },
    text: {
        primary: '#2C3E50',
        secondary: '#546E7A'
    }
};

// Single StyledCard definition
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing(2),
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    }
}));

const IconBox = styled(Box)(({ color }) => ({
    backgroundColor: `${color}15`,
    borderRadius: '50%',
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
}));

const StatCard = ({ icon, count, label, description, color }) => (
    <StyledCard>
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <IconBox color={color}>
                {React.cloneElement(icon, { sx: { color: color } })}
            </IconBox>
            <Typography variant="h4" sx={{ color: color, fontWeight: 'bold', mb: 1 }}>
                {count}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </CardContent>
    </StyledCard>
);

const QuickAccessCard = ({ icon, title, description, color }) => (
    <StyledCard>
        <CardContent sx={{ p: 3 }}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1
            }}>
                <IconBox color={color} sx={{ 
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: `${color}15`,
                    mb: 2
                }}>
                    {React.cloneElement(icon, { 
                        sx: { 
                            color: color,
                            fontSize: 28
                        } 
                    })}
                </IconBox>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        color: color,
                        fontWeight: 500,
                        mb: 1
                    }}
                >
                    {title}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                        opacity: 0.8,
                        lineHeight: 1.5
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </CardContent>
    </StyledCard>
);

// Navigation items with correct naming
const navItems = [
    { text: 'Dashboard (Home)', icon: <HomeIcon />, path: '/faculty-home', description: 'Overview of recent activity' },
    { text: 'Paper Evaluation', icon: <PaperIcon />, path: '/faculty-home/paper-evaluation', description: 'Evaluate student papers' },
    { text: 'Question Paper Generation', icon: <QuestionIcon />, path: '/faculty-home/question-generation', description: 'Generate question papers' },
    { text: 'Synapsis for Teachers', icon: <SchoolIcon />, path: '/faculty-home/synopsis', description: 'Teacher resources' },
    { text: 'Homework Correction', icon: <HomeworkIcon />, path: '/faculty-home/homework', description: 'Review homework' },
    { text: 'AI-Driven Lesson Planning', icon: <LessonIcon />, path: '/faculty-home/lesson-planning', description: 'Plan lessons with AI' },
    { text: 'AI-Assistant (Chatbot)', icon: <ChatIcon />, path: '/faculty/assistant', description: 'Get AI assistance' },
];

// Enhanced Header with Logo
const Header = ({ isMobile, onMenuClick, menuOpen }) => {
    return (
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
            {/* Top Bar with Logo */}
            <Box
                sx={{
                    height: 70,
                    background: 'linear-gradient(90deg, rgba(25,118,210,0.95) 0%, rgba(32,89,168,0.95) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    px: 3,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src={schoolLogo} alt="School Logo" style={{ height: 50 }} />
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            color: '#fff',
                            display: { xs: 'none', sm: 'block' },
                            fontWeight: 500
                        }}
                    >
                        Sanghamitra Vidyalayam
                    </Typography>
                </Box>
                
                {/* Right side icons */}
                <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                    <NotificationsButton />
                    <ProfileButton />
                </Box>
            </Box>

            {/* Menu Bar */}
            <motion.div
                initial={false}
                animate={{ height: isMobile && !menuOpen ? 0 : 50 }}
                transition={{ duration: 0.3 }}
            >
                <Box
                    sx={{
                        height: 50,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        px: 3,
                    }}
                >
                    <IconButton 
                        onClick={onMenuClick} 
                        sx={{ 
                            color: '#fff',
                            display: { xs: 'block', md: 'none' }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </motion.div>
        </Box>
    );
};

// Enhanced Sidebar with proper spacing and navigation
const Sidebar = styled(Drawer)(({ theme }) => ({
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        background: `linear-gradient(180deg, ${themeColors.primary.dark} 0%, ${themeColors.primary.main} 100%)`,
        color: themeColors.primary.contrastText,
        marginTop: 64, // Height of AppBar
        height: 'calc(100% - 64px)', // Subtract AppBar height
        '& .MuiListItem-root': {
            margin: '4px 8px',
            borderRadius: '8px',
            '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
            },
            '&.Mui-selected': {
                background: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                    background: 'rgba(255, 255, 255, 0.25)',
                },
            },
        },
    },
}));

// Recent Activity Card
const ActivityCard = styled(motion.div)(({ theme }) => ({
    padding: theme.spacing(2),
    background: 'white',
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

// Enhanced styled components with educational theme
const ContentWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: 64,
    marginLeft: theme.breakpoints.up('sm') ? 240 : 0,
    background: themeColors.background.gradient,
    minHeight: 'calc(100vh - 64px)',
}));

// Educational theme colors
const educationalColors = {
    primary: '#1565C0', // Deep Blue
    secondary: '#2E7D32', // Forest Green
    accent1: '#F57C00', // Orange
    accent2: '#7B1FA2', // Purple
    accent3: '#C62828', // Red
    accent4: '#00796B', // Teal
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { 
        opacity: 0, 
        y: 20 
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// Footer Component
const Footer = () => (
    <Box
        component={motion.footer}
        sx={{
            mt: 4,
            p: 3,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
        }}
    >
        <Typography variant="body2">
            © 2024 AI Tutor App | Version 1.0.0
        </Typography>
        <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            mt={2}
        >
            <Link href="#" sx={{ color: 'inherit' }}>Support</Link>
            <Link href="#" sx={{ color: 'inherit' }}>Privacy Policy</Link>
            <Link href="#" sx={{ color: 'inherit' }}>Terms of Service</Link>
        </Stack>
    </Box>
);

// FloatingAIAssistant Component
const FloatingAIAssistant = ({ show, onToggle }) => (
    <motion.div
        style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1300,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
    >
        <IconButton
            onClick={onToggle}
            sx={{
                width: 56,
                height: 56,
                backgroundColor: 'primary.main',
                color: '#fff',
                '&:hover': {
                    backgroundColor: 'primary.dark',
                },
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
        >
            <ChatIcon />
        </IconButton>
    </motion.div>
);

// NotificationsButton Component
const NotificationsButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const notifications = [
        { id: 1, text: 'New paper to evaluate', time: '2 mins ago' },
        { id: 2, text: 'Question paper generated', time: '1 hour ago' },
        { id: 3, text: 'Homework submission reminder', time: '2 hours ago' },
    ];

    return (
        <>
            <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ color: '#fff' }}
            >
                <Badge badgeContent={notifications.length} color="error">
                    <NotificationIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        width: 320,
                        maxHeight: 400,
                        overflow: 'auto',
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)',
                    }
                }}
            >
                {notifications.map((notification) => (
                    <MenuItem 
                        key={notification.id}
                        onClick={() => setAnchorEl(null)}
                    >
                        <Box sx={{ width: '100%' }}>
                            <Typography variant="body1">
                                {notification.text}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {notification.time}
                            </Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

// ProfileButton Component
const ProfileButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const menuItems = [
        { text: 'Profile Settings', icon: <PersonIcon /> },
        { text: 'Preferences', icon: <SettingsIcon /> },
        { text: 'Help & Support', icon: <HelpIcon /> },
        { text: 'Logout', icon: <LogoutIcon /> },
    ];

    return (
        <>
            <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ color: '#fff' }}
            >
                <Avatar sx={{ bgcolor: 'primary.dark' }}>
                    <PersonIcon />
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)',
                    }
                }}
            >
                {menuItems.map((item) => (
                    <MenuItem 
                        key={item.text}
                        onClick={() => setAnchorEl(null)}
                        sx={{ 
                            gap: 1,
                            minWidth: 200 
                        }}
                    >
                        {item.icon}
                        <Typography>{item.text}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

// Customizable Widget Card Component
const WidgetCard = ({ feature, onRemove, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Paper
                sx={{
                    p: 3,
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover .remove-button': {
                        opacity: 1,
                    },
                }}
                onClick={onClick}
            >
                {/* Remove Widget Button */}
                <IconButton
                    className="remove-button"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '&:hover': {
                            bgcolor: 'rgba(255,0,0,0.2)',
                        },
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(feature.id);
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: 'primary.main',
                        }}
                    >
                        {feature.icon}
                    </Avatar>
                    <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
                        {feature.text}
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {feature.description}
                    </Typography>
                </Box>
            </Paper>
        </motion.div>
    );
};

// Widget Management Dialog
const WidgetManagementDialog = ({ open, onClose, availableWidgets, activeWidgets, onWidgetToggle }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Customize Dashboard Widgets</DialogTitle>
            <DialogContent>
                <List>
                    {availableWidgets.map((widget) => (
                        <ListItem key={widget.id}>
                            <ListItemIcon>{widget.icon}</ListItemIcon>
                            <ListItemText primary={widget.text} secondary={widget.description} />
                            <Switch
                                checked={activeWidgets.some(w => w.id === widget.id)}
                                onChange={() => onWidgetToggle(widget)}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Done</Button>
            </DialogActions>
        </Dialog>
    );
};

// Define default features
const defaultFeatures = [
    { 
        id: 'paper-eval', 
        text: 'Paper Evaluation', 
        icon: <PaperIcon />, 
        path: '/paper-evaluation',
        description: 'Evaluate student papers',
        color: '#4CAF50'
    },
    { 
        id: 'question-gen', 
        text: 'Question Paper Generation', 
        icon: <QuestionIcon />, 
        path: '/question-generation',
        description: 'Generate question papers',
        color: '#2196F3'
    },
    { 
        id: 'synapsis', 
        text: 'Synapsis for Teachers', 
        icon: <SchoolIcon />, 
        path: '/synapsis',
        description: 'Teacher resources',
        color: '#9C27B0'
    },
    { 
        id: 'homework', 
        text: 'Homework Correction', 
        icon: <HomeworkIcon />, 
        path: '/homework',
        description: 'Review homework',
        color: '#FF9800'
    },
    { 
        id: 'lesson-plan', 
        text: 'AI-Driven Lesson Planning', 
        icon: <LessonIcon />, 
        path: '/lesson-planning',
        description: 'Plan lessons with AI',
        color: '#E91E63'
    },
    { 
        id: 'ai-assistant', 
        text: 'AI-Assistant', 
        icon: <ChatIcon />, 
        path: '/ai-assistant',
        description: 'Get AI assistance',
        color: '#00BCD4'
    }
];

// SidebarContent Component
const SidebarContent = ({ features, onFeatureClick }) => {
    return (
        <Box sx={{ pt: 8 }}>
            <List>
                {features.map((feature) => (
                    <ListItem
                        key={feature.id}
                        button
                        onClick={() => onFeatureClick(feature.path)}
                        sx={{
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.1)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: feature.color }}>
                            {feature.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={feature.text}
                            secondary={feature.description}
                            secondaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

// Component Definitions
const IconWrapper = ({ color, children }) => (
    <IconBox color={color}>
        {children}
    </IconBox>
);

// Update FacultyHome component to include menuOpen state
const FacultyHome = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showAIChat, setShowAIChat] = useState(false);
    const [showWidgetDialog, setShowWidgetDialog] = useState(false);
    const [activeWidgets, setActiveWidgets] = useState(() => {
        const saved = localStorage.getItem('activeWidgets');
        return saved ? JSON.parse(saved) : defaultFeatures;
    });
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleWidgetToggle = (widget) => {
        setActiveWidgets(current => {
            const isActive = current.some(w => w.id === widget.id);
            const newWidgets = isActive 
                ? current.filter(w => w.id !== widget.id)
                : [...current, widget];
            localStorage.setItem('activeWidgets', JSON.stringify(newWidgets));
            return newWidgets;
        });
    };

    const handleFeatureClick = (path) => {
        navigate(path);
    };

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    // Navigation Routes
    const menuItems = [
        { 
            title: 'Dashboard', 
            icon: <DashboardIcon />, 
            path: '/',
            color: themeColors.primary.main 
        },
        { 
            title: 'Paper Evaluation', 
            icon: <AssignmentOutlined />, 
            path: '/paper-evaluation',
            color: themeColors.accent.orange 
        },
        { 
            title: 'Question Paper Generation', 
            icon: <Create />, 
            path: '/question-paper',
            color: themeColors.accent.purple 
        },
        { 
            title: 'Synapsis for Teachers', 
            icon: <SchoolIcon />, 
            path: '/synapsis',
            color: themeColors.secondary.main 
        },
        { 
            title: 'Homework Correction', 
            icon: <BookOutlined />, 
            path: '/homework',
            color: themeColors.accent.teal 
        },
        { 
            title: 'AI-Driven Lesson Planning', 
            icon: <Psychology />, 
            path: '/lesson-planning',
            color: themeColors.accent.red 
        },
    ];

    // Quick access features with navigation
    const quickAccess = menuItems.map(item => ({
        ...item,
        description: `Access ${item.title.toLowerCase()} features and tools`,
    }));

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const recentActivities = [
        { 
            icon: <QuestionIcon />, 
            title: "Question paper generated",
            subtitle: "Mathematics • 2024-03-15",
            color: '#9c27b0'
        },
        { 
            icon: <HomeworkIcon />, 
            title: "Homework corrected",
            subtitle: "Class 10/Physics • 2024-03-14",
            color: '#0288d1'
        },
        { 
            icon: <LessonIcon />, 
            title: "Lesson plan created",
            subtitle: "Chemistry • 2024-03-14",
            color: '#d32f2f'
        }
    ];

    const stats = [
        { 
            icon: <PaperIcon />, 
            count: "15", 
            label: "Papers Pending",
            description: "Answer sheets awaiting evaluation",
            color: '#1976d2',
            path: '/paper-evaluation'
        },
        { 
            icon: <SchoolIcon />, 
            count: "4", 
            label: "Upcoming Classes",
            description: "Classes scheduled for today",
            color: '#2e7d32',
            path: '/synapsis-for-teachers'
        },
        { 
            icon: <HomeworkIcon />, 
            count: "23", 
            label: "Homework to Check",
            description: "Assignments pending review",
            color: '#ed6c02',
            path: '/homework-correction'
        },
        { 
            icon: <NotificationIcon />, 
            count: "7", 
            label: "New Notifications",
            description: "Unread system notifications",
            color: '#9c27b0',
            path: '/notifications'
        }
    ];

    const features = [
        {
            title: 'Dashboard',
            description: 'Access dashboard features and tools',
            icon: <DashboardIcon />,
            path: '/faculty-home',
            color: '#1976d2'  // blue
        },
        {
            title: 'Paper Evaluation',
            description: 'Access paper evaluation features and tools',
            icon: <PaperIcon />,
            path: '/paper-evaluation',
            color: '#ff9800'  // orange
        },
        {
            title: 'Question Paper Generation',
            description: 'Access question paper generation features and tools',
            icon: <QuestionIcon />,
            path: '/question-paper-generation',
            color: '#9c27b0'  // purple
        },
        {
            title: 'Synapsis for Teachers',
            description: 'Access synapsis for teachers features and tools',
            icon: <SynapsisIcon />,
            path: '/synapsis-for-teachers',
            color: '#4caf50'  // green
        },
        {
            title: 'Homework Correction',
            description: 'Access homework correction features and tools',
            icon: <HomeworkIcon />,
            path: '/homework-correction',
            color: '#00bcd4'  // cyan
        },
        {
            title: 'AI-Driven Lesson Planning',
            description: 'Access ai-driven lesson planning features and tools',
            icon: <LessonIcon />,
            path: '/ai-lesson-planning',
            color: '#f44336'  // red
        }
    ];

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <Box sx={{ width: '100%' }}>
                <QuickStats />
                <Box sx={{ mt: 4 }}>
                    <QuickAccess />
                </Box>
                <Box sx={{ mt: 4 }}>
                    <RecentActivity />
                </Box>
            </Box>
        </Container>
    );
};

export default FacultyHome;
