import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  Create as CreateIcon,
  AutoFixHigh as AutoFixHighIcon,
  Book,
  Star,
  Computer,
} from '@mui/icons-material';
import QuickStats from '../common/QuickStats';
import gsap from 'gsap';

const StatCard = ({ icon, count, title, description, color }) => (
  <Card sx={{ 
    height: '100%',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    }
  }}>
    <CardContent>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1
      }}>
        <Box sx={{ 
          p: 1,
          borderRadius: '50%',
          backgroundColor: `${color}15`
        }}>
          {React.cloneElement(icon, { sx: { color: color } })}
        </Box>
        <Typography variant="h3" sx={{ color: color, fontWeight: 'bold' }}>
          {count}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const QuickAccessCard = ({ icon, title, description, color, onClick }) => (
  <Card 
    onClick={onClick}
    sx={{ 
      cursor: 'pointer',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      '&:hover': {
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transform: 'translateY(-2px)',
        transition: 'all 0.3s ease'
      }
    }}
  >
    <CardContent>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1
      }}>
        <Box sx={{ 
          p: 1,
          borderRadius: '50%',
          backgroundColor: `${color}15`
        }}>
          {React.cloneElement(icon, { sx: { color: color } })}
        </Box>
        <Typography variant="h6" sx={{ color: color }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const navigate = useNavigate();

  // Refs for animations
  const quickStatsRef = useRef(null);
  const quickAccessRef = useRef(null);
  const recentActivityRef = useRef(null);
  const statsCardsRef = useRef([]);
  const accessCardsRef = useRef([]);
  const activityItemsRef = useRef([]);

  const stats = [
    {
      icon: <DescriptionIcon />,
      count: "15",
      title: "Papers Pending",
      description: "Answer sheets awaiting evaluation",
      color: "#1976d2"
    },
    {
      icon: <SchoolIcon />,
      count: "4",
      title: "Upcoming Classes",
      description: "Classes scheduled for today",
      color: "#2e7d32"
    },
    {
      icon: <AssignmentIcon />,
      count: "23",
      title: "Homework to Check",
      description: "Assignments pending review",
      color: "#ed6c02"
    },
    {
      icon: <NotificationsIcon />,
      count: "7",
      title: "New Notifications",
      description: "Unread system notifications",
      color: "#9c27b0"
    }
  ];

  const quickAccess = [
    {
      icon: <DashboardIcon />,
      title: "Dashboard",
      description: "Access dashboard features and tools",
      color: "#1976d2",
      path: "/dashboard"
    },
    {
      icon: <DescriptionIcon />,
      title: "Paper Evaluation",
      description: "Access paper evaluation features and tools",
      color: "#ff9800",
      path: "/paper-evaluation"
    },
    {
      icon: <CreateIcon />,
      title: "Question Paper Generation",
      description: "Access question paper generation features and tools",
      color: "#9c27b0",
      path: "/question-paper-generation"
    },
    {
      icon: <SchoolIcon />,
      title: "Synopsis for Teachers",
      description: "Access synopsis for teachers features and tools",
      color: "#2e7d32",
      path: "/synopsis-for-teachers"
    },
    {
      icon: <AssignmentIcon />,
      title: "Homework Correction",
      description: "Access homework correction features and tools",
      color: "#00bcd4",
      path: "/homework-correction"
    },
    {
      icon: <AutoFixHighIcon />,
      title: "AI-Driven Lesson Planning",
      description: "Access ai-driven lesson planning features and tools",
      color: "#f44336",
      path: "/ai-lesson-planning"
    }
  ];

  useEffect(() => {
    // Main timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Quick Stats Animation
    tl.fromTo(".section-title",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    // Stats Cards Animation
    tl.fromTo(statsCardsRef.current,
      { 
        opacity: 0,
        y: 20,
        scale: 0.95
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1
      },
      "-=0.3"
    );

    // Quick Access Cards Animation
    tl.fromTo(accessCardsRef.current,
      { 
        opacity: 0,
        y: 20
      },
      { 
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1
      },
      "-=0.2"
    );

    // Recent Activity Items Animation
    tl.fromTo(activityItemsRef.current,
      { 
        opacity: 0,
        x: -20
      },
      { 
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.1
      },
      "-=0.2"
    );

    // Add hover animations for cards
    statsCardsRef.current.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
          duration: 0.3
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
          duration: 0.3
        });
      });
    });

    accessCardsRef.current.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3
        });
      });
    });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <QuickStats />
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            ref={el => statsCardsRef.current[0] = el}
            sx={{
              p: 2,
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <StatCard {...stats[0]} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            ref={el => statsCardsRef.current[1] = el}
            sx={{
              p: 2,
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <StatCard {...stats[1]} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            ref={el => statsCardsRef.current[2] = el}
            sx={{
              p: 2,
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <StatCard {...stats[2]} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            ref={el => statsCardsRef.current[3] = el}
            sx={{
              p: 2,
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <StatCard {...stats[3]} />
          </Paper>
        </Grid>
      </Grid>

      <Typography className="section-title" variant="h6" sx={{ mt: 4, mb: 2 }}>
        Quick Access
      </Typography>

      <Grid container spacing={3} ref={quickAccessRef}>
        {quickAccess.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              ref={el => accessCardsRef.current[index] = el}
              sx={{
                p: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <QuickAccessCard 
                {...item} 
                onClick={() => navigate(item.path)}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography className="section-title" variant="h6" sx={{ mt: 4, mb: 2 }}>
        Recent Activity
      </Typography>

      <Paper sx={{ p: 2 }} ref={recentActivityRef}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CreateIcon sx={{ color: '#9c27b0' }} />
            <Box>
              <Typography variant="subtitle1">Question paper generated</Typography>
              <Typography variant="body2" color="text.secondary">
                Mathematics • 2024-03-15
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AssignmentIcon sx={{ color: '#1976d2' }} />
            <Box>
              <Typography variant="subtitle1">Homework corrected</Typography>
              <Typography variant="body2" color="text.secondary">
                Class 10/Physics • 2024-03-14
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AutoFixHighIcon sx={{ color: '#f44336' }} />
            <Box>
              <Typography variant="subtitle1">Lesson plan created</Typography>
              <Typography variant="body2" color="text.secondary">
                Chemistry • 2024-03-14
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard; 