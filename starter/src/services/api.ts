import axios from 'axios';

// ============================================================
// Instancia Axios compartida para toda la app
// ============================================================
// TODO: pega aquí la URL base de tu proyecto en MockAPI,
// SIN el "/currencies" al final. Ejemplo:
//   https://abc123def456.mockapi.io/api/v1
const API_BASE_URL = 'https://6af67c5ce844c7ff741b64b5.mockapi.io/api/v1'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor de respuesta: deja un log en desarrollo cuando falla una petición
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (__DEV__ && axios.isAxiosError(error)) {
      console.error('[API Error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  },
);