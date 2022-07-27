import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Thing } from '../.';

const App = () => {
  return (
    <div>
      <Thing />
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
