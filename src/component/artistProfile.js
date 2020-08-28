import React from 'react';
import "../Style/artistProfile.css";
import { connect } from 'react-redux';
import image from '../asset/Image/spotify.png'


const artistProfile = (props) => {
    
    return (
        <>
            <div className="artistProfile">
                <img className="Profile" src={props.artist.artistImageUrl} alt="Not Found"></img>
                <div className="artistDetails">
                    <div className="CaptionText">Artist</div>
                    <div className="Name">{props.artist.artistName}</div>
                    <div className="CaptionText"> Followers : {props.artist.artistFollowers}</div>
                </div>
                <button className="btnBack" onClick={() =>props.history.push("/") }>Back</button>
            </div>
            <div className="artistTitle">Albums</div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        artist: state.artist
    }
}
export default connect(mapStateToProps)(artistProfile);