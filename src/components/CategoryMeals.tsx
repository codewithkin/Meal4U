"use client";
import useCategoryStore from "@/stores/categoryStore"

export default function CategoryMeals () {
    // Get the current category from the zustand store
    const category = useCategoryStore(state => state.category);

    if (!category) throw new Error ("No category");

    return (
        <article className="grid md:grid-cols-3 lg:grid-cols-4 sm:grod-cols-2">
            <h2>Howdie !</h2>
        </article>
    )
}