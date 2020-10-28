import fb from 'firebase';

type FieldRef = fb.firestore.DocumentReference;

export interface Category {
    title: string;
    order: number;
}

export enum MealKind {
    drink = 'drink',
    hotDrink = 'hotDrink',
    soup = 'soup',
    salad = 'salad',
    hot = 'hot',
    breakfast = 'breakfast',
    sauce = 'sauce',
    pastry = 'pastry',
    garnish = 'garnish',
}

    export interface MealCategory {
    ref: FieldRef;
    order?: number;
}

export type Meal = Partial<{
    id: string;
    title: string;
    categories: MealCategory[];
    measure: Partial<{ unit: string; value: number }>;
    price: number;
    emoji: string;
    uploadcareId: string;
    kind: MealKind;
}>;