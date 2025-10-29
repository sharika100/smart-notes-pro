// Utility functions for managing data in localStorage

// Save notes array to localStorage
export const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Load notes array from localStorage
export const loadNotes = () => {
  const data = localStorage.getItem("notes");
  return data ? JSON.parse(data) : [];
};

// Clear all notes
export const clearNotes = () => {
  localStorage.removeItem("notes");
};

// Save theme preference
export const saveTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

// Load theme preference
export const loadTheme = () => {
  return localStorage.getItem("theme") || "light";
};
