import { posts } from "/index.js"
import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { addLike , removeLike } from "../api.js";
import { getToken } from "../index.js";
import { goToPageWithoutLoader } from "../index.js";
import { goToPage } from "../index.js";
import { replacerSafity } from "../helpers.js";
import { toggleLike } from "../index.js";

export function renderUserPostsPageComponent({ appEl }) {
    // TODO: реализовать рендер постов из api
    console.log("Актуальный список постов:", posts);
  
    /**
     * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
     * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
     */
    const appHtml = posts.map((post,index) => {
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
              <button data-post-id="${post.id}" data-switcher = "${post.isLiked}" data-user-id="${post.user.id}"  class="like-button">
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
            ${new Date(post.createdAt)}
            </p>
          </li>
        </ul>
      </div>`
  
    }).join("")
  
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
          console.log(id);
          toggleLike(id);
      });
    } 
  }