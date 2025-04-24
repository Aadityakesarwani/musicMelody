import { Component } from 'react';


class MoreSound extends Component {
  render() {
    return <div>{/* Some additional section */}</div>;
  }
}

const MusicLandingPage = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Optional use of MoreSound component */}
      <MoreSound />

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="text-xl font-bold text-purple-600">🎵 Music melody</div>
        <nav className="space-x-6 text-sm">
          <a href="#" className="hover:text-purple-600">Features</a>
          <a href="#" className="hover:text-purple-600">Pricing</a>
          <a href="#" className="hover:text-purple-600">FAQs</a>
          <a href="#" className="hover:text-purple-600">Sign In</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 bg-gradient-to-r from-pink-200 to-purple-200">
        <h1 className="text-5xl font-bold text-purple-800 mb-4">More Sound</h1>
        <p className="text-lg text-gray-700 mb-6">Explore our curated playlists for every mood and moment.</p>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">Listen Now</button>
      </section>

      {/* Remaining Sections ... */}
    </div>
  );
};

export default MusicLandingPage;
