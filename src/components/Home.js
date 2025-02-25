import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import BookIcon from '@mui/icons-material/Book';
import Calendar from './Calendar';

const Home = () => {
    console.log("Home component rendered"); // Debugging statement
    return (
        <div style={{ padding: '20px', backgroundColor: '#121212', color: '#f7dba7ff' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Dashboard Overview
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card className="card">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Academic Performance
                            </Typography>
                            {/* Add a graph or statistics here */}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className="card">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Upcoming Deadlines
                            </Typography>
                            <Calendar />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className="card">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Announcements & News
                            </Typography>
                            {/* Add announcements here */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '80px' }}>
                <Typography variant="h2" style={{ fontWeight: 'bold', color: '#ffcc00' }}>
                    Welcome to Your Student Dashboard
                </Typography>
                <Typography variant="h5" style={{ margin: '20px 0' }}>
                    Your personalized learning experience starts here!
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Explore Resources
                </Button>
            </div>

            {/* Dashboard Features Section */}
            <Typography variant="h4" align="center" gutterBottom>
                Dashboard Features
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card className="card">
                        <CardContent>
                            <AssignmentIcon style={{ fontSize: '40px', color: '#ffcc00' }} />
                            <Typography variant="h5" gutterBottom>
                                Upcoming Assignments
                            </Typography>
                            <ul>
                                <li>Math Homework - Due: 2023-10-10</li>
                                <li>Science Project - Due: 2023-10-15</li>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className="card">
                        <CardContent>
                            <GradeIcon style={{ fontSize: '40px', color: '#ffcc00' }} />
                            <Typography variant="h5" gutterBottom>
                                Grades Overview
                            </Typography>
                            <ul>
                                <li>Math: A</li>
                                <li>Science: B+</li>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className="card">
                        <CardContent>
                            <BookIcon style={{ fontSize: '40px', color: '#ffcc00' }} />
                            <Typography variant="h5" gutterBottom>
                                Learning Resources
                            </Typography>
                            <ul>
                                <li><a href="#" style={{ color: '#f7dba7ff' }}>Math Study Guide</a></li>
                                <li><a href="#" style={{ color: '#f7dba7ff' }}>Science Video Lectures</a></li>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Call to Action */}
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
                <Typography variant="h5">
                    Ready to take control of your learning journey?
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Get Started
                </Button>
            </div>
        </div>
    );
};

export default Home;
