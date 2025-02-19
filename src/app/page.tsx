import { Badge } from '@/components/ui/badge';
import frontendUrl from '@/lib/frontendUrl';
import { category } from '@/types';
import axios from 'axios';

async function Page() {
  // Fetch all of the meal categories
  const {data: {categories: { categories }}} = await axios.get(`${frontendUrl}/api/meals/categories`) as { data: {categories: { categories: category[] }}; categories: category[] };

    

  return (
    <article>
        <article className='bg-slate-800 py-2 px-4'>
            <h2 className='text-green-300 text-2xl font-semibold'>Meals4U</h2>
        </article>

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


    </article>
  )
}

export default Page