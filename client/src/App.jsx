import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PostNews from './pages/PostNews';
import AllNews from './pages/AllNews';
import RequestHelp from './pages/RequestHelp';
import AllHelpRequests from './pages/AllHelpRequests';
import EmergencyAlerts from './pages/EmergencyAlerts';

import AllEvents from './pages/AllEvents';
import CreateEvent from './pages/CreateEvent';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute><Dashboard /></PrivateRoute>}
      />
      <Route
        path="/post-news"
        element={<PrivateRoute><PostNews /></PrivateRoute>}
      />
      <Route
        path="/news"
        element={<PrivateRoute><AllNews /></PrivateRoute>}
      />
      <Route
        path="/request-help"
        element={<PrivateRoute><RequestHelp /></PrivateRoute>}
      />
      <Route
        path="/help-requests"
        element={<PrivateRoute><AllHelpRequests /></PrivateRoute>}
      />
      <Route
        path="/alerts"
        element={<PrivateRoute><EmergencyAlerts /></PrivateRoute>}
      />

      <Route
        path="/events"
        element={<PrivateRoute><AllEvents /></PrivateRoute>}
      />
      <Route
        path="/create-event"
        element={<PrivateRoute><CreateEvent /></PrivateRoute>}
      />

    </Routes>
  );
}

export default App;
