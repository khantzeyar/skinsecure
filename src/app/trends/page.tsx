/** 
 * The trends regarding banned substances will be displayed on this page
 * - A bar chart is shown, highlighting the frequencies of the most banned products.
 * - Bullet points will be given on the right to show the ingredient and their respective frequency.
*/

"use client";
import 'chart.js/auto';
import dynamic from 'next/dynamic';
import React from 'react'

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

// Bar Chart information
const labels = ['Ingredient 5', 'Ingredient 4', 'Ingredient 3', 'Ingredient 2', 'Ingredient 1'];
const frequencies = [40, 50, 60, 70, 80];
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

const data = {
  labels: labels,
  datasets: [{
    label: 'Banned Frequency',
    data: frequencies,
    backgroundColor: backgroundColor,
    borderColor: ingredientColor,
    borderWidth: 1
  }]
};

const TrendsPage = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center mt-38'>
      <h1 className='font-bold text-3xl mb-8'>Frequency of the Most Banned Substances</h1>
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

export default TrendsPage