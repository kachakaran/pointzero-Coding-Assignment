import React from 'react';
import '../Style/Artist.css';
import image from '../asset/Image/spotify.png'
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import {actionChangeArtist} from '../Action/action';
const Artist = (props) => {

    return (<>{props.list.map(x => {
        
        var a={
            artistID: x.id,
            artistName: x.name,
            artistImageUrl: '',
            artistFollowers: x.followers.total
        }
        if (x.images.length > 0) {
            a.artistImageUrl = x.images[0].url
        }
        else {
            a.artistImageUrl = image;
        }
            
        return   <div key={a.artistID} className="artist">
            <img src={a.artistImageUrl} alt="Not Loaded" className="artistImage" />
            <h3 className="artistName">{a.artistName}</h3>
            <Link className="linkViewAlbum" to="/albums" onClick={()=>props.changeArtist(a)} >View Album</Link>
        </div>
        })}
    </>
    );
}



const mapDispatchToProps = dispatch => {
    
    return {
      // dispatching plain actions
      changeArtist: (val) =>{dispatch(actionChangeArtist(val))}
      
    }
  }
  
export default connect(null,mapDispatchToProps)( Artist);