import parse from 'html-react-parser';

export function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export function getMedia(item) {
  let src;
  const { url, secure_media, secure_media_embed, preview, domain } = item;

  // Videos
  src =
    preview?.reddit_video_preview?.fallback_url || secure_media?.reddit_video?.fallback_url || url;

  if (src?.endsWith('mp4') || src.startsWith('https://v.redd.it')) {
    return { type: 'video', src };
  }

  // Images
  src = url;

  if (/\.(png|gif|jpg|jpeg|webp)$/.test(url)) {
    return { type: 'image', src: url };
  }

  // Youtube
  if (src.startsWith('https://www.youtube.com/')) {
    return {
      type: 'embed',
      src: (
        <iframe
          src={`https://www.youtube.com/embed/${src.split('?')[1].replace('v=', '')}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ),
    };
  }

  // Imgur
  if (domain === 'imgur.com') {
    return {
      type: 'image',
      src: url.replace('imgur', 'i.imgur') + '.jpg',
    };
  }

  // Embeds
  src = secure_media_embed?.content;

  if (src) {
    return { type: 'embed', src: parse(decodeHtml(src)) };
  }

  // Default image
  return { type: 'image', src: url };
}
