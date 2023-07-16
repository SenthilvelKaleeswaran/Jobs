import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import './index.css';
import './i18n'
import { Suspense } from 'react';


Sentry.init({
  dsn: 'https://9542195834df4a8b990e68bb4cf85889@o4505504810139648.ingest.sentry.io/4505509589352448',
  integrations: [
    new Integrations.BrowserTracing({
      tracePropagationTargets: ['localhost', 'http://localhost:3004/'],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById('root')).render(
  <Sentry.ErrorBoundary fallback="An error has occurred.">
    <React.StrictMode>
      <Suspense fallback="...loading">
        <App />
      </Suspense>
    </React.StrictMode>
  </Sentry.ErrorBoundary>
);
