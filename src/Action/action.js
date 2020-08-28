export const actionChangeArtist = (val) => {
    return (dispatch) => {

        dispatch({ type: 'CHANGE_ARTIST', payload: val })


    }
}
export const actionAlbumHandler = (val) => {

    return (dispatch) => {
        dispatch({ type: 'CHANGE_ALBUM', payload: val })
    }
}


export const actionModelHandler = (val) => {

    return (dispatch) => {
        dispatch({ type: 'CHANGE_CLOSE_MODEL', payload: val })
        dispatch({ type: 'CHANGE_OPEN_MODEL', payload: val })
    }
}
