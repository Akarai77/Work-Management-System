import { useContext, useState } from "react";
import { AppContext } from "../context/provider";
import { Typography, Box, Card, CardContent, Grid, TextField, Button, MenuItem, IconButton, Chip, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, } from '@mui/material';
import { Add, Delete, Edit } from "@mui/icons-material";

const Projects = () => {
  const { projects, addProject, updateProject, deleteProject } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Planning',
    progress: 0,
    dueDate: '',
    team: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProject) {
      updateProject({ ...editProject, ...formData });
    } else {
      addProject(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setEditProject(null);
    setFormData({
      name: '',
      description: '',
      status: 'Planning',
      progress: 0,
      dueDate: '',
      team: []
    });
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setFormData(project);
    setOpen(true);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          New Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid key={project.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" component="h2">
                    {project.name}
                  </Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleEdit(project)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => deleteProject(project.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="textSecondary" paragraph>
                  {project.description}
                </Typography>
                
                <Chip 
                  label={project.status} 
                  size="small"
                  color={project.status === 'Completed' ? 'success' : 'primary'}
                  sx={{ mb: 2 }}
                />
                
                <Box mb={2}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Progress</Typography>
                    <Typography variant="body2">{project.progress}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={project.progress} />
                </Box>
                
                <Typography variant="caption" color="textSecondary">
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editProject ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            >
              <MenuItem value="Planning">Planning</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editProject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects
