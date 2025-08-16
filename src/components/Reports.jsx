import { useContext } from "react";
import { AppContext } from "../context/provider";
import { Typography, Box, Card, CardContent, Grid, Paper, Chip, LinearProgress } from '@mui/material';

const Reports = () => {
  const { tasks, projects, user } = useContext(AppContext);

  if (!['Admin', 'Manager'].includes(user?.role)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6" color="textSecondary">
          Access Denied - Manager/Admin Only
        </Typography>
      </Box>
    );
  }

  const tasksByStatus = {
    'To Do': tasks.filter(t => t.status === 'To Do').length,
    'In Progress': tasks.filter(t => t.status === 'In Progress').length,
    'In Review': tasks.filter(t => t.status === 'In Review').length,
    'Done': tasks.filter(t => t.status === 'Done').length
  };

  const tasksByPriority = {
    'High': tasks.filter(t => t.priority === 'High').length,
    'Medium': tasks.filter(t => t.priority === 'Medium').length,
    'Low': tasks.filter(t => t.priority === 'Low').length
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Reports & Analytics
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tasks by Status
              </Typography>
              {Object.entries(tasksByStatus).map(([status, count]) => (
                <Box key={status} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography>{status}</Typography>
                  <Chip label={count} size="small" />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tasks by Priority
              </Typography>
              {Object.entries(tasksByPriority).map(([priority, count]) => (
                <Box key={priority} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography>{priority}</Typography>
                  <Chip 
                    label={count} 
                    size="small" 
                    color={priority === 'High' ? 'error' : priority === 'Medium' ? 'warning' : 'success'}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Status Overview
              </Typography>
              <Grid container spacing={2}>
                {projects.map((project) => (
                  <Grid item xs={12} md={4} key={project.id}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {project.name}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={project.progress} 
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        {project.progress}% complete
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports
