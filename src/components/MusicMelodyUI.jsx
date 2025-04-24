import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Home, Settings, HelpCircle, Music, Mail, Compass } from "lucide-react";

export default function MusicMelodyUI() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleComposeClick = () => {
    navigate('/Generate', { state: { prompt } });
  };

  const handleGetHelp = () => {
    window.location.href = "mailto:innovativetuls@gmail.com?subject=Music Melody Help Request";
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-pink-50 to-purple-50">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-purple-600">Music Melody</h2>
          </div>
          <nav className="space-y-4">
            <Link to="/MusicLandingPage">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              >
                <Compass className="mr-2 h-5 w-5" />
                Explore
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => navigate('/Pricing')}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              onClick={handleGetHelp}
            >
              <HelpCircle className="mr-2 h-5 w-5" />
              Get Help
            </Button>
          </nav>
        </div>
        <div className="mt-auto">
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2 text-purple-600">
              <Music className="h-5 w-5" />
              <span className="text-sm font-medium">Music Melody Pro</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Unlock all features</p>
            <Button
              variant="outline"
              className="w-full mt-2 text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
              onClick={() => navigate('/Pricing')}
            >
              Upgrade
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            Generate your Own Music
          </h1>
        </motion.header>

        {/* Input Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Start Here</h2>
          <Card className="p-6 bg-purple-100 shadow-lg">
            <Textarea
              placeholder="Describe the music you want to generate..."
              className="bg-white mb-4 min-h-[120px] text-lg"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <span className="text-purple-600 font-bold">{prompt.length}/100</span> words
                <span className="ml-2">(20–100 words recommended)</span>
              </div>
              <Button
                variant="default"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-lg"
                onClick={handleComposeClick}
              >
                Compose Music
              </Button>
            </div>
          </Card>
        </section>

        {/* Prompt Examples */}
        <section className="mt-12">
          <h3 className="text-xl font-semibold mb-6">Prompt Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Dark, atmospheric electronic soundscape for a neon-lit dystopian city at night.",
              "Elegant classical music piece for a video showcasing sophisticated home interiors.",
              "Hip hop beats, jazzy chords played on an electric piano",
            ].map((prompt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setPrompt(prompt)}>
                  <p className="text-gray-700">{prompt}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Prompting Tips Section */}
        <section className="mt-16 space-y-4 space-x-7 mb-7">
          <h3 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-2xl lg:text-4xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-8">
            Prompting Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Use Column */}
            <div>
              <h4 className="text-lg font-semibold mb-8">Use</h4>
              <ul className="space-y-4 text-gray-700">
                <li>✅ Genre, mood, instrument, duration (10s to 15 minutes), or tempo in any combination.</li>
                <li>✅ Genre like ambient, cinematic, lo-fi, electronic, rock, hip-hop for best results.</li>
                <li>✅ Keywords to mention the intended use (e.g., podcast, game)</li>
                <li>✅ Descriptive adjectives (e.g., dreamy, energetic) for tailored outputs.</li>
              </ul>
            </div>

            {/* Avoid Column */}
            <div>
              <h4 className="text-lg font-semibold mb-8">Avoid</h4>
              <ul className="space-y-4 text-gray-700">
                <li>❌ Vague prompts; be specific.</li>
                <li>❌ Musical terms like keys, scales, or time signatures.</li>
                <li>❌ Asking for vocals, sounds effective or foley.</li>
                <li>❌ Including lyrics or scripts in prompts.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
