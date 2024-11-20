import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

interface Notification {
  _id: string;
  user_id: string;
  notification_text: string;
  is_read: boolean;
  created_at: string;
}

const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Получение уведомлений пользователя
  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/notifications/${userId}/notifications`);
      setNotifications(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при загрузке уведомлений');
    } finally {
      setLoading(false);
    }
  };

  // Создание уведомления
  const createNotification = async (notification: { type: string; content: string }) => {
    try {
      const response = await api.post('/notifications/notifications', {
        userId,
        ...notification,
      });
      setNotifications((prev) => [response.data, ...prev]);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при создании уведомления');
    }
  };

  // Удаление уведомления
  const deleteNotification = async (notificationId: string) => {
    try {
      await api.delete(`/notifications/notifications/${notificationId}`);
      setNotifications((prev) => prev.filter((notif) => notif._id !== notificationId));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при удалении уведомления');
    }
  };

  // Обновление статуса уведомления (прочитано/непрочитано)
  const updateNotificationStatus = async (notificationId: string, is_read: boolean) => {
    try {
      const response = await api.patch(`/notifications/notifications/${notificationId}`, {
        is_read,
      });
      setNotifications((prev) =>
        prev.map((notif) => (notif._id === notificationId ? response.data : notif))
      );
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка при обновлении статуса уведомления');
    }
  };

  // Инициализация
  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    createNotification,
    deleteNotification,
    updateNotificationStatus,
  };
};

export default useNotifications;

