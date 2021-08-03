import {useState, useEffect,useImperativeHandle,forwardRef} from 'react'
import SelectionBlock from "./SelectionBlock";
import "./App.css";
export default forwardRef((props,ref)=> {
let {getTransformToMainContainerLetterArrayProps,style,setSelectedScreen, selectedScreen}= props
useImperativeHandle(ref, () => ({
 
   choosePresetExternal(preset) {
     console.log(preset)
     choosePreset(preset);
   }
 
 }));
let [presets ,setPresets]=useState(!JSON.parse(localStorage.getItem('presets'))?[]:JSON.parse(localStorage.getItem('presets')))
let [selectedPreset ,setSelectedPreset]=useState(localStorage.getItem('selectedPreset')?localStorage.getItem('selectedPreset'):'Default');
 let [presetName ,setPresetName]=useState()
   let [reset ,setReset]=useState(false)
   let [uniqueId, setUniqueId] = useState(Date.now())
    let defaultConfigs= [[
     {categoryName:"Consonants",subCategories:[],letters:['','b','c','d','f','g','h','i','j','k','l','m','n','p','r','s','t','v','w','y','z'],color:'153, 195, 252',selectedLetters:['','b','c','d','f','g','h','i','j','k','l','m','n','p','r','s','t','v','w','y','z'],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(4,40px)',gridGap:'12px',margin:"12px auto"}},
     {categoryName:"Blends",subCategories:[{subCategoryName:"Blends with l",letters:['bl','cl','fl','gl','pl','sl','spl']},{subCategoryName:"Blends with r",letters:['br','cr','dr','fr','gr','pr','scr','shr','spr','str','thr','tr']},{subCategoryName:"Blends with s",letters:['sc','sk','sl','sm','sn','sp','spl','spr','squ','st','str','sw']}],letters:['bl','cl','fl','gl','pl','sl','spl','br','cr','dr','fr','gr','pr','scr','shr','spr','str','thr','tr','sc','sk','sl','sm','sn','sp','spl','spr','squ','st','str','sw'],color:'153, 195, 252',selectedLetters:['e','i','o','u','y'],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(4,40px)',gridGap:'12px',margin:"12px auto"}},
     {categoryName:"Consonant DIagraphs", subCategories:[],letters:['ch','gh','gn','kn','ph','qu','sh','sh','th','wh','wr'],color:'153, 195, 252',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(4,40px)',gridGap:'12px',margin:"12px auto"}},
  {categoryName:"Consonant Tiagraphs", subCategories:[],letters:['scr','shr','spl','spr'],color:'153, 195, 252',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(4,40px)',gridGap:'12px',margin:"12px auto"}},
    
    ],[
     {categoryName:"Short Vowels",subCategories:[],letters:['','b','c','d','f','g','h','i','j','k','l','m','n','p','r','s','t','v','w','y','z'],color:'175, 236, 68',selectedLetters:['','b','c','d','f','g','h','i','j','k','l','m','n','p','r','s','t','v','w','y','z'],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(5,40px)',gridGap:'12px',margin:"12px auto"}},
        {categoryName:"Long Vowels", subCategories:[{subCategoryName:"Long a", letters:['a','ai','aigh','ay','ea','ei','eigh','ey']},{subCategoryName:"Long e", letters:['e','ea','ee','ey','ie','y']},{subCategoryName:"Long i", letters:['i','ie','igh','y']},{subCategoryName:"Long o", letters:['o','oa','oe','ough','ow']},{subCategoryName:"Long u", letters:['eau','eu','ew','o','oe','oo','ough','u','u','ue','ui']}],letters:['a','ai','aigh','ay','ea','ei','eigh','ey','e','ea','ee','ey','ie','y','i','ie','igh','y','o','oa','oe','ough','ow','eau','eu','ew','o','oe','oo','ough','u','u','ue','ui'],color:'175, 236, 68',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(5,40px)',gridGap:'12px',margin:"12px auto"}},
     {categoryName:"r-Controlled Vowels", subCategories:[{subCategoryName:"/ar/", letters:['ar']},{subCategoryName:"/or/", letters:['oar','oor','or','ore','our']},{subCategoryName:"/ur/", letters:['ear','er','ir','ur']},{subCategoryName:"/ar/", letters:['air','are','ear']},{subCategoryName:"/ir/", letters:['ear','eer']}],letters:['ar','oar','oor','or','ore','our','ear','er','ir','ur','ear','er','ir','ur','air','are','ear','ear','eer'],color:'175, 236, 68',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(5,40px)',gridGap:'12px',margin:"12px auto"}},
    {categoryName:"Vowel Teams", subCategories:[{subCategoryName:"oo", letters:['oo']},{subCategoryName:"oo", letters:['ew','oe','oo','ough','ue','ui']},{subCategoryName:"o", letters:['au','augh','aw','ough']},{subCategoryName:"Long a", letters:['ai','aigh','ay','ea','ei','eigh','ey']},{subCategoryName:"Long e", letters:['ea','ee','ey','ie']},{subCategoryName:"Long i", letters:['ie','igh']},{subCategoryName:"Long o", letters:['oa','oe','ough','ow']},{subCategoryName:"Long u", letters:['eau','eu','ew','oe','oo','ough','ue','ui']}],letters:['oo','ew','oe','oo','ough','ue','ui','au','augh','aw','ough','ai','aigh','ay','ea','ei','eigh','ey','ea','ee','ey','ie','ie','igh','oa','oe','ough','ow','eau','eu','ew','oe','oo','ough','ue','ui'],color:'175, 236, 68',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(5,40px)',gridGap:'12px',margin:"12px auto"}},
 {categoryName:"Diphthongs", subCategories:[{subCategoryName:"/ou/", letters:['ou','ow']},{subCategoryName:"/oi/", letters:['oi','oy']}],letters:['ou','ow','oi','oy'],color:'175, 236, 68',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(5,40px)',gridGap:'12px',margin:"12px auto"}},
    
      
   ],[
   
     {categoryName:"Consonants",subCategories:[],letters:['b','d','g','k'],color:'219, 169, 250',selectedLetters:['b','d','g','k'],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(4,40px)',gridGap:'12px',margin:"12px auto"}},
     {categoryName:"Double Consonants", subCategories:[],letters:['bb','dd','ff','gg','ll','mm','nn','pp','rr','ss','tt','zz'],color:'219, 169, 250',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(4,40px)',gridGap:'12px',margin:"12px auto"}},
     {categoryName:"Blends with s", subCategories:[],letters:['sp','st'],color:'219, 169, 250',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(4,40px)',gridGap:'12px',margin:"12px auto"}},
      {categoryName:"Other Blends", subCategories:[],letters:['mp','nd','ng','nk','nt','nx'],color:'219, 169, 250',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(4,40px)',gridGap:'12px',margin:"12px auto"}},
     {categoryName:"Consonant Diagraphs", subCategories:[],letters:['ch','ck','gh','gn','mb','ph','sh','th','ve'],color:'219, 169, 250',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(4,40px)',gridGap:'12px',margin:"12px auto"}},
       {categoryName:"Consonant Tiagrpahs", subCategories:[],letters:['dge','tch'],color:'219, 169, 250',selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(4,40px)',gridGap:'12px',margin:"12px auto"}},
    
   ],[
       {categoryName:"Endings",subCategories:[],letters:['e','ed','es','ing','s'],color:'52, 210, 189',selectedLetters:['e','ed','es','ing','s'],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(1,40px)',gridGap:'12px',margin:"12px auto"}}
 
   ]]
  
   let [initialConfigs,setInitialConfigs] =useState(defaultConfigs)
 
 let initialLettersByColor ={}
 let allLettersByColorAndRow = []
let allLetters = [...initialConfigs].map((initialConfigObj,index)=>{
 let obj= {}
 initialConfigObj.map(innerObj=>{
  obj[innerObj.color]= {letters:innerObj.letters}
 
})
allLettersByColorAndRow.push(obj)
initialConfigObj = initialConfigObj.map(({selectedLetters})=>selectedLetters).flat()
 
 
return initialConfigObj
})
//allLetters= allLetters.flat()
let allLettersConfigFlat= initialConfigs.flat(1)
allLettersConfigFlat.map(letterConfig=>{
 let arraySelectedLetters =   [...initialLettersByColor[letterConfig.color] && initialLettersByColor[letterConfig.color].selectedLetters?initialLettersByColor[letterConfig.color].selectedLetters:[] ,...letterConfig.selectedLetters]
 let setSelectedLetters= new Set(arraySelectedLetters)
  arraySelectedLetters=Array.from(setSelectedLetters)
  let arrayLetters =   [...initialLettersByColor[letterConfig.color] && initialLettersByColor[letterConfig.color].letters?initialLettersByColor[letterConfig.color].letters:[] ,...letterConfig.letters]
 let setLetters= new Set(arrayLetters)
  arrayLetters=Array.from(setLetters)
  initialLettersByColor[letterConfig.color] = {selectedLetters:arraySelectedLetters}
 
})
 
 
 let [allSelectedLetters,setAllSelectedLetters]=useState([...allLetters])
 let [allSelectedLettersByColor,setSelectedLettersByColor]=useState(initialLettersByColor)
 
 
 let getAllSelectedLetters=(selectedLetters,index)=>{
   console.log(selectedLetters,index)
    let cloneAllSelectedLetters = [...allSelectedLetters]
    cloneAllSelectedLetters[index] = selectedLetters
    
 
setAllSelectedLetters(cloneAllSelectedLetters)
 
 }
 
 let getSelectedLettersByColor = (color,selectedLetters,allLetters)=>{
   console.log(color,selectedLetters)
  let cloneAllSelectedLettersByColor ={...allSelectedLettersByColor}
 let arrayLetters=[...cloneAllSelectedLettersByColor[color].selectedLetters,...selectedLetters]
 
 
 if(selectedLetters.length===0 && allLetters){
   arrayLetters= arrayLetters.filter(letter=>{
     return !allLetters.some(letter2=>letter2===letter)
   })
   console.log(arrayLetters)
  
 }
  let setLetters= new Set(arrayLetters)
  arrayLetters=Array.from(setLetters)
  cloneAllSelectedLettersByColor[color] = {selectedLetters:arrayLetters}
  setSelectedLettersByColor(cloneAllSelectedLettersByColor)
  transformToMainContainerLetterArrayProps(cloneAllSelectedLettersByColor)
}
 
 
let desSelectLetterByColor=(color,letter)=>{
 //alert(color + letter)
let cloneAllSelectedLettersByColor ={...allSelectedLettersByColor}
let arrayLetters=  [...cloneAllSelectedLettersByColor[color].selectedLetters]
 
const index = arrayLetters.indexOf(letter);
if (index > -1) {
 arrayLetters.splice(index, 1);
}
   let setLetters= new Set(arrayLetters)
  arrayLetters=Array.from(setLetters)
  cloneAllSelectedLettersByColor[color] = {selectedLetters:arrayLetters}
setSelectedLettersByColor(cloneAllSelectedLettersByColor)
transformToMainContainerLetterArrayProps(cloneAllSelectedLettersByColor)
}
let getSelectedAllOrNoneLettersByColor = (allOrNone,index)=>{
  let cloneAllSelectedLettersByColor ={...allSelectedLettersByColor}
 
let arrayLetters =[]
      for(var k in allSelectedLettersByColor) {
        if(allOrNone==='none'){
         // alert(k)
arrayLetters= [...cloneAllSelectedLettersByColor[k].selectedLetters].filter(letter=>{
  return !allLettersByColorAndRow[index][k].letters.some(letter2=>letter2===letter)
})
        }else{
        //  alert('index'+index+'color'+k)
        //   alert(JSON.stringify(allLettersByColorAndRow[index]))
arrayLetters=  [...cloneAllSelectedLettersByColor[k].selectedLetters, ...allLettersByColorAndRow[index][k].letters]
        }
   let setLetters= new Set(arrayLetters)
  arrayLetters=Array.from(setLetters)
  cloneAllSelectedLettersByColor[k] = {selectedLetters:arrayLetters}
      }
     
  setSelectedLettersByColor(cloneAllSelectedLettersByColor)
  transformToMainContainerLetterArrayProps(cloneAllSelectedLettersByColor)
}
 
let transformToMainContainerLetterArrayProps = (allSelectedLettersByColor)=>{
// alert(JSON.stringify(allSelectedLettersByColor))
   let transformed=[]
   for(var k in allSelectedLettersByColor) {
 
       let lettersConfig = {letters:allSelectedLettersByColor[k].selectedLetters,color:k,selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(5,auto)',gridGap:'12px',margin:"12px auto",float:'left'}}
       transformed.push(lettersConfig)
}
//console.log(transformed)
getTransformToMainContainerLetterArrayProps(transformed)
 
}
 
let savePreset = ()=>{
 try {
  
 
     let transformed=[]
   for(var k in allSelectedLettersByColor) {
 
       let lettersConfig = {letters:allSelectedLettersByColor[k].selectedLetters,color:k,selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(5,auto)',gridGap:'12px',margin:"12px auto",float:'left'}}
       transformed.push(lettersConfig)
}
let presets=localStorage.getItem('presets');
presets =!JSON.parse(presets)?[]:JSON.parse(presets)
presets= Array.from(new Set([...presets,presetName]))
localStorage.setItem('presets',JSON.stringify(presets) )
localStorage.setItem('selectedPreset', presetName)
setSelectedPreset(presetName)
setPresets(presets)
localStorage.setItem(presetName, JSON.stringify({preset:allSelectedLettersByColor,transformed}))
 } catch (error) {
   alert(error)
 }
}
 
let deletePreset = ()=>{
  localStorage.removeItem(selectedPreset)
 localStorage.setItem('selectedPreset', '')
 setSelectedPreset(null)
 let newPreset= [...presets]
 newPreset.splice(newPreset.indexOf(selectedPreset),1)
 localStorage.setItem('presets',JSON.stringify(newPreset) )
 setPresets(newPreset)
 choosePreset('Default')
}
 
let choosePreset = (presetName)=>{
 let initialConfigs = []
 setUniqueId(Date.now())
 localStorage.setItem('selectedPreset', presetName)
 setPresetName(presetName)
 setSelectedPreset(presetName);
 
 if(presetName==='Default' || !localStorage.getItem(presetName) ){
   setInitialConfigs(defaultConfigs)
   initialConfigs=[...defaultConfigs]
   setAllSelectedLetters(defaultConfigs)
 }else{
     let presetSaved= (JSON.parse(localStorage.getItem(presetName))).preset
console.log(presetSaved)
 let defaultConfigsClone =[...defaultConfigs]
for (var i = 0; i < defaultConfigsClone.length; i++) {
  let defaultConfigArray=     [...defaultConfigsClone[i]]
 defaultConfigArray= defaultConfigArray.map(defaultConfigObj=>{
  let copyDefaultConfigObj = {...defaultConfigObj}
  //alert(JSON.stringify(presetSaved[copyDefaultConfigObj.color]) + JSON.stringify(copyDefaultConfigObj.selectedLetters)   + JSON.stringify(presetSaved[copyDefaultConfigObj.color].selectedLetters.filter(presetSavedLetter=>copyDefaultConfigObj.selectedLetters.includes(presetSavedLetter))))
  copyDefaultConfigObj.selectedLetters= [...presetSaved[copyDefaultConfigObj.color].selectedLetters.filter(presetSavedLetter=>copyDefaultConfigObj.letters.includes(presetSavedLetter))]
  return copyDefaultConfigObj
  })
  defaultConfigsClone[i] =defaultConfigArray
}
 console.log(defaultConfigsClone)
 initialConfigs=[...defaultConfigsClone]
setInitialConfigs([...defaultConfigsClone])
 
 }
 
 let initialLettersByColor ={}
 let allLettersByColorAndRow = []
let allLetters = [...initialConfigs].map((initialConfigObj,index)=>{
 let obj= {}
 initialConfigObj.map(innerObj=>{
  obj[innerObj.color]= {letters:innerObj.letters}
 
})
allLettersByColorAndRow.push(obj)
initialConfigObj = initialConfigObj.map(({selectedLetters})=>selectedLetters).flat()
 
 
return initialConfigObj
})
//allLetters= allLetters.flat()
let allLettersConfigFlat= initialConfigs.flat(1)
allLettersConfigFlat.map(letterConfig=>{
 let arraySelectedLetters =   [...initialLettersByColor[letterConfig.color] && initialLettersByColor[letterConfig.color].selectedLetters?initialLettersByColor[letterConfig.color].selectedLetters:[] ,...letterConfig.selectedLetters]
 let setSelectedLetters= new Set(arraySelectedLetters)
  arraySelectedLetters=Array.from(setSelectedLetters)
  let arrayLetters =   [...initialLettersByColor[letterConfig.color] && initialLettersByColor[letterConfig.color].letters?initialLettersByColor[letterConfig.color].letters:[] ,...letterConfig.letters]
 let setLetters= new Set(arrayLetters)
  arrayLetters=Array.from(setLetters)
  initialLettersByColor[letterConfig.color] = {selectedLetters:arraySelectedLetters}
 
})
 
 
 setAllSelectedLetters([...allLetters])
 setSelectedLettersByColor(initialLettersByColor)
  transformToMainContainerLetterArrayProps(initialLettersByColor);
 setUniqueId(Date.now())
}
 
 
 
 
useEffect(() => {
     let transformed=[]
   for(var k in initialLettersByColor) {
 
       let lettersConfig = {letters:initialLettersByColor[k].selectedLetters,color:k,selectedLetters:[],blockedLetters:[],style:{display:'grid', gridTemplateColumns:'repeat(5,auto)',gridGap:'12px',margin:"12px auto",float:'left'}}
       transformed.push(lettersConfig)
}
 
localStorage.setItem('Default', JSON.stringify({preset:allSelectedLettersByColor,transformed}))
  choosePreset(localStorage.getItem('selectedPreset'))
 
 }, []);
 return <div style={style? style:{}}>
     <div style={{ width:'100%', backgroundColor:'#cdf1fc',height:'90px'}}>
 <div style={{margin:'auto', width:'70%'}} >
 
   <div style={{display:'inline-block', margin:'12px 0px', float:"left"}}>
     <img src="/assets/logo.png" alt="logo" width='280px'></img>
     </div>
     <div style={{display:'inline-block'}}>
                <br></br>
           <select name="preset" value={selectedPreset} onChange={(e)=>choosePreset(e.target.value)}>
             <option value={'Default'}>Default</option>
             {presets.map(preset=><option value={preset}>{preset}</option>)}
            </select>
            <input type="text" value={presetName} onChange={(e)=>setPresetName(e.target.value)} />
           
           <button onClick={savePreset}>Save as preset</button>
           <button onClick={deletePreset}>Delete preset</button>
 
          
         </div>
 <div style={{float:'right',margin:'12px 0px',display:'inline-block',cursor:"pointer"}} onClick={()=>setSelectedScreen("MainContainer")}>
     <img src="/assets/check.png" alt=" icon" width="50px"></img>
     </div>
 
     <div style={{clear:'both'}}>
       </div>
       </div></div>
        
        <div style={{textAlign:'center',fontWeight:'600',fontSize:"80px"}}>
    
     {/* {allSelectedLetters.flat(1).length} Selected */}
   </div>
  <div style={{ height:"78vh", overflowY:"auto", overflowX:"hidden",width:'100%',margin: '20px auto', display: "flex",justifyContent:"center"}}>
 {!reset && initialConfigs.map((initialConfig,index)=><SelectionBlock uniqueId={index} initialConfig={initialConfig} desSelectLetterByColor={desSelectLetterByColor} getSelectedLettersByColor={getSelectedLettersByColor} getSelectedAllOrNoneLettersByColor={(allOrNone)=>getSelectedAllOrNoneLettersByColor(allOrNone,index)} getAllSelectedLetters={(lettersArray)=>getAllSelectedLetters(lettersArray,index)}></SelectionBlock>)}
 </div>
  
  
  
 </div>
 
})
 
 

