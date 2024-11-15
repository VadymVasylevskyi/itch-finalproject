/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import api from "../../api/axiosConfig"

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

  return { comments, loading, setPostId };
};
