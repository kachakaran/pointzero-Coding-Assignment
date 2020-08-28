
 const getToken = async ()=> {
    var token;

    var clientId = 'e981744c3c5e41baaf1b6c95a1f7e496'
    var clientSecret = '20f6595acc7a41ccbe7cc603c41bafd6'
    var encodedData = Buffer.from(clientId + ':' + clientSecret).toString('base64');

    await fetch("https://accounts.spotify.com/api/token", {
      body: "grant_type=client_credentials",
      headers: {
        Authorization: "Basic "+encodedData,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(res => res.json())
    .then(res=>token=res.access_token).catch(error=>{
      alert('Something Went Wrong. Try Again.')
      console.log(error);
    });
    
    return token;
  }
  export default getToken;