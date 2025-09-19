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

const STATS_JOKES = [
  "Why don't statistics ever lie? Because they make up everything!",
  "What do you call a statistician who's always happy? Normally distributed!",
  "Why did the data point break up with the trend line? It felt like their relationship wasn't significant!",
  "What's a statistician's favorite type of music? Heavy correlation!",
  "Why don't data scientists trust stairs? Because they're always plotting something!",
  "What did the histogram say to the bar chart? You're really raising the bar!",
  "Why was the standard deviation feeling sad? It felt so far from the mean!",
  "What do you call a sleeping statistics professor? A z-score!",
  "Why did the p-value go to therapy? It had confidence interval issues!",
  "What's a data analyst's favorite dessert? Pie charts!",
  "Why don't statisticians play hide and seek? Because good luck hiding from regression analysis!",
  "What did the scatter plot say to the correlation coefficient? You complete me!",
  "Why was the sample size always invited to parties? It made everything more significant!",
  "What do you call a bear that works with data? A pandas bear!",
  "Why did the chi-square test go to the gym? To work on its degrees of freedom!",
  "What's a statistician's favorite game? Probability poker!",
  "Why don't normal distributions ever get lost? They always know where the center is!",
  "What did the outlier say to the dataset? I'm just trying to stand out!",
  "Why was the mean always so popular? It was the center of attention!",
  "What do you call a group of singing data points? A histogram choir!",
  "Why did the researcher love coffee? It helped with their daily grind... of data!"
];

export default function Home() {
  const [joke, setJoke] = useState(STATS_JOKES[0]);
  const [gif, setGif] = useState(REACTION_GIFS[0]);

  const refreshJoke = () => {
    setJoke(STATS_JOKES[Math.floor(Math.random() * STATS_JOKES.length)]);
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
            src="/images/background.jpg"
            alt="Statistics Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#58595b] bg-opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8">
              Jake's World | The Statistics Tool
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-4">
              Your comprehensive statistics learning platform! Master data analysis, visualizations, associations, 
              and statistical modeling through interactive experiences and hands-on practice.
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
              href="/chapters/1"
              className="utk-card p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Statistics Basics</h3>
              <p className="text-gray-600">Start your statistical journey!</p>
            </Link>

            <Link 
              href="/chapters/6/scatterplots"
              className="utk-card p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Correlation & Scatterplots</h3>
              <p className="text-gray-600">Discover relationships in data!</p>
            </Link>

            <Link 
              href="/chapters/5/z-scores"
              className="utk-card p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold mb-2">Z-Scores & Normal Model</h3>
              <p className="text-gray-600">Master the bell curve!</p>
            </Link>

            <Link 
              href="/resources"
              className="utk-card p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Learning Resources</h3>
              <p className="text-gray-600">YouTube videos & more!</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Statistics Joke */}
      <section className="utk-section bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Daily Statistics Humor</h2>
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
                Get Another Stats Joke
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="utk-section utk-gradient text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Master Statistics?</h2>
          <p className="text-xl mb-8">
            Join our learning community and explore the fascinating world of statistics through 
            interactive visualizations, data analysis challenges, and comprehensive tutorials.
          </p>
          <Link href="/chapters" className="inline-block bg-white text-[#ff8200] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Your Statistical Journey
          </Link>
        </div>
      </section>
    </main>
  );
}
