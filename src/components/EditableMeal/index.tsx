import React from 'react'
import * as types from '../../types'
import styles from "./EditableMeal.module.scss";
import firestore from "../../firestore";
import firebase from "firebase";
import { Widget } from "@uploadcare/react-widget";
import {MealKind} from "../../types";
import {CategoryContext} from "../Category/CategoryContext";
import { X } from 'react-feather';


export default function EditableMeal(props:{meal?:types.Meal | any, onEdit:() => void}){
    const [file, setFile] = React.useState<any>(null)
    const {category} = React.useContext(CategoryContext)
    const {meal} = props
    const [title, setTitle] = React.useState<string>(meal?.title)
    const [measureUnit, setMeasureUnit] = React.useState<string>(meal?.measure?.unit)
    const [measureValue, setMeasureValue] = React.useState<string>(meal?.measure?.value.toString())
    const [price, setPrice] = React.useState<string>(meal?.price.toString())
    const [emoji, setEmoji] = React.useState<string>(meal?.emoji)
    const [kind, setKind] = React.useState<string>(meal?.kind)

    function isValuesValid():boolean {
        if(!title.trim()){
            alert("Title should be not empty")
            return false
        }else if(!measureUnit.trim()){
            console.log(measureUnit)
            alert("MeasureUnit unit should be not empty")
            return false
        }else if(isNaN(parseInt(measureValue))){
            alert("MeasureValue should be number")
            return false
        }else if(isNaN(parseInt(price))){
            alert("price should be number")
            return false
        }else if(!Object.keys(types.MealKind).includes(kind)){
            alert("Wow! You pick wrong MealKind with select. Congrats!")
            return false
        }
        console.log(Number(measureValue))

        return true
    }


    function editMeal(){
        const currentCategory = firestore.doc(`/categories/${category?.title?.toLowerCase()}`)
        console.log(meal.categories.map((c:any) => c.ref))
        if (!isValuesValid()){
            return
        }

        const editItem = async () => {
            const rest = await firestore.collection('meals').doc(meal.id).set({
                title: title,
                measure:{
                    unit:measureUnit,
                    value:parseInt(measureValue),
                },
                price: parseInt(price),
                emoji:emoji,
                kind:kind,
                categories:[currentCategory],
                uploadcareId:file?.cdnUrl || meal.uploadcareId,
            });
            props.onEdit()
        }

        editItem()
    }


    const test = () => {
        console.log(kind)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.cover_wrapper}>
                {!file ?
                    <img
                        alt={'new-meal-cover'}
                        src={meal.uploadcareId}
                        className={styles.cover}
                    />

                    :
                    <>
                        <img
                            alt={'new-meal-cover'}
                            src={file.cdnUrl}
                            className={styles.cover}
                        />
                        <button
                            onClick={e => setFile(null)}
                            className={styles.remove_cover_button}
                        >
                            Другую фоточку
                        </button>
                    </>

                }
                {
                    !file &&
                    <Widget
                        onFileSelect={(file) => {
                            console.log('File changed: ', file)
                            if (file) {
                                file.progress((info:any) => console.log('File progress: ', info.progress))
                                file.done((info:any) => {
                                    console.log('File uploaded: ', info)
                                    setFile(info)
                                })
                            }
                        }}
                        previewStep={true}
                        onChange={info => console.log('Upload completed:', info)}
                        publicKey='30506db15e8554c1cad3'
                    />
                }

            </div>
            <div className={styles.content}>
                {/*<button onClick={e => console.log(file)}>log file</button>*/}
                <div style={{display:'flex',width:'100%'}}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder={'Title'}
                        className={styles.input}
                    />
                </div>
                <div>
                    <input
                        value={measureUnit}
                        onChange={e => setMeasureUnit(e.target.value)}
                        style={{maxWidth:100, marginRight:12}}
                        placeholder={'Unit'}
                        className={styles.input}
                    />
                    <input
                        value={measureValue}
                        onChange={e => setMeasureValue(e.target.value)}
                        placeholder={'Value'}
                        className={styles.input}
                    />
                </div>
                <div>
                    <input
                        onChange={e => setPrice(e.target.value)}
                        style={{maxWidth:120}}
                        value={price}
                        placeholder={'Price'}
                        className={styles.input}
                    />
                    <input
                        onChange={e => setEmoji(e.target.value)}
                        style={{marginLeft:12, maxWidth:25}}
                        placeholder={'💅'}
                        className={styles.input}
                    />
                </div>
                <div style={{marginTop:12}}>
                    <select onChange={e => setKind(e.target.value)} value={kind} className={styles.input}>
                        {Object.keys(MealKind).map(key => (
                            <option value={key} key={key}>{key}</option>
                        ))}
                    </select>
                </div>
                <div onClick={editMeal} className={styles.create_button}>
                    Изменить
                </div>
            </div>
            <X
                size={24}
                className={styles.close_btn}
                onClick={e => props.onEdit()}
            />

        </div>
    )
}