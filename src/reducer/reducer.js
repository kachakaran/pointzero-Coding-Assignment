const iState = {
    artist: {
        artistID: '',
        artistName: '',
        artistImageUrl: '',
        artistFollowers: ''
    },
    isOpenModel: false,
    album: {
        albumName: '',
        albumID: '',
        albumReleseDate: '',
        albumImageUrl: '',
    }

}

const reducer = (state = iState, action) => {

    if (action.type === "CHANGE_ALBUM") {

        return {
            ...state,
            album: action.payload
        }
    }

    if (action.type === "CHANGE_ARTIST") {

        return {
            ...state,
            artist: action.payload
        }
    }
    
    if (action.type === "CHANGE_OPEN_MODEL") {

        return {
            ...state,
            isOpenModel: action.payload
        }
    }
    if (action.type === "CHANGE_CLOSE_MODEL") {

        return {
            ...state,
            isOpenModel: action.payload
        }
    }
    return state;
}
export default reducer;