import React, { Component } from 'react';
import { connect } from "react-redux";
import '../Style/album.css';
import getToken from '../API/GetToken';
import axios from 'axios';
import image from '../asset/Image/spotify.png'
import ReactLoading from 'react-loading';
import ArtistProfile from "./artistProfile";
import Backdrop from './backdrop';
import Model from './model';
import TrackLayout from './trackLayout';
import { actionModelHandler, actionAlbumHandler } from '../Action/action';

class albums extends Component {
    state = {
        isLoading: false,
        artistID: '',
        AlbumList: [],
        limit: 8,
        offset: 0,
        isNext: false,
        isPrevious: false,
    };


    componentDidMount() {

        if (this.props.artist.artistID === '') {
           return this.props.history.push('/');
        }
        else {
            this.fatchAlbums();
        }
    }

    async fatchAlbums() {
        var next, previous;
        this.setState({ isLoading: true })
        var token = await getToken()
        await axios({
            baseURL: 'https://api.spotify.com/v1/artists/',
            url: this.props.artist.artistID + '/albums',
            method: 'get',
            params: {
                'limit': this.state.limit,
                'offset': this.state.offset
            },
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            var res = response.data
            next = res.next
            previous = res.previous
            this.state.AlbumList = response.data.items;

        }).catch(error => {
            alert('Something Went Wrong. Try Again.')
            return this.props.history.push('/');
        });

        this.updateState(next, previous);
    }

    updateState(next, previous) {

        var _isNext, _isPrevious


        if (next == null) { _isNext = false }
        else { _isNext = true }

        if (previous == null) { _isPrevious = false }
        else { _isPrevious = true }
        this.setState(
            {
                isSearch: true,
                isLoading: false,
                isNext: _isNext,
                isPrevious: _isPrevious

            });
    }
    Previous() {
        this.setState(
            {
                offset: this.state.offset - this.state.limit,
            });
        this.fatchAlbums();
    }

    Next() {
        this.setState(
            {
                offset: this.state.offset + this.state.limit,
            });
        this.fatchAlbums();
    }

    ViewTracks(a) {
        this.props.albumHandler(a)
        this.props.actionModel(true)
    }

    render() {
        var albumList;
        if (this.state.AlbumList.length > 0) {

            albumList = <>
                {this.state.AlbumList.map(x => {
                    var a = {
                        albumName: x.name,
                        albumID: x.id,
                        albumReleseDate: x.release_date,
                        albumImageUrl: '',
                    }

                    if (x.images.length > 0) {
                        a.albumImageUrl = x.images[0].url
                    }
                    else {
                        a.albumImageUrl = image;
                    }
                    return <div key={a.albumID} className="album">
                        <img className="albumImage" src={a.albumImageUrl} alt="Not Found" />
                        <div>
                            <div className="albumName">{a.albumName}</div>
                            <div className="albumReleseDate">{a.albumReleseDate}</div>
                            <button className="linkViewTracks" onClick={() => this.ViewTracks(a)}> View Track</button>
                        </div>

                    </div>
                })}
            </>
        }
        else {
            albumList = <h3> No Albums Found</h3>
        }
        return (
            <div className="container">

                <ArtistProfile history={this.props.history} />
                <div className="albumList">
                    {this.state.isLoading ? <ReactLoading type={'cylon'} color={"#29CBB1"} height={'140px'} width={'40px'} /> : albumList}

                </div>
                <div className="navButtons">

                    {this.state.isPrevious ?
                        <button className="MateButton btnNav"
                            onClick={() => this.Previous()}>  Previous</button>
                        : null}

                    {this.state.isNext ?
                        <button className="MateButton btnNav"
                            onClick={() => this.Next()}> Next </button>
                        : null}
                    {this.props.isOpenModel ? <Backdrop><Model><TrackLayout></TrackLayout></Model></Backdrop> : null}

                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    artist: state.artist,
    isOpenModel: state.isOpenModel,
    album: state.album
})
const mapDispatchToProps = dispatch => {

    return {
        // dispatching plain actions
        actionModel: (val) => { dispatch(actionModelHandler(val)) },
        albumHandler: (val) => { dispatch(actionAlbumHandler(val)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(albums);