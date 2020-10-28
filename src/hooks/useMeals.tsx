import {useCollectionData} from "react-firebase-hooks/firestore";
import firestore from "../firestore";
import {Meal} from "../types";

/**
 * Returns list of meals in provided category
 *
 * @param {string} category - Category name (title)
 *
 * @returns {Meal[]} - List of meals in provided category
 * @returns {boolean} loading - state of fetching list of meals
 * @returns {Error} error - error, received while fetching meals
 */
export const useMeals = (category:string):[Array<Meal>, boolean | undefined, Error | undefined]  => {
    let meals:Array<any> = []

    const currentCategory = firestore.doc(`/categories/${category}`)

    const [value, loading, error] = useCollectionData(
        firestore.collection('meals').where('categories', 'array-contains', currentCategory),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
            idField:'id',
        }
    );

    if(value?.length){
        value.forEach((m:any) => {
            const meal:Meal = {
                id:m.id,
                title:m.title,
                measure:m.measure,
                price:m.price,
                emoji:m.emoji,
                uploadcareId:m.uploadcareId,
                categories: Object.entries(m.categories).map((x:any, index:number) => ({ref:x[1], order:index})),
                kind:m.kind,
            }
            meals.push(meal)
        })
    }

    return [meals, loading, error]
}