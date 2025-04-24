import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export default function MusicLandingPage() {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRef = useRef(null);

  const handlePlay = (index) => {
    if (currentPlaying === index) {
      // If clicking the same song, toggle play/pause
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else {
      // If clicking a different song, stop current and play new
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentPlaying(index);
      // Create new audio element
      const audio = new Audio(`/src/music/${index + 1}.mp3`);
      audioRef.current = audio;
      audio.play();
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-FDDAF8 w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400">
                AI-Powered Music Generation
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                Create unique music with the power of AI. From prompts to full music, in any language or style.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-x-4"
            >
              <Link to="/MusicMelodyUI">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2">
                  Generate Music
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Music */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6 capitalize">Recent Music</h2>
        <div className="space-y-4">
          {[
            {
              title: "Pure Love",
              artist: "Top - Flow",
              duration: "1:18",
              image: "https://imgur.com/NLmT2xS.jpg",
            },
            {
              title: "Romantic Jazz Piano Music",
              artist: "Clavier-Music",
              duration: "1:30",
              image: "https://imgur.com/ylObbN3.jpg",
            },
            {
              title: "Upbeat Energetic Background Music",
              artist: "lNPLUSMUSIC",
              duration: "0:20",
              image: "https://imgur.com/8mbBVYU.jpg",
            },
            {
              title: "Reflected Light",
              artist: "SergePavkinMusic",
              duration: "0:40",
              image: "https://imgur.com/8KMTyZ1.jpg",
            },
            {
              title: "piano jazz",
              artist: "TürkFethi",
              duration: "0:30",
              image: "https://imgur.com/ylObbN3.jpg",
            },
          ].map((song, idx) => (
            <div key={idx} className="flex items-center justify-between border rounded-md hover:bg-gray-50 p-[20px]">
              <div>
                <h3 className="text-lg font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
                <p className="text-xs text-gray-400">{song.duration}</p>
                <button 
                  className="mt-2 px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-1"
                  onClick={() => handlePlay(idx)}
                >
                  {currentPlaying === idx ? (
                    <>
                      <Pause className="h-3 w-3" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3" />
                      Play
                    </>
                  )}
                </button>
              </div>
              <img
                src={song.image}
                alt={song.title}
                className="w-20 h-20 object-cover rounded-md shadow-sm"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              title: "Classical",
              desc: "A playlist of classical tunes to relax and unwind.",
              img: "https://imgur.com/NLmT2xS.jpg",
            },
            {
              title: "Jazz",
              desc: "Timeless jazz tracks from legends of the genre.",
              img: "https://imgur.com/ylObbN3.jpg",
            },
            {
              title: "Rock",
              desc: "Rock music to get you pumped up.",
              img: "https://imgur.com/8mbBVYU.jpg",
            },
            {
              title: "Electronic",
              desc: "Electronic music to get you dancing.",
              img: "https://imgur.com/8KMTyZ1.jpg",
            },
          ].map((cat, i) => (
            <div
              key={i}
              className="p-4 border rounded-md hover:shadow-md transition bg-white"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h4 className="text-lg font-semibold">{cat.title}</h4>
              <p className="text-sm text-gray-600">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
