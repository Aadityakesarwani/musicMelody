import React, { useState, useRef, useEffect } from "react";
import { Info, Globe, Mic, Scroll, CirclePlay, Play, Pause, Download, Music } from "lucide-react";
import { SoundFontPlayer } from '@magenta/music';
import { midiToSequenceProto } from '@magenta/music';
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Switch } from "@radix-ui/react-switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from "./ui/card";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// Define the API URL (make sure your Flask server is running here)
const API_URL = 'http://127.0.0.1:5000/api/generate';

// --- Custom Hook for API Call ---
const useGenerateMusic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateMusic = async (prompt, language, genre, isInstrumental) => {
    setIsLoading(true);
    setError(null);

    if (!prompt || prompt.trim() === "") {
        setError("Prompt cannot be empty.");
        setIsLoading(false);
        return null;
    }

    try {
      console.log("Sending prompt to backend:", { prompt, language, genre, isInstrumental });
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          style: prompt,
          language,
          genre,
          isInstrumental
        })
      });

      if (!response.ok) {
        let errorMsg = `API Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg = `API Error: ${errorData.error || response.statusText}`;
        } catch (jsonError) {
          console.error("Could not parse error response JSON:", jsonError);
        }
        throw new Error(errorMsg);
      }

      const midiBlob = await response.blob();
      const midiUrl = URL.createObjectURL(midiBlob);
      const contentType = response.headers.get('Content-Type') || 'audio/midi';

      console.log("Music generated successfully! URL:", midiUrl, "Type:", contentType);
      return { midiUrl, contentType, prompt };

    } catch (err) {
      console.error("Error generating music:", err);
      setError(err.message || "An unknown error occurred during generation.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateMusic, isLoading, error, clearError: () => setError(null) };
};

// --- MIDI Player Component ---
function MIDIPlayer({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [sequence, setSequence] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    console.log("Initializing MIDI player for track:", track);
    try {
      const midiPlayer = new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
      console.log("MIDI player initialized");
      setPlayer(midiPlayer);

      if (track.midiUrl) {
        console.log("Loading MIDI file from URL:", track.midiUrl);
        fetch(track.midiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to load MIDI file: ${response.status} ${response.statusText}`);
            }
            return response.arrayBuffer();
          })
          .then(midiData => {
            console.log("MIDI data loaded, converting to sequence");
            const seq = midiToSequenceProto(midiData);
            console.log("Sequence created, loading samples");
            setSequence(seq);
            // Calculate duration in seconds
            const totalTime = seq.totalTime;
            setDuration(totalTime);
            return midiPlayer.loadSamples(seq);
          })
          .then(() => {
            console.log("Samples loaded successfully");
          })
          .catch(error => {
            console.error('Error loading MIDI:', error);
            setError(error.message);
          });
      }
    } catch (error) {
      console.error("Error initializing MIDI player:", error);
      setError(error.message);
    }

    return () => {
      if (player) {
        player.stop();
      }
    };
  }, [track.midiUrl]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlayPause = () => {
    if (!player || !sequence) {
      console.log("Cannot play: player or sequence not ready");
      return;
    }

    try {
      if (isPlaying) {
        player.stop();
        setCurrentTime(0);
      } else {
        player.start(sequence);
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error toggling play/pause:", error);
      setError(error.message);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = track.midiUrl;
    const filename = track.prompt.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'generated_music';
    link.download = `${filename}.mid`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col p-4 rounded-xl shadow-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlayPause}
            className={`rounded-full w-10 h-10 flex items-center justify-center transition-all ${
              isPlaying ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-600"
            }`}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-purple-600" />
            <span className="text-gray-700 font-medium truncate max-w-[200px]">{track.prompt}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-purple-600"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentTime / duration) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Waveform Animation */}
      {isPlaying && (
        <motion.div 
          className="flex items-center justify-center gap-1 h-8 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-purple-600 rounded-full"
              initial={{ height: "4px" }}
              animate={{
                height: ["4px", "16px", "4px"],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}

      {error && (
        <span className="text-red-500 text-sm mt-2">
          Error: {error}
        </span>
      )}
    </motion.div>
  );
}

// --- Main Home Component ---
export default function Generate() {
  const location = useLocation();
  const [promptText, setPromptText] = useState(location.state?.prompt || "");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [isInstrumental, setIsInstrumental] = useState(false);
  const { generateMusic, isLoading, error: apiError, clearError } = useGenerateMusic();
  const [tracks, setTracks] = useState([]);

  const handleGenerateClick = async () => {
    clearError();
    const result = await generateMusic(promptText, language, genre, isInstrumental);

    if (result) {
      console.log("Generation successful, adding new track");
      const newTrack = {
        id: Date.now(),
        midiUrl: result.midiUrl,
        contentType: result.contentType,
        prompt: result.prompt,
      };
      setTracks(prevTracks => [newTrack, ...prevTracks]);
    } else {
      console.log("Generation failed or returned no result.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 p-8">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Generate Your Music
        </h1>
      </motion.header>

      <div className="max-w-4xl mx-auto space-y-8">
        {apiError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {apiError}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={clearError}>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </motion.div>
        )}

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Music Generation Options</CardTitle>
            <CardDescription>Customize your AI-generated music</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="prompt">
                Prompt to Music
              </label>
              <Textarea
                id="prompt"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Describe the music you want to generate..."
                className="min-h-[100px] border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* <Globe className="h-4 w-4 text-purple-600" /> */}
              <Select value={language} onValueChange={setLanguage}>
                {/* <SelectTrigger id="language" className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger> */}
                <SelectContent>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="marathi">Marathi</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Mic className="h-4 w-4 text-purple-600" />
              <Switch 
                id="instrumental" 
                checked={isInstrumental}
                onCheckedChange={setIsInstrumental}
              />
              <label className="text-sm font-medium leading-none" htmlFor="instrumental">
                Instrumental Only
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <Scroll className="h-4 w-4 text-purple-600" />
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger id="genre" className="w-[180px]">
                  <SelectValue placeholder="Select Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classical">Classical</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              className="border-purple-600 text-purple-600 hover:bg-purple-100"
              onClick={() => {
                setPromptText("");
                setLanguage("");
                setGenre("");
                setIsInstrumental(false);
              }}
            >
              Reset
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
              onClick={handleGenerateClick}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Music"}
            </Button>
          </CardFooter>
        </Card>

        {/* Generated Tracks Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Generated Tracks</h2>
          {tracks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-8"
            >
              No tracks generated yet. Use the form above to create your first track!
            </motion.div>
          ) : (
            <div className="space-y-4">
              {tracks.map(track => (
                <MIDIPlayer key={track.id} track={track} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}