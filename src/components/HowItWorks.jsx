'use client'

import { motion } from "framer-motion"
import { Music, Globe, Download } from "lucide-react"


export default function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          How It Works
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-800">
              <Music className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">1. Input Your Prompt</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Describe the music you want to create using natural language.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-800">
              <Globe className="h-8 w-8 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400">2. Customize Options</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Choose language, style, and whether you want lyrics or instrumental.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800">
              <Download className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">3. Generate and Download</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Our AI creates your unique track, ready for you to download and enjoy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}