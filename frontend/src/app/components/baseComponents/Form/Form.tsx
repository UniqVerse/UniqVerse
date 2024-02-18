'use client'

import Image from 'next/dist/shared/lib/image-external';
export type ButtonType = "primary" | "outlined";
import styles from './Form.module.css';
import React, { useState } from 'react';

export function Form() {

    const [inputLastName, setInputLastName] = useState('');
    const [inputFirstName, setInputFirstName] = useState('');

    return (
        <form>
           <div className="grid bg-gray-600 gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm text-white">First name</label>
                    
                    <div className={styles.wrapper}>        
                    <input type="text" id="first_name" aria-describedby="helper-text-explanation" placeholder="Bob"
                         value={inputFirstName}  onChange={(e) => setInputFirstName(e.target.value)}/>
                        <button type="button" className={styles.clear} onClick={() => {
                        console.log(inputLastName); 
                        setInputFirstName('');
                        }} >X</button>
                    </div>
                    
                    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p>
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-white text-sm ">Last name</label>

                    <div className={styles.wrapper}>        
                        <input type="text" id="last_name" aria-describedby="helper-text-explanation" placeholder="James"
                         value={inputLastName}  onChange={(e) => setInputLastName(e.target.value)}/>
                        <button type="button" className={styles.clear} onClick={() => {
                        console.log(inputLastName); 
                        setInputLastName('');
                    }} >X</button>
                    
                    </div>


                    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p>

                </div>
           </div>
        </form>
    )
}