'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';

export default function SurveyForm() {
  const [selectedField, setSelectedField] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const fieldData = [
    'Accounting',
    'Computing',
    'Engineering',
    'Business',
  ];

  const skillsData = [
    'Financial Reporting',
    'Budget Management',
    'Auditing',
    'Taxation',
    'Financial Analysis',
    'Data Visualization',
    'Regulatory Compliance',
    'Financial Forecasting',
    'Programming (Python, Java, C++, JavaScript)',
    'Web Development (HTML, CSS, React, Node.js)',
    'Data Structures and Algorithms',
    'Databases (SQL, MongoDB)',
    'Cybersecurity',
    'Machine Learning (ML)',
    'Software Development',
    'Version Control (Git)',
    'Computer-Aided Design (CAD)',
    'Structural Analysis',
    'Circuit Design',
    'Mechanical Design',
    'Project Management',
    'Robotics',
    'MATLAB/Simulink',
    'Quality Assurance',
    'Strategic Planning',
    'Market Research',
    'Data Analysis',
    'Business Communication',
    'Leadership',
    'Financial Modeling',
    'Entrepreneurship',
    'Customer Relationship Management (CRM)',
  ];

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
    setSelectedSkills([]); // Reset skills when field changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected field:', selectedField);
    console.log('Selected skills:', selectedSkills);
    // Add your API call here
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
            color="primary"
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            Select Your Field of Study
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            textAlign="center"
            sx={{ mb: 4 }}
          >
            Choose your field and relevant skills
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Field Selection */}
              <FormControl fullWidth>
                <InputLabel id="field-select-label">Field of Study</InputLabel>
                <Select
                  labelId="field-select-label"
                  id="field-select"
                  value={selectedField}
                  label="Field of Study"
                  onChange={handleFieldChange}
                  sx={{ mb: 2 }}
                >
                  {fieldData.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Skills Selection */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Select Your Skills
                </Typography>
                <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.paper' }}>
                  <Autocomplete
                    multiple
                    options={skillsData}
                    getOptionLabel={(option) => option}
                    value={selectedSkills}
                    onChange={(event, newValue) => {
                      setSelectedSkills(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Search and Select Skills"
                        placeholder="Start typing..."
                      />
                    )}
                  />
                </Paper>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 4 }}
                fullWidth
                disabled={!selectedField}
              >
                Complete Profile
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
