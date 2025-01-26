/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Diary = () => {
  const [userMood, setUserMood] = useState('');
  const [diaryEntry, setDiaryEntry] = useState('');
  const [moodChart, setMoodChart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle mood selection and send to the backend
  const moodFun = async (mood: string) => {
    try {
      setUserMood(mood);
      const currentDate = new Date().toLocaleDateString(); // Get the current date in readable format

      // Send mood and current date to the backend
      const res = await axios.post('/api/diary', { mood, date: currentDate });
      console.log(res.data);

      // Add the new mood and date to the chart state
      setMoodChart((prevMoodChart) => [
        ...prevMoodChart,
        { mood, date: currentDate },
      ]);
    } catch (error: any) {
      console.error("Error during POST request:", error.response || error);
    }
  };

  // Fetch data for the chart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/diary');
        console.log("Fetched mood data: ", response.data); 
        setMoodChart(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mood data:', error);
      }
    };
    fetchData();
  }, []);

  // Convert moods to numeric values for chart
  const moodToNumeric = (mood: string) => {
    switch (mood) {
      case "Happy 😊":
        return 1;
      case "Sad 😔":
        return 2;
      case "Stressed 😣":
        return 3;
      case "Exhausted 😴":
        return 4;
      case "Angry 😠":
        return 5;
      default:
        return 0;
    }
  };

  // Chart data and options
  const chartData = {
    labels: moodChart.map((entry: any) => entry.date), // X-axis: Dates
    datasets: [
      {
        label: "Mood Over Time",
        data: moodChart.map((entry: any) => moodToNumeric(entry.mood)), // Y-axis: Mood levels (numeric)
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Mood Trends Over Time",
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Mood Level",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-3 min-h-screen bg-cheer text-gray-800 p-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-lavender mb-2">How are you feeling today?</h1>
        <p className="text-lg">Select a mood to get started</p>
      </div>

      {/* Mood Options */}
      <div className="flex justify-center gap-4 mb-12">
        {["Happy 😊", "Sad 😔", "Stressed 😣", "Exhausted 😴", "Angry 😠"].map((mood, index) => (
          <button
            key={index}
            onClick={() => moodFun(mood)}
            className="px-4 py-2 bg-lavender text-white font-semibold rounded-lg shadow hover:opacity-90"
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Mood Confirmation */}
      {userMood && (
        <div className="text-center text-lg text-lavender">
          Would you like to share your reason for being <span className="font-bold">{userMood}</span>?
        </div>
      )}

      {/* Diary Entry Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-lavender mb-4">Your Diary</h2>
        <textarea
          value={diaryEntry}
          onChange={(e) => setDiaryEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          className="w-full border-2 border-lavender rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-lavender"
          rows={6}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button
            className="px-6 py-2 bg-lavender text-white font-semibold rounded-lg shadow hover:opacity-90"
            onClick={() => alert("Diary entry submitted!")} // Replace with actual submit logic
          >
            Submit
          </button>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-lavender mb-4">Emotion Trends</h2>
        {loading ? (
          <div className="text-center">Loading chart...</div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default Diary;
