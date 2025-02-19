import { Badge } from '@/components/ui/badge';
import frontendUrl from '@/lib/frontendUrl';
import { category } from '@/types';
import axios from 'axios';

async function Page() {
  // Fetch all of the meal categories
  const {data: {categories: { categories }}} = await axios.get(`${frontendUrl}/api/meals/categories`) as { data: {categories: { categories: category[] }}; categories: category[] };

  return (
    <article>
        <h2>Meals</h2>

        <article className="w-full overflow-x-scroll flex gap-4 items-center">
            {
                categories.map((category: category) => (
                    <Badge key={category.idCategory}>
                        {category.strCategory}
                    </Badge>
                ))
            }
        </article>
    </article>
  )
}

export default Page