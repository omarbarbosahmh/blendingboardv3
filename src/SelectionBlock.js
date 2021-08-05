import LetterButton from "./LetterButton";
import {useState, useEffect} from 'react'
import Container from "./Container";
 
export default function SelectionBlock({getAllSelectedLetters,initialConfig,getSelectedLettersByColor,getSelectedAllOrNoneLettersByColor,desSelectLetterByColor,uniqueId}) {
 
 let [lettersArray,setLettersArray] = useState(
initialConfig)
 let [selectedLetters,setSelectedLetters] = useState([])
 let [calculateH,setCalculateH] = useState(false)
 
 let emitAllLetters=(allLettersArray)=>{
   //console.log(lettersArray)
let allLetters = [...allLettersArray].map(({selectedLetters})=>{
//console.log(selectedLetters)
return selectedLetters
})
allLetters= allLetters.flat(1)
//console.log(allLetters)
   getAllSelectedLetters(allLetters)
}
 
let emitSelectedLettersByColor=(color,selectedLetters,allLetters)=>{
   getSelectedLettersByColor(color,selectedLetters,allLetters)
}
 
 let onLetterClick= (letter,index,color,selected)=>{
   //console.log(letter,index)
   let cloneLettersArray = [...lettersArray]
     if(lettersArray[index].selectedLetters.some(selectedLetter=>selectedLetter===letter)){
           cloneLettersArray[index].selectedLetters = cloneLettersArray[index].selectedLetters.filter(selectedLetter=>selectedLetter!==letter)      
         }else{
     cloneLettersArray[index].selectedLetters = [...cloneLettersArray[index].selectedLetters,letter]
         }
        
         setSelectedLetters(cloneLettersArray)
         emitAllLetters(cloneLettersArray)
         if(!selected){
           emitSelectedLettersByColor(color,cloneLettersArray[index].selectedLetters)
         }else{
desSelectLetterByColor(color,letter)
         }
       
        
 
 }
 let selectAll= ()=>{
      let cloneLettersArray = [...lettersArray]
      cloneLettersArray.map(letterArrayObj=>{
     letterArrayObj.selectedLetters = [...letterArrayObj.letters]
  
   
 
return letterArrayObj
      })
        setSelectedLetters(cloneLettersArray)
        emitAllLetters(cloneLettersArray)
          getSelectedAllOrNoneLettersByColor('all')
 }
 
   let selectNone= ()=>{
      let cloneLettersArray = [...lettersArray]
      cloneLettersArray.map(letterArrayObj=>{
letterArrayObj.selectedLetters = []
 
return letterArrayObj
      })
        setSelectedLetters(cloneLettersArray)
        emitAllLetters(cloneLettersArray)
        getSelectedAllOrNoneLettersByColor('none')
 }
 
 let selectByIndex= (index)=>{
 
        let cloneLettersArray = [...lettersArray]
     
   if( cloneLettersArray.[index].selectedLetters.length === [...cloneLettersArray.[index].letters].length){
cloneLettersArray.[index].selectedLetters =[]
   }else{
     cloneLettersArray.[index].selectedLetters = [...cloneLettersArray.[index].letters]
   }
 
    console.log(index)
    console.log(cloneLettersArray.[index])
   
 
        setSelectedLetters(cloneLettersArray)
        emitAllLetters(cloneLettersArray)
        //alert(JSON.stringify( cloneLettersArray[index].selectedLetters))
       emitSelectedLettersByColor(cloneLettersArray[index].color,cloneLettersArray[index].selectedLetters,cloneLettersArray[index].letters)
          //getSelectedAllOrNoneLettersByColor('all')
 }
 
 let selectByIndexAndSubCategory= (index,subCategoryLetters)=>{
 
        let cloneLettersArray = [...lettersArray]
     
 if( subCategoryLetters.every(letter=>cloneLettersArray.[index].selectedLetters.some(letter2=>letter2===letter))){
cloneLettersArray.[index].selectedLetters =[...cloneLettersArray.[index].selectedLetters.filter(letter=>!subCategoryLetters.some(letter2=>letter2===letter))]
   }else{
     let arraySelectedLetters= [...cloneLettersArray.[index].selectedLetters,...subCategoryLetters]
      arraySelectedLetters= new Set(arraySelectedLetters)
  arraySelectedLetters=Array.from(arraySelectedLetters)
     cloneLettersArray.[index].selectedLetters = [...arraySelectedLetters]
   }
 
    console.log(index)
    console.log(cloneLettersArray.[index])
   
 
        setSelectedLetters(cloneLettersArray)
        emitAllLetters(cloneLettersArray)
        //alert(JSON.stringify( cloneLettersArray[index].selectedLetters))
       emitSelectedLettersByColor(cloneLettersArray[index].color,cloneLettersArray[index].selectedLetters,cloneLettersArray[index].letters)
          //getSelectedAllOrNoneLettersByColor('all')
 }
 useEffect(() => {
 setLettersArray(initialConfig);
}, [initialConfig]);
useEffect(() => {
  function debounce(func, wait, immediate) {
 var timeout;
 
 return function executedFunction() {
   var context = this;
   var args = arguments;
    
   var later = function() {
     timeout = null;
     if (!immediate) func.apply(context, args);
   };
 
   var callNow = immediate && !timeout;
    clearTimeout(timeout);
 
   timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
 };
};
 
var returnedFunction = debounce(function() {
   setCalculateH(!calculateH)
}, 500);
 
window.addEventListener('resize', returnedFunction)})
 return <div key={uniqueId} style={{marginBottom:"24px"}}>
   <div id={'container-'+uniqueId} style={{margin:"20px"}}>
 
 
{false &&  <div style={{border :'solid blue 2px',marginTop:(document.getElementById('container-'+uniqueId)?.clientHeight/2)-20 + 'px', width:'9%',float:"left"}}>
   <LetterButton letter="None" onClick={selectNone} style={{float:'right'}}></LetterButton>
  <LetterButton letter="All" onClick={selectAll} style={{float:'right'}} ></LetterButton>
   <div style={{clear:"both"}}></div >
   </div>
}
<div style={{ width:'100%', float:"left",textAlign:'center',display: 'flex',
 justifyContent: 'center',
 alignItems: 'center'}}>
 
<div>
     {lettersArray.map((letters,index)=>{return <div style={{  textAlign:"left",width:'100%',marginTop:index===0?"0px":"24px", visibility:letters.categoryName===''?'hidden':"visible"}}><div onClick={()=>selectByIndex(index)} style={{cursor:"pointer",borderRadius:"5px",padding:"10px", textAlign:"center",backgroundColor:`rgba(${letters.color},1)`,fontWeight:"600"}}>{letters.categoryName}<div style={{float:"right"}}>+</div></div>
       <div style={{ borderRadius:"5px",backgroundColor:'white',display:"flex",flexDirection:"column",justifyContent:"center"}}>
     
  
     
    
   { letters.subCategories.length ===0 && <Container
       key = {index}
       style = {letters.style?{...letters.style, padding:"10px"}:{}}
       letters = {letters.letters}
       selectedLetters = {letters.selectedLetters}
       color = {letters.color}
       onLetterClick={(letter)=>onLetterClick(letter,index,letters.color,letters.selectedLetters.some(selectedLetter=>selectedLetter===letter))}
       blockedLetters={letters.blockedLetters}
       >
     </Container>}
    
       {letters.subCategories.map((subCategoryletters,index2)=>{return <div style={{float:'left'}}>
   
    
    {index2!=0 && <div style={{height:'5px', backgroundColor:'#e1f7fd'}}></div>}
     <br />
      <span onClick={()=>selectByIndexAndSubCategory(index,subCategoryletters.letters)} style={{cursor:"pointer",fontWeight:"600",marginLeft:"20px",fontStyle:"italic"}}>{subCategoryletters.subCategoryName} </span>
      <br />
    
      
      <Container
       key = {index2}
       style = {letters.style?{...letters.style, padding:"20px"}:{}}
       letters = {subCategoryletters.letters}
       selectedLetters = {letters.selectedLetters}
       color = {letters.color}
       onLetterClick={(letter)=>onLetterClick(letter,index,letters.color,letters.selectedLetters.some(selectedLetter=>selectedLetter===letter))}
       blockedLetters={letters.blockedLetters}
       >
     </Container>
    
   
    
     </div>})}
    
     </div></div>})
     }
 
 
    
    
      <div style={{clear:'both'}}></div>
     </div>
   
</div>
 
<div style={{clear:'both'}}></div>
   </div>
  
    
   
 </div>
 
}

