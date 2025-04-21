import { Route, Routes, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { Box, useColorModeValue } from '@chakra-ui/react';
import OTPPage from './pages/OTPPage';
import VisualDetectionPage from './pages/VisualDetectionPage';
import AudioDetectionPage from './pages/AudioDetectionPage';
import LiveStreamPage from './pages/LiveStreamPage';
import WildlifeLocationsPage from './pages/WildlifeLocationsPage';
import DetectionReportPage from './pages/DetectionReportPage';
import MicrocontrollerStatusPage from './pages/MicrocontrollerStatusPage';
import SolarSimulationPage from './pages/SolarSimulationPage';
import TransmissionPage from './pages/TransmissionPage';
import SolarBatteryStatusPage from './pages/SolarBatteryStatusPage';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // New state to track if auth check is done

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const tokenExpiration = window.localStorage.getItem('tokenExpiration');
    let timeoutId;
  
    if (token && tokenExpiration) {
      const now = Date.now();
      if (now >= tokenExpiration) {
        logoutUser();
      } else {
        timeoutId = setTimeout(logoutUser, tokenExpiration - now);
        setIsAuthenticated(true);
      }
    }else {
      setIsAuthenticated(false);
    }

    setIsAuthChecked(true); // Mark that auth check is completed
  
    return () => clearTimeout(timeoutId); // Cleanup
  }, []);

  const logoutUser = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('tokenExpiration');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  // Prevent rendering until authentication check is done
  if (!isAuthChecked) {
    return null; // Or a loading spinner
  }

  return (
    <Box minH={'100vh'} bg={useColorModeValue('gray.100', '#142233')}>
      <Routes>
        {/* Redirect logged-in users away from login/signup pages */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/enterOTP" element={<OTPPage />} />

        {/* Protect routes only after auth check */}
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/visual_detections" element={isAuthenticated ? <VisualDetectionPage /> : <Navigate to="/login" />} />
        <Route path="/audio_detections" element={isAuthenticated ? <AudioDetectionPage /> : <Navigate to="/login" />} />
        <Route path="/live_stream" element={isAuthenticated ? <LiveStreamPage /> : <Navigate to="/login" />} />
        <Route path="/microcontroller_status" element={isAuthenticated ? <MicrocontrollerStatusPage /> : <Navigate to="/login" />} />
        <Route path="/transmission_status" element={isAuthenticated ? <TransmissionPage /> : <Navigate to="/login" />} />
        <Route path="/solar_battery_status" element={isAuthenticated ? <SolarBatteryStatusPage /> : <Navigate to="/login" />} />
        <Route path="/wildlife_locations" element={isAuthenticated ? <WildlifeLocationsPage /> : <Navigate to="/login" />} />
        <Route path="/solar_simulation" element={isAuthenticated ? <SolarSimulationPage /> : <Navigate to="/login" />} />
        <Route path="/detection_report" element={isAuthenticated ? <DetectionReportPage /> : <Navigate to="/login" />} />
      </Routes>
    </Box>
  );
}

export default App;
