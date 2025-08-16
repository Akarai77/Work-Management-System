export const appReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'LOGIN':
      newState = { ...state, user: action.payload.user, token: action.payload.token };
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      break;
      
    case 'LOGOUT':
      newState = { ...state, user: null, token: null };
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      break;
      
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      newState = { ...state, theme: newTheme };
      localStorage.setItem('theme', newTheme);
      break;
      
    case 'ADD_PROJECT':
      const newProject = { ...action.payload, id: Date.now() };
      newState = { ...state, projects: [...state.projects, newProject] };
      localStorage.setItem('projects', JSON.stringify(newState.projects));
      break;
      
    case 'UPDATE_PROJECT':
      newState = {
        ...state,
        projects: state.projects.map(p => p.id === action.payload.id ? action.payload : p)
      };
      localStorage.setItem('projects', JSON.stringify(newState.projects));
      break;
      
    case 'DELETE_PROJECT':
      newState = {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
        tasks: state.tasks.filter(t => t.projectId !== action.payload)
      };
      localStorage.setItem('projects', JSON.stringify(newState.projects));
      localStorage.setItem('tasks', JSON.stringify(newState.tasks));
      break;
      
    case 'ADD_TASK':
      const newTask = { ...action.payload, id: Date.now() };
      newState = { ...state, tasks: [...state.tasks, newTask] };
      localStorage.setItem('tasks', JSON.stringify(newState.tasks));
      break;
      
    case 'UPDATE_TASK':
      newState = {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t)
      };
      localStorage.setItem('tasks', JSON.stringify(newState.tasks));
      break;
      
    case 'DELETE_TASK':
      newState = { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
      localStorage.setItem('tasks', JSON.stringify(newState.tasks));
      break;
      
    case 'ADD_NOTIFICATION':
      newState = { ...state, notifications: [...state.notifications, action.payload] };
      break;
      
    case 'REMOVE_NOTIFICATION':
      newState = { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
      break;
      
    case 'ADD_ACTIVITY':
      newState = { 
        ...state, 
        activities: [action.payload, ...state.activities.slice(0, 49)] // Keep last 50
      };
      break;
      
    default:
      return state;
  }
  
  return newState;
};

