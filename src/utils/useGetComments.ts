/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";

interface Comment {
  _id: string;
  postId: string;
  userId: string;
  text: string;
  createdAt: string;
}

export const useGetComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState<string | undefined>(undefined); // Храним текущий postId

  useEffect(() => {
    if (!postId) return; // Пропускаем запрос, если нет postId

    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/comment/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]); // Запрос выполняется только при изменении postId

  // Функция для добавления комментария
  const addComment = async (postId: string, userId: string, text: string) => {
    try {
      setLoading(true);
      const response = await api.post(`/comment/${postId}/${userId}`, { text });
      setComments((prev) => [...prev, response.data]); // Добавляем новый комментарий в локальное состояние
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Функция для удаления комментария
  const deleteComment = async (commentId: string) => {
    try {
      setLoading(true);
      await api.delete(`/comment/${commentId}`);
      setComments((prev) => prev.filter((comment) => comment._id !== commentId)); // Удаляем комментарий из локального состояния
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { comments, loading, setPostId, addComment, deleteComment, setComments };
};
