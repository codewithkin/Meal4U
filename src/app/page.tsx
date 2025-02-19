import frontendUrl from '@/lib/frontendUrl';
import { category } from '@/types';
import axios from 'axios';

async function Page() {
  // Fetch all of the meal categories
  const categories = await axios.get(`${frontendUrl}/api/meals/categories`) as { categories: category[] };

  console.log("All categories: ", categories);

  return (
    <article>
        <h2>Meals</h2>

    </article>
  )
}

export default Page