import { useEffect } from 'react';

export const Redirect = () => {
  useEffect(() => {
    const path = window.location.href.split('/').slice(-1)[0];
    window.location.href = `https://app.bipc.org.br/activate${path}`;
  }, []);

  return null;
}