/** 
 * The trends regarding banned substances will be displayed on this page
 * - A bar chart is shown, highlighting the frequencies of the most banned products.
 * - Bullet points will be given on the right to show the ingredient and their respective frequency.
*/

"use client";
import 'chart.js/auto';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

// Ingredient colors for chart + bullet points
const ingredientColor = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
];

// Lowers the opacity of the ingredient color for the bar color.
const backgroundColor = ingredientColor.map(rgb =>
  rgb.replace('rgb', 'rgba').replace(')', ', 0.2)')
);

const TrendsPage = () => {
  // State to store ingredient labels and frequencies
  const [labels, setLabels] = useState<string[]>([]);
  const [frequencies, setFrequencies] = useState<number[]>([]);

  // Fetch top 5 ingredients from the table
  useEffect(() => {
    async function fetchIngredients() {
      try {
        const res = await fetch("/api/ingredients");
        if (!res.ok) throw new Error("Failed to fetch ingredients");

        const data: { ingredient: string; ingredient_count: number }[] = await res.json();

        // Sort by frequency (desc) and take the top 5
        const sorted = data
          .sort((a, b) => b.ingredient_count - a.ingredient_count)
          .slice(0, 5);

        // Reverse order so Ingredient 1 is the rightmost on the chart
        const topLabels = sorted.map((row) => row.ingredient).reverse();
        const topFrequencies = sorted.map((row) => row.ingredient_count).reverse();

        setLabels(topLabels);
        setFrequencies(topFrequencies);
      } catch (err) {
        console.error(err);
      }
    }

    fetchIngredients();
  }, []);

  // Bar Chart information
  // Ternary operators are used to provide placeholder values until the data is fetched
  const data = {
    labels: labels.length > 0 ? labels : ["", "", "", "", ""],
    datasets: [{
      label: 'Banned Frequency',
      data: frequencies.length > 0 ? frequencies : [0, 0, 0, 0, 0],
      backgroundColor: backgroundColor,
      borderColor: ingredientColor,
      borderWidth: 1
    }]
  };

  return (
    <div className='w-full flex flex-col items-center justify-center mt-38'>
      <h1 className='font-bold text-3xl mb-8'>Frequency of the Most Banned Ingredients</h1>
      <div className="flex flex-row items-center gap-12">
        <div className="w-[900px] h-[400px]">
          <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <ul className="list-disc ml-6 text-lg">
          {[...labels].reverse().map((ingredient, idx) => ( // Display the ingredients in reverse order
            <li
              key={ingredient}
              // Assign the associated ingredient color to the respective bullet 
              style={{ ['--bullet-color' as string]: [...ingredientColor].reverse()[idx] }}
              className="text-black marker:[color:var(--bullet-color)]"
            >
              {ingredient} (<span>{[...frequencies].reverse()[idx]}</span>)
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TrendsPage;
