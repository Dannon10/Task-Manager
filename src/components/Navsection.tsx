import { useState, useRef, useEffect } from 'react';
import { useUser } from "../types/user";
import { ClipboardTaskRegular, PersonRegular, SignOut20Regular, Search20Regular } from '@fluentui/react-icons';
import './navsection.css';
import { Link } from 'react-router-dom';

type NavsectionProps = {
  onSearchChange: (term: string) => void;
  handleLogout: () => void;
};

export default function Navsection({ onSearchChange, handleLogout }: NavsectionProps) {
  const { user } = useUser(); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-sect">
          <ClipboardTaskRegular className="logo" />
          <h4>Task Manager</h4>
        </div>

<div style={{ position: 'relative', flex: 1, maxWidth: '25%' }}>
  <Search20Regular 
    style={{ 
      position: 'absolute', left: '1.2rem', top: '50%', 
      transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)',
      fontSize: '1.6rem', pointerEvents: 'none'
    }} 
  />
  <input
    type="text"
    className="search"
    placeholder="Search tasks..."
    onChange={(e) => onSearchChange(e.target.value)}
  />
</div>

        <div className="user-nav" ref={dropdownRef}>
          { user ? (
          <button
            className="user-btn"
            title={user.displayName || 'User'}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <PersonRegular className="user-icon" />
          </button>) : (<Link to='/'>
            <button>Login</button>
          </Link> 
            )}
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button 
                className="nav-logout-btn" 
                onClick={handleLogout}
              >
                Logout
                <SignOut20Regular />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
