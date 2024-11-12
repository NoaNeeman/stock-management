import ReactDOM from 'react-dom/client';
import './styles/globalStyles';
import App from './app';
import { StoresProvider } from './stores/storesContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoresProvider>
    <App />
  </StoresProvider>
);
