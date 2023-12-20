import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { addLike , removeLike } from "../api.js";
import { getToken } from "../index.js";
import { goToPageWithoutLoader } from "../index.js";
import { replacerSafity } from "../helpers.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  
  const appHtml = posts
    .map((post, index) => {
      return `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${replacerSafity(post.user.name)}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${post.id}" data-switcher = "${post.isLiked}" class="like-button">
              <img src="${
                post.isLiked
                  ? `./assets/images/like-active.svg`
                  : `./assets/images/like-not-active.svg`
              }">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${
                post.likes.length && replacerSafity(post.likes[0].name)
              } ${
                post.likes.length - 1 <= 0 ? "" : `и еще ${post.likes.length - 1}`
              }</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${replacerSafity(post.user.name)}</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${formatDistanceToNow(new Date(post.createdAt), {locale:ru , addSuffix : "назад"})}
          </p>
        </li>
      </ul>
    </div>`;
    })
    .join("");

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let like of document.querySelectorAll(".like-button")) {
    like.addEventListener("click", () => {
        let id = like.dataset.postId;
        let token = getToken();
        console.log(like.dataset.switcher);
        if( like.dataset.switcher === "true") {
          removeLike(token , id)
          .then(() => {goToPageWithoutLoader(POSTS_PAGE)})
        }
        if( like.dataset.switcher === "false") {
          addLike(token , id)
          .then(() => {goToPageWithoutLoader(POSTS_PAGE)})
        }
        
    
    });
  }
}
