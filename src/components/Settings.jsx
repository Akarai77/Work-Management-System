import { Box, Card, CardContent, FormControlLabel, Grid, Switch, TextField, Typography, Button } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../context/provider";

const Settings = () => {
  const { user, theme, toggleTheme } = useContext(AppContext);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Theme Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                  />
                }
                label={`${theme === 'dark' ? 'Dark' : 'Light'} Mode`}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Settings
              </Typography>
              <TextField
                fullWidth
                label="Name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                margin="normal"
              />
              <Button variant="contained" sx={{ mt: 2 }}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings
