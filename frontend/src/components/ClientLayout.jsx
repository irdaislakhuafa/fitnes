import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Activity, LayoutDashboard, Calculator, Calendar, FileText, Video, TrendingUp, MessageCircle, LogOut, Apple, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ClientLayout() {
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
                        to="/client/dashboard"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/client/imt"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <Calculator size={20} />
                        Input IMT
                    </NavLink>
                    <NavLink
                        to="/client/schedule"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <Calendar size={20} />
                        Jadwal Latihan
                    </NavLink>
                    <NavLink
                        to="/client/recommendations"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <FileText size={20} />
                        Rekomendasi
                    </NavLink>
                    <NavLink
                        to="/client/videos"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <Video size={20} />
                        Video Latihan
                    </NavLink>
                    <NavLink
                        to="/client/progress"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <TrendingUp size={20} />
                        Progres
                    </NavLink>
                    <NavLink
                        to="/client/chat"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <MessageCircle size={20} />
                        Konsultasi
                    </NavLink>
                    <NavLink
                        to="/client/food-recommendations"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        onClick={handleNavClick}
                    >
                        <Apple size={20} />
                        Saran Makanan
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="admin-profile">
                        <div className="admin-avatar">
                            {user?.nama?.charAt(0) || 'C'}
                        </div>
                        <div className="admin-info">
                            <div className="admin-name">{user?.nama || 'Client'}</div>
                            <div className="admin-role">Client</div>
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
