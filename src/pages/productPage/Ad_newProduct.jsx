import React, { useState } from 'react'
import styled from 'styled-components'
import bgTitle from '../../assets/image/images.jpg'
import { Assignment , Image , Article , Upload } from '@mui/icons-material';
import { AnimatePresence  , motion} from 'motion/react';
const Styles = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    .line {
        height: 2px;
        background-color: var(--bg-primary);
        width: 100%;
        margin-bottom: 1.25rem; 
    }
    .step-bar {
        width: 80%;
        overflow: hidden;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 1rem;
        padding: 4rem;
        height: 150px;
        box-shadow: 1px 4px 8px 1px rgba(0,0,0,0.75);
        -webkit-box-shadow: 1px 4px 8px 1px rgba(0,0,0,0.75);
        -moz-box-shadow: 1px 4px 8px 1px rgba(0,0,0,0.75);
        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 40px;
            .circle {
                width: 40px;
                height: 40px;
                border-radius: 9999px;
                background-color: var(--bg-sec);
                display: flex;
                align-items: center;
                justify-content: center;
            }   
            & p {
                white-space: pre;
                font-weight: bold;
            }
        }
        & p {
            text-align: center;
        }
        .step-complete .circle {
            background-color: var(--success-clr);
        }
        /* .step-complete p {
            color: var(--success-clr);
        } */
    }
    .step-complete + .line {
        background-color: var(--success-clr);
    }
    .icon.clr {
        fill: white !important;
    }
    .forms {
        margin-top: 2rem;
        background-color: var(--bg-sec);
        width: 70%;
        border-radius: 1rem;
        padding: 2rem;
        box-shadow: 1px 4px 8px 1px rgba(0,0,0,0.75);
        -webkit-box-shadow: 1px 4px 8px 1px rgba(0,0,0,0.75);
        -moz-box-shadow: 1px 4px 8px 1px rgba(0,0,0,0.75);
        .wrraper-input {
            position: relative;
            & label {
                transition: all 0.3s ease;
                position: absolute;
                right: 1rem;
                top: .8rem;
                pointer-events: none;
                user-select: none;
                color: white;
                font-size: 14px;
                z-index: 5;
            }
       
        }
        .input-style {
            border: 1px solid var(--input-border);
            padding:  0.75rem;
            background-color: var(--bg-input);
            border-radius: 0.5rem;
            outline: none;
            width: calc(100% - 1rem - 0.25rem);
            &:focus + label,
            &:not([value=""]) + label{
                transition: all 0.3s ease;
                top: 0.3rem; 
                left: 1rem;
                font-size: 10px; 
                color: #b1b1b1;
            }
        }
        & option {
            background-color: var(--bg-sec);
            font-size: 14px;
            cursor: pointer;
        }
        & select {
            cursor: pointer;
        }
        .btn-style {
            padding: 1rem;
            border-radius: 0.5rem;
            width: 100px;
            height: 40px;
            text-align: center;
            place-self: center;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--btn-bg);
            &:focus,
            &:active {
                transform: scale(0.9);
                user-select: none;
            }
        }
        
    }
    .error-text {
        font-size: 12px;
        color: var(--err-clr);
        margin-top: 0.25rem;
    }
    .upload-image {
        border: 3px dotted var(--input-border);
        height: 250px;
        width: 70%;
        position: relative;
        margin: 0 auto;
        .upload-content {
            position: absolute;
            right: 0;
            left: 0;
            top:5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            & svg {
                width: 48px;
                height: 48px;
            }
        }
        .upload-input {
            cursor: pointer;
            appearance: none;
            opacity: 0;
            width: 100%;
            height: 100%;
        }
    }

`
function Ad_newProduct() {
    const [inputsValue , setInputsValue] = useState({
        product_name : '',
        product_count : '',
        product_type : '',
        product_desc : '',
        product_price : '',
        product_price_type : '',
        product_type : '',
        product_type_send : '',
    })
    const [activeStep , setAvtiveStep] = useState(1)
    const [image , setImage] = useState(null)
    const [errorInput , setErrorInput] = useState({})
    const inputChangeHandler = (event) => {
        const {name , value} = event.target;
        setInputsValue(prev => {
            let temp = {...prev};
            temp[name] = value
            return temp
        })
    }
    // step 1
    let inputsFields = [
        {
            title : 'نام محصول',
            type : 'text',
            name : 'product_name'
        },
        {
            title : 'تعداد',
            type : 'text',
            name : 'product_count'
        },
        {
            title : 'دسته بندی',
            type : 'select',
            name : 'product_type'
        },
        {
            title : 'توضیحات محصول',
            type : 'textbox',
            name : 'product_desc'
        },
    ]
    // step 2
    let inputStep2 = [
        {
            title : 'قیمت محصول',
            type : 'text',
            name : 'product_price'
        },
        {
            title : 'واحد پول',
            type : 'select',
            name : 'product_price_type'
        },
        {
            title : 'نوع ارسال',
            type : 'select',
            name : 'product_type_send'
        },
    ]
    // validate step 1 inputs
    const validateInputs = () => {
        const newError = {}
        if (!inputsValue.product_name) {
            newError.product_name = 'نام محصول الزامی می باشد'
        }
        if(!inputsValue.product_count) {
            newError.product_count = 'مقدار الزامی می باشد';
        }
        if (!inputsValue.product_desc) {
            newError.product_desc = 'توضیحات الزامی می باشد'
        }
        if (!inputsValue.product_price && activeStep === 2) {
            newError.product_price = 'قیمت الزامی می باشد'
        }
        setErrorInput(newError)
        return Object.keys(newError).length === 0
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0]
        
        if(file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(file)
        setImage(url);
      } else {
        setImage(null); 
      }

    }
    const handleNextStep = () => {
        if(validateInputs()) {
            setAvtiveStep(prev => prev + 1)
        } else {

        }
    }
    
    const handlePrevStep = () => {
        setAvtiveStep(prev => prev - 1)
    }
    let steps = [
        { 
            id: 1, 
            title: 'اطلاعات محصول',
            icon: <Assignment 
                    sx={{
                        fill : 'white !important'
                    }}
                /> 
        },
        { 
            id: 2, 
            title: 'ویژگی‌ها',
            icon: <Article 
                    sx={{
                        fill : 'white !important'
                    }}
                /> 
        },
        { 
            id: 3, 
            title: 'تصاویر',
            icon: <Image
                    sx={{
                        fill : 'white !important'
                    }}
                /> 
        },
        { 
            id: 4, 
            title: 'تایید نهایی',
            icon: <Upload 
                    sx={{
                        fill : 'white !important'
                    }}
                /> 
        },
    ]
    const renderSteps = steps?.map((step , i) => {
        return (
            <>
                <div
                    className={`step ${(activeStep === step.id) ? 'step-complete' : ''} ${(step.id < activeStep) ? 'step-complete' : ''}`}
                >
                    <div className='circle'>
                        <p>
                            {
                                step.icon
                            }
                        </p>
                    </div>
                    <p>{step.title}</p>
                </div>
                {(step.id !== steps.length) ? <div className='line'></div> : ''}
            </>
        )
    })
    const renderInputs = () => {     
        return inputsFields?.map((val , i) => {
                if(val.type === "text") {
                    return (
                        <div className='wrraper-input'>
                            <input 
                                type={val.type}
                                name={val.name}
                                value={inputsValue[val.name]}
                                onChange={inputChangeHandler}
                                className='input-style'
                            />
                            <label htmlFor={val.name}>{val.title}</label>
                            {errorInput[val.name] && <p className='error-text'>{errorInput[val.name]}</p>}
                        </div>
                    )
                } else if (val.type === "select") {
                    return (
                        <div className='wrraper-input'>
                            <select 
                                className='input-style'
                                name={val.name}
                                value={inputsValue[val.name]}
                                onChange={inputChangeHandler}
                            >
                                <option>دسته بندی</option>
                                <option>دیجیتال</option>
                                <option>فایلی</option>
                                <option>فیزیکی</option>
                                <option>آموزشی</option>
                            </select>
                        </div>
                    )
                } else if (val.type === "textbox") {
                    return (
                    <div className='wrraper-input col-span-2 w-full'>
                         <textarea 
                            rows={5}
                            cols={25}
                            className='input-style'
                            name={val.name}
                            value={inputsValue[val.name]}
                            onChange={inputChangeHandler}
                    />
                    <label htmlFor="product_desc">{val.title}</label>
                    {errorInput[val.name] && <p className='error-text'>{errorInput[val.name]}</p>}
                    </div>
                    )
                } 
                return null;
                
        })
    }
    
    const renderContentPage = () => {
        switch (activeStep) {
            case 1:
                return(
                    <motion.div
                        key={activeStep}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className='inputs-container grid grid-cols-3 gap-5'>
                            {
                                renderInputs()
                            }
                            <div 
                                className='btn-style'
                                onClick={handleNextStep}
                                >
                                <p>
                                بعدی    
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    
                
                )
            case 2 :
                return(
                    
                    <motion.div
                        key={activeStep}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                            <div className='inputs-container grid grid-cols-3 gap-5'>
                            {
                                inputStep2?.map((val , i) => {
                                    if(val.type === 'text') {
                                        return (
                                            <div className='wrraper-input'>
                                                <input 
                                                    type={val.type}
                                                    name={val.name}
                                                    value={inputsValue[val.name]}
                                                    onChange={inputChangeHandler}
                                                    className='input-style'
                                                />
                                                <label htmlFor={val.name}>{val.title}</label>
                                                {errorInput[val.name] && <p className='error-text'>{errorInput[val.name]}</p>}
                                            </div>
                                        )
                                    }
                                    if(val.type === "select" && val.name === "product_price_type") {
                                        return (
                                            <div className='wrraper-input'>
                                                <select 
                                                    className='input-style'
                                                    name={val.name}
                                                    value={inputsValue[val.name]}
                                                    onChange={inputChangeHandler}
                                                >
                                                    <option>واحد پول</option>
                                                    <option>Rial</option>
                                                    <option>USD</option>
                                                    <option>EUR</option>
                                                </select>
                                            </div>
                                        )
                                    } else if(val.name === "product_type_send") {
                                        return (
                                            <div className='wrraper-input'>
                                                <select 
                                                    className='input-style'
                                                    name={val.name}
                                                    value={inputsValue[val.name]}
                                                    onChange={inputChangeHandler}
                                                >
                                                    <option>نوع ارسال</option>
                                                    <option>تیپاکس</option>
                                                    <option>پست پیشتاز</option>
                                                    <option>پیک</option>
                                                </select>
                                            </div>
                                        )
                                    }
                                })
                            }
                        <div 
                            className='btn-style'
                            onClick={handlePrevStep}
                            >
                            <p>
                            قبلی    
                            </p>
                        </div>
                        <div 
                            className='btn-style'
                            onClick={handleNextStep}
                            >
                            <p>
                            بعدی    
                            </p>
                        </div>
                    </div>
                    </motion.div>

                    
                )
            case 3: 
                return(
                    <motion.div
                        key={activeStep}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                    <div className='upload-image'>
                        {
                            (image === null) ? 
                                (
                                    <>
                                    
                                    <div className='upload-content'>
                                        <Upload />
                                        <p>
                                            آپلود تصویر محصول
                                        </p>
                                    </div>
                                    <input 
                                        type='file'
                                        className='upload-input'
                                        accept='image/*'
                                        onChange={handleImageChange}
                                    />
                                    
                                    </>
                                    

                                )
                                : 
                                (
                                    <img src={image} style={{height : '240px' , width : '100%'}}/>
                                )
                        }
                        
                    </div>
                    <div className='flex items-center justify-center gap-5 !mt-5'>
                        <div 
                            className='btn-style'
                            onClick={handlePrevStep}
                        >
                            <p>قبلی</p>
                        </div>    
                        <div 
                            className='btn-style'
                            onClick={handleNextStep}
                            >
                            <p>
                            بعدی    
                            </p>
                        </div>                
                    </div>
                    </motion.div>

                )
                break;
            case 4: 
                return (
                    <motion.div
                        key={activeStep}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className='result'>
                            <img src={image} alt='عکس محصول' width={400} height={400}/>
                            <p>{`نام محصول : ${inputsValue.product_name}`}</p>
                            <p>{`قیمت محصول : ${parseInt(inputsValue.product_price).toLocaleString()}` + ' تومان'} </p>
                            <p>{`توضیحات محصول : ${inputsValue.product_desc}`}</p>
                            <p>{`نوع ارز : ${inputsValue.product_price_type}`}</p>
                            <p>{`نوع ارسال : ${inputsValue.product_type_send}`}</p>
                            <div className='flex items-center justify-center gap-5 !mt-5'>
                            <div 
                                className='btn-style'
                                onClick={handlePrevStep}
                            >
                                <p>قبلی</p>
                            </div>    
                            <button 
                                className='btn-style'
                                style={{
                                    backgroundColor : 'var(--success-clr)'
                                }}
                                onClick={() => {
                                    setAvtiveStep(1)
                                    setInputsValue({
                                        product_name : '',
                                        product_count : '',
                                        product_type : '',
                                        product_desc : '',
                                        product_price : '',
                                        product_price_type : '',
                                        product_type : '',
                                        product_type_send : '',
                                    })
                                    setImage(null)
                                }}
                                >
                                <p>
                                ثبت   
                                </p>
                            </button>                
                        </div>
                        </div>
                    </motion.div>
                )
                return(
                    <p>4</p>
                    
                )
                break;
            default:
                break;
        }
    }
  return (
    <Styles>
        <AnimatePresence>
            <div className='step-bar' style={{backgroundImage : `url(${bgTitle})`}}>
                {
                    renderSteps
                }
            </div>
            <div className='forms'>

                    {
                        renderContentPage()
                    }

            </div>
        </AnimatePresence>
    </Styles>
  )
}

export default Ad_newProduct
