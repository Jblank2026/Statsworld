"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SimplePageTracker from './components/SimplePageTracker';

const REACTION_GIFS = [
  "/images/gotcha.gif",
  "/images/random-snl.gif",
  "/images/dwight_shrute.gif",
  "/images/Patrick.gif",
  "/images/yawning.gif",
  "/images/doggy.gif",
  "/images/boxer.gif",
  "/images/Baby.gif",
  "/images/pug.gif"
];

const DAD_JOKES = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why don't skeletons fight each other? They don't have the guts.",
  "What do you call a fake noodle? An impasta!",
  "How do you organize a space party? You planet!",
  "Why did the scarecrow win an award? He was outstanding in his field!",
  "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
  "Why did the math book look so sad? Because it had too many problems!",
  "What do you call a bear with no teeth? A gummy bear!",
  "Why don't scientists trust stairs? Because they're always up to something!",
  "What did the ocean say to the beach? Nothing, it just waved.",
  "Why don't programmers like nature? It has too many bugs.",
  "What's orange and sounds like a parrot? A carrot!",
  "Why did the bicycle fall over? Because it was two-tired!",
  "What do you call a sleeping bull? A bulldozer!",
  "Why don't ghosts lie? You can see right through them.",
  "What do you call a group of musical whales? An orca-stra.",
  "Why did the music teacher go to jail? She got caught with sharp notes.",
  "What's a sheep's favorite sports game? Baaa-seball."
];

export default function Home() {
  const [joke, setJoke] = useState(DAD_JOKES[0]);
  const [gif, setGif] = useState(REACTION_GIFS[0]);

  const refreshJoke = () => {
    setJoke(DAD_JOKES[Math.floor(Math.random() * DAD_JOKES.length)]);
    setGif(REACTION_GIFS[Math.floor(Math.random() * REACTION_GIFS.length)]);
  };

  useEffect(() => {
    refreshJoke();
  }, []);

  return (
    <main>
      <SimplePageTracker />
      {/* Hero Section */}
      <div className="relative py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/data.jpeg"
            alt="Data Analytics Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#58595b] bg-opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8">
              JakesWorld | Supplemental Regression Modeling Tool
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-4">
              Your go-to test preparation resource for BAS 320! Master regression modeling through interactive learning experiences, 
              visual demonstrations, and hands-on practice.
            </p>
            <div className="mt-10 flex gap-x-6 justify-center">
              <Link
                href="/chapters"
                className="rounded-md bg-[#ff8200] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#e65933] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8200]"
              >
                Start Learning <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <section className="utk-section bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href="/chapters/2/visual-id"
              className="utk-card p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Visual ID Challenge</h3>
              <p className="text-gray-600">Test your pattern recognition skills!</p>
            </Link>

            <Link 
              href="/pdfs/R-studio help sheet.pdf"
              className="utk-card p-6 text-center hover:scale-105 transition-transform"
              target="_blank"
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">R Coding Cheat Sheet</h3>
              <p className="text-gray-600">Your quick guide to R success!</p>
            </Link>

            <a 
              href="https://www.youtube.com/@Stat201atUTK"
              className="utk-card p-6 text-center hover:scale-105 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-4xl mb-4">📺</div>
              <h3 className="text-xl font-semibold mb-2">STAT 201 YouTube</h3>
              <p className="text-gray-600">Watch and learn with us!</p>
            </a>

            <Link 
              href="/chapters/1"
              className="utk-card p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Start Chapter 1</h3>
              <p className="text-gray-600">Begin your stats adventure!</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Dad Joke */}
      <section className="utk-section bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Daily Dad Joke</h2>
          <div className="max-w-3xl mx-auto">
            <div className="utk-card p-8 text-center">
              <div className="relative w-64 h-64 mx-auto mb-8">
                <Image
                  src={gif}
                  alt="Reaction GIF"
                  width={256}
                  height={256}
                  unoptimized
                  className="object-cover rounded-lg w-full h-full"
                />
              </div>
              <p className="text-xl text-gray-600 italic mb-4">
                {joke}
              </p>
              <button 
                onClick={refreshJoke}
                className="bg-[#ff8200] text-white px-6 py-2 rounded-lg hover:bg-[#e65933] transition-colors mt-4"
              >
                Get Another Joke
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="utk-section utk-gradient text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Excel in Regression?</h2>
          <p className="text-xl mb-8">
            Join our learning community and master regression modeling through 
            interactive games and comprehensive resources.
          </p>
          <Link href="/chapters" className="inline-block bg-white text-[#ff8200] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Now
          </Link>
    </div>
      </section>
    </main>
  );
}
