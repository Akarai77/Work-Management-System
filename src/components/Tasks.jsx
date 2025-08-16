import { useContext, useState } from "react";
import { AppContext } from "../context/provider";
import { Typography, Box, Card, CardContent, Grid, Paper, TextField, Button, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, Chip, } from '@mui/material';
import { Add, BugReport, Delete, NewReleases, TaskAlt, TrendingUp } from "@mui/icons-material";

const Tasks = () => {
  const { tasks, projects, addTask, updateTask, deleteTask, moveTask } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Feature',
    priority: 'Medium',
    status: 'To Do',
    assignee: '',
    projectId: '',
    dueDate: ''
  });

  const columns = ['To Do', 'In Progress', 'In Review', 'Done'];

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTask) {
      updateTask({ ...editTask, ...formData });
    } else {
      addTask(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setEditTask(null);
    setFormData({
      title: '',
      description: '',
      type: 'Feature',
      priority: 'Medium',
      status: 'To Do',
      assignee: '',
      projectId: '',
      dueDate: ''
    });
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setFormData(task);
    setOpen(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Bug': return <BugReport color="error" />;
      case 'Feature': return <NewReleases color="primary" />;
      case 'Improvement': return <TrendingUp color="success" />;
      default: return <TaskAlt />;
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Tasks - Kanban Board
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          New Task
        </Button>
      </Box>

      <Grid container spacing={2}>
        {columns.map((column) => (
          <Grid item xs={12} md={3} key={column}>
            <Paper sx={{ p: 2, minHeight: 600 }}>
              <Typography variant="h6" gutterBottom color="primary">
                {column} ({getTasksByStatus(column).length})
              </Typography>
              
              <Box sx={{ maxHeight: 520, overflowY: 'auto' }}>
                {getTasksByStatus(column).map((task) => (
                  <Card key={task.id} sx={{ mb: 2, cursor: 'pointer' }} onClick={() => handleEdit(task)}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                        <Typography variant="subtitle2" component="h3">
                          {task.title}
                        </Typography>
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                      
                      <Typography variant="body2" color="textSecondary" paragraph sx={{ fontSize: '0.8rem' }}>
                        {task.description.length > 60 ? task.description.substring(0, 60) + '...' : task.description}
                      </Typography>
                      
                      <Box display="flex" alignItems="center" mb={1}>
                        {getTypeIcon(task.type)}
                        <Chip 
                          label={task.priority} 
                          size="small" 
                          color={getPriorityColor(task.priority)}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                      
                      <Typography variant="caption" color="textSecondary" display="block">
                        Assignee: {task.assignee}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </Typography>
                      
                      {column !== 'Done' && (
                        <Box mt={1}>
                          <Button 
                            size="small" 
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus = columns[columns.indexOf(column) + 1];
                              if (nextStatus) moveTask(task.id, nextStatus);
                            }}
                            disabled={!columns[columns.indexOf(column) + 1]}
                          >
                            Move →
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editTask ? 'Edit Task' : 'Create New Task'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                >
                  <MenuItem value="Bug">Bug</MenuItem>
                  <MenuItem value="Feature">Feature</MenuItem>
                  <MenuItem value="Improvement">Improvement</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority"
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  {columns.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Project</InputLabel>
                <Select
                  value={formData.projectId}
                  label="Project"
                  onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
                >
                  {projects.map(project => (
                    <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <TextField
            margin="dense"
            label="Assignee"
            fullWidth
            variant="outlined"
            value={formData.assignee}
            onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
          />
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
            {editTask ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks
