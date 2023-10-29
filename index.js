import { blogPostData } from "./data.js";

const mainEl = document.querySelector("main");
document.addEventListener("click", (event) => {
  console.log(event.target.id);
  if (event.target.dataset.card) {
    renderArticle(event.target.dataset.card);
  } else if (event.target.id === "about") {
    renderAboutMe();
  } else if (event.target.id === "home" || event.target.id === "title") {
    renderHome();
  }
});

const renderHome = () => {
  showHero();
  showMain();
  hideAboutMe();
  renderBlogPosts();
};

const renderAboutMe = () => {
  hideHero();
  hideMain();
  showAboutMe();
};

const renderArticle = (articleId) => {
  hideHero();
  const { date, title, shortText, picture, longText } = blogPostData[articleId];
  mainEl.innerHTML = `<section class="blog-post">
    <h3 class="date">${date}</h3>
    <h1>${title}</h1>
    <p>
         ${shortText}
    </p>
    <img
     class="blog-image card-image"
     src="./my-learning-journal/images/${picture}"
     alt="blog title image"
     />
  ${longText
    .map((part) => {
      return `<h2 class="subheading">${part.subheading}</h2>
    <p>
    ${part.text}
    </p>`;
    })
    .join("")}
</section>

  `;
  renderRecent(articleId);
};

const renderRecent = (articleId) => {
  console.log(articleId);
  mainEl.innerHTML +=
    `<h2 class="subheading center recent-posts">Recent Posts</h2>` +
    blogPostData
      .filter((blogpost) => blogpost.id !== Number(articleId))
      .filter((_, index) => index < 3)
      .map((post, index) => blogCard(post, index))
      .join("");
};

const hideHero = () => {
  document.querySelector("#hero").classList.add("hidden");
};

const showHero = () => {
  document.querySelector("#hero").classList.remove("hidden");
};

const hideMain = () => {
  document.querySelector("main").classList.add("hidden");
};

const showMain = () => {
  document.querySelector("main").classList.remove("hidden");
};

const hideAboutMe = () => {
  document.querySelector("#about-me").classList.add("hidden");
};

const showAboutMe = () => {
  document.querySelector("#about-me").classList.remove("hidden");
};

const renderHero = () => {
  const { date, title, shortText, picture } = blogPostData[0];
  const heroEl = document.querySelector(".hero");
  heroEl.innerHTML = `<h3 class="opaque" >${date}</h3>
                    <h1 data-card="0">${title}</h1>
                    <p class="opaque">
                    ${shortText}
                    </p>`;
  heroEl.style.backgroundImage = `url(images/${picture})`;
};

const renderBlogPosts = () => {
  mainEl.innerHTML = blogPostData
    .filter((_, index) => index !== 0)
    .map((blogpost) => blogCard(blogpost))
    .join("");
  mainEl.innerHTML += `<button class="btn view-more">View More</button>`;
};

const blogCard = (blogpost) => {
  const { date, title, shortText, picture, id } = blogpost;
  return ` <section class="blog-card">
    <img
      class="card-image"
      src="/my-learning-journal/images/${picture}"
      alt="blog title image"
    />
    <h3 class="date" >${date}</h3>
    <h1 data-card="${id}">${title}</h1>
    <p>
    ${shortText}
    </p>
  </section>
  `;
};
renderHero();
renderBlogPosts();
