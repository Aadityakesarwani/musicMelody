import { Globe, Mic, Scroll } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Switch } from "@radix-ui/react-switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card,CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from "./ui/card"

export default function Generator() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          Generate Your Music
        </h2>
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Music Generation Options</CardTitle>
            <CardDescription>Customize your AI-generated music</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="prompt">
                Prompt to Song
              </label>
              <Textarea
                id="prompt"
                placeholder="Describe the music you want to generate..."
                className="min-h-[100px] border-purple-200 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-800 dark:focus:border-purple-500 dark:focus:ring-purple-500"
              />
            </div>
            {/* Language Select */}
            <div className="flex items-center space-x-4">
              <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <Select>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="marathi">Marathi</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Instrumental Switch */}
            <div className="flex items-center space-x-2">
              <Mic className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <Switch id="instrumental" />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="instrumental">
                Instrumental Only
              </label>
            </div>
            {/* Genre Select */}
            <div className="flex items-center space-x-4">
              <Scroll className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <Select>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select Genre" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="classical">Classical</SelectItem>
                  <SelectItem value="electronic">Electronic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900">
              Reset
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2">Generate Music</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}