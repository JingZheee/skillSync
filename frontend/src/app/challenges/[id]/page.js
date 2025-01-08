'use client';
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const steps = ['Overview', 'Instructions', 'Submission'];

export default function ChallengeDetailPage({ params }) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  
  // Mock challenge data - Replace with API call
  const challenge = {
    id: params.id,
    title: 'Build a REST API',
    difficulty: 'Medium',
    timeEstimate: '2 hours',
    points: 100,
    category: 'Technology',
    subCategory: 'Web Development',
    skills: ['Node.js', 'Express', 'MongoDB'],
    description: 'Create a RESTful API with Node.js and Express, including authentication and database integration.',
    completedBy: 156,
    objectives: [
      'Implement user authentication and authorization',
      'Create CRUD endpoints for resource management',
      'Integrate with MongoDB database',
      'Implement error handling and validation',
      'Add API documentation'
    ],
    requirements: [
      'Basic knowledge of JavaScript',
      'Understanding of HTTP protocols',
      'Familiarity with REST principles'
    ],
    resources: [
      {
        title: 'Node.js Documentation',
        url: 'https://nodejs.org/docs'
      },
      {
        title: 'Express.js Guide',
        url: 'https://expressjs.com/guide'
      }
    ],
    instructions: [
      'Set up a new Node.js project',
      'Install required dependencies',
      'Create server configuration',
      'Implement authentication middleware',
      'Create API routes and controllers',
      'Add database integration',
      'Test all endpoints',
      'Document your API'
    ],
    submissionGuidelines: [
      'Code should be well-documented',
      'Include README with setup instructions',
      'All tests should pass',
      'API documentation must be complete'
    ],
    evaluationCriteria: [
      'Code quality and organization',
      'Proper error handling',
      'Security implementation',
      'Documentation quality',
      'Test coverage'
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  const handleStart = () => {
    router.push(`/challenges/${params.id}/workspace`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Navigation */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ alignSelf: 'flex-start' }}
        >
          Back to Challenges
        </Button>

        {/* Header */}
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={challenge.difficulty} 
                color={getDifficultyColor(challenge.difficulty)}
                size="small"
              />
              <Chip 
                label={challenge.subCategory}
                variant="outlined"
                size="small"
              />
            </Box>

            <Typography variant="h4">
              {challenge.title}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {challenge.description}
            </Typography>

            <Stack direction="row" spacing={3} alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon color="action" />
                <Typography>{challenge.timeEstimate}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon color="action" />
                <Typography>{challenge.points} points</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GroupIcon color="action" />
                <Typography>{challenge.completedBy} completed</Typography>
              </Box>
            </Stack>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {challenge.skills.map((skill) => (
                <Chip 
                  key={skill}
                  label={skill}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Stack>
        </Paper>

        {/* Content */}
        <Box>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Stack spacing={4}>
            {activeStep === 0 && (
              <>
                {/* Objectives */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Learning Objectives
                    </Typography>
                    <List>
                      {challenge.objectives.map((objective, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={objective} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Prerequisites
                    </Typography>
                    <List>
                      {challenge.requirements.map((req, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={req} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>

                {/* Resources */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Helpful Resources
                    </Typography>
                    <List>
                      {challenge.resources.map((resource, index) => (
                        <ListItem key={index}>
                          <ListItemText 
                            primary={
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: 'inherit', textDecoration: 'none' }}
                              >
                                {resource.title}
                              </a>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </>
            )}

            {activeStep === 1 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Step-by-Step Instructions
                  </Typography>
                  <List>
                    {challenge.instructions.map((instruction, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {index + 1}.
                        </ListItemIcon>
                        <ListItemText primary={instruction} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}

            {activeStep === 2 && (
              <>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Submission Guidelines
                    </Typography>
                    <List>
                      {challenge.submissionGuidelines.map((guideline, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={guideline} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Evaluation Criteria
                    </Typography>
                    <List>
                      {challenge.evaluationCriteria.map((criteria, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <EmojiEventsIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={criteria} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </>
            )}
          </Stack>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={handleStart}
              >
                Start Challenge
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setActiveStep((prev) => prev + 1)}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
} 