"use client";
import React, { useState, useEffect } from "react";
import ChallengePage from "@/app/challenges/[id]/page";
import {
  Container,
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import Assignment from "@mui/icons-material/Assignment";
import AttachFile from "@mui/icons-material/AttachFile";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import APIService from "@/api/apiService";
import { API } from "@/api/endpoints";
import { useAuth } from "@/contexts/AuthContext";

export default function CompanyChallengePage() {
  const router = useRouter();
  const { id } = useParams();
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isPassed, setIsPassed] = useState(false);
  const { user } = useAuth();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchChallenge = async () => {
    const response = await APIService.get(
      API.challenges.findById.replace(":id", id)
    );
    const data = await response.data.data;
    setChallenge(data);
  };

  const fetchSubmissions = async () => {
    const response = await APIService.get(
      API.challenges.findStudentSubmissions.replace(":id", id)
    );
    const data = await response.data.data;
    const submissionsWithStudentObj = data.map((submission) => ({
      ...submission,
      student: { id: submission.student, name: user.name },
    }));
    setSubmissions(submissionsWithStudentObj);
  };

  useEffect(() => {
    fetchChallenge();
    fetchSubmissions();
  }, [id]);

  const handleReviewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setOpenReviewModal(true);
  };

  const handleSubmitReview = async (submissionId, review) => {
    try {
      setIsPassed(review.status === "PASSED");

      setSnackbar({
        open: true,
        message: "Review submitted successfully",
        severity: "success",
      });
      setOpenReviewModal(false);
      fetchSubmissions();
    } catch (error) {
      console.error("Error submitting review:", error);
      setSnackbar({
        open: true,
        message: "Failed to submit review",
        severity: "error",
      });
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <ChallengePage hideSubmitButton hideBackButton />

      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <Assignment color="primary" /> Submissions
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Participant</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Files</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions &&
                  submissions.map((submission, index) => (
                    <TableRow key={index}>
                      <TableCell>{submission?.student?.name}</TableCell>
                      <TableCell>
                        {formatDate(submission.submittedAt)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={isPassed ? "Passed" : submission.status}
                          color={
                            isPassed
                              ? "success"
                              : submission.status === "FAILED"
                              ? "error"
                              : "warning"
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          {submission?.files?.map((file, index) => (
                            <Button
                              key={index}
                              size="small"
                              startIcon={<AttachFile />}
                              href={file.url}
                              target="_blank"
                            >
                              {file.name}
                            </Button>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleReviewSubmission(submission)}
                        >
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Review Modal */}
        <Dialog
          open={openReviewModal}
          onClose={() => setOpenReviewModal(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Review Submission</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Overall Rating
                </Typography>
                <Rating
                  name="rating"
                  defaultValue={0}
                  precision={0.5}
                  size="large"
                />
              </Box>

              {challenge?.evaluationCriteria?.map((criteria, index) => (
                <Box key={index}>
                  <Typography variant="subtitle2" gutterBottom>
                    {criteria}
                  </Typography>
                  <Rating
                    name={`criteria-${index}`}
                    defaultValue={0}
                    precision={0.5}
                  />
                </Box>
              ))}

              <TextField label="Feedback" multiline rows={4} fullWidth />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenReviewModal(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                handleSubmitReview(selectedSubmission?.id, { status: "FAILED" })
              }
            >
              Mark as Failed
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                handleSubmitReview(selectedSubmission?.id, { status: "PASSED" })
              }
            >
              Mark as Passed
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
