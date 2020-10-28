import React from 'react'
import * as types from '../../types'
import styles from './Meal.module.scss'
import {Edit3} from 'react-feather'
import SampleMeal from "../SampleMeal";
import firebase from "firebase";
import EditableMeal from "../EditableMeal";

export default function Meal(props:{meal:types.Meal}){
    const {meal} = props
    var user = firebase.auth().currentUser;
    const [editMode, setEditMode] = React.useState(false)
    if(editMode){
        return(
            <EditableMeal
                meal={meal}
                onEdit={() => setEditMode(false)}
            />
        )

    }
    return (
        <div className={styles.wrapper}>
            <div>
                <picture>
                    <img
                        className={styles.cover}
                        src={meal.uploadcareId}
                        alt={meal.title}
                        loading={'lazy'}

                    />
                </picture>
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <a className={styles.name}>
                        {meal.title}
                    </a>
                    <a className={styles.misc}>
                        {meal.measure?.value}
                        {" "}
                        {meal.measure?.unit}
                    </a>
                </div>
                <div className={styles.actions_container}>
                    <div className={styles.price_box}>
                        {meal.price} ₽
                    </div>
                    <a className={styles.emoji}>
                        {meal.emoji}
                    </a>
                </div>
                {user &&
                    <div className={styles.edit_button} onClick={e => setEditMode(!editMode)} style={{marginTop:12}}>
                        <Edit3/>
                    </div>
                }

            </div>

        </div>
    )

}