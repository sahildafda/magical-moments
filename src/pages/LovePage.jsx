import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import LoveLetter from '../components/LoveLetter';
import Gallery from '../components/Gallery';
import Timeline from '../components/Timeline';
import MusicPlayer from '../components/MusicPlayer';
import Surprise from '../components/Surprise';
import Loading from '../components/Loading';
import LoveLock from "../components/LoveLock";

const LovePage = () => {
  const { coupleId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionsRef = useRef(null);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Try to load the JSON file for the couple
        const response = await fetch(`/data/${coupleId}.json`);

        if (!response.ok) {
          throw new Error('Couple data not found');
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error('Error loading couple data:', err);
        setError(err.message);
      } finally {
        // Keep loading screen visible for at least 2 seconds for better UX
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    if (coupleId) {
      loadData();
    } else {
      setError('No couple ID provided');
      setLoading(false);
    }

    const isUnlocked =
      sessionStorage.getItem(`love-unlock-${coupleId}`) === "true";

    setUnlocked(isUnlocked);

  }, [coupleId]);

  const scrollToSections = () => {
    if (sectionsRef.current) {
      sectionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUnlock = () => {
    sessionStorage.setItem(`love-unlock-${coupleId}`, "true");
    setUnlocked(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-effect rounded-3xl p-12 max-w-md"
        >
          <div className="text-6xl mb-6">💔</div>
          <h2 className="font-display text-3xl font-bold gradient-text mb-4">
            Oops! Page Not Found
          </h2>
          <p className="font-body text-gray-700 mb-6">
            We couldn't find a surprise for "{coupleId}". Make sure the URL is correct!
          </p>
        </motion.div>
      </div>
    );
  }

  if (!loading && data && !unlocked) {
    return (
      <LoveLock
        correctCode={data.loveCode}
        onUnlock={handleUnlock}
      />
    );
  }

  return (

    <div className="relative">
      {/* Music Player */}
      <MusicPlayer musicUrl={data.music} />

      {/* Hero Section */}
      <Hero
        boyName={data.boyName}
        girlName={data.girlName}
        onOpenSurprise={scrollToSections}
      />

      {/* All other sections */}
      <div ref={sectionsRef}>
        <LoveLetter
          title={data.title}
          message={data.message}
        />

        <Gallery photos={data.photos} puzzlePhoto={data.puzzlePhoto} />

        <Timeline timeline={data.timeline} />

        {data.isSurprise === true && (
          <Surprise
            boyName={data.boyName}
            girlName={data.girlName}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-script text-2xl mb-2"
          >
            Made with Love ❤️
          </motion.p>
          <p className="font-body text-sm opacity-90">
            Create your own romantic surprise at our website
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LovePage;
