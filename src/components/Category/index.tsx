import React, {DOMAttributes} from 'react'
import styles from './Category.module.scss'
import {Plus} from 'react-feather'
import * as types from "../../types";
import { useMeals } from '../../hooks/useMeals';
import Meal from '../Meal';
import firestore from "../../firestore";
import firebase from 'firebase';
import SampleMeal from '../SampleMeal';
import {CategoryContext} from "./CategoryContext";

// Needs to pass active prop to HTML tag in add button
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        active?: boolean;
    }
}

export default function Category(props: { key:number, category:types.Category }){
    const [addMode, setAddMode] = React.useState<boolean>(false)
    const {category} = props
    const [meals, loading, error] = useMeals(category.title.toLowerCase())
    const user = firebase.auth().currentUser;

    function onCreate(){
        setAddMode(!addMode)
    }

    return (
        <CategoryContext.Provider value={{category:category}}>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    <a>
                        {category.title}
                    </a>
                    <div
                        data-active={addMode}
                        className={styles.add_icon}
                    >
                        {user &&
                        <Plus
                            onClick={e => setAddMode(!addMode)}
                            className={styles.add_icon}
                        />
                        }

                    </div>

                </div>
                <div className={styles.meals_container}>
                    {
                        addMode && user &&
                        <SampleMeal
                            onCreate={onCreate}
                        />
                    }
                    {meals.map((m:types.Meal, index) => (
                        <Meal
                            key={index}
                            meal={m}
                        />
                    ))}
                </div>
            </div>
        </CategoryContext.Provider>
    )
}