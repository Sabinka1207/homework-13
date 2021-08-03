export default function renderPosts(posts) {
  const markup = posts
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
      return `<li>
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes</b>
            ${likes}
            </p>
            <p class="info-item">
            <b>Views</b>
            ${views}
            </p>
            <p class="info-item">
            <b>Comments</b>
            ${comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>
            ${downloads}
            </p>
        </div>
        </div>
        </li>`;
    })
        .join(" ");
    
    return markup
}