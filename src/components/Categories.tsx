"use client";
import { category } from "@/types";
import { Badge } from "./ui/badge";
import useCategoryStore from "@/stores/categoryStore";

export default function Categories({ categories }: {categories: category[]}) {
    // Get a function to update the category
    const setCategory = useCategoryStore(state => state.setCategory);

    // Set the category to be the first category by default
    setCategory(categories[0].strCategory);

    const category = useCategoryStore(state => state.category);

    return (
        <article className="w-full justify-center items-center overflow-x-scroll md:overflow-x-hidden flex gap-4 items-center p-4">
            {
                categories.map((category: category) => (
                    <Badge 
                    className="hover:cursor-pointer"
                    onClick={() => {
                        setCategory(category.strCategory)
                    }}
                    color="primary"
                    key={category.idCategory}>
                        {category.strCategory}
                    </Badge>
                ))
            }
        </article>
    )
}