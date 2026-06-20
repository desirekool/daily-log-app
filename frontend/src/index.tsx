import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || '',
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  enabled: !!import.meta.env.VITE_SENTRY_DSN,
  beforeSend(event) {
    console.error('[Sentry]', event.exception?.values?.[0]?.value || event.message);
    return event;
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
