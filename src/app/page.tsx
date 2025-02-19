import Categories from '@/components/Categories';
import CategoryMeals from '@/components/CategoryMeals';
import { Badge } from '@/components/ui/badge';
import frontendUrl from '@/lib/frontendUrl';
import useCategoryStore from '@/stores/categoryStore';
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

        <Categories categories={categories} />

        <CategoryMeals />
    </article>
  )
}

export default Page