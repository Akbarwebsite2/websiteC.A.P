import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRu from './App-ru.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRu />
  </StrictMode>
);