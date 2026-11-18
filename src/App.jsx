import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Preloader from './components/Preloader.jsx';

import Hero from './sections/Hero.jsx';
import ValidatedBy from './components/ValidatedBy.jsx';
import Platform from './sections/Platform.jsx';
import Benefits from './sections/Benefits.jsx';
import Features from './sections/Features.jsx';
import HowItWorks from './sections/HowItWorks.jsx';
import VideoShowcase from './sections/VideoShowcase.jsx';
import About from './sections/About.jsx';
import FAQ from './sections/FAQ.jsx';
import Contact from './sections/Contact.jsx';
import WaitlistCTA from './sections/WaitlistCTA.jsx';
import AboutPage from './pages/AboutPage.jsx';
import WalkthroughModal from './components/WalkthroughModal.jsx';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname === '/about' ? '/about' : '/';
  });
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  useEffect(() => {
    // If the page was opened with #home in the URL, remove it cleanly
    if (window.location.hash === '#home') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const checkWalkthroughHash = () => {
      const h = window.location.hash;
      if (h === '#book-walkthrough' || h === '#schedule-meeting' || h === '#demo') {
        setIsWalkthroughOpen(true);
      }
    };
    checkWalkthroughHash();

    const onPopState = () => {
      setCurrentPath(window.location.pathname === '/about' ? '/about' : '/');
      checkWalkthroughHash();
    };

    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', checkWalkthroughHash);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', checkWalkthroughHash);
    };
  }, []);

  const handleOpenWalkthrough = () => {
    setIsWalkthroughOpen(true);
  };

  const handleCloseWalkthrough = () => {
    setIsWalkthroughOpen(false);
    if (window.location.hash === '#book-walkthrough' || window.location.hash === '#schedule-meeting' || window.location.hash === '#demo') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const navigate = (to) => {
    if (to === '/about') {
      window.history.pushState(null, '', '/about');
      setCurrentPath('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (to === '/') {
      window.history.pushState(null, '', '/');
      setCurrentPath('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (to.startsWith('/#') || to.startsWith('#')) {
      const hash = to.includes('#') ? '#' + to.split('#')[1] : '';
      if (currentPath !== '/') {
        window.history.pushState(null, '', '/' + hash);
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', '/' + hash);
      }
    }
  };

  return (
    <>
      <Preloader />
      <Navbar currentPath={currentPath} onNavigate={navigate} onOpenWalkthrough={handleOpenWalkthrough} />
      {currentPath === '/about' ? (
        <main>
          <AboutPage onNavigate={navigate} onOpenWalkthrough={handleOpenWalkthrough} />
        </main>
      ) : (
        <main>
          <Hero onOpenWalkthrough={handleOpenWalkthrough} />
          <ValidatedBy />
          <Platform />
          <Benefits />
          <Features />
          <HowItWorks />
          <VideoShowcase onOpenWalkthrough={handleOpenWalkthrough} />
          <About onNavigate={navigate} />
          <FAQ />
          <Contact onOpenWalkthrough={handleOpenWalkthrough} />
          <WaitlistCTA onOpenWalkthrough={handleOpenWalkthrough} />
        </main>
      )}
      <Footer currentPath={currentPath} onNavigate={navigate} onOpenWalkthrough={handleOpenWalkthrough} />
      <WalkthroughModal isOpen={isWalkthroughOpen} onClose={handleCloseWalkthrough} />
    </>
  );
}
