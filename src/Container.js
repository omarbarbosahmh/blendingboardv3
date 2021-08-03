import LetterButton from "./LetterButton";
export default function Container({letters,selectedLetters,color,onLetterClick,blockedLetters,style}) {
 
 
 return <div style={style?{...style}:{}}>{letters.map((letter,index)=>{return  <LetterButton
       key={index}
       color={color}
       letter={letter}
       selected={selectedLetters.some(selectedLetters=>{return selectedLetters===letter})}
       blocked={blockedLetters.some(blockedLetters=>{return blockedLetters===letter})}
       onClick={onLetterClick}
     ></LetterButton> })}</div>
}
 

