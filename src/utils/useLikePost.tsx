import { useState } from 'react';
import api from '../../api/axiosConfig';

const useLikes = () => {
  const [likes, setLikes] = useState<{ post_id: any; user_id: any }[]>([]);
  const [error, setError] = useState(null);
  

  // Получение лайков поста
interface Like {
    post_id: string;
    user_id: string;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

const fetchLikes = async (postId: string): Promise<void> => {
    
    try {
        setError(null);
        const response = await api.get<{ data: Like[] }>(`/likes/${postId}/likes`);
        setLikes(response.data); // Предполагается, что ответ содержит массив лайков
    } catch (err) {
        const error = err as ApiError;
        setError(error.response?.data?.message || 'Ошибка при получении лайков');
    }
};

  // Добавление лайка
  const addLike = async (postId: string, userId: string) => {
    try {
      setError(null);
      await api.post(`/likes/${postId}/like/${userId}`);
      // Опционально можно обновить состояние, вызвав fetchLikes(postId)
      setLikes((prevLikes) => [...prevLikes, { post_id: postId, user_id: userId }]);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при добавлении лайка');
    }
  };

  // Удаление лайка
  const removeLike = async (postId: string, userId: string) => {
    try {
      setError(null);
      await api.delete(`/likes/${postId}/unlike/${userId}`);
      // Опционально можно обновить состояние, вызвав fetchLikes(postId)
      setLikes((prevLikes) => prevLikes.filter((like) => like.user_id !== userId));
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при удалении лайка');
    }
  };

  return {
    likes,
    error,
    fetchLikes,
    addLike,
    removeLike,
    
  };
};

export default useLikes;
