import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

export default function AppHeader() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ minHeight: 70 }}>
        <GroupsOutlinedIcon sx={{ mr: 1.5 }} />
        <Box>
          <Typography variant="h6" fontWeight={800}>Employee Management</Typography>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            Manage your employee directory
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
