import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
  document.addEventListener('DOMContentLoaded', () => {
    const retryElement = document.getElementById('root');
    if (retryElement) {
      ReactDOM.createRoot(retryElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  });
}
