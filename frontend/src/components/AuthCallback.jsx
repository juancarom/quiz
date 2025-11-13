import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { handleGoogleCallback } = useAuth();

  useEffect(() => {
    // Obtener token de la URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      handleGoogleCallback(token);
      // Redirigir al home después de autenticar
      navigate('/', { replace: true });
    } else {
      // Si no hay token, redirigir con error
      navigate('/?error=auth_failed', { replace: true });
    }
  }, [navigate, handleGoogleCallback]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px',
      color: '#666'
    }}>
      Autenticando...
    </div>
  );
};

export default AuthCallback;
