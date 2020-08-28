import React from 'react';
import '../Style/trackLayout.css';
import { actionModelHandler } from '../Action/action';
import { connect } from "react-redux";
const trackLayout = (props) => {
    return (
        <div className="tracklayout">
            <div className="right">
                <button className="btnClose" onClick={() => props.actionModelHandler(false)}>X</button>
            </div>
            <div className="profieContainer">

                <div >
                    <img className="image" src={props.artist.artistImageUrl} alt="Not Found"></img>
                    <div className="t1">Artist</div>
                    <div className="t2">{props.artist.artistName}</div>

                </div>
                <div >
                    <img className="image" src={props.album.albumImageUrl} alt="Not Found" />
                    <div>
                        <div className="t1">Album</div><div className="t3">{props.album.albumName}</div>
                        <div className="t1">Relese Date : {props.album.albumReleseDate}</div>
                    </div>

                </div>

            </div>
            <div className="trackContainer">

            </div>
        </div>

    );
};
const mapStateToProps = state => ({
    artist: state.artist,
    album: state.album
})
const mapDispatchToProps = dispatch => {

    return {
        // dispatching plain actions
        actionModelHandler: (val) => { dispatch(actionModelHandler(val)) }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(trackLayout);