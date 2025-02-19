"use client";
import useCategoryStore from "@/stores/categoryStore";
import { Meal } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";

export default function CategoryMeals() {
    // Get the current category from the Zustand store
    const category = useCategoryStore((state) => state.category);

    if (!category) throw new Error("No category");

    // Fetch the meals that match the current category
    const { data: meals, isPending, error } = useQuery({
        queryKey: ["meals", category], // Include category to refetch when it changes
        queryFn: async () => {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            return response.data.meals; // ✅ Extract meals from response
        },
        enabled: !!category, // Prevents fetching if category is null
    });

    if (isPending) return <p>Loading...</p>;

    if (error) return <p>Error: {error.message}</p>;

    if (!meals || meals.length === 0) return <p>No meals found for {category}.</p>;

    console.log("Meals: ", meals);

    return (
        <article className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8">
            {meals.map((meal: Meal) => (
                <Card key={meal.idMeal}>
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
                                <Badge>{meal.strTags}</Badge>
                            }
                        </article>

                        <CardTitle className="text-2xl font-semibold">{meal.strMeal}</CardTitle>

                        <CardDescription>
                            {meal.strCategory}
                        </CardDescription>
                    </CardContent>
                </Card>
            ))}
        </article>
    );
}
