# Steeve's Todo App Guidelines

## General Development Rules
* Keep components small and focused on a single responsibility
* Always use TypeScript interfaces for props and data structures
* Maintain the blue gradient theme throughout the app
* Preserve localStorage functionality in all updates
* Keep the "By Steeve Edoh" attribution visible in the header

## Data Management
* Always use the `STORAGE_KEY = 'todo-list'` for localStorage
* Include error handling for localStorage operations
* Provide fallback data when localStorage is unavailable
* Auto-save changes immediately when todos are modified

## UI/UX Guidelines
* Maintain the glass-morphism card design with backdrop blur
* Use hover animations for interactive elements (todo items, buttons)
* Keep the gradient background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
* Preserve the task counter format: "X of Y tasks remaining"
* Always show task counts in filter buttons

## Component Structure
* TodoList.tsx: Main container with state management and localStorage
* TodoItem.tsx: Individual todo with edit/delete functionality
* AddTodo.tsx: Input form for new todos
* TodoFilter.tsx: Filter buttons with task counts
* Keep all shadcn/ui components in `/components/ui/`

## Features to Maintain
* Inline editing with Enter/Escape key support
* Filtering: All, Active, Completed with counts
* Bulk actions: Mark All Complete/Incomplete, Clear Completed
* Persistent storage across browser sessions
* Responsive design that works on desktop and mobile