'use client';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    Stack,
    Menu,
    MenuItem,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

export default function Homepage() {
    const theme = useTheme();

    // State for managing dropdown menus
    const [coursesAnchor, setCoursesAnchor] = useState(null);
    const [challengesAnchor, setChallengesAnchor] = useState(null);
    const [profileAnchor, setProfileAnchor] = useState(null);

    // Handle menu opens
    const handleCoursesClick = (event) => setCoursesAnchor(event.currentTarget);
    const handleChallengesClick = (event) => setChallengesAnchor(event.currentTarget);
    const handleProfileClick = (event) => setProfileAnchor(event.currentTarget);

    // Handle menu closes
    const handleCoursesClose = () => setCoursesAnchor(null);
    const handleChallengesClose = () => setChallengesAnchor(null);
    const handleProfileClose = () => setProfileAnchor(null);

  // Roadmap steps
    const steps = [
    'Introduction to Programming',
    'Web Development Basics',
    'Database Fundamentals',
    'Advanced Programming',
    'Final Project'
    ];

return (
    <>
    <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
        <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
            fontWeight: 'bold',
            flexBasis: '200px'
            }}
        >
            SkillSync
        </Typography>

        <Stack 
            direction="row" 
            spacing={2}
            sx={{ 
            flexGrow: 1,
            justifyContent: 'center'
            }}
        >
            <Button 
            color="inherit"
            onClick={handleCoursesClick}
            >
            Courses
            </Button>
            <Menu
            anchorEl={coursesAnchor}
            open={Boolean(coursesAnchor)}
            onClose={handleCoursesClose}
            >
            <MenuItem onClick={handleCoursesClose}>Accounting</MenuItem>
            <MenuItem onClick={handleCoursesClose}>Computing</MenuItem>
            <MenuItem onClick={handleCoursesClose}>Engineering</MenuItem>
            <MenuItem onClick={handleCoursesClose}>Business</MenuItem>
            </Menu>

            <Button 
            color="inherit"
            onClick={handleChallengesClick}
            >
            Mini Challenges
            </Button>
            <Menu
            anchorEl={challengesAnchor}
            open={Boolean(challengesAnchor)}
            onClose={handleChallengesClose}
            >
            <MenuItem onClick={handleChallengesClose}>Easy</MenuItem>
            <MenuItem onClick={handleChallengesClose}>Medium</MenuItem>
            <MenuItem onClick={handleChallengesClose}>Hard</MenuItem>
            </Menu>

            <Button color="inherit">Hackathon</Button>
        </Stack>

        <Stack 
            direction="row" 
            spacing={2}
            sx={{ 
            flexBasis: '200px',
            justifyContent: 'flex-end'
            }}
        >
            <Button 
            color="inherit"
            sx={{
                '& .MuiChip-root': {
                ml: 1,
                bgcolor: '#CD7F32',
                color: 'white'
                }
            }}
            >
            Ranking
            <Chip 
                label="Bronze" 
                size="small"
            />
            </Button>
            <Button 
            color="inherit"
            onClick={handleProfileClick}
            startIcon={<AccountCircleSharpIcon />}
            >
            Profile
            </Button>
            <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={handleProfileClose}
            >
            <MenuItem onClick={handleProfileClose}>John Doe</MenuItem>
            <MenuItem onClick={handleProfileClose}>Sign Out</MenuItem>
            </Menu>
        </Stack>
        </Toolbar>
    </AppBar>

    <Container maxWidth="lg">
        <Box sx={{ minHeight: 'calc(100vh - 64px)', py: 4 }}>
        {/* Roadmap Section */}
        <Paper 
            elevation={3} 
            sx={{ 
            p: 4,
            mb: 4,
            borderRadius: 2
            }}
        >
            <Typography 
            variant="h4" 
            sx={{ 
                mb: 4,
                fontWeight: 'bold',
                textAlign: 'center'
            }}
            >
            Personalized Learning Roadmap
            </Typography>

            <Box sx={{ width: '100%', mt: 4 }}>
            <Stepper 
                activeStep={1} 
                alternativeLabel
                sx={{
                '& .MuiStepLabel-root': {
                    '& .MuiStepLabel-label': {
                    mt: 1,
                    fontSize: '1rem'
                    }
                }
                }}
            >
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            </Box>
        </Paper>

        {/* Explore Section */}
        <Paper 
            elevation={3} 
            sx={{ 
            p: 4,
            borderRadius: 2
            }}
        >
            <Typography 
            variant="h4" 
            sx={{ 
                mb: 4,
                fontWeight: 'bold',
                textAlign: 'center'
            }}
            >
            Explore
            </Typography>

            <Grid container spacing={4}>
            {/* Courses Card */}
            <Grid item xs={12} md={4}>
                <Card 
                elevation={2}
                sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                    transform: 'scale(1.02)'
                    }
                }}
                >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom>
                    Courses
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                    Recommended for you:
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 2, 
                            mb: 2,
                            border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                        }}
                    >
                    <Typography 
                        variant="h6" 
                        gutterBottom
                    >
                        Introduction to Web Development
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        Computing
                        </Button>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        Web Dev
                        </Button>
                        </Stack>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Learn the basics of web development
                    </Typography>
                    <Button size="small" color="primary">
                        View Details
                    </Button>
                    </Paper>
                    
                    <Paper 
                    elevation={0}
                    sx={{ 
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                    }}
                    >
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Python Programming Basics
                        </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        Computing
                        </Button>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        Programming
                        </Button>
                    </Stack>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Master Python fundamentals
                    </Typography>
                    <Button 
                        size="small" 
                        sx={{ 
                        color: 'orange',
                        '&:hover': {
                            bgcolor: 'rgba(255, 165, 0, 0.04)'
                        }
                        }}
                    >
                        View Details
                    </Button>
                    </Paper>
                </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
                <Button size="small" color="primary">
                    View All Courses
                </Button>
                </CardActions>
            </Card>
            </Grid>

            {/* Mini Challenges Card */}
            <Grid item xs={12} md={4}>
            <Card 
                elevation={2}
                sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)'
                }
                }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                    Mini Challenges
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                    Popular challenges:
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 2, 
                            mb: 2,
                            border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                        }}
                    >
                    <Typography 
                        variant="h6" 
                        gutterBottom
                    >
                        Algorithm Puzzle
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Button 
                        variant="contained" 
                        color="success" 
                        size="small"
                        sx={{ minWidth: '30px' }}
                        >
                        Easy
                        </Button>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        DSA
                        </Button>
                    </Stack>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Solve basic algorithmic challenges using efficient data structures
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Jan. 31, 2025 - Feb. 1, 2025
                    </Typography>
                    <Button size="small" color="primary">
                        View Details
                    </Button>
                    </Paper>
                    
                    <Paper 
                    elevation={0}
                    sx={{ 
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                    }}
                    >
                    <Typography 
                        variant="h6" 
                        gutterBottom
                    >
                        Code Debugging
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Button 
                        variant="contained" 
                        color="warning" 
                        size="small"
                        sx={{ minWidth: '20px' }}
                        >
                        Medium
                        </Button>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        Programming
                        </Button>
                    </Stack>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Debug and fix issues in complex code scenarios
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Jan. 31, 2025 - Feb. 1, 2025
                    </Typography>
                    <Button size="small" color="primary">
                        View Details
                    </Button>
                    </Paper>
                </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
                <Button size="small" color="primary">
                    View All Challenges
                </Button>
                </CardActions>
            </Card>
            </Grid>

            {/* Hackathon Card */}
            <Grid item xs={12} md={4}>
            <Card 
                elevation={2}
                sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)'
                }
                }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                    Hackathon
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                    Upcoming events:
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 2, 
                            mb: 2,
                            border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                        }}
                    >
                    <Typography 
                        variant="h6" 
                        gutterBottom
                    >
                        AI Innovation Challenge
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        AI/ML
                        </Button>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        Innovation
                        </Button>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Jan. 31, 2025 - Feb. 1, 2025
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Online
                    </Typography>
                    <Button size="small" color="primary">
                        View Details
                    </Button>
                    </Paper>
                    
                    <Paper 
                    elevation={0}
                    sx={{ 
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                    }}
                    >
                    <Typography variant="h6" gutterBottom>
                        Green Tech Hackathon
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Develop sustainable technology solutions
                    </Typography>
                    <Button size="small" color="primary">
                        View Details
                    </Button>
                    </Paper>
                </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
                <Button size="small" color="primary">
                    View All Events
                </Button>
                </CardActions>
            </Card>
            </Grid>
        </Grid>
        </Paper>
    </Box>
    </Container>
</>
);
}
