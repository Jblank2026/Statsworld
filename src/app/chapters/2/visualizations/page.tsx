"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import ChapterNavigation from '../../../components/ChapterNavigation';

// Define visualization types and their descriptions
const visualizations = [
  {
    name: "Bar Chart",
    description: "Perfect for comparing categories! Bar charts display categorical data using rectangular bars of varying heights or lengths. They're your go-to for showing which category has more or less of something.",
    usage: "Use when you want to compare quantities across different categories.",
    example: "Michael's 'That's What She Said' count by department, Dwight's monthly sales by client type, or Jim's prank success rates by category.",
    variables: "Univariate",
    varTypes: "Categorical",
    image: "/images/viz-3.svg"
  },
  {
    name: "Pie Chart",
    description: "Shows parts of a whole! Pie charts divide a circle into slices to show proportions of a total. Each slice represents a category's percentage of the whole.",
    usage: "Best for showing proportions when you have a small number of categories (ideally 6 or fewer).",
    example: "Michael's time distribution between 'actual work' and 'planning office parties', or the office's annual budget split between paper sales and Dundies awards.",
    variables: "Univariate",
    varTypes: "Categorical",
    image: "/images/viz-7.svg"
  },
  {
    name: "Dot Plot",
    description: "Displays individual data points along a number line. Each dot represents one observation, stacking when values repeat.",
    usage: "Great for showing the distribution of a small to moderate number of values.",
    example: "Number of times Dwight checks the security cameras per hour, or Stanley's crossword puzzle completion times throughout the day.",
    variables: "Univariate",
    varTypes: "Quantitative",
    image: "/images/viz-8.svg"
  },
  {
    name: "Frequency Table",
    description: "Organizes data into categories and shows how often each category occurs. It's like a data spreadsheet that counts things!",
    usage: "Perfect for summarizing categorical data in a clear, organized way.",
    example: "Tracking Angela's cat emergency types, or tallying up Kevin's different ways of spilling things in the office.",
    variables: "Univariate",
    varTypes: "Categorical",
    image: "/images/viz-4.svg"
  },
  {
    name: "Histogram",
    description: "Shows the shape of numerical data! Histograms group numbers into ranges (bins) and show how many fall into each range.",
    usage: "Ideal for showing the distribution of continuous data.",
    example: "Distribution of time Michael spends on YouTube vs. actual work, or the duration of Dwight's security briefings.",
    variables: "Univariate",
    varTypes: "Quantitative",
    image: "/images/viz-2.svg"
  },
  {
    name: "Side-by-Side Box Plot",
    description: "Compares distributions across groups using five-number summaries (minimum, Q1, median, Q3, maximum). Great for spotting differences and outliers!",
    usage: "Perfect for comparing distributions between different groups.",
    example: "Comparing sales performance between Jim and Dwight over time, or analyzing Michael's 'That's What She Said' frequency before and after HR warnings.",
    variables: "Bivariate",
    varTypes: "Both",
    image: "/images/viz-6.svg"
  },
  {
    name: "Mosaic Plot",
    description: "Shows relationships between categorical variables using rectangles. The size of each rectangle represents frequency or proportion.",
    usage: "Useful for visualizing relationships between two or more categorical variables.",
    example: "Analyzing the relationship between Ryan's hair styles and his job titles, or comparing Andy's singing frequency by meeting type.",
    variables: "Bivariate",
    varTypes: "Categorical",
    image: "/images/viz-5.svg"
  },
  {
    name: "Scatter Plot",
    description: "Reveals relationships between two numerical variables. Each point represents one observation's values for both variables.",
    usage: "Perfect for exploring potential relationships between two quantitative variables.",
    example: "Investigating if there's a relationship between Michael's movie quote references and office productivity, or comparing Pam's reception vs. art school grades.",
    variables: "Bivariate",
    varTypes: "Quantitative",
    image: "/images/viz-1.svg"
  }
];

export default function VisualArsenal() {
  const [selectedViz, setSelectedViz] = useState(visualizations[0]);

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="visualization" className="text-4xl">📊</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Visual Arsenal</h1>
              <p className="text-xl text-gray-600 mt-2">Master your data visualization toolkit! 🎨</p>
            </div>
          </div>

          {/* Dropdown Selection */}
          <div className="mb-8">
            <label htmlFor="visualization-select" className="block text-sm font-medium text-[#58595b] mb-2">
              Select a Visualization Type:
            </label>
            <select
              id="visualization-select"
              value={selectedViz.name}
              onChange={(e) => setSelectedViz(visualizations.find(v => v.name === e.target.value) || visualizations[0])}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#ff8200] focus:ring-[#ff8200]"
            >
              {visualizations.map((viz) => (
                <option key={viz.name} value={viz.name}>
                  {viz.name}
                </option>
              ))}
            </select>
          </div>

          {/* Visualization Display */}
          <div className="space-y-8">
            {/* Image */}
            <div className="relative h-64 bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={selectedViz.image}
                alt={selectedViz.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#58595b] mb-2">{selectedViz.name}</h3>
                <p className="text-gray-600">{selectedViz.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-[#ff8200] mb-2">When to Use</h4>
                  <p className="text-gray-600">{selectedViz.usage}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-[#ff8200] mb-2">Example Scenarios</h4>
                  <p className="text-gray-600">{selectedViz.example}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-[#ff8200] mb-2">Technical Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#58595b]">Number of Variables:</p>
                    <p className="text-gray-600">{selectedViz.variables}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#58595b]">Variable Types:</p>
                    <p className="text-gray-600">{selectedViz.varTypes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 