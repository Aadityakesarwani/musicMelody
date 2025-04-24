import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function Hero() {
  

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
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
              Create unique music with the power of AI. From prompts to full songs, in any language or style.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-x-4"
          >
            <Button></Button>
            className="bg-purple-600 mt-3 hover:bg-purple-700 text-white px-4 py-2" >
              Get Started</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
