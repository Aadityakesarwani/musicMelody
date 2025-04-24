import video1 from "../assets/1.mp4";
import video2 from "../assets/2.mp4";
import video3 from "../assets/3.mp4";
import video4 from "../assets/4.mp4";
import video5 from "../assets/5.mp4";
import { Link } from "react-router-dom";

export default function MusicSection() {
  const videos = [video1, video2, video3, video4, video5];

  return (
    <section className="w-full py-16 bg-white text-center">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400">
          Feel the Beat of Your Imagination
        </h2>

        {/* Subtext */}
        <p className="mx-auto mt-4 max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
          Got a tune in mind, some lyrics on paper, or just a vibe you want to bring to life?
          <span className="text-purple-700 font-semibold"> Music Melody </span>
          turns your ideas into high-quality music with ease.
        </p>
        <br /><br />

        {/* Video Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-7 justify-center items-center mb-10">
          {videos.map((vid, index) => (
            <div key={index}>
              <video
                src={vid}
                controls
                className="w-[300px] h-[350px] rounded-md"
              />
            </div>
          ))}
        </div>

          
      </div>
    </section>
  );
}
