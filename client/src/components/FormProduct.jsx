
import PropTypes from 'prop-types'
import styles from '../style';
import { AiOutlineArrowLeft } from "react-icons/ai";
import {  useNavigate } from "react-router-dom";

import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Loader from './partials/Loader';


function FormProduct({loading, onSubmit, type, product, categories, handleImage}) {
    const navigate = useNavigate();
    const VITE_URL_API = import.meta.env.VITE_URL_API;     
    const { register, handleSubmit, formState: { errors }, control} = useForm({
        defaultValues:product
    });
    
    const allowExt =['jpg', 'png', 'gif', 'svg', 'jpeg'];
    
    

    const onCancel = (e)=>{
        e.preventDefault()
        navigate(-1);
    }
    
    
    
    
    
    

    return (
        <>
            <div className=' px-8 py-4 flex flex-row gap-4 ' >
                <AiOutlineArrowLeft onClick={onCancel} className='hover:text-blue-800 hover:cursor-pointer w-[22px] h-[22px]'>
                </AiOutlineArrowLeft>
                <h1 onClick={onCancel} className='hover:text-blue-800 hover:cursor-pointer'>Back</h1>
            </div>
            <div className='w-auto border-2 rounded-xl p-3 m-4 shadow-xl h-auto'>
                <div>
                    <h1 className={`${styles.heading2}`}>{type} Producto</h1>
                </div>
    
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2 ">
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category<span className={`text-sm ${styles.pError}`}>*</span></label>
                            <select {...register("category_id",{required:true, valueAsNumber:true})} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '>
                                <option>Select a category</option>
                                {
                                    categories.length!==0 &&
                                    categories.map((category) =>
                                    <option value={category.category_id} key={category.category_id}>{category.name}</option>
                                    
                                    )
                                }
                            </select>

                            {errors.category_id?.type === 'required' && <p className={styles.pError}>The field is required</p>}
                            
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name<span className={`text-sm ${styles.pError}`}>*</span></label>
                            <input 
                            type="text" 
                            id="name" 
                            className={styles.inputNormal}
                            placeholder="Enter a name for the product" 
                            {...register('name', {
                                required: true,
                            })}
                            />
                            {errors.name?.type === 'required' && <p className={styles.pError}>The field is required</p>}
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description<span className={`text-sm ${styles.pError}`}>*</span></label>
                            <textarea 
                            id="descripcion" 
                            rows="3" 
                            className={styles.inputNormal}
                            
                                {...register('description', {
                                required: true,
                            })}
                            />
                            
                            {errors.description?.type === 'required' && <p className={styles.pError}>The field is required</p>}
                        </div> 
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price<span className={`text-sm ${styles.pError}`}>*</span></label>
                            <input 
                            type="number" 
                            step="0.01"
                            min="0"
                            className={styles.inputNormal} 
                            placeholder="$0.00" 
                            {...register('price', {
                                valueAsNumber:true,
                                required: true,
                                min:0,
                            })}
                            
                            />
                            {errors.price?.type === 'required' && <p className={styles.pError}>The price is required!</p>}
                            {errors.price?.type === 'min' && <p className={styles.pError}>The price needs to be more than $0</p>}
                            
                        </div> 
                        <div>
                            <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
                            <input 
                            type="number" 
                            className={styles.inputNormal} 
                            placeholder="0.0%" 
                            {...register('discount', {
                                valueAsNumber:true,
                                required:true,
                                min:0,
                                max:99
                            })}
                            
                            />
                            {errors.discount?.type === 'min' && <p className={styles.pError}>The discount needs to be more than 0%</p>}
                            {errors.discount?.type === 'max' && <p className={styles.pError}>The discount needs to be less than 100%</p>}
                            {errors.discount?.type === 'required' && <p className={`${styles.pError} mb-6`}>Field required</p>}
                        </div> 
                        
                        
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Image<span className={`text-sm ${styles.pError}`}>*</span></label>
                                <Controller
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" 
                                    name="image" // Name of the field in the form data
                                    control={control}
                                    rules={{
                                        validate: (val)=>{
                                            if(type!=='Editar'){
                                                if(!val){
                                                    return 'Field required';
                                                }
                                                if(!val.name){
                                                    return 'Field required';
                                                }
                                                if(!allowExt.includes(val.name.split('.').pop())){
                                                    return 'Invalid file type';
                                                }
                                                if(val.size>=1048576){
                                                    return 'File too large';
                                                }
                                            }
                                            if(type==='Editar'){
                                                
                                                if( val.name && !allowExt.includes(val.name.split('.').pop())){
                                                    return 'Invalid file type';
                                                }
                                                if( val.size && val.size>=1048576){
                                                    return 'File too large';
                                                }
                                            }
                                            
                                        }
                                    }}
                                    render={({ field }) => (
                                        <input type="file" onChange={(e) => field.onChange(e.target.files[0])} />
                                    )}
                                />
                                <p className=" p-3mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">JPG, PNG, JPEG or GIF (MAX. 2mb).</p>
                                {errors.image?.type === 'required' && <p className={styles.pError}>This field is required</p>}
                                {errors.image?.type === 'validate' && <p className={`${styles.pError} mb-6`}>{errors.image?.message}</p>}
                        </div>
                        {
                        product.image&&
                        
                        (<div className="">
                            <label htmlFor="none" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen Actual</label>
                            
                            <img src={`${VITE_URL_API}/${product.image}`} alt={product.name} className=" object-cover object-center w-40 h-40"/>
                        </div> )
                        }
                    </div>
                    
                    <button disabled={loading} type='submit' className="my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {type==='Editar'?'Update Product':'Add Product'}
                    </button>
                </form>
    
            </div>
        </>)   
}

FormProduct.propTypes = {
    loading: PropTypes.bool.isRequired,
    product: PropTypes.object.isRequired,
    onSubmit: PropTypes.any.isRequired,
    type: PropTypes.string,
    categories: PropTypes.array.isRequired,
    handleImage:PropTypes.func.isRequired
};
export default FormProduct;