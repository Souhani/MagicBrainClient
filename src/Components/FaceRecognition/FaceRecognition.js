import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imgUrl, boxes, sentiment, loading})=>{
	return(
       <div className='center ma'>
	       <div className='absolute mt5'>
		         <img id ='inputImage' altr =''src={imgUrl} width='500px' heigh='auto' style={{marginBottom:"50px"}} className=" rounded shadow-5 border"/>
				 <div>
					{boxes.map((box,index) => {
						return !loading && (
							<div key={index}
							     className = 'bounding-box' 
								 style={{ top: box.topRow, 
										right: box.rightCol, 
										bottom: box.bottomRow+50, 
										left: box.leftCol}}>
											{
												index===0 && <p  className="shadow"style={{
													background:"rgb(255, 0, 255)",
													border: "1px solid white",
													height:"4rem",
													fontSize:"1rem",
													margin: `${-70}px auto`,
													padding: "20px",
													borderRadius: "6px",
													color: "white",
													fontWeight: "bold",
													fontFamily: "Montserrat, sans-serif",
													display: "flex",
													alignItems: "center",
													justifyContent:"center",
													zIndex:"99"
												}}>{sentiment.toUpperCase()}</p>
											}
							</div>
						)
					})}
				 </div>
	       </div>
       </div>

		)
};


export default FaceRecognition;