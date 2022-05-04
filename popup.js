
document.addEventListener('DOMContentLoaded',async ()=>{
    const linkslist = document.getElementById('linkslist');
    const url = 'https://jqq-utils.netlify.app/api/recentYTVideos';
    // text copy funtions

    const copyLinks = (e) => {
        const str = e.target.dataset.url;
        alert(str);
        const element = document.createElement('textarea');
        element.value = str;
        document.body.appendChild(element);
        element.select();
        document.execCommand('copy');
        document.removeChild(element);
    }



    try {
        const res = await fetch(url);
        const videos = await res.json();
        const videoHtml = videos.map((video)=>{
            const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
            return`<li class="video-link">
                <button class="btn" data-url="${videoUrl}">Copy Url</button>
                <a class="btn" href="${videoUrl}"  rel="noopener noreferrer" target="_blank">
                Watch
                </a>
                ${video.title}
                </li>
            `;
        }).join('');
        linkslist.innerHTML = videoHtml;
        const videoLinks = [...document.querySelectorAll('.video-link')];
        videoLinks.forEach((link)=>link.addEventListener('click', copyLinks))
        
    } catch (error) {
        console.error(error);
    }
})