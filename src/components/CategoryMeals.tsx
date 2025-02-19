"use client";
import useCategoryStore from "@/stores/categoryStore";
import { Meal } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

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

    return (
        <article className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2">
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

                        <CardTitle className="text-2xl font-semibold mt-4">{meal.strMeal}</CardTitle>
                    </CardHeader>
                </Card>
            ))}
        </article>
    );
}
