import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { RulesPage } from './Rules.tsx';
import './index.css';

const isRulesPage = window.location.pathname === '/rules' || window.location.pathname === '/rules.html';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isRulesPage ? <RulesPage /> : <App />}
  </StrictMode>
);
