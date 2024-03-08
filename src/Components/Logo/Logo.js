import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './Brain.png'

const Logo = ()=>{

	return(
      <div className = 'ma4 mt0'>
        <Tilt className="Tilt br-2 shadow-2" options={{ max : 50 } } style={{ height: 200, width: 150, borderRadius: "20px", cursor: "pointer", color:"black" }} >
			 <div className="Tilt-inner pa3"  >
				<p style={{fontWeight:"bold", fontFamily: "Montserrat, sans-serif", color:"#212529"}}>Magic Brain</p>
			  < img style ={{paddingTop: '5px'}} alrt = 'Logo' src = {brain}/> 
			 </div>
		</Tilt>
      </div>

		);
}


export default Logo;