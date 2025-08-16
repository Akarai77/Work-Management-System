
export const USERS_DB = [
  { id: 1, username: 'admin', password: 'admin', name: 'Admin User', role: 'Admin', email: 'admin@company.com', active: true },
  { id: 2, username: 'manager', password: 'manager', name: 'Manager User', role: 'Manager', email: 'manager@company.com', active: true },
  { id: 3, username: 'employee', password: 'employee', name: 'Employee User', role: 'Employee', email: 'employee@company.com', active: true }
];

export const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  projects: JSON.parse(localStorage.getItem('projects')) || [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'Complete overhaul of shopping experience',
      status: 'In Progress',
      progress: 65,
      dueDate: '2024-09-15',
      team: ['Alice', 'Bob'],
      createdBy: 1,
      tasks: 15
    },
    {
      id: 2,
      name: 'Mobile App Redesign',
      description: 'Modern UI/UX for mobile app',
      status: 'Planning',
      progress: 20,
      dueDate: '2024-10-01',
      team: ['Carol', 'David'],
      createdBy: 2,
      tasks: 8
    }
  ],
  tasks: JSON.parse(localStorage.getItem('tasks')) || [
    {
      id: 1,
      title: 'Fix login bug',
      description: 'Users unable to login with special characters',
      type: 'Bug',
      priority: 'High',
      status: 'To Do',
      assignee: 'Alice Johnson',
      projectId: 1,
      dueDate: '2024-08-20',
      createdBy: 1
    },
    {
      id: 2,
      title: 'Implement dark mode',
      description: 'Add theme switching functionality',
      type: 'Feature',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Bob Smith',
      projectId: 1,
      dueDate: '2024-08-25',
      createdBy: 2
    },
    {
      id: 3,
      title: 'Database optimization',
      description: 'Improve query performance',
      type: 'Improvement',
      priority: 'High',
      status: 'Done',
      assignee: 'Carol Davis',
      projectId: 2,
      dueDate: '2024-08-18',
      createdBy: 1
    }
  ],
  users: USERS_DB,
  notifications: [],
  theme: localStorage.getItem('theme') || 'light',
  activities: []
};

