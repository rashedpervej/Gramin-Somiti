import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      containerStyle={{ top: 60 }}
      toastOptions={{
        duration: 3500,
        style: {
          background: '#fff',
          color: '#0F1724',
          borderRadius: '16px',
          padding: '12px 16px',
          fontSize: '14px',
          fontFamily: "'Hind Siliguri', 'Inter', sans-serif",
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.08)',
          maxWidth: '360px',
        },
        success: {
          iconTheme: {
            primary: '#0EA669',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#DC2626',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
