// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { AuthProvider } from './contexts/AuthContext';
import { BetsProvider } from './contexts/BetsContext';
import { ChatProvider } from './contexts/ChatContext';
import { WalletProvider } from './contexts/WalletContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes';

/**
 * App
 *
 * Top-level component that sets up all context providers and routing.
 */
function App() {
  return (
    <AuthProvider>
      <BetsProvider>
        <ChatProvider>
          <WalletProvider>
            <I18nProvider>
              <BrowserRouter>
                <div className="flex flex-col min-h-screen bg-fortino-darkGreen text-fortino-softWhite">
                  <Navbar />
                  <main className="flex-grow container mx-auto px-4 py-6">
                    <AppRoutes />
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </I18nProvider>
          </WalletProvider>
        </ChatProvider>
      </BetsProvider>
    </AuthProvider>
  );
}

export default App;
