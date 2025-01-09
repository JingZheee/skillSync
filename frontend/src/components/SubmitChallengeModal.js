"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Alert,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import FileUpload from "@/components/FileUpload";
import { useRouter } from "next/navigation";
import APIService from "@/api/apiService";
import { API } from "@/api/endpoints";
import { toast } from "react-toastify";

export default function SubmitChallengeModal({
  open,
  onClose,
  challengeId,
  studentId,
  submissionGuidelines,
  fetchChallenge,
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFiles, setSubmissionFiles] = useState([]);
  const [submissionNotes, setSubmissionNotes] = useState("");

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      submissionFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("notes", submissionNotes);
      formData.append("challengeId", challengeId);

      // Add artificial delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await APIService.post(API.challenges.submit.replace(":id", challengeId), {
        studentId,
        notes: submissionNotes,
        files: submissionFiles,
      });
      toast.success("Challenge submitted successfully!");
      onClose();
      fetchChallenge();
    } catch (error) {
      console.error("Error submitting challenge:", error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => !isSubmitting && onClose()}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Submit Challenge Solution</DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Alert severity="info">
              <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                Submission Requirements:
              </Typography>
              <List dense>
                {submissionGuidelines?.map((guideline, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={guideline} />
                  </ListItem>
                ))}
              </List>
            </Alert>

            <FileUpload
              title="Upload Solution Files"
              description="Upload your solution files here"
              acceptedFileTypes=".zip,.rar,.pdf,.doc,.docx,.txt"
              maxFiles={5}
              maxFileSize={10}
              files={submissionFiles}
              onFilesChange={setSubmissionFiles}
            />

            <TextField
              label="Additional Notes"
              multiline
              rows={4}
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              placeholder="Add any notes or comments about your submission..."
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={
              isSubmitting && <CircularProgress size={20} color="inherit" />
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Solution"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
