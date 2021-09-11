import React from 'react';
import styled, {keyframes, css} from "styled-components"

const TextAnimation = (props) => {
    const textArr = props.text.split("");
    

    return (
        <Wrapper>
            {textArr.map((char, index) => {
                return <span key={index}>{char}</span>
            })}
        </Wrapper>
    );
}

export default TextAnimation;

//https://stackoverflow.com/questions/52696511/for-loops-in-styled-components
function createCSS() {
    let styles = '';
  
    for (let i = 1; i <= 20; i += 1) {
       styles += `
         span:nth-child(${i}) {
           animation-delay: ${i * 0.1}s;
         }
       `
    }
  
    return css`${styles}`;
  }

const animation = keyframes`
0% {opacity 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px)}
50%{opacity 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg);  filter: blur(0px)}
75%{opacity 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg);  filter: blur(0px)}
100%{opacity 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg);  filter: blur(10px)}
`
//styled-components behaves like saas
const Wrapper = styled.span`
display: inline-block;

    span{
        display: inline-block;
        opacity: 0;
        color: red;
        animation-name: ${animation};
        animation-fill-mode: forwards;
        animation-duration: 6s;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1)
    }
    ${createCSS()};
`