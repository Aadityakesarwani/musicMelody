import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlay, Music2 } from "lucide-react";

export default function MusicMelodyUI() {
  return (
    <div className="flex h-screen bg-gradient-to-r from-pink-50 to-purple-50">
      {/* Sidebar */}
      <div className="w-1/5 p-4 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="text-xl font-bold text-purple-600 flex items-center gap-2 mb-8">
            <Music2 className="text-purple-600" /> Music melody
          </div>
          <div className="space-y-2">
            <Button variant="secondary" className="w-full justify-start bg-purple-600 text-white hover:bg-purple-700">Home</Button>
            <Button variant="outline" className="w-full justify-start">Projects</Button>
          </div>
        </div>
        <div className="space-y-1 text-sm text-gray-600 pl-2">
          <div className="cursor-pointer">⚙️ Settings</div>
          <div className="cursor-pointer">❓ Get Help</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-gray-800">Prompting Tips</div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Start here</h2>
          <Card className="p-6 bg-purple-100">
            <Textarea placeholder="Describe the music you want to generate" className="bg-white mb-4" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-purple-600 font-bold">0/100 words</span>
              <span className="text-gray-500">works best for 20-100 words</span>
              <Button className="bg-purple-600 text-white hover:bg-purple-700">compose music</Button>
            </div>
          </Card>
        </div>

        <div className="mt-10">
          <h3 className="text-md font-semibold mb-4">Prompt Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <p className="text-sm text-gray-700">30 seconds dark, atmospheric electronic track capturing the feeling of exploring a dystopian futuristic city at night.</p>
              <div className="flex justify-end mt-2 gap-2">
                <CirclePlay className="cursor-pointer" />
                <Button variant="ghost" size="icon" className="text-purple-600">▶</Button>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-700">30 seconds peaceful lo-fi music track for a video showcasing home interiors</p>
              <div className="flex justify-end mt-2 gap-2">
                <CirclePlay className="cursor-pointer" />
                <Button variant="ghost" size="icon" className="text-purple-600">▶</Button>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-700">Hip hop beats, jazzy chords played on an electric piano, classy fashion video, 40 seconds</p>
              <div className="flex justify-end mt-2 gap-2">
                <CirclePlay className="cursor-pointer" />
                <Button variant="ghost" size="icon" className="text-purple-600">▶</Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-md font-semibold mb-2">Recents Projects</h3>
          <p className="text-sm text-gray-600">You don’t have any projects yet! start by composing a new music track</p>
        </div>
      </div>
    </div>
  );
}
