import { useState } from 'react';
import axios from 'axios';
const Ytmp3 = () => {
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [mp3Url, setMp3Url] = useState("");
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");


    const handleConvert = async () => {
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = youtubeUrl.match(regExp);
        const options = {
            method: 'GET',
            url: 'https://youtube-mp3-download1.p.rapidapi.com/dl',
            params: { id: match[2] },
            headers: {
                'X-RapidAPI-Key': '9f21888423msha7c17c84fce1f4bp17adb0jsn017a015a5ca3',
                'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data)
            const setup = () => {
                setMp3Url(response.data.link)
                setTitle(response.data.title)
                setThumbnail(response.data.thumb)
            }
            setup()

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>

            <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Enter YouTube URL"
            />
            <button onClick={handleConvert}>Convert to MP3</button>

            {mp3Url ? <>
                <a href={mp3Url} download={mp3Url} target='_self'>
                    Download MP3
                </a>   </> : null}

            <div className="cookie-card">
                <span className="title">Song Info</span>
                <p className="description">{title}<a href="#">Read cookies policies</a>. </p>
                <img src={thumbnail} />
                {mp3Url ? <>
                    <a href={mp3Url} download={mp3Url} target='_self'>
                        Download MP3
                    </a>   </> : null}
            </div>
        </div >
    )
}

export default Ytmp3
