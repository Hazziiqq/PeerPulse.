/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/diary/route.ts

import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Mood from "@/models/moodModel";

connectDB();

// Handle POST request for saving mood
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("Incoming request data:", reqBody);

    const { mood } = reqBody;
    const validMoods = ["Happy 😊", "Sad 😔", "Stressed 😣", "Exhausted 😴", "Angry 😠"];

    if (!validMoods.includes(mood)) {
      return NextResponse.json({ error: 'Invalid mood selected' }, { status: 400 });
    }

    const newMood = new Mood({
      mood,
      date: new Date(),
    });

    await newMood.save();
    console.log("Mood saved successfully");

    return NextResponse.json({ message: "Mood recorded successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error in POST request:", error.stack || error);
    return NextResponse.json({ error: 'Something went wrong. Please try later' }, { status: 500 });
  }
}

// Handle GET request for retrieving mood data
export async function GET(request: NextRequest) {
  try {
    const moodData = await Mood.find();  // Retrieve mood data from the database
    return NextResponse.json(moodData, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET request:", error.stack || error);
    return NextResponse.json({ error: 'Failed to fetch mood data' }, { status: 500 });
  }
}
