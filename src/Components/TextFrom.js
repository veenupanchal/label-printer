import React,{useState, useRef, useEffect} from 'react'
import propTypes  from 'prop-types'
import './TextFormStyle.css'
import {HexColorPicker} from 'react-colorful'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useReactToPrint } from 'react-to-print';
let speaking;
let a="";
export default function TextFrom(props) {
  
  let newText="";
  const [text, setText]=useState("");
  const [boldState, setBold]=useState(1);
  const [italicState, setItalic]=useState(1);
  const [underlineState, setUnderline]=useState(1);
  const [color, setColor] = useState("blue");
  const [bcolor, setbColor] = useState("blue");
  const [bgcolor, setbgColor] = useState("white");
  const [tareaWidth,setTareaWidth]=useState();
  const [tareaHeight,setTareaHeight]=useState();
  const [tareaBsize,setTareabsize]=useState(".5cm");
  const [tareapadding,setTareapadding]=useState(".5cm");
  
  
  let size; 
  let Tsize;
  
  window.setTimeout(() => {
    size= document.querySelector(".mainText")
      Tsize = new ResizeObserver((e)=>{console.log(e)
  
      const textelement= e[0];
      setTareaWidth(textelement.contentRect.width);
      setTareaHeight(textelement.contentRect.height)
      
    })
Tsize.observe(size) }
    , 500);
  
  
  const printdiv = useRef();
    const handlePrint = useReactToPrint({             // function TO PRINT
      content: () => printdiv.current,
    });
    
    
    const {
      transcript="please enter the text here",
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  

  let uppercase=()=>{                     //change to upper case function 
    newText=text.toUpperCase();
    setText(newText);
  }
  let changedupper=(event)=>{             // onchange function 
    console.log("text is changed")
    setText(event.target.value);
  }
  let erase=()=>{                        // reset text function 
    window.location.reload(true);
  
  }
  let lowercase=()=>{                     //change to lower case function 
    newText=text.toLowerCase();
    setText(newText);
  }
  let titlecase=()=>{                     //change to title case function 
    newText=text;
    let textArray= Array.from(newText);
    for(let i=1;i<textArray.length;i++)
    {
      if(textArray[i-1]===" ")
      textArray[i]=textArray[i].toUpperCase();
      else
      textArray[i]=textArray[i].toLowerCase();
    }
    textArray[0]=textArray[0].toUpperCase();
   setText(textArray.join(""));
  }
  let bold =()=>{                          //function for BOLD
    setBold(boldState+1); 
    if(boldState%2!==0)  {
    document.getElementById("Textarea1").style.fontWeight= 'bold';
    document.getElementById("btnBold").style.border="2px solid black";
    } else {
      document.getElementById("Textarea1").style.fontWeight= '';
      document.getElementById("btnBold").style.border="none";
    }
  }

  let italic =()=>{                          //function for ITALIC
    setItalic(italicState+1); 
    if(italicState%2!==0)  {
    document.getElementById("Textarea1").style.fontStyle= 'italic';
    document.getElementById("btnItalic").style.border="2px solid black";
    } else {
      document.getElementById("Textarea1").style.fontStyle= '';
      document.getElementById("btnItalic").style.border="none";
    }                     
  }

    let underLine =()=>{                       //function for UNDERLINE 
      setUnderline(underlineState+1)
      if(underlineState%2!==0)
      {document.getElementById("Textarea1").style.textDecorationLine= 'underline';
        document.getElementById("btnUnderline").style.border="2px solid black";}
      else
      { document.getElementById("Textarea1").style.textDecorationLine= '';
        document.getElementById("btnUnderline").style.border="none";}
     
    }
let font1=(e)=>{  
 let  fontsize=e.target.innerText;                            // function for FONT CHANGE
  document.getElementById("Textarea1").style.fontFamily=e.target.innerText;
}
  
let fontSize=(e)=>{                         // function for FONT SIZE
  document.getElementById("Textarea1").style.fontSize=e.target.innerText;
}

let Size=()=>{  
                        // function for FONT SIZE
  document.getElementById("p").innerHTML=a;
  console.log(document.getElementById("Textarea1").style.width);
}
let borderStyle=(e)=>{                         // function for BORDER STYLE
  let styles=  e.target.innerText;
  console.log(styles);
  let position =styles.search("_");
  console.log(position)
  styles=styles.slice(0,position);
  console.log(styles)
  document.getElementById("Textarea1").style.borderStyle=styles;
}
let borderWidth=(e)=>{                       // function for BORDER WIDTH
  document.getElementById("Textarea1").style.borderWidth=e.target.innerText;
  setTareabsize(e.target.innerText);
}
let borderRadious=(e)=>{                     // function for BORDER RADIOUS
  document.getElementById("Textarea1").style.borderRadius=e.target.innerText;
}
let bgpadding=(e)=>{                         // function for TEXTAREA PADDING
  document.getElementById("Textarea1").style.padding=e.target.innerText;
  setTareapadding(e.target.innerText);
}
let speech=()=>{  
  speaking=true;                 // function for  SPEECH TO TEXT START
  SpeechRecognition.startListening(); 
}

let stopSpeech=()=>{            // function for  SPEECH TO TEXT STOP
  setText(transcript); 
  SpeechRecognition.stopListening();
  speaking=false;
  
} 
let addItem=()=>{                 // function for  ADDING THE TEXT TO PRINT APPEND
  setText("");
  let x = document.getElementById("Textarea1").cloneNode();
  x.id = "lol";
  x.disabled=true;
  x.style.resize="none";
  x.style.overflow="hidden";
  document.getElementById("printdiv").appendChild(x)
  

}


return(
    <>
     
    <div className='textButton'>

                
   

                <div className="optionsdiv">
                <textarea  className="mainText" onChange={changedupper} style={{color:color, borderColor:bcolor, backgroundColor:bgcolor, width:"13.7cm", height:"3.6cm"}} id="Textarea1" placeholder={speaking===true?transcript:"Enter your text here"} value={text}></textarea>
                <div className='my-3'>
                <div >
                <button className="btn btn-info mx-1 my-1 " onClick={speech}>Start speaking</button>
                <button className="btn btn-info mx-1 " onClick={stopSpeech}>Stop speaking</button>
                <button className="btn btn-info mx-1 " onClick={addItem}>Add</button>
                <button className="btn btn-info mx-1" onClick={erase}>Reset </button>
                <button className="btn btn-info mx-1" onClick={handlePrint}>Print or Save</button>
                </div>
                <div>
                
                <button className="btn btn-primary mx-1 my-1" onClick={uppercase}>ABC</button>
                <button className="btn btn-primary mx-1" onClick={lowercase}>abc</button>
                <button className="btn btn-primary mx-1" onClick={titlecase}>Abc</button>
                <button className="btn btn-primary mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Size</button> 
                
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={fontSize}>.5cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>1cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>1.2cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>1.5cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>1.8cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>2cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>2.2cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>2.5cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>2.8cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>3cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>3.2cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>3.5cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>3.8cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>4cm</a></li>

                  <li><a className="dropdown-item" onClick={fontSize}>4.2cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>4.5cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>4.8cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>5cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>5.2cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>5.5cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>5.8cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>6cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>8cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>10cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>12cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>14cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>16cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>18cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>20cm</a></li>
                  <li><a className="dropdown-item" onClick={fontSize}>22cm</a></li>

                </ul> 
           
                <button className="btn btn-primary mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Fonts </button> 
                
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={font1}><span style={{fontFamily:"Courier New"}}>Courier New</span></a></li>
                  <li><a className="dropdown-item" onClick={font1}><span style={{fontFamily:"Bodoni MT"}}>Bodoni MT</span></a></li>
                  <li><a className="dropdown-item" onClick={font1}><span style={{fontFamily:"Arial Black"}}>Arial Black</span></a></li>
                  <li><a className="dropdown-item" onClick={font1}><span style={{fontFamily:"Gadugi"}}>Gadugi</span></a></li>
                  <li><a className="dropdown-item" onClick={font1}><span style={{fontFamily:"Comic Sans MS"}}>Comic Sans MS</span></a></li>
                  <li><a className="dropdown-item" onClick={font1}><span style={{fontFamily:"Algerian"}}>Algerian</span></a></li>
                  <li><a className="dropdown-item" onClick={font1}><span style={{fontFamily:"Monotype Corsiva"}}>Monotype Corsiva</span></a></li>
                  <li><a className="dropdown-item" onClick={font1}><span style={{fontFamily:"Castellar"}}>Castellar</span></a></li>
                  <li><a className="dropdown-item" onClick={font1}><span style={{fontFamily:"Bernard MT Condensed"}}>Bernard MT Condensed</span></a></li>
                  <li><a className="dropdown-item" onClick={font1}><span style={{fontFamily:"Elephant"}}>Elephant</span></a></li>

                </ul>
              
                <button className="btn btn-primary mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false" >Colour</button>
                <div className="dropdown-menu">
                <HexColorPicker color={color} onChange={setColor} /></div>    
               
             
                <button id ="btnBold" className="btn btn-primary mx-1"  onChange={changedupper} onClick={bold}><b>B</b></button>
                <button id ="btnItalic" className="btn btn-primary mx-1" onClick={italic}><i>I</i></button>
                <button id ="btnUnderline" className="btn btn-primary mx-1" onClick={underLine}><u>U</u></button>
                
    </div>
    <div>
                  <div className="borderButton">
                  <button className="btn btn-success mx-1 my-1" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Border Width </button> 
                  <ul className="dropdown-menu">
                  <li><a className="dropdown-item"  onClick={borderWidth}>.05cm</a></li>
                  <li><a className="dropdown-item"  onClick={borderWidth}>.1cm</a></li>
                  <li><a className="dropdown-item"  onClick={borderWidth}>.3cm</a></li>
                  <li><a className="dropdown-item" onClick={borderWidth}>.5cm</a></li>
                  <li><a className="dropdown-item" onClick={borderWidth}>.8cm</a></li>
                  <li><a className="dropdown-item" onClick={borderWidth}>1cm</a></li>
                  <li><a className="dropdown-item" onClick={borderWidth}>1.3cm</a></li>
                  <li><a className="dropdown-item" onClick={borderWidth}>1.5cm</a></li>
                  <li><a className="dropdown-item" onClick={borderWidth}>1.8cm</a></li>
                  <li><a className="dropdown-item" onClick={borderWidth}>2cm</a></li>
                  <li><a className="dropdown-item" onClick={borderWidth}>2.3cm</a></li>

                </ul>
              
                <button className="btn btn-success mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false" >Border colour</button>
                <div className="dropdown-menu">
                <HexColorPicker color={bcolor} onChange={setbColor} /></div>

                <button className="btn btn-success mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Border styles </button> 
                
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item"  onClick={borderStyle}><span style={{borderStyle:"none"}}>None_</span></a></li>
                  <li><a className="dropdown-item" onClick={borderStyle}><span style={{borderBottomStyle:"dotted", borderColor:"black", fontSize:".2cm", color:"transparent", }}>dotted_____________________________________</span></a></li>
                  <li><a className="dropdown-item" onClick={borderStyle}><span style={{borderBottomStyle:"dashed", borderColor:"black", fontSize:".2cm", color:"transparent", }}>dashed_____________________________________</span></a></li>
                  <li><a className="dropdown-item" onClick={borderStyle}><span style={{borderBottomStyle:"solid", borderColor:"black", fontSize:".2cm", color:"transparent", }}>solid______________________________________</span></a></li>
                  <li><a className="dropdown-item" onClick={borderStyle}><span style={{borderBottomStyle:"double", borderColor:"black", fontSize:".2cm", color:"transparent", }}>double_____________________________________</span></a></li>
                  <li><a className="dropdown-item" onClick={borderStyle}><span style={{borderBottomStyle:"groove", borderColor:"black", fontSize:".2cm", color:"transparent", }}>groove_____________________________________</span></a></li>
                  <li><a className="dropdown-item" onClick={borderStyle}><span style={{borderBottomStyle:"ridge", borderColor:"black", fontSize:".2cm", color:"transparent", }}>ridge______________________________________</span></a></li>
                  <li><a className="dropdown-item" onClick={borderStyle}><span style={{borderBottomStyle:"inset", borderColor:"black", fontSize:".2cm", color:"transparent", }}>inset______________________________________</span></a></li>
                  <li><a className="dropdown-item" onClick={borderStyle}><span style={{borderBottomStyle:"outset", borderColor:"black", fontSize:".2cm", color:"transparent", }}>outset_____________________________________</span></a></li>

                </ul>
                <button className="btn btn-success mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Border radious </button> 
                  <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={borderRadious}>.2cm</a></li>
                  <li><a className="dropdown-item" onClick={borderRadious}>.4cm</a></li>
                  <li><a className="dropdown-item" onClick={borderRadious}>.6cm</a></li>
                  <li><a className="dropdown-item" onClick={borderRadious}>.8cm</a></li>
                  <li><a className="dropdown-item" onClick={borderRadious}>1cm</a></li>
                  <li><a className="dropdown-item" onClick={borderRadious}>1.2cm</a></li>
                  <li><a className="dropdown-item" onClick={borderRadious}>1.4cm</a></li>
                  <li><a className="dropdown-item" onClick={borderRadious}>1.6cm</a></li>
                  <li><a className="dropdown-item" onClick={borderRadious}>1.8cm</a></li>
                  <li><a className="dropdown-item" onClick={borderRadious}>2cm</a></li>

                </ul>
               
    </div>
    <div className="textareas">
                <button className="btn btn-warning mx-1 my-1" type="button" data-bs-toggle="dropdown" aria-expanded="false" >Background Color</button>
                <div className="dropdown-menu">
                <HexColorPicker color={bgcolor} onChange={setbgColor} /></div>                  
                  <button className="btn btn-warning mx-1 my-1" type="button" data-bs-toggle="dropdown" aria-expanded="false" >Background size</button>
                  <ul className="dropdown-menu">
                  <li><a className="dropdown-item">Drag the corner</a></li>
                  </ul>
                  <button className="btn btn-warning mx-1 my-1" type="button" data-bs-toggle="dropdown" aria-expanded="false" >Background text padding</button>
                  <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={bgpadding}>.02cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>.05cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>.1cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>.2cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>.4cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>.6cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>.8cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>1cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>1.2cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>1.4cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>1.6cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>1.8cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>2cm</a></li>
                  <li><a className="dropdown-item" onClick={bgpadding}>2.2cm</a></li>

                </ul> 
    </div>
    </div>

  <div id="p"> <h3>Size</h3>
  <b>Height:</b> {tareaHeight} <br></br><b>Width</b>: {tareaWidth}  </div>
  </div>
    <div className='my-3' >
      <h3>Text Summory</h3> Characters- {text.length}, Words - {text.split(" ").length}, Time to read- {0.008*text.length}</div>
  </div>
  <div className='printdiv' ref={printdiv} id='printdiv'></div>
  </div>
 </> 
  )
  
}
  
  TextFrom.propTypes={
    heading: propTypes.string
}

TextFrom.defaultProps={
 heading: "Please enter your text here."
}
