"use client";
import { Badge } from '@/components/ui/badge';
import getCategories from '@/helpers/queries/getCategories';
import frontendUrl from '@/lib/frontendUrl';
import { category } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

function Page() {
  // Fetch all of the meal categories
  const { data: categories, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  });

  if (isLoading) {
    <Loader2 className="animate-spin" />
  }

  if (isError) {
    <h2>An error occured</h2>
  } else {
    console.log("ALL CATEGORIES: ", categories);
  }

  return (
    <article>
        <article className='bg-slate-800 p-4'>
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