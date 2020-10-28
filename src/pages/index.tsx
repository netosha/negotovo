import React from "react"
import styles from './Index.module.scss'
import Header from "../components/Header";
import Category from "../components/Category";
import {useCategories} from '../hooks/useCategories'
import * as types from '../types'
import { useMeals } from "../hooks/useMeals";

function Index(){
    const [categories, loading, error] = useCategories()
    return (
        <div className={styles.page}>
            <Header />
            <div className={styles.content}>
                {categories?.sort((a:types.Category, b:types.Category) => a.order - b.order).map((c, index) => (
                    <Category
                        key={index}
                        category={c}
                    />
                ))}
            </div>
        </div>
    )
}

export default Index;