import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { CirclePlay } from "lucide-react";

export default function MusicMelodyUI() {
  return (
    <div className="flex h-screen bg-gradient-to-r from-pink-50 to-purple-50">
      {/* Sidebar */}
      <aside className="w-1/5 p-4 bg-white shadow-md flex flex-col justify-between">
        <div>
          <nav className="space-y-2">
            <Link to="/MusicLandingPage">
              <Button variant="default" className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white px-3 py-3 mb-4">
                Home
              </Button>
            </Link>
            <Link to="/ProjectDetails">
              <Button variant="outline" className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white px-3 py-3">
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-2xl font-bold tracking-tighter sm:text-2xl md:text-2xl lg:text-4xl/none bg-clip-text text-transparent
           bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400
           dark:via-pink-400 dark:to-blue-400">
            Generate your Own Music
          </h1>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
          </Avatar>
        </motion.header>

        {/* Input Section */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Start Here</h2>
          <Card className="p-6 bg-purple-100">
            <Textarea
              placeholder="Describe the music you want to generate"
              className="bg-white mb-4"
            />
            <div className="flex justify-between items-center text-sm">
              <span className="text-purple-600 font-bold">0/100 words</span>
              <span className="text-gray-500">Works best for 20–100 words</span>
              <Link to="/home">
                <Button variant="default" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2">Compose Music</Button>
              </Link>
            </div>
          </Card>
        </section>

        {/* Prompt Examples */}
        <section className="mt-10">
          <h3 className="text-md font-semibold mb-4">Prompt Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "30 seconds dark, atmospheric electronic track capturing the feeling of exploring a dystopian futuristic city at night.",
              "30 seconds peaceful lo-fi music track for a video showcasing home interiors",
              "Hip hop beats, jazzy chords played on an electric piano, classy fashion video, 40 seconds"
            ].map((prompt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <p className="text-sm text-gray-700">{prompt}</p>
                  <div className="flex justify-end mt-2 gap-2">
                    <CirclePlay className="cursor-pointer text-purple-600" />
                    <Button variant="ghost" size="icon">▶</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Prompting Tips Section */}
        <section className="mt-12 bg-white space-y-4 space-x-7">
          <h3 className="text-xl font-bold mb-6 text-center">Prompting Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Use Column */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Use</h4>
              <ul className="space-y-4 text-gray-700">
                <li>✅ Genre, mood, instrument, duration (10s to 15 minutes), or tempo in any combination.</li>
                <li>✅ Genre like ambient, cinematic, lo-fi, electronic, rock, hio-hop for best results.</li>
                <li>✅ Keywords to mention the intended use (e.g., podcast, game)</li>
                <li>✅ Descriptive adjectives (e.g., dreamy, energetic) for tailored outputs.</li>
              </ul>
            </div>

            {/* Avoid Column */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Avoid</h4>
              <ul className="space-y-4 text-gray-700">
                <li>❌ Vague prompts; be specific.</li>
                <li>❌ Musical terms like keys, scales, or time signatures.</li>
                <li>❌ Asking for vocals, sounds effective or foiey.</li>
                <li>❌ Including lyrics or scripts in prompts.</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-sm text-center font-medium text-gray-800">
            want to read more? get the full guide here
          </p>
        </section>
      </main>
    </div>
  );
}
