import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { EnvProvider } from '@/hooks/useEnv';
import App from './App';
import '@/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EnvProvider>
      <App />
    </EnvProvider>
  </StrictMode>,
);
