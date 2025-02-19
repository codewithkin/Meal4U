import { NextResponse } from "next/server";
import axios from "axios";
import { category } from "@/types";

export async function GET () {
    try {
        // Get all of the meal categories
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");

        const categories = response.data as { categories: category[] };

        return NextResponse.json({categories});
    } catch (e) {
        console.log("An error occured while fetching categories: ", e);
        return NextResponse.json({
            message: "Sorry, an error occured"
        }, { status: 500 });
    }
}