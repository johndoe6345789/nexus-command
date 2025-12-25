import { Box, Alert, AlertTitle, Button, Paper, Typography } from "@mui/material";
import { Warning, Refresh } from "@mui/icons-material";

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  // In development, rethrow to get better error messages
  if (process.env.NODE_ENV === 'development') throw error;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      p: 2 
    }}>
      <Box sx={{ width: '100%', maxWidth: 'md' }}>
        <Alert severity="error" sx={{ mb: 3 }} icon={<Warning />}>
          <AlertTitle>This application has encountered a runtime error</AlertTitle>
          Something unexpected happened while running the application. The error details are shown below.
        </Alert>
        
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Error Details:
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover', maxHeight: '8rem', overflow: 'auto' }}>
            <Typography variant="caption" component="pre" color="error">
              {error.message}
            </Typography>
          </Paper>
        </Paper>
        
        <Button 
          onClick={resetErrorBoundary} 
          fullWidth
          variant="outlined"
          startIcon={<Refresh />}
        >
          Try Again
        </Button>
      </Box>
    </Box>
  );
}
