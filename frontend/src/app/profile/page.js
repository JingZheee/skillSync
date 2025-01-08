import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  Button,
  Stack,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; 

export default function ProfilePage() {
  const user = {
    name: "Moni Roy",
    rank: "Gold",
    challenges: 5,
    coursesCompleted: 10,
    skills: [
      { skill: "HTML" },
      { skill: "CSS" },
    ],
    courses: [
      { name: "Course 1", date: "Date 1" },
      { name: "Course 2", date: "Date 2" },
      { name: "Course 3", date: "Date 3" },
    ],
    hackathons: [
      { name: "Hackathon 1", date: "Date 1" },
      { name: "Hackathon 2", date: "Date 2" },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box textAlign="center">
          <Avatar
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
            {user.name}
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid
            item
            xs={4}
            textAlign="center"
            sx={{
                position: "relative",
                "&::after": {
                content: '""',
                position: "absolute",
                right: 0,
                top: "25%",
                height: "65%",
                width: "1px",
                backgroundColor: "#CCCCCC",
                },
            }}
            >
            <Box
                sx={{
                display: "flex",
                flexDirection: "row", // Arrange icon and text in a row
                alignItems: "center", // Center-align icon and text
                justifyContent: "center", // Center the content
                gap: 1, // Add spacing between icon and text
                }}
            >
                <EmojiEventsIcon sx={{ fontSize: 40, color: "#FFD700" }} /> {/* Gold medal */}
                <Box>
                <Typography variant="h6">
                    {user.rank}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Rank
                </Typography>
                </Box>
            </Box>
            </Grid>
          <Grid item xs={4} textAlign="center" sx={{ 
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: '25%',
              height: '65%',
              width: '1px',
              backgroundColor: '#CCCCCC'
            }
          }}>
            <Typography variant="h6">{user.challenges}</Typography>
            <Typography variant="body2" color="textSecondary">
              Challenges
            </Typography>
          </Grid>
          
          <Grid item xs={4} textAlign="center">
            <Typography variant="h6">{user.coursesCompleted}</Typography>
            <Typography variant="body2" color="textSecondary">
              Courses Completed
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Challenges Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Challenges
        </Typography>
        <Button variant="text">Show All →</Button>
      </Paper>

      {/* Courses Enrolled Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Courses Enrolled
        </Typography>
        <Grid container spacing={2}>
          {user.courses.map((course, index) => (
            <Grid item xs={4} key={index}>
              <Card 
                elevation={0} 
                sx={{ 
                  border: '1px solid #CCCCCC',  // Light gray border
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#1976d2',  // Change border color on hover
                  }
                }}
              >
                <CardContent>
                  <Typography variant="body1" fontWeight="bold">
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {course.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button variant="text" sx={{ mt: 2 }}>
          Show All →
        </Button>
      </Paper>

      {/* Hackathon Experiences Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Hackathon Experiences
        </Typography>
        <Stack spacing={2}>
          {user.hackathons.map((hackathon, index) => (
            <Box key={index}>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {hackathon.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {hackathon.date}
                </Typography>
              </Box>
              {/* Add divider if not the last item */}
              {index < user.hackathons.length - 1 && (
                <Box sx={{ 
                  height: '1px',
                  backgroundColor: '#e0e0e0',
                  width: '100%',
                  mt: 2,
                  mb: 2
                }} />
              )}
            </Box>
          ))}
        </Stack>
        <Button 
          variant="text" 
          sx={{ 
            mt: 2,
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
        >
          Show All →
        </Button>
      </Paper>

      {/* Skills Section */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Skills
        </Typography>
        <Stack spacing={2}>
          {user.skills.map((skill, index) => (
            <Box key={index}>
              <Box>
                <Typography variant="body1">
                  {skill.skill}
                </Typography>
              </Box>
              {/* Add divider if not the last item */}
              {index < user.skills.length - 1 && (
                <Box sx={{ 
                  height: '1px',
                  backgroundColor: '#e0e0e0',
                  width: '100%',
                  mt: 2,
                  mb: 2
                }} />
              )}
            </Box>
          ))}
        </Stack>
        <Button 
          variant="text" 
          sx={{ 
            mt: 2,
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
        >
          Show all skills →
        </Button>
      </Paper>
    </Container>
  );
}
