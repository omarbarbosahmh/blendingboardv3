import MainContainer from "./MainContainer";
import {useState,useRef} from 'react'
import SelectionContainer from "./SelectionContainer";
function App() {
 //document.body.style.zoom = "80%";
let [lettersConfig,setLettersConfig] = useState([])
 
let [selectedScreen,setSelectedScreen] = useState('MainContainer')
const childRef = useRef();
let choosePreset= (presset) =>{
 
childRef.current.choosePresetExternal(presset)
}
 return <div  >
      { selectedScreen==='MainContainer'&& <MainContainer setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen}   emitChoosePreset={choosePreset}   lettersConfig={lettersConfig}
       >
     </MainContainer>}
 
    <SelectionContainer  ref={childRef}  style={{display:selectedScreen==='MainContainer'?'none':'inline'}} setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen}  getTransformToMainContainerLetterArrayProps={setLettersConfig}
       >
     </SelectionContainer>
  
  
  
 </div>
 
}
 
export default App;
 

