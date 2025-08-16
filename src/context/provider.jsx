import { createContext, useReducer } from "react";
import { appReducer } from "./reducer";
import { initialState } from "../context/db";
import { USERS_DB } from "./db";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (username, password) => {
    const user = USERS_DB.find(u => u.username === username && u.password === password);
    if (user) {
      const token = `fake-jwt-${Date.now()}`;
      dispatch({ type: 'LOGIN', payload: { user, token } });
      addActivity(`${user.name} logged in`, 'login');
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
    }, 5000);
  };

  const addActivity = (action, type = 'general') => {
    const activity = {
      id: Date.now(),
      action,
      type,
      user: state.user?.name || 'System',
      timestamp: new Date().toLocaleString()
    };
    dispatch({ type: 'ADD_ACTIVITY', payload: activity });
  };

  const addProject = (project) => {
    dispatch({ type: 'ADD_PROJECT', payload: { ...project, createdBy: state.user.id } });
    addNotification('Project created successfully!', 'success');
    addActivity(`Created project "${project.name}"`, 'project');
  };

  const updateProject = (project) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: project });
    addNotification('Project updated successfully!', 'success');
    addActivity(`Updated project "${project.name}"`, 'project');
  };

  const deleteProject = (id) => {
    const project = state.projects.find(p => p.id === id);
    dispatch({ type: 'DELETE_PROJECT', payload: id });
    addNotification('Project deleted successfully!', 'success');
    addActivity(`Deleted project "${project?.name}"`, 'project');
  };

  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: { ...task, createdBy: state.user.id } });
    addNotification('Task created successfully!', 'success');
    addActivity(`Created task "${task.title}"`, 'task');
  };

  const updateTask = (task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
    addNotification('Task updated successfully!', 'success');
    addActivity(`Updated task "${task.title}"`, 'task');
  };

  const deleteTask = (id) => {
    const task = state.tasks.find(t => t.id === id);
    dispatch({ type: 'DELETE_TASK', payload: id });
    addNotification('Task deleted successfully!', 'success');
    addActivity(`Deleted task "${task?.title}"`, 'task');
  };

  const moveTask = (taskId, newStatus) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      updateTask({ ...task, status: newStatus });
      addActivity(`Moved task "${task.title}" to ${newStatus}`, 'task');
    }
  };

  return (
    <AppContext.Provider value={{
      ...state,
      dispatch,
      login,
      logout,
      toggleTheme,
      addNotification,
      addActivity,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      deleteTask,
      moveTask
    }}>
      {children}
    </AppContext.Provider>
  );
};

