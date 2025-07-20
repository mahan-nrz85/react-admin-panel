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
`
function Ad_Header() {
  return (
    <Styles>
        <div className='h-container'>
            <span className='text-2xl '>پنل ادمین</span> <span>- خوش آمدید</span>
        </div>
    </Styles>
  )
}

export default Ad_Header
