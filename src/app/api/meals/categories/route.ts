import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET () {
    // Get all of the meal categories
    const data = await axios.get("www.themealdb.com/api/json/v1/1/categories.php");

    return NextResponse.json(data);
}