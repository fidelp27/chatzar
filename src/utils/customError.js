import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const customError = (errorMessage) => {
  return toast.error(errorMessage, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
};

export const customSuccess = (successMessage) => {
  return toast.error(successMessage, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
