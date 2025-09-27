import { useState, useEffect, useRef } from 'react';
import { useUser } from "../components/useUser.js";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/useUser.js";
import Footer from "../components/footer.jsx";
import Logo from "../assets/logo.png";
import LoadingPage from "../components/LoadingPage.jsx";
import { 
  FaBell, 
  FaEdit, 
  FaCrown, 
  FaHome, 
  FaSignOutAlt,
  FaCheck, 
  FaTimes,
  FaBriefcase,
  FaFileAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaIdCard,
  FaGlobe,
  FaPhone,
  FaUser,
  FaCoins,
  FaShieldAlt,
  FaRocket
} from 'react-icons/fa';

export default function ProfileContent() {
    const { user, logout } = useUser();
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const hasAutoSetLanguage = useRef(false);

    // Detect user language using navigator.language
    useEffect(() => {
        if (hasAutoSetLanguage.current) return;

        const savedLanguage = localStorage.getItem("preferredLanguage");
        if (savedLanguage === "fr" || savedLanguage === "en") {
            hasAutoSetLanguage.current = true;
            return;
        }

        const browserLanguage = navigator.language?.split("-")[0];
        const finalLanguage = browserLanguage === "fr" ? "fr" : "en";
        localStorage.setItem("preferredLanguage", finalLanguage);
        hasAutoSetLanguage.current = true;
    }, [language]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        if (logout) {
            logout();
        }
        navigate('/guest');
    };

    const handleGoHome = () => {
        navigate('/?panel=home');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <LoadingPage message={language === "fr" ? "Chargement du profil..." : "Loading profile..."} />
            </div>
        );
    }

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(
            language === 'fr' ? 'fr-FR' : 'en-US', 
            options
        );
    };

    const getPermissionText = (hasPermission) => {
        if (hasPermission) {
            return language === 'fr' ? 'Autorisé' : 'Allowed';
        }
        return language === 'fr' ? 'Bloqué' : 'Blocked';
    };

    const getTokenStatus = (count, type) => {
        if (count === 0) {
            return { 
                status: 'blocked', 
                text: language === 'fr' ? 'Épuisé' : 'Depleted' 
            };
        } else if (count <= 2) {
            return { 
                status: 'warning', 
                text: language === 'fr' ? 'Faible' : 'Low' 
            };
        }
        return { 
            status: 'active', 
            text: language === 'fr' ? 'Actif' : 'Active' 
        };
    };

    const unreadNotifications = user.userNotifications ? 
        user.userNotifications.filter(notif => !notif.isRead).length : 0;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>{language === 'fr' ? 'Mon Profil - Bleu Job' : 'My Profile - Blue Jobs'}</h1>
                <p>{language === 'fr' ? 'Gérez vos informations et paramètres' : 'Manage your information and settings'}</p>
            </div>

            <div className="profile-card">
                <div className="profile-main">
                    {/* Sidebar */}
                    <div className="profile-sidebar">
                        <img 
                            src={user.userPassportPhoto || Logo} 
                            alt={user.userName}
                            className="profile-avatar"
                            onError={() => {
                                setPhotoError(true)
                            }}
                            onLoaded = {() => {
                                setPhotoError(false);
                            }}
                        />
                        {!PhotoError && (
                            <div className="profile-avator">
                                {user.userName.spilt(" ")[0].charAt(0) + user.userName}
                            </div>
                        )}
                        <h2 className="profile-name">{user.userName}</h2>
                        <p className="profile-email">{user.userEmail}</p>
                        
                        <div className={user.userIsPremium ? "premium-badge" : "basic-badge"}>
                            <FaCrown style={{ marginRight: '5px' }} />
                            {user.userIsPremium ? 
                                (language === 'fr' ? 'Premium' : 'Premium') : 
                                (language === 'fr' ? 'Basique' : 'Basic')
                            }
                        </div>

                        <div className="stats-grid">
                            <div className="stat-item">
                                <FaBriefcase className="stat-icon" />
                                <span className="stat-number">{user.userPostedJobs.length}</span>
                                <span className="stat-label">
                                    {language === 'fr' ? 'Emplois publiés' : 'Jobs Posted'}
                                </span>
                            </div>
                            <div className="stat-item">
                                <FaFileAlt className="stat-icon" />
                                <span className="stat-number">{user.userAppliedJobs.length}</span>
                                <span className="stat-label">
                                    {language === 'fr' ? 'Candidatures' : 'Applications'}
                                </span>
                            </div>
                            <div className="stat-item">
                                <FaBell className="stat-icon" />
                                <span className="stat-number">{unreadNotifications}</span>
                                <span className="stat-label">
                                    {language === 'fr' ? 'Notifications' : 'Notifications'}
                                </span>
                            </div>
                            <div className="stat-item">
                                <FaCalendarAlt className="stat-icon" />
                                <span className="stat-number">
                                    {Math.floor((new Date() - new Date(user.userDateCreated)) / (1000 * 60 * 60 * 24))}
                                </span>
                                <span className="stat-label">
                                    {language === 'fr' ? 'Jours actif' : 'Days Active'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="profile-content">
                        {/* Personal Information */}
                        <section className="section">
                            <h3 className="section-title">
                                <FaUser style={{ marginRight: '10px' }} />
                                {language === 'fr' ? 'Informations Personnelles' : 'Personal Information'}
                            </h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <FaIdCard className="info-icon" />
                                    <span className="info-label">
                                        {language === 'fr' ? 'Nom complet' : 'Full Name'}
                                    </span>
                                    <span className="info-value">{user.userName}</span>
                                </div>
                                <div className="info-item">
                                    <FaEnvelope className="info-icon" />
                                    <span className="info-label">
                                        {language === 'fr' ? 'Email' : 'Email'}
                                    </span>
                                    <span className="info-value">{user.userEmail}</span>
                                </div>
                                <div className="info-item">
                                    <FaPhone className="info-icon" />
                                    <span className="info-label">
                                        {language === 'fr' ? 'Téléphone' : 'Phone'}
                                    </span>
                                    <span className="info-value">{user.userPhoneNumber}</span>
                                </div>
                                <div className="info-item">
                                    <FaGlobe className="info-icon" />
                                    <span className="info-label">
                                        {language === 'fr' ? 'Nationalité' : 'Nationality'}
                                    </span>
                                    <span className="info-value">{user.userNationality}</span>
                                </div>
                                <div className="info-item">
                                    <FaIdCard className="info-icon" />
                                    <span className="info-label">
                                        {language === 'fr' ? 'ID National' : 'National ID'}
                                    </span>
                                    <span className="info-value">{user.userNationalId}</span>
                                </div>
                                <div className="info-item">
                                    <FaCalendarAlt className="info-icon" />
                                    <span className="info-label">
                                        {language === 'fr' ? 'Membre depuis' : 'Member Since'}
                                    </span>
                                    <span className="info-value">{formatDate(user.userDateCreated)}</span>
                                </div>
                            </div>
                        </section>

                        {/* Tokens Section */}
                        <section className="section">
                            <h3 className="section-title">
                                <FaCoins style={{ marginRight: '10px' }} />
                                {language === 'fr' ? 'Jetons et Crédits' : 'Tokens & Credits'}
                            </h3>
                            <div className="tokens-section">
                                <div className="tokens-grid">
                                    <div className="token-card">
                                        <FaRocket className="token-icon" />
                                        <div className="token-count">{user.userPostTokens}</div>
                                        <div className="token-label">
                                            {language === 'fr' ? 'Jetons de Publication' : 'Post Tokens'}
                                        </div>
                                        <div className={`token-status status-${getTokenStatus(user.userPostTokens).status}`}>
                                            {getTokenStatus(user.userPostTokens).text}
                                        </div>
                                    </div>
                                    <div className="token-card">
                                        <FaFileAlt className="token-icon" />
                                        <div className="token-count">{user.userApplyTokens}</div>
                                        <div className="token-label">
                                            {language === 'fr' ? 'Jetons de Candidature' : 'Apply Tokens'}
                                        </div>
                                        <div className={`token-status status-${getTokenStatus(user.userApplyTokens).status}`}>
                                            {getTokenStatus(user.userApplyTokens).text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Permissions */}
                        <section className="section">
                            <h3 className="section-title">
                                <FaShieldAlt style={{ marginRight: '10px' }} />
                                {language === 'fr' ? 'Permissions' : 'Permissions'}
                            </h3>
                            <div className="permissions-grid">
                                <div className="permission-item">
                                    <div className={`permission-icon ${user.userJobPostPermit ? 'permission-allowed' : 'permission-blocked'}`}>
                                        {user.userJobPostPermit ? <FaCheck /> : <FaTimes />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>
                                            {language === 'fr' ? 'Publication d\'emplois' : 'Job Posting'}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>
                                            {getPermissionText(user.userJobPostPermit)}
                                        </div>
                                    </div>
                                </div>
                                <div className="permission-item">
                                    <div className={`permission-icon ${user.userApplyPermit ? 'permission-allowed' : 'permission-blocked'}`}>
                                        {user.userApplyPermit ? <FaCheck /> : <FaTimes />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>
                                            {language === 'fr' ? 'Candidature aux emplois' : 'Job Applications'}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>
                                            {getPermissionText(user.userApplyPermit)}
                                        </div>
                                    </div>
                                </div>
                                <div className="permission-item">
                                    <div className={`permission-icon ${user.userIsPremium ? 'permission-allowed' : 'permission-blocked'}`}>
                                        {user.userIsPremium ? <FaCheck /> : <FaTimes />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>
                                            {language === 'fr' ? 'Compte Premium' : 'Premium Account'}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>
                                            {getPermissionText(user.userIsPremium)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Quick Actions */}
                        <section className="section">
                            <h3 className="section-title">
                                <FaRocket style={{ marginRight: '10px' }} />
                                {language === 'fr' ? 'Actions Rapides' : 'Quick Actions'}
                            </h3>
                            <div className="quick-actions">
                                <button 
                                    className="action-btn btn-primary"
                                    onClick={() => navigate('/?panel=notifications')}
                                >
                                    <FaBell />
                                    {language === 'fr' ? 'Voir les Notifications' : 'View Notifications'} 
                                    {unreadNotifications > 0 && ` (${unreadNotifications})`}
                                </button>
                                <button className="action-btn btn-secondary">
                                    <FaEdit />
                                    {language === 'fr' ? 'Modifier le Profil' : 'Edit Profile'}
                                </button>
                                <button className="action-btn btn-warning">
                                    <FaCrown />
                                    {language === 'fr' ? 'Passer à Premium' : 'Upgrade to Premium'}
                                </button>
                            </div>
                        </section>

                        {/* Navigation & Logout Section */}
                        <section className="section">
                            <h3 className="section-title">
                                <FaGlobe style={{ marginRight: '10px' }} />
                                {language === 'fr' ? 'Navigation' : 'Navigation'}
                            </h3>
                            <div className="quick-actions">
                                <button 
                                    className="action-btn btn-secondary"
                                    onClick={handleGoHome}
                                >
                                    <FaHome />
                                    {language === 'fr' ? 'Retour à l\'Accueil' : 'Back to Home'}
                                </button>
                                <button 
                                    className="action-btn btn-logout"
                                    onClick={handleLogout}
                                >
                                    <FaSignOutAlt />
                                    {language === 'fr' ? 'Déconnexion' : 'Logout'}
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}