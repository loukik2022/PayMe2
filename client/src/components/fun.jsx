import React, { useState, useEffect } from 'react';

const TenorGif = ({ gifData }) => {
    const script = document.createElement('script');
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return (
        <div
            className="tenor-gif-embed"
            data-postid={gifData.postId}
            data-share-method="host"
            data-aspect-ratio={gifData.aspectRatio}
        >
            <a href={gifData.searchHref}>{gifData.searchName}</a>
        </div>
    );
};

const Fun = () => {
    const [selectedGif, setSelectedGif] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let gifEmbedData = [
        { postId: "4547079", aspectRatio: "1.78571", linkHref: "https://tenor.com/view/shutup-shutupandtakemymoney-money-cartoons-futurama-gif-4547079", gifName: "Shutup Shutupandtakemymoney GIF", searchHref: "https://tenor.com/search/shutup-gifs", searchName: "Shutup GIFs" },
        { postId: "16518168", aspectRatio: "1.38528", linkHref: "https://tenor.com/view/rabbit-bunny-money-money-louis-vuitton-bugs-bunny-gif-16518168", gifName: "Rabbit Bunny GIF", searchHref: "https://tenor.com/search/rabbit-gifs", searchName: "Rabbit GIFs" },
        { postId: "10344941", aspectRatio: "0.833333", linkHref: "https://tenor.com/view/dagobert-mickey-mouse-gelb-cartoon-gif-10344941", gifName: "Dagobert GIF", searchHref: "https://tenor.com/search/dagobert-gifs", searchName: "Dagobert GIFs" },
        { postId: "8825192", aspectRatio: "1.31579", linkHref: "https://tenor.com/view/money-gif-8825192", gifName: "Money GIF", searchHref: "https://tenor.com/search/money-gifs", searchName: "Money GIFs" },
        { postId: "4935017", aspectRatio: "1.67785", linkHref: "https://tenor.com/view/money-donaldduck-coins-gif-4935017", gifName: "Money GIF", searchHref: "https://tenor.com/search/money-gifs", searchName: "Money GIFs" },
    ];
    
    const fetchGif = () => {
        setLoading(true);
        setError(null);
        try {
            // Pick a random GIF from the available data.
            const randomGif = gifEmbedData[Math.floor(Math.random() * gifEmbedData.length)];
            setSelectedGif(randomGif);
        } catch (e) {
            setError(e);
            setSelectedGif(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchGif} className="fun-button">Fun.</button>

            {loading && <p>Loading GIF...</p>}
            {error && <p>Error loading GIF: {error.message}</p>}

            <div style={{ marginTop: '20px' }}>
                {selectedGif && <TenorGif gifData={selectedGif} />}
            </div>
        </div>
    );
};

export default Fun;
