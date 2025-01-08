'use client';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
} from '@mui/material';
import { useState } from 'react';

export default function UploadCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Example data - can be moved to a separate config file
  const studyFields = [
    'Engineering', 'Business', 'Accounting', 'Computing', 'Education', 'Marketing'
  ];

  const skillOptions = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'SQL',
    'MongoDB',
    'AWS',
    'Docker',
    'Git',
    'UI Design',
    'UX Research',
    'Digital Marketing',
    'SEO',
    'Content Strategy',
    'Data Analysis'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      title,
      description,
      studyField: selectedField,
      skills: selectedSkills,
    };
    console.log('Course Data:', courseData);
    // Add your API call here
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={0} sx={{ border: '1px solid #e0e0e0', p: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Upload New Course
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Create a new course to share your expertise with students
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Course Title */}
            <TextField
              label="Course Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              helperText="Enter a clear and concise title for your course"
            />

            {/* Course Description */}
            <TextField
              label="Course Description"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText="Provide a detailed description of what students will learn"
            />

            {/* Study Field Selection */}
            <FormControl fullWidth required>
              <InputLabel>Study Field</InputLabel>
              <Select
                value={selectedField}
                label="Study Field"
                onChange={(e) => setSelectedField(e.target.value)}
              >
                {studyFields.map((field) => (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Skills Tags */}
            <Autocomplete
          multiple
          options={skillOptions}
          value={selectedSkills}
          onChange={(event, newValue) => setSelectedSkills(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Skills"
              helperText="Select relevant skills that students will learn"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const tagProps = getTagProps({ index });
              // Remove key from props and pass it separately
              const { key, ...otherProps } = tagProps;
              return (
                <Chip
                  key={key}
                  label={option}
                  {...otherProps}
                  sx={{
                    backgroundColor: '#e3f2fd',
                    '& .MuiChip-deleteIcon': {
                      color: '#1976d2',
                    },
                  }}
                />
              );
            })
          }
        />

            {/* Upload Section */}
            <Box sx={{ 
              border: '2px dashed #e0e0e0',
              borderRadius: 1,
              p: 3,
              textAlign: 'center'
            }}>
              <Typography variant="body1" gutterBottom>
                Upload Course Materials
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Drag and drop your files here, or click to browse
              </Typography>
              <Button variant="outlined" component="label">
                Browse Files
                <input type="file" hidden multiple />
              </Button>
            </Box>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              sx={{ mt: 2 }}
            >
              Upload Course
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
} 