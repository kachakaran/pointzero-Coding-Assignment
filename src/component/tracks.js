import React, { Component } from 'react';
import { connect } from 'react-redux';
import getToken from '../API/GetToken';
import '../Style/tracks.css';
import axios from 'axios';
import ReactLoading from 'react-loading';

class Tracks extends Component {
    state = {
        isLoading: false,
        trackList: [],
        limit: 3,
        offset: 0,
        isNext: false,
        isPrevious: false,
    };
    componentDidMount() {
        this.fatchAlbums();

    }

    async fatchAlbums() {
        var next, previous;
        this.setState({ isLoading: true })
        var token = await getToken()
        await axios({
            baseURL: 'https://api.spotify.com/v1/albums',
            url: this.props.albumID + '/tracks',
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
            this.state.trackList = response.data.items;

        }).catch(error => {
            alert('Something Went Wrong. Try Again.')
           
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
    render() {
        var Tracks;
        if (this.state.trackList.length > 0) {

            Tracks = <>
                {this.state.trackList.map(x => {
                    var t = {
                        name: x.name,
                        id: x.id,
                        duration_ms: x.duration_ms,
                    }
                    var ms = t.duration_ms,
                        min = Math.floor((ms / 1000 / 60) << 0),
                        sec = Math.floor((ms / 1000) % 60);


                    return <li key={t.id} className="track" >
                        {t.name}
                        <div className="t1">Duration {min + ':' + sec}</div>

                    </li>
                })}
            </>
        }
        else {
            Tracks = <h3> No Albums Found</h3>
        }
        return (<>


            <div className="track-list" >
                <h2>Track</h2>
                {this.state.isLoading ? <ReactLoading type={'cylon'} color={"#29CBB1"} height={'40px'} width={'40px'} /> :
                    <ul className="list" >
                        {Tracks}
                    </ul>
                }
                <div className="navButtons">

                    {this.state.isPrevious ?
                        <button className="MateButton btnNav"
                            onClick={() => this.Previous()}>  Previous</button>
                        : null}

                    {this.state.isNext ?
                        <button className="MateButton btnNav"
                            onClick={() => this.Next()}> Next </button>
                        : null}


                </div>

            </div>

        </>
        );
    }
}

const mapStateToProps = state => ({
    albumID: state.album.albumID
})
export default connect(mapStateToProps)(Tracks);