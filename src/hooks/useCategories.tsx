import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";

import firestore from "../firestore";
import {Category} from "../types";

/**
 * Returns list of available categories
 *
 * @returns {Category[]} - List of available categories
 * @returns {boolean} loading - state of fetching list of categories
 * @returns {Error} error - error, received while fetching categories
 */
export const useCategories = ():[Array<Category>, boolean | undefined, Error | undefined]  => {
    let categories:Array<Category> = []

    const [value, loading, error] = useCollectionData(
        firestore.collection('categories'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    if(value?.length){
        value.forEach((c:any) => {
            const category:Category = {
                title:c.title,
                order:c.order,
            }
            categories.push(category)
        })
    }

    return [categories, loading, error]
}