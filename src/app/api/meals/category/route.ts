import axios from "axios";
import { NextResponse } from "next/server";
import type { Meal } from "@/types";

export async function GET({ query }: { query: { category: string } }) {
  try {
    // Get the category from query params
    const category = query.category;

    // Feth the meals for the current category
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?c=${category}`);

    console.log("Response: ", response);

    const meal = response.data?.meals?.[0] as Meal;

    if (!meal) {
      return NextResponse.json({ message: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json(meal);
  } catch (error) {
    console.error("An error occured while fetching meal: ", error);
    return NextResponse.json({ message: "Sorry, an error occured" }, { status: 500 });
  }
}

