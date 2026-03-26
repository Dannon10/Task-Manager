# TaskManager – Modern Notes App

A modern, fully functional Todo application built with React and TypeScript, featuring drag-and-drop task management and inspired by the Outlook Todo interface.

---

## Demo Video

https://youtu.be/IWTBHFBA7xM

---

## Features

- Add, edit, and delete tasks  
- Mark tasks as completed  
- Task prioritization (high-priority, starred, scheduled)  
- Drag-and-drop task reordering  
- Search and filter functionality  
- Due dates with notifications  
- Persistent storage using localStorage  
- Firebase authentication  
- Firestore real-time synchronization  

---

## Tech Stack

- React + TypeScript  
- Fluent UI  
- Firebase (Authentication and Firestore)  
- Custom hooks for localStorage and notifications  
- react-beautiful-dnd for drag-and-drop  

---

## Project Structure

```bash
src/
├── components/        # Reusable UI components
│   ├── AddTodo.tsx
│   ├── Filters.tsx
│   ├── Notifications.tsx
│   ├── TodoItem.tsx
│   ├── TodoList.tsx
│   └── UserAuth.tsx
├── hooks/             # Custom hooks
│   ├── useLocalStorage.ts
│   ├── useNotifications.ts
│   └── useFirestoreSync.ts
├── services/          # External integrations
│   ├── authService.ts
│   └── todoService.ts
├── types/             # TypeScript interfaces
│   ├── todo.ts
│   └── user.ts
├── App.tsx
└── index.tsx
Getting Started
1. Clone the repository
git clone https://github.com/Dannon10/task-manager.git
2. Navigate into the project
cd task-manager
3. Install dependencies
npm install
4. Start the development server
npm start

Note: Replace Firebase configuration in authService.ts and todoService.ts with your own credentials.

Key Highlights
Built with scalability and maintainability in mind
Fully typed using TypeScript
Modular architecture with reusable components
Clean interface inspired by Outlook Todo
Real-time synchronization with Firebase
License

The design is inspired by Outlook Todo but fully re-implemented from scratch.
