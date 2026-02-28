import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Loader2 } from 'lucide-react';
import './SplashScreen.css';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing AI Services...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/auth');
          }, 200);
        }

        if (next < 30) {
          setLoadingText('Initializing AI Services...');
        } else if (next < 60) {
          setLoadingText('Loading Medical Database...');
        } else if (next < 90) {
          setLoadingText('Securing Connection...');
        } else {
          setLoadingText('Almost Ready...');
        }

        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="logo-section">
          <div className="icon-container">
            <Heart size={60} strokeWidth={2} />
          </div>
          <h1 className="title">LifeLink</h1>
          <p className="subtitle">Smart Emergency Healthcare at Your Fingertips</p>
        </div>

        <div className="loading-section">
          <div className="loading-container">
            <div className="loading-text-row">
              <Loader2 className="loading-icon" size={16} />
              <span className="loading-text">{loadingText}</span>
            </div>
            <span className="percentage">{progress}%</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="footer">
          <div className="footer-dots">
            <div className="dot" />
            <span className="footer-text">Secure</span>
            <div className="dot" />
            <span className="footer-text">Encrypted</span>
            <div className="dot" />
            <span className="footer-text">24/7 AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
