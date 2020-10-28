import React from 'react'
import * as types from '../../types'
import styles from "./SampleMeal.module.scss";
import firestore from "../../firestore";
import firebase from "firebase";
import { Widget } from "@uploadcare/react-widget";
import {MealKind} from "../../types";
import {CategoryContext} from "../Category/CategoryContext";


export default function SampleMeal(props:{onCreate:() => void}){
    const [file, setFile] = React.useState<any>(null)
    const context = React.useContext(CategoryContext)
    const {category} = context
    const [title, setTitle] = React.useState<string>("")
    const [measureUnit, setMeasureUnit] = React.useState<string>("")
    const [measureValue, setMeasureValue] = React.useState<string>("")
    const [price, setPrice] = React.useState<string>("")
    const [emoji, setEmoji] = React.useState<string>("")
    const [kind, setKind] = React.useState<string>(types.MealKind.drink)


    function isValuesValid():boolean {
        if(!file){
            alert("Upload image")
            return false
        }
        if(!title.trim()){
            alert("Title should be not empty")
            return false
        }else if(!measureUnit.trim()){
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
        return true
    }


    function createMeal(){
        const currentCategory = firestore.doc(`/categories/${category?.title?.toLowerCase()}`)
        if (!isValuesValid()){
            return
        }

        const addItemToFirestore = async () => {
            const rest = await firestore.collection('meals').add({
                title: title,
                measure:{
                    unit:measureUnit,
                    value:parseInt(measureValue),
                },
                price: parseInt(price),
                emoji:emoji,
                kind:kind,
                categories:[currentCategory],
                uploadcareId:file.cdnUrl,
            });
            props.onCreate()
        }

        addItemToFirestore()
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.cover_wrapper}>
                {file ?
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

                    :
                    <div className={styles.cover_skeleton} />
                }
                {
                    !file &&
                        <Widget
                            onFileSelect={(file) => {
                                console.log('File changed: ', file)
                                if (file) {
                                    file.progress((info:any) => console.log('File progress: ', info.progress))
                                    file.done((info:any) => {
                                        // console.log('File uploaded: ', info)
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
                        placeholder={'Price'}
                        value={price}
                        className={styles.input}
                    />
                    <input
                        onChange={e => setEmoji(e.target.value)}
                        style={{marginLeft:12, maxWidth:25}}
                        placeholder={'💅'}
                        className={styles.input}
                    />
                </div>
                <div>
                    <select onChange={e => setKind(e.target.value)} style={{marginTop:12}} className={styles.input}>
                        {Object.keys(MealKind).map(key => (
                            <option value={key} key={key}>{key}</option>
                        ))}
                    </select>
                </div>
                <div onClick={createMeal} className={styles.create_button}>
                    Создать
                </div>

            </div>

        </div>
    )
}