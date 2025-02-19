import frontendUrl from "@/lib/frontendUrl";
import axios from "axios";

export default async function getCategories () {
    try {
        const response = await axios.get(`${frontendUrl}/api/meals/categories`);

        console.log("DATA: ", response);

        return response.data.categories;
    } catch (e) {
        console.log("An error occured while fetching categories: ", e);
    }
}