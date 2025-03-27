# Enhanced React Todo List Application
A feature-rich todo list application built with React and TypeScript, offering advanced task management capabilities with persistent local storage.

## Features

- **CRUD Operations**:
  - ✅ Create todos with title, description, due date, priority, and category
  - 📝 Edit existing todos
  - 🗑️ Delete todos
  - ☑️ Mark todos as complete/incomplete

- **Advanced Features**:
  - 🔍 Search todos by title/description
  - 🎚️ Filter by status (all/complete/incomplete), category, and priority
  - 📅 Sort by due date or priority
  - 📊 Statistics dashboard (total, completed, overdue tasks)
  - 🎨 Priority-based color coding (high/medium/low)
  - ⏰ Overdue task indicators
  - 📦 Local storage persistence

- **UI/UX**:
  - 📱 Responsive design
  - 🖥️ Clean and intuitive interface
  - 🎮 Interactive form validation
  - 🏷️ Category tags
  - 📅 Date formatting and validation

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: CSS3
- **ID Generation**: UUID
- **State Management**: React Hooks
- **Persistence**: Browser Local Storage

## Installation

Here's the code you can directly copy and paste:

```bash
# Clone the repository:
git clone https://github.com/ayanafilee/A2sv-Internship-Tasks
cd todo-list-app

# Install dependencies:
npm install

# Start the development server:
npm start
```

### Usage

#### Add a Todo:
- Fill in the title (required)
- Add optional description, due date, category
- Select priority level
- Click "Add Todo"

#### Manage Todos:
- ✔️ Checkbox: Mark complete/incomplete
- ✏️ Edit: Modify todo details
- 🗑️ Delete: Remove todo permanently

#### Filter/Sort:
- Use dropdowns to filter by status/category/priority
- Sort todos by due date or priority
- Search using the search bar

#### Statistics:
- Track total, completed, and overdue tasks in real-time

### Code Structure:
```
src/
├── App.tsx             # Main application component
├── App.test.tsx        # Component tests
├── TodoApp.css         # Styling
├── index.tsx           # Entry point
└── react-app-env.d.ts  # TypeScript declarations
```

### Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request
```
