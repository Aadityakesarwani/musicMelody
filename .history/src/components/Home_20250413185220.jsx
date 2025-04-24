import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

// Define the API URL (make sure your Flask server is running here)
const API_URL = 'http://127.0.0.1:5000/api/generate';

// --- Custom Hook for API Call ---
const useGenerateMusic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // State to hold potential errors

  const generateMusic = async (prompt) => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    if (!prompt || prompt.trim() === "") {
        setError("Prompt cannot be empty.");
        setIsLoading(false);
        // You might want to throw an error here instead or handle it differently
        // throw new Error("Prompt cannot be empty.");
        return null;
    }

    try {
      console.log("Sending prompt to backend:", prompt);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style: prompt })
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

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const contentType = response.headers.get('Content-Type') || 'audio/wav';

      console.log("Music generated successfully! URL:", audioUrl, "Type:", contentType);
      return { audioUrl, contentType, prompt };

    } catch (err) {
      console.error("Error generating music:", err);
      // Store the error message for display
      setError(err.message || "An unknown error occurred during generation.");
      // Re-throw or return null/undefined to signal failure
      // throw err; // Option 1: re-throw if caller needs to handle specifically
      return null; // Option 2: return null to indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  return { generateMusic, isLoading, error, clearError: () => setError(null) }; // Expose clearError
};
// --- End of Hook ---


// --- Audio Player Component (Simple Example) ---
function AudioPlayer({ track }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      if (audio.duration && !isNaN(audio.duration)) {
         setDuration(audio.duration);
      }
    }
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false)); // Reset play button on end

    // Set initial duration if already loaded
    if (audio.readyState >= 1) { // HAVE_METADATA
      setAudioData();
    }

    // Cleanup
    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []); // Runs once on mount

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Error playing audio:", e)); // Play returns a promise
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = track.src; // Use the blob URL directly
    const fileExtension = track.contentType === 'audio/wav' ? 'wav' : 'mid';
    // Create a filename from the prompt (simplified)
    const filename = track.prompt.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'generated_music';
    link.download = `${filename}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Optional: Keep the blob URL if needed elsewhere, otherwise revoke it
    // URL.revokeObjectURL(track.src); // Revoking might break playback if component rerenders
  };

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-xl shadow bg-white`} // Simplified styling
    >
      <div className="flex items-center gap-2 flex-grow">
        <button
          onClick={togglePlayPause}
          className={`rounded-full w-8 h-8 flex items-center justify-center ${
             "bg-purple-500 text-white" // Simplified active state
          }`}
        >
          {isPlaying ? '❚❚' : '►'}
        </button>
        <span>{formatTime(currentTime)}</span>
        {/* Basic progress bar */}
        <div className="h-2 flex-grow bg-purple-200 rounded-full mx-2 overflow-hidden">
             <div
                className="h-full bg-purple-500"
                style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
             ></div>
        </div>
        <span>{formatTime(duration)}</span>
        {/* Hidden audio element */}
        <audio ref={audioRef} src={track.src} preload="metadata"></audio>
      </div>
      <button
        onClick={handleDownload}
        className="bg-purple-500 text-white px-3 py-1 rounded shadow ml-4 hover:bg-purple-600"
      >
        Download
      </button>
    </div>
  );
}
// --- End of Audio Player Component ---


// --- Main Home Component ---
export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [promptText, setPromptText] = useState(
    "Hip hop beats, jazzy chords played on an electric piano, classy fashion video, 40 seconds"
  );
  const [showTooltip, setShowTooltip] = useState(false);
  // Use the hook
  const { generateMusic, isLoading, error: apiError, clearError } = useGenerateMusic();
  const tooltipRef = useRef(null);
  // State for the list of generated tracks
  const [tracks, setTracks] = useState([]);

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };
    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
       document.removeEventListener("mousedown", handleClickOutside); // Clean up listener
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  const handleGenerateClick = async () => {
    setIsEditing(false); // Exit editing mode
    clearError(); // Clear previous API errors before new attempt

    const result = await generateMusic(promptText);

    if (result) {
      // Add the new track to the state
      const newTrack = {
        id: Date.now(), // Simple unique ID
        src: result.audioUrl,
        contentType: result.contentType,
        prompt: result.prompt,
        // We don't know the duration until loaded, handle in AudioPlayer
      };
      setTracks(prevTracks => [newTrack, ...prevTracks]); // Add to the beginning of the list
    } else {
      // Error is already set in the hook, it will be displayed below
      console.log("Generation failed or returned no result.");
    }
  };


  return (
    <div className="space-y-4 relative p-4">
      {/* Display API Error if it exists */}
      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {apiError}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={clearError}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      )}

      {/* Prompt Editing Area */}
      <div className="bg-purple-100 p-4 rounded-xl shadow relative">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="w-full p-2 border rounded-md resize-none h-24"
                  placeholder="Describe the music (genre, mood, instruments...)"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerateClick} // Use the new handler
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                    disabled={isLoading} // Disable while loading
                  >
                    {/* Show loading text */}
                    {isLoading ? "Generating..." : "Save + Generate"}
                  </button>

                  <button
                    onClick={() => setShowTooltip(true)}
                    className="text-purple-500 hover:text-purple-700"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">{promptText}</p>
            )}
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded shadow hover:bg-purple-600"
            >
              Edit Prompt
            </button>
          )}
        </div>
      </div>

      {/* Tooltip (unchanged) */}
      {showTooltip && (
         // ... tooltip JSX remains the same ...
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
          <div
            ref={tooltipRef}
            className="bg-white border rounded-2xl shadow-xl p-6 w-[420px] relative"
          >
            <h3 className="font-semibold text-lg text-center mb-4">Prompting Tips</h3>
            <div className="flex gap-8 text-gray-700 text-sm">
              <div className="flex-1">
                <p className="font-bold mb-2">✅ Use</p>
                <ul className="space-y-3 list-none">
                  <li>Genre, mood, instrument, duration (10s–15 mins), or tempo in any combination.</li>
                  <li>Genres like ambient, cinematic, lo-fi, electronic, rock, hip-hop.</li>
                  <li>Keywords for use-case (e.g. podcast, game).</li>
                  <li>Descriptive adjectives (e.g. dreamy, energetic) for tailored outputs.</li>
                </ul>
              </div>
              <div className="flex-1">
                <p className="font-bold mb-2 text-red-600">✖️ Avoid</p>
                <ul className="space-y-3 list-none text-red-600">
                  <li>Vague prompts — be specific.</li>
                  <li>Musical terms like keys, scales, or time signatures.</li>
                  <li>Asking for vocals, effects, or foley.</li>
                  <li>Lyrics or scripts in prompts.</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-gray-500">
              Want to read more?{" "}
              <a href="#" className="underline text-purple-500">
                Get the full guide here
              </a>
            </p>
             <button onClick={() => setShowTooltip(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖️</button>
          </div>
        </div>
      )}


      {/* Render the list of generated tracks */}
      {tracks.map((track) => (
        <AudioPlayer key={track.id} track={track} />
      ))}

       {/* Placeholder if no tracks yet */}
       {tracks.length === 0 && !isLoading && (
           <div className="text-center text-gray-500 mt-8">
               No music generated yet. Use the editor above!
           </div>
       )}


    </div>
  );
}