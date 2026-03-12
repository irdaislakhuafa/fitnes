import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Activity, LayoutDashboard, Users, UserCheck, Video, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleNavClick = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="admin-layout">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile top bar */}
            <div className="mobile-topbar">
                <button
                    className="hamburger-btn"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle menu"
                >
                    {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
                <div className="logo" style={{ fontSize: '1.1rem' }}>
                    <img src="/pevita.png" alt="PEVITA Logo" className="logo-icon" style={{ height: '32px', width: 'auto' }} />
                    <span>PEVITA</span>
                </div>
                <div style={{ width: 40 }} />
            </div>

            <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <img src="/pevita.png" alt="PEVITA Logo" className="logo-icon" style={{ height: '40px', width: 'auto' }} />
                        <span>PEVITA</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/admin/coaches"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <UserCheck size={20} />
                        Pelatih
                    </NavLink>
                    <NavLink
                        to="/admin/clients"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <Users size={20} />
                        Client
                    </NavLink>
                    <NavLink
                        to="/admin/videos"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <Video size={20} />
                        Video
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="admin-profile">
                        <div className="admin-avatar">
                            {user?.nama?.charAt(0) || 'A'}
                        </div>
                        <div className="admin-info">
                            <div className="admin-name">{user?.nama || 'Administrator'}</div>
                            <div className="admin-role">{user?.role || 'Admin'}</div>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        Keluar
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
}
