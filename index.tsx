import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css';

// Error Boundary — captura erros e mostra mensagem ao invés de tela branca
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center', color: '#1e293b' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>⚠️ Erro ao carregar o aplicativo</h1>
          <p style={{ color: '#64748b', marginBottom: '1rem' }}>
            Verifique se as variáveis de ambiente estão configuradas no painel da Vercel.
          </p>
          <pre style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', color: '#ef4444', textAlign: 'left', overflowX: 'auto' }}>
            {this.state.error.message}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '1.5rem', padding: '0.75rem 2rem', background: '#6366f1', color: 'white', border: 'none', borderRadius: '9999px', cursor: 'pointer', fontWeight: 700 }}>
            Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Elemento #root não encontrado.");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);