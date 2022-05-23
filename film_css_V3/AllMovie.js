import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.css";
import movieStyle from "./AllMovie.module.css";


function AllMovie(){
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState([]);
    const [lotteDisplay, setLotteDisplay] = useState("block");
    const [cgvDisplay, setCgvDisplay] = useState("block");

    const callApi = async()=>{
        const response = await axios.get('http://localhost:5000/');
        
  
        setMovie(response.data);

       
  
      
        if(movie){
            setLoading(true);
        }
      };

      const changeDisplay = (event) => {
        const sel = event.target.innerText;
        
        switch(sel){
            case "ALL":
                setLotteDisplay("block");
                setCgvDisplay("block");
                break;

            case "LOTTE":
                setLotteDisplay("block");
                setCgvDisplay("none");
                break;

            case "CGV":
                setCgvDisplay("block");
                setLotteDisplay("none");
                break;

            
        }
      }

      useEffect(()=>{
        callApi();
      }, []);

      return(
        <div>
            {loading ? 
              <> 
                <header>
                    <h2><Link to={'/'}>Film</Link></h2>
                    <Link to={'/Login'} className = {style.loginBtn}>Login</Link>
                </header>
                <main>
                    <div className = {movieStyle.companyBtn}>
                        <h3>현재 상영중인 영화</h3>
                        <div className={movieStyle.btn}>
                            <button onClick={changeDisplay}>ALL</button>
                            <button onClick={changeDisplay}>LOTTE</button>
                            <button onClick={changeDisplay}>CGV</button>
                        </div>
                    </div>
                    
                    <div className={movieStyle.allList}>
                        {movie.lotte.map( (lotte) => (
                            lotte.title === "AD" ? null :
                            <Link to={`/film/${lotte.title}/${lotte.company}`} className={movieStyle.detailLink}>
                                <div style={{"display" : `${lotteDisplay}`}} className={movieStyle.detailBox}> 
                                    <div className={movieStyle.movieCompany}>{lotte.company}</div>
                                    <div className={movieStyle.moviePoster}><img src = {lotte.img} /></div>
                                    <div className={movieStyle.movieTitle}>{lotte.title}</div>
                                    <div className={movieStyle.movieAge}>{lotte.age === "청불" || lotte.age ==="전체" ? lotte.age : lotte.age + "세 이상"}ㄴ</div>
                                    <div className={movieStyle.moviePercent}>예매율 {lotte.percent}%</div>
                                </div>
                            </Link>
                        ))}
                        {movie.cgv.map( (cgv) => (
                            <Link to={`/film/${cgv.title}/${cgv.company}`} className={movieStyle.detailLink}>
                                <div style={{"display" : `${cgvDisplay}`}} className={movieStyle.detailBox}>
                                    <div className={movieStyle.movieCompany}>{cgv.company}</div>
                                    <div className={movieStyle.moviePoster}><img src = {cgv.img} /></div>
                                    <div className={movieStyle.movieTitle}>{cgv.title}</div>
                                    <div className={movieStyle.movieAge}>{cgv.age}</div>
                                    <div className={movieStyle.moviePercent}>{cgv.percent}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    

                </main>
         
                    
                </>:
                <div className={style.loading}>
                    Loading...
                </div>
        
            }
        
        </div>
    )
}

export default AllMovie;
