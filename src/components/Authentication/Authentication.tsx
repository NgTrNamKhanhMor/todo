import { Box} from '@mui/material';
import { useState } from 'react';
import Register from '~components/Authentication/Register/Register';
import Login from '~components/Authentication/Login/Login';

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSwitch = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      {isRegistering ? (
        <Register handleSwitch={handleSwitch}/>
      ) : (
        <Login handleSwitch={handleSwitch}/>
      )}
    </Box>
  );
}
