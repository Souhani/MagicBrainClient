


const Rank = ({name, entries})=>{

	return(

    <div className="mt3">
        <div className="white f3" style={{fontWeight: "bold"}} >
          {name.toUpperCase()+', you tested '}
          <span className="white f2 " >
          {entries +" "}
        </span>
        pictures.
        </div>
    </div>
		);
}


export default Rank;