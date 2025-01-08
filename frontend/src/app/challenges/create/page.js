'use client';
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';

const categories = {
  mainCategories: ['Technology', 'Business', 'Finance', 'Design', 'Marketing'],
  fields: ['Software Engineering', 'Business Analytics', 'Financial Technology', 'UX Design', 'Digital Marketing'],
  careerPaths: ['Software Developer', 'Business Analyst', 'Financial Analyst', 'UX Designer', 'Marketing Specialist'],
  difficulties: ['Easy', 'Medium', 'Hard']
};

const suggestedTags = [
  // Technology
  'javascript', 'python', 'react', 'api', 'database', 'cloud', 'security',
  // Business
  'strategy', 'analysis', 'management', 'operations', 'entrepreneurship',
  // Finance
  'investment', 'trading', 'blockchain', 'cryptocurrency', 'risk-management',
  // Design
  'ui-design', 'user-research', 'wireframing', 'prototyping',
  // Marketing
  'social-media', 'content-strategy', 'seo', 'analytics'
];

export default function CreateChallengePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mainCategory: '',
    field: '',
    careerPaths: [],
    difficulty: '',
    timeEstimate: '',
    points: '',
    tags: [],
    instructions: '',
    evaluation: '',
    resources: '',
    prerequisites: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.mainCategory) newErrors.mainCategory = 'Category is required';
    if (!formData.field) newErrors.field = 'Field is required';
    if (formData.careerPaths.length === 0) newErrors.careerPaths = 'At least one career path is required';
    if (!formData.difficulty) newErrors.difficulty = 'Difficulty level is required';
    if (!formData.timeEstimate) newErrors.timeEstimate = 'Time estimate is required';
    if (!formData.points) newErrors.points = 'Points value is required';
    if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required';
    if (!formData.evaluation.trim()) newErrors.evaluation = 'Evaluation criteria is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Here you would typically make an API call to create the challenge
      console.log('Submitting challenge:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle success (redirect or show success message)
      alert('Challenge created successfully!');
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Create New Challenge
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Basic Information */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Challenge Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title || 'Enter a clear, descriptive title'}
                  fullWidth
                  required
                />

                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description || 'Provide a brief overview of the challenge'}
                  multiline
                  rows={3}
                  fullWidth
                  required
                />
              </Stack>
            </Box>

            {/* Category and Field */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Classification
              </Typography>
              <Stack spacing={2}>
                <FormControl fullWidth error={!!errors.mainCategory} required>
                  <InputLabel>Main Category</InputLabel>
                  <Select
                    name="mainCategory"
                    value={formData.mainCategory}
                    onChange={handleChange}
                    label="Main Category"
                  >
                    {categories.mainCategories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth error={!!errors.field} required>
                  <InputLabel>Field</InputLabel>
                  <Select
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    label="Field"
                  >
                    {categories.fields.map(field => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Autocomplete
                  multiple
                  options={categories.careerPaths}
                  value={formData.careerPaths}
                  onChange={(e, newValue) => {
                    setFormData(prev => ({ ...prev, careerPaths: newValue }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Career Paths"
                      error={!!errors.careerPaths}
                      helperText={errors.careerPaths}
                      required
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </Stack>
            </Box>

            {/* Challenge Details */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Challenge Details
              </Typography>
              <Stack spacing={2}>
                <FormControl fullWidth error={!!errors.difficulty} required>
                  <InputLabel>Difficulty Level</InputLabel>
                  <Select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    label="Difficulty Level"
                  >
                    {categories.difficulties.map(level => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Time Estimate"
                  name="timeEstimate"
                  value={formData.timeEstimate}
                  onChange={handleChange}
                  error={!!errors.timeEstimate}
                  helperText={errors.timeEstimate || 'e.g., 30 mins, 1 hour'}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Points"
                  name="points"
                  type="number"
                  value={formData.points}
                  onChange={handleChange}
                  error={!!errors.points}
                  helperText={errors.points || 'Reward points for completing the challenge'}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StarIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Autocomplete
                  multiple
                  freeSolo
                  options={suggestedTags}
                  value={formData.tags}
                  onChange={(e, newValue) => {
                    setFormData(prev => ({ ...prev, tags: newValue }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      helperText="Add relevant tags to help users find your challenge"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} {...getTagProps({ index })} />
                    ))
                  }
                />
              </Stack>
            </Box>

            {/* Challenge Content */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Challenge Content
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  error={!!errors.instructions}
                  helperText={errors.instructions || 'Detailed instructions for completing the challenge'}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />

                <TextField
                  label="Evaluation Criteria"
                  name="evaluation"
                  value={formData.evaluation}
                  onChange={handleChange}
                  error={!!errors.evaluation}
                  helperText={errors.evaluation || 'How will submissions be evaluated?'}
                  multiline
                  rows={3}
                  fullWidth
                  required
                />

                <TextField
                  label="Additional Resources"
                  name="resources"
                  value={formData.resources}
                  onChange={handleChange}
                  helperText="Optional: Add links to helpful resources"
                  multiline
                  rows={2}
                  fullWidth
                />

                <TextField
                  label="Prerequisites"
                  name="prerequisites"
                  value={formData.prerequisites}
                  onChange={handleChange}
                  helperText="Optional: List any required skills or knowledge"
                  multiline
                  rows={2}
                  fullWidth
                />
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button variant="outlined" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Create Challenge
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 