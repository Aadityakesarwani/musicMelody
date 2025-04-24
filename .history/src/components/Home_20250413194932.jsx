import  { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";


const audioList = [
  { id: 1, src: "/dummy-audio.mp3", duration: "01:01", isActive: true },
  { id: 2, src: "/dummy-audio.mp3", duration: "01:01", isActive: false },
  { id: 3, src: "/dummy-audio.mp3", duration: "01:01", isActive: false },
  { id: 4, src: "/dummy-audio.mp3", duration: "01:01", isActive: false }
];

const useGenerateMusic = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateMusic = async (prompt) => {
    setIsLoading(true);
    try {
      console.log("Generating music with prompt:", prompt);
      await new Promise((res) => setTimeout(res, 2000));
      alert("Music generated!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { generateMusic, isLoading };
};

export default function Home() {

    <aside className="w-1/5 p-4 bg-white shadow-md flex flex-col justify-between">
            <div>
              <nav className="space-y-2">
                <Link to="/MusicMelodyUI">
                  <Button variant="default" className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white px-3 py-3 mb-4">
                    Home
                  </Button>
                </Link>
                <Link to="/ProjectDetails">
                <Button variant="outline" className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white px-3 py-3 ">
                  Projects
                  </Button>
                  </Link>
              </nav>
            </div>
            <div className="space-y-1 text-sm text-gray-600 pl-2">
              <div className="cursor-pointer">⚙️ Settings</div>
              <div className="cursor-pointer">❓ Get Help</div>
            </div>
          </aside>



  const [isEditing, setIsEditing] = useState(false);
  const [promptText, setPromptText] = useState(
    "Hip hop beats, jazzy chords played on an electric piano, classy fashion video, 40 seconds"
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const { generateMusic, isLoading } = useGenerateMusic();
  const tooltipRef = useRef(null);

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };
    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <div className="space-y-4 relative p-4">
      <div className="bg-purple-100 p-4 rounded-xl shadow relative">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="w-full p-2 border rounded-md resize-none h-24"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      generateMusic(promptText);
                    }}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
                    disabled={isLoading}
                  >
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
              className="bg-purple-500 text-white px-4 py-2 rounded shadow"
            >
              Edit Prompt
            </button>
          )}
        </div>
      </div>

      {/* Tooltip centered */}
      {showTooltip && (
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
          </div>
        </div>
      )}

      {audioList.map((audio) => (
        <div
          key={audio.id}
          className={`flex justify-between items-center p-4 rounded-xl shadow ${
            audio.isActive ? "bg-purple-500 text-white" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              className={`rounded-full w-8 h-8 ${
                audio.isActive ? "bg-white text-purple-500" : "bg-purple-500 text-white"
              }`}
            >
              ►
            </button>
            <span>00:01</span>
            <audio src={audio.src} className="hidden" />
            <div className="h-2 w-40 bg-purple-200 rounded-full mx-2"></div>
            <span>{audio.duration}</span>
          </div>
          <button className="bg-white text-purple-500 px-3 py-1 rounded shadow">Download</button>
        </div>
      ))}
    </div>
  );
}
