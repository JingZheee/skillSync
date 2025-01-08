'use client';
import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import CodeIcon from '@mui/icons-material/Code';
import { useRouter } from 'next/navigation';
import FilterSection from '@/components/FilterSection';
import ApiService from "@/api/apiService";
import { API } from "@/api/endpoints";

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'success';
    case 'medium':
      return 'warning';
    case 'hard':
      return 'error';
    default:
      return 'default';
  }
};


const mockChallenges = {
  Technology: [
    {
      id: 1,
      title: 'Build a REST API',
      difficulty: 'Medium',
      timeEstimate: '2 hours',
      points: 100,
      subCategory: 'Web Development',
      skills: ['Node.js', 'Express', 'MongoDB'],
      role: 'Backend Developer',
      description: 'Create a RESTful API with Node.js and Express, including authentication and database integration.',
      completedBy: 156,
    },
    {
      id: 2,
      title: 'React State Management',
      difficulty: 'Hard',
      timeEstimate: '3 hours',
      points: 150,
      subCategory: 'Web Development',
      skills: ['React', 'Redux', 'JavaScript'],
      role: 'Frontend Developer',
      description: 'Implement complex state management in a React application using Redux and middleware.',
      completedBy: 89,
    },
    {
      id: 3,
      title: 'Cloud Infrastructure Setup',
      difficulty: 'Hard',
      timeEstimate: '4 hours',
      points: 200,
      subCategory: 'Cloud Computing',
      skills: ['AWS', 'Infrastructure as Code'],
      role: 'DevOps Engineer',
      description: 'Design and implement a scalable cloud infrastructure using AWS and Terraform.',
      completedBy: 45,
    },
  ],
  Business: [
    {
      id: 4,
      title: 'Market Analysis Report',
      difficulty: 'Medium',
      timeEstimate: '3 hours',
      points: 120,
      subCategory: 'Strategy',
      skills: ['Business Analysis', 'Market Research'],
      role: 'Business Analyst',
      description: 'Conduct a comprehensive market analysis and create a detailed report with recommendations.',
      completedBy: 78,
    },
    {
      id: 5,
      title: 'Business Process Optimization',
      difficulty: 'Hard',
      timeEstimate: '4 hours',
      points: 180,
      subCategory: 'Operations',
      skills: ['Process Improvement', 'Strategic Planning'],
      role: 'Operations Manager',
      description: 'Analyze and optimize a complex business process to improve efficiency and reduce costs.',
      completedBy: 34,
    },
  ],
  Finance: [
    {
      id: 6,
      title: 'Investment Portfolio Analysis',
      difficulty: 'Hard',
      timeEstimate: '3 hours',
      points: 160,
      subCategory: 'Investment',
      skills: ['Financial Analysis', 'Risk Assessment'],
      role: 'Financial Analyst',
      description: 'Analyze an investment portfolio and provide recommendations for optimization.',
      completedBy: 67,
    },
    {
      id: 7,
      title: 'Blockchain Smart Contract',
      difficulty: 'Medium',
      timeEstimate: '2 hours',
      points: 140,
      subCategory: 'FinTech',
      skills: ['Solidity', 'Blockchain'],
      role: 'FinTech Developer',
      description: 'Develop and deploy a smart contract on a blockchain network.',
      completedBy: 92,
    },
  ],
  Design: [
    {
      id: 8,
      title: 'Mobile App Redesign',
      difficulty: 'Medium',
      timeEstimate: '3 hours',
      points: 130,
      subCategory: 'UI/UX',
      skills: ['UI Design', 'User Research'],
      role: 'UI Designer',
      description: 'Redesign a mobile app interface focusing on user experience and modern design principles.',
      completedBy: 112,
    },
    {
      id: 9,
      title: 'Brand Identity System',
      difficulty: 'Hard',
      timeEstimate: '4 hours',
      points: 170,
      subCategory: 'Brand Design',
      skills: ['Brand Design', 'Typography'],
      role: 'Brand Designer',
      description: 'Create a comprehensive brand identity system including logo, typography, and guidelines.',
      completedBy: 56,
    },
  ],
  Marketing: [
    {
      id: 10,
      title: 'Social Media Campaign',
      difficulty: 'Medium',
      timeEstimate: '2 hours',
      points: 110,
      subCategory: 'Social Media',
      skills: ['Social Media Marketing', 'Content Strategy'],
      role: 'Social Media Manager',
      description: 'Plan and create a comprehensive social media campaign strategy.',
      completedBy: 145,
    },
    {
      id: 11,
      title: 'SEO Optimization Project',
      difficulty: 'Hard',
      timeEstimate: '3 hours',
      points: 150,
      subCategory: 'SEO',
      skills: ['SEO Optimization', 'Analytics'],
      role: 'SEO Specialist',
      description: 'Optimize a website for search engines and improve its ranking.',
      completedBy: 88,
    },
  ],
};

export default function ChallengesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState('Technology');
  const [filters, setFilters] = useState({
    searchQuery: '',
    subCategory: '',
    skill: '',
    difficulty: '',
  });

  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      const data = await ApiService.get(API.challenges.findAll);
      setChallenges(data);
      console.log(data);
    };
    fetchChallenges();
  }, []);

  const filteredChallenges = useMemo(() => {
    return mockChallenges[selectedCategory].filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesSubCategory = !filters.subCategory || challenge.subCategory === filters.subCategory;
      const matchesSkill = !filters.skill || challenge.skills.includes(filters.skill);
      const matchesDifficulty = !filters.difficulty || challenge.difficulty === filters.difficulty;

      return matchesSearch && matchesSubCategory && matchesSkill && matchesDifficulty;
    });
  }, [selectedCategory, filters]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FilterSection
        filters={filters}
        onFilterChange={setFilters}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        totalResults={filteredChallenges.length}
      />

      {/* Challenges Grid */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {filteredChallenges.map((challenge) => (
          <Grid item xs={12} sm={6} md={4} key={challenge.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
              onClick={() => router.push(`/challenges/${challenge.id}`)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={challenge.difficulty} 
                    color={getDifficultyColor(challenge.difficulty)}
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Chip 
                    label={challenge.subCategory}
                    variant="outlined"
                    size="small"
                    onClick={(e) => e.stopPropagation()}
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

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {challenge.skills.map((skill) => (
                    <Chip 
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ))}
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  startIcon={<CodeIcon />}
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/challenges/${challenge.id}`);
                  }}
                >
                  View Challenge
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 