import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Button, Container, Typography, CircularProgress, Box } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [callFrame, setCallFrame] = useState<any | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@daily-co/daily-js';
    script.async = true;
    script.onload = () => {
      console.log('Daily.co script loaded');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createRoom = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await backend.createCallRoom();
      if ('ok' in result) {
        setRoomId(result.ok);
        initializeCall(result.ok);
      } else {
        setError('Failed to create room');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const initializeCall = (roomId: string) => {
    if (window.DailyIframe) {
      const newCallFrame = window.DailyIframe.createFrame({
        iframeStyle: {
          width: '100%',
          height: '600px',
          border: '1px solid #e6e6e6',
          borderRadius: '8px',
        },
      });
      newCallFrame.join({ url: `https://you.daily.co/${roomId}` });
      setCallFrame(newCallFrame);
    } else {
      setError('Daily.co script not loaded');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Video Call App
        </Typography>
        {!roomId && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<VideoCallIcon />}
            onClick={createRoom}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Start Video Call'}
          </Button>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {roomId && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Room ID: {roomId}
            </Typography>
            <div id="call-frame-container"></div>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;
