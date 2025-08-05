# Notes App – Frontend

This is the frontend for a full-featured notes application built using **React**. It provides a responsive, user-friendly interface for creating, editing, organizing, and managing notes. The app supports **Markdown formatting**, folder organization, and server-side note persistence.

---

## Features

- Built with **React**
- **Markdown** support for formatting notes
- **Folder structure** to organize notes
- Responsive and interactive UI
- Connects to a Node.js backend API
- Notes are saved and retrieved from the server
- Support for user authentication (via backend)
- Auto-save functionality at regular intervals
- Pop-up notifications for actions like save, delete, etc.

---

## API Communication

All requests are sent to the backend (Node.js + Express) using **Axios**. The Axios instance is configured in `axiosConfig.js`.

---

## Markdown Support

The note editor allows full Markdown syntax, which is rendered accordingly. You can use headers, lists, code blocks, links, and more inside your notes.


