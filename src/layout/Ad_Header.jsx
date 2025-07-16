import React from 'react'
import styled from 'styled-components'
const Styles = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    align-items: center;
    color: white;
    width: 100%;
    height: 100%;
    background-color: var(--bg-sec);
    .h-container {
        width: 75%;
    }
    .btn {
        width: 100px;
        p a {
            background-color: var(--err-clr);
            color: white;
            padding: 0.5rem;
            display: block;
            width: 100%;
            text-align: center;
            border-radius: 10px;
        }
    }
`
function Ad_Header() {
  return (
    <Styles>
        <div className='h-container'>
            <span className='text-2xl '>پنل ادمین</span> <span>- خوش آمدید</span>
        </div>
        <div className='btn'>
            <p>
                <a href='#'>خروج</a>
            </p>
        </div>
    </Styles>
  )
}

export default Ad_Header
