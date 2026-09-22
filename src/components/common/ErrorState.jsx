import { Alert, Button, Stack } from "@mui/material";

export default function ErrorState({ message, onRetry }) {
  return (
    <Alert
      severity="error"
      action={
        onRetry ? (
          <Button color="inherit" size="small" onClick={onRetry}>
            Retry
          </Button>
        ) : null
      }
    >
      {message}
    </Alert>
  );
}
