"use client";
import useCategoryStore from "@/stores/categoryStore";
import { Meal } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingMeals from "./loading/LoadingMeals";

export default function CategoryMeals() {
    // Get the current category from the Zustand store
    const category = useCategoryStore((state) => state.category);

    if (!category) throw new Error("No category");

    const router = useRouter();

    // Fetch the meals that match the current category
    const { data: meals, isPending, error } = useQuery({
        queryKey: ["meals", category], // Include category to refetch when it changes
        queryFn: async () => {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const mealSummaries = response.data.meals;
            
            // Fetch full details for each meal in parallel
            const fullMeals = await Promise.all(
                mealSummaries.map(async (meal: Meal) => {
                    const detailResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                    return detailResponse.data.meals[0]; // Return full meal details
                })
            );
            
            return fullMeals;
        },
        enabled: !!category, // Prevents fetching if category is null
    });

    if (isPending) return <LoadingMeals />;

    if (error) return <p>Error: {error.message}</p>;

    if (!meals || meals.length === 0) return <p>No meals found for {category}.</p>;

    return (
        <article className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8 my-10 px-4 md:px-12 md:my-20">
            {meals.map((meal: Meal) => (
                <Card onClick={() => router.push(`/meal/${meal.idMeal}`)} className="hover:shadow-xl transition duration-300 hover:cursor-pointer" key={meal.idMeal}>
                    <CardHeader>
                        <Image 
                            className="rounded-xl"
                            src={meal.strMealThumb} 
                            alt={meal.strMeal} 
                            width={400}
                            height={100}
                        />
                    </CardHeader>

                    <CardContent>
                        <article className="flex flex-wrap gap-4">
                            {
                                meal.strTags &&
                                meal.strTags.split(',').map((tag, index) => (
                                    <Badge key={index}>{tag.trim()}</Badge>
                                ))
                            }
                        </article>

                        <CardTitle className="text-2xl my-2 font-semibold">{meal.strMeal}</CardTitle>

                        <CardDescription>
                            {meal.strCategory} - {meal.strArea}
                        </CardDescription>

                        <p className="mt-2 text-sm text-gray-600">
                            {meal.strInstructions.slice(0, 100)}...
                        </p>
                    </CardContent>
                </Card>
            ))}
        </article>
    );
}
