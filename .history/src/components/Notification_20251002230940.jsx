import React from 'react';

const NotificationCard = ({ language, user, notification }) => {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      background: '#fff',
      maxWidth: '350px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        {user}
      </div>
      <div style={{ marginBottom: '8px', color: '#555' }}>
        {notification}
      </div>
      <div style={{ fontSize: '12px', color: '#888' }}>
        Language: {language}
      </div>
    </div>
  );
};

export default NotificationCard;