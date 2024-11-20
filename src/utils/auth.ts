export const isAuthenticated = () => {
    const token = localStorage.getItem("token"); // Или использовать ваш метод аутентификации
    return !!token;
  };