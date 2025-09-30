# To-Do App (Electron + React + Vite)

A modern **task manager desktop application** built with **React**, **Vite**, and **Electron**.  
It allows you to add, mark, and delete tasks, with automatic data persistence using `localStorage`.

---

## Features

- Add new tasks  
- Mark tasks as **completed**  
- Delete tasks  
- Data persists even after closing or restarting your computer  
- Modern and responsive UI  

---

## Installation & Development

1. **Clone the repository**

2. **Install dependencies**
  
  With:
    
    npm install

3. **Run in development mode**

  Start the React app:

    npm run dev

  Start the Electron app (in another terminal):

    npm run electron

## Build the Executable (.exe)

To package the app as a Windows executable:

1. **Install electron-builder**

  ```bash
    npm install --save-dev electron-builder concurrently wait-on
  ```

2. **Run on your browser**

  ```bash
    npm run dev
  ```

3. **Build the .exe**

  ```bash
    npm run build     # builds the React app
    npm run dist      # generates the .exe with Electron
  ```

The executable will be located in:

  dist/

You can share this .exe with your friends!