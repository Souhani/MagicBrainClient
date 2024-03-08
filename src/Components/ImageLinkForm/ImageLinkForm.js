import React from 'react';
import "./ImageLinkForm.css"


const ImageLinkForm = ({onInputChange,onButonSubmit, loading})=>{

	return(
      <div className="">
        <p className='f3 ' style={{fontWeight: "bold"}}>
          {'This Magic Brain will detect faces and sentiments in your pictures. Give it a try.'}
        </p>
        <div className='center mx-4'>
         <div className = 'pa4 br3 shadow-5 center form'>
		    <input className='f4 pa2 w-70 mr1'type ='text'
               onChange={onInputChange} />
		    <button 
        className = ''
        onClick={onButonSubmit}
         >{loading ? "Loading..." : "Detect"}</button>
		 </div>
		</div>

      
      </div>

		);
}


export default ImageLinkForm;