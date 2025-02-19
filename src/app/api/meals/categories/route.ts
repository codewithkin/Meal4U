import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET () {
    try {
        // Get all of the meal categories
        const data = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");

        return NextResponse.json(data);
    } catch (e) {
        console.log("An error occured while fetching categories: ", e);
        return NextResponse.json({
            message: "Sorry, an error occured"
        }, { status: 500 });
    }
}