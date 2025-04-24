import { motion } from "framer-motion"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              Ready to create your own AI-generated music?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
              Sign up now and start composing with the power of AI.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-sm space-y-2"
          >
            <form className="flex space-x-2">
              <Input
                className="max-w-lg flex-1 border-purple-200 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-800 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                placeholder="Enter your email"
                type="email"
              />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2">
                Sign Up
              </Button>
            </form>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}