import React, { useState, useContext} from 'react';
import { AppContext } from '../context/provider';
import { Alert, Box, Button, Card, CardContent, Divider, TextField, Typography } from '@mui/material';

const LoginPage = () => {
  const { login } = useContext(AppContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
    
    const result = login(credentials.username, credentials.password);
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = login(role.toLowerCase(), role.toLowerCase());
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" component="h1" gutterBottom>
              Work Management
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in to your account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              margin="normal"
              required
            />
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Typography variant="body2" color="textSecondary" textAlign="center" mb={2}>
            Quick Demo Access:
          </Typography>
          
          <Box display="flex" gap={1} flexDirection="column">
            {['Admin', 'Manager', 'Employee'].map((role) => (
              <Button
                key={role}
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin(role)}
                disabled={loading}
              >
                {role} Demo
              </Button>
            ))}
          </Box>

          <Typography variant="caption" color="textSecondary" textAlign="center" display="block" mt={2}>
            Credentials: admin/admin, manager/manager, employee/employee
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage
