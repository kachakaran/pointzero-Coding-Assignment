import React, { Component } from 'react';
import '../Style/search.css';
import getToken from '../API/GetToken';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Artist from './artist';


class search extends Component {

    state = {
        isLoading: false,
        searchText: '',
        ArtistList: [],
        limit: 20,
        offset: 0,
        isNext: false,
        isPrevious: false,
        isSearch: false
    };
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.fatchArtist()
        }
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    async fatchArtist(isReset) {
        var next, previous;
        if (this.state.searchText.trim() !== "") {

            this.setState({ isLoading: true })

            if (isReset) {
                this.setState({ offset: 0 })
            }
            var token = await getToken()
            await axios({
                url: 'https://api.spotify.com/v1/search',
                method: 'get',
                params: {
                    'q': this.state.searchText,
                    'type': 'artist',
                    'limit': this.state.limit,
                    'offset': this.state.offset
                },
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                }
            }).then(response => {
                var res = response.data.artists
                console.log(res);
                next = res.next
                previous = res.previous
                this.state.ArtistList = response.data.artists.items;
                
            }).catch(error => {
                alert('Something Went Wrong. Try Again.')
                console.log(error);
            });

            this.updateState(next, previous);

        }

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
        this.fatchArtist(false);
    }

    Next() {
        this.setState(
            {
                offset: this.state.offset + this.state.limit,
            });
        this.fatchArtist(false);
    }


    render() {
        var result;
        if (this.state.isSearch) {
            if (this.state.ArtistList.length > 0) {

                result = <Artist list={this.state.ArtistList} />
            }
            else {
                result = <h3> No Result</h3>
            }
        }
        else {
            result = <h1>Welcome, Find Your Favourite Artist's Cover Album</h1>
        }
        return (
            <div>
                <input type="text" name="searchText" className="searchBox"
                    placeholder="Search Artist" onKeyDown={(e) => this.handleKeyDown(e)} onChange={(e) => this.handleChange(e)}  ></input>

                <button className="MateButton"
                    onClick={() => this.fatchArtist(true)}>Search</button>

                <div className="SearchList">

                    {this.state.isLoading ? <ReactLoading type={'cylon'} color={"#29CBB1"} height={'40px'} width={'40px'} /> : result}
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


                </div>
            </div>
        );
    }
}

export default search;