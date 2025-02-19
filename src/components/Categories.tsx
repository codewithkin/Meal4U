import { category } from "@/types";
import { Badge } from "./ui/badge";

export default function Categories({ categories }: {categories: category[]}) {
    return (
        <article className="w-full justify-center items-center overflow-x-scroll md:overflow-x-hidden flex gap-4 items-center p-4">
            {
                categories.map((category: category) => (
                    <Badge 
                    color="primary"
                    key={category.idCategory}>
                        {category.strCategory}
                    </Badge>
                ))
            }
        </article>
    )
}