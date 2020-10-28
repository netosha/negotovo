import React from "react"
import styles from './Index.module.scss'
import Header from "../components/Header";
import Category from "../components/Category";
import {useCategories} from '../hooks/useCategories'
import { useMeals } from "../hooks/useMeals";

function Index(){
    const [categories, loading, error] = useCategories()
    return (
        <div className={styles.page}>
            <Header />
            <div className={styles.content}>
                {categories?.map((c, index) => (
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