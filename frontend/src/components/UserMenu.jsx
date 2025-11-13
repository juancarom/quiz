import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './UserMenu.css';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button 
        className="user-avatar"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú de usuario"
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <span className="avatar-initials">{getInitials(user.name)}</span>
        )}
      </button>

      {isOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
          
          <div className="dropdown-divider"></div>
          
          <button className="dropdown-item" onClick={() => {
            setIsOpen(false);
            // TODO: Navegar a perfil/estadísticas
            console.log('Ir a mis estadísticas');
          }}>
            📊 Mis Estadísticas
          </button>
          
          <button className="dropdown-item" onClick={() => {
            setIsOpen(false);
            // TODO: Navegar a rankings
            console.log('Ir a rankings');
          }}>
            🏆 Rankings
          </button>
          
          <div className="dropdown-divider"></div>
          
          <button className="dropdown-item logout" onClick={handleLogout}>
            🚪 Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
