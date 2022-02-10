import parse from 'html-react-parser';

export function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export function getMedia(item) {
  const { url, media, secure_media, secure_media_embed, preview, domain, crosspost_parent_list } =
    item;

  // Images
  src = url;

  if (/\.(png|gif|jpg|jpeg|bmp|webp)$/.test(url)) {
    return { type: 'image', src: url };
  }

  // Videos
  let src =
    preview?.reddit_video_preview?.fallback_url ||
    secure_media?.reddit_video?.fallback_url ||
    media?.reddit_video?.fallback_url ||
    crosspost_parent_list?.[0]?.secure_media?.reddit_video?.fallback_url ||
    crosspost_parent_list?.[0]?.media?.reddit_video?.fallback_url ||
    url;

  if (/\.(mp4|mkv|mov|gifv)(\?.*)?$/.test(src)) {
    return { type: 'video', src };
  }

  // Embeds
  src = secure_media_embed?.content || media?.content;

  if (src) {
    return { type: 'embed', src: parse(decodeHtml(src)) };
  }

  // Imgur
  if (domain === 'imgur.com') {
    return {
      type: 'image',
      src: url.replace('imgur', 'i.imgur') + '.jpg',
    };
  }

  // Youtube
  if (domain === 'https://www.youtube.com/') {
    return {
      type: 'embed',
      src: (
        <iframe
          src={`https://www.youtube.com/embed/${url.split('?')[1].replace('v=', '')}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ),
    };
  }

  // Unknown
  return { type: null, src: null };
}

export function getThumbnail(item) {
  const { preview, thumbnail, secure_media, media, domain, url } = item;
  if (domain === 'i.redd.it' && !thumbnail.startsWith('http')) {
    return url;
  }
  if (domain === 'i.imgur.com') {
    return url.replace(/\.(mp4|gifv|gif)$/, '.jpg');
  }

  if (!thumbnail.startsWith('http')) {
    return (
      preview?.images[0]?.source?.url?.replace(/&amp;/g, '&') ||
      secure_media?.oembed?.thumbnail_url ||
      media?.oembed?.thumbnail_url
    );
  }

  return thumbnail;
}

export function parseItem(item) {
  const { id, title, author, subreddit, permalink } = item;
  const media = getMedia(item);
  const thumbnail = getThumbnail(item);

  return {
    id,
    title,
    author,
    subreddit,
    permalink,
    ...media,
    thumbnail,
    original: item,
    hasMedia: Boolean(media.src),
  };
}
