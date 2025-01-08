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
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CodeIcon from '@mui/icons-material/Code';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useRouter } from 'next/navigation';

// New array-based data structure
const mockCourses = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    subCategory: 'Web Development',
    description: 'Master modern web development with MERN stack. Build real-world projects from scratch to deployment.',
    rating: 4.8,
    enrolledCount: 156,
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    title: 'Python for Data Science',
    subCategory: 'Data Science',
    description: 'Learn Python programming for data analysis, visualization, and machine learning.',
    rating: 4.7,
    enrolledCount: 80,
    skills: ['Python', 'Data Analysis', 'Machine Learning']
  },
];

const mockChallenges = [
  {
    id: 1,
    title: 'Build a REST API',
    difficulty: 'Medium',
    category: 'Web Development',
    description: 'Create a RESTful API with Node.js and Express, including authentication and database integration.',
    timeEstimate: '2 hours',
    points: 100,
    skills: ['Node.js', 'Express', 'MongoDB']
  },
  {
    id: 2,
    title: 'React State Management',
    difficulty: 'Hard',
    category: 'Web Development',
    description: 'Implement complex state management in a React application using Redux and middleware.',
    timeEstimate: '3 hours',
    points: 150,
    skills: ['React', 'Redux', 'JavaScript']
  }
];

const mockHackathons = [
  {
    id: 1,
    title: 'AI Innovation Challenge',
    category: 'AI/ML',
    subCategory: 'Innovation',
    description: 'Create innovative AI solutions for real-world problems using cutting-edge technologies.',
    startDate: 'Jan 31, 2025',
    endDate: 'Feb 1, 2025',
    location: 'Online',
    skills: ['Machine Learning', 'Python', 'Deep Learning'],
    participants: 120,
    prizePool: '$5000'
  },
  {
    id: 2,
    title: 'Green Tech Hackathon',
    category: 'Sustainability',
    subCategory: 'Technology',
    description: 'Develop sustainable technology solutions to address environmental challenges.',
    startDate: 'Feb 15, 2025',
    endDate: 'Feb 16, 2025',
    location: 'Online',
    skills: ['IoT', 'Data Analysis', 'Web Development'],
    participants: 85,
    prizePool: '$3000'
  }
];

export default function Homepage() {
  const steps = [
    'Introduction to Programming',
    'Web Development Basics',
    'Database Fundamentals',
    'Advanced Programming',
    'Final Project'
  ];

  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: 'calc(100vh - 64px)', py: 4 }}>
        {/* Roadmap Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
            Personalized Learning Roadmap
          </Typography>

          <Box sx={{ width: '100%', mt: 4 }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Paper>

        {/* Explore Section */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
            Explore Learning Opportunities
          </Typography>

          <Grid container spacing={4}>
            {/* Courses Card */}
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Courses
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Popular courses:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {mockCourses.map((course) => (
                      <Paper 
                        key={course.id}
                        elevation={0}
                        sx={{ 
                          p: 2, 
                          mb: 2,
                          border: '1px solid #e0e0e0',
                          borderRadius: 2,
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          {course.title}
                        </Typography>
                        
                        <Chip 
                          label={course.subCategory}
                          variant="outlined"
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {course.description}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: 'grey' }} />
                            <Typography variant="body2" color="text.secondary">
                              {course.rating}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <SchoolIcon sx={{ color: 'grey' }} />
                            <Typography variant="body2" color="text.secondary">
                              {course.enrolledCount} enrolled
                            </Typography>
                          </Box>
                        </Stack>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {course.skills.map((skill) => (
                            <Chip 
                              key={skill}
                              label={skill}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>

                        <Button 
                          variant="contained" 
                          fullWidth
                          startIcon={<SchoolIcon />}
                          onClick={() => router.push(`/course/${course.id}`)}
                          sx={{
                            bgcolor: 'orange',
                            '&:hover': {
                              bgcolor: 'darkorange',
                            }
                          }}
                        >
                          View Course
                        </Button>
                      </Paper>
                    ))}
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
              <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Mini Challenges
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Popular challenges:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {mockChallenges.map((challenge) => (
                      <Paper 
                        key={challenge.id}
                        elevation={0}
                        sx={{ 
                          p: 2, 
                          mb: 2,
                          border: '1px solid #e0e0e0',
                          borderRadius: 2,
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                        }}
                      >
                        <Box sx={{ mb: 2 }}>
                          <Chip 
                            label={challenge.difficulty} 
                            color={challenge.difficulty === 'Easy' ? 'success' : challenge.difficulty === 'Medium' ? 'warning' : 'error'}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label={challenge.category}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                        
                        <Typography variant="h6" gutterBottom>
                          {challenge.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {challenge.description}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {challenge.timeEstimate}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {challenge.points} pts
                            </Typography>
                          </Box>
                        </Stack>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {challenge.skills.map((skill) => (
                            <Chip 
                              key={skill}
                              label={skill}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>

                        <Button 
                          variant="contained" 
                          fullWidth
                          startIcon={<CodeIcon />}
                          onClick={() => router.push(`/challenges/${challenge.id}`)}
                          sx={{
                            bgcolor: 'orange',
                            '&:hover': {
                              bgcolor: 'darkorange',
                            }
                          }}
                        >
                          View Challenge
                        </Button>
                      </Paper>
                    ))}
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
              <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Hackathons
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Upcoming events:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {mockHackathons.map((hackathon) => (
                      <Paper 
                        key={hackathon.id}
                        elevation={0}
                        sx={{ 
                          p: 2, 
                          mb: 2,
                          border: '1px solid #e0e0e0',
                          borderRadius: 2,
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          {hackathon.title}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                          <Chip 
                            label={hackathon.category}
                            color="primary"
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label={hackathon.subCategory}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {hackathon.description}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {hackathon.startDate} - {hackathon.endDate}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <GroupsIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {hackathon.participants} participants
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationOnIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {hackathon.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <EmojiEventsIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {hackathon.prizePool}
                            </Typography>
                          </Box>
                        </Stack>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {hackathon.skills.map((skill) => (
                            <Chip 
                              key={skill}
                              label={skill}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>

                        <Button 
                          variant="contained" 
                          fullWidth
                          startIcon={<RocketLaunchIcon />}
                          sx={{
                            bgcolor: 'orange',
                            '&:hover': {
                              bgcolor: 'darkorange',
                            }
                          }}
                        >
                          View Hackathon
                        </Button>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
                  <Button size="small" color="primary">
                    View All Hackathons
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}
