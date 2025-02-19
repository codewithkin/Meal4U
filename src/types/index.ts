export type category = {
    idCategory: string,
    strCategory: string,
    strCategoryDescription: string,
    strCategoryThumb: string
}

export type Meal = {
    idMeal: string,
    strMeal: string,
    strDrinkAlternate?: string,
    strCategory: string,
    strArea: string,
    strInstructions: string,
    strMealThumb: string,
    strTags?: string,
    strYoutube?: string,
    strSource?: string,
    strImageSource?: string,
    strCreativeCommonsConfirmed?: string,
    dateModified?: string
}

