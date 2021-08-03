export default function LetterButton({color,letter,onClick,selected,blocked,style={}}) {
 
    style = {
     border:'1px solid black',
     textAlign:'center',
     backgroundColor:blocked?'grey':`rgba(${color},${selected?'1':'0.4'})`,
     cursor: blocked?'no-drop':'pointer',
     fontWeight:600,
     borderRadius:"6px",
     display: 'inline-block',
     padding:'5px 0px',
     width:'40px',
     heigth:'27px',
    
     ...style
   }
   return <div><div style={style} onClick={()=>blocked?null:onClick(letter)}>{letter}</div></div>
  }
   
  
  