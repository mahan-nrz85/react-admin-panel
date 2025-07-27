import React from 'react'
import styled from 'styled-components'
const Styles = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
.loader {
  color: #7F8CFF ;
  width: 4px;
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0;
  transform: translateX(-38px);
  animation: l21 .5s infinite alternate linear;
}

@keyframes l21 {
  50%  {box-shadow: 19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px}
  100% {box-shadow: 19px 0 0 0  , 38px 0 0 3px, 57px 0 0 7px}
}
`
function Loading({classname}) {
  return (
    <Styles className={classname}>
        <div className='loader'></div>
    </Styles>
  )
}

export default Loading
