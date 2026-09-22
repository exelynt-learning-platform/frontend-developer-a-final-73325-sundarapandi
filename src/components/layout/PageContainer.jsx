import { Box, Container } from "@mui/material";

export default function PageContainer({ children }) {
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ py: { xs: 2, md: 4 } }}>{children}</Box>
      </Container>
    </>
  );
}
