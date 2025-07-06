import React, { createContext, useContext, useEffect, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:5000/api/notifications/${userEmail}`)
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        const unread = data.filter(n => !n.read).length;
        setUnreadCount(unread);
      })
      .catch(err => {
        console.error('Error fetching notifications:', err);
      });
  }, [userEmail]);

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/mark-read/${notificationId}`, {
        method: 'PUT',
      });

      setNotifications(prev =>
        prev.map(n => (n._id === notificationId ? { ...n, read: true } : n))
      );

      setUnreadCount(prev => Math.max(prev - 1, 0));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const clearNotifications = async () => {
    if (!userEmail) return;
    try {
      await fetch(`http://localhost:5000/api/notifications/clear/${userEmail}`, {
        method: 'DELETE',
      });
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error('Error clearing notifications:', err);
    }
  };

  const addNotification = (message, type = 'info') => {
    const newNotif = {
      _id: Date.now().toString(),
      message,
      read: false,
      timestamp: new Date().toISOString(),
      type,
    };
    setNotifications(prev => [newNotif, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        clearNotifications,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
