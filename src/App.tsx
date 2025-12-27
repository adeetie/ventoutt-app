import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/global/Header/Header.tsx';
import Footer from './components/global/Footer/Footer.tsx';
import Chatbot from './components/global/Chatbot/Chatbot.tsx';
import Popups from './components/global/Popups/Popups.tsx';
import Home from './pages/Home/Home';
import Coaching from './pages/Coaching/Coaching';
import Venting from './pages/Venting/Venting';
import Therapy from './pages/Therapy/Therapy';
import About from './pages/About/About';
import Services from './pages/Services/Services';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const handleOpenChatbot = () => setIsChatbotOpen(true);
    window.addEventListener('open-chatbot', handleOpenChatbot);
    return () => window.removeEventListener('open-chatbot', handleOpenChatbot);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-vo-bg flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/venting" element={<Venting />} />
            <Route path="/therapy" element={<Therapy />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
        <Popups onOpenChatbot={() => setIsChatbotOpen(true)} />
      </div>
    </Router>
  );
}

export default App;
