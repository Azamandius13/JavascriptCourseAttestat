import { addPost } from "../api.js";
import { getToken } from "../index.js";
import { goToPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { replacerSafity } from "../helpers.js";


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
   
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
    <div class="form">
        <h3 class="form-title">Добавить пост</h3>
    <div class="form-inputs">
        <div class="upload-image-container">
            
        </div>
            <label>Опишите фотографию:
                <textarea class="input textarea" rows="6" id="description"></textarea>
            </label>
                <button class="button" id="add-button">Добавить</button>
            </div>
        </div>
    </div>
  </div>
  `;





    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector('.header-container'),
  })


  const uploadImageContainer = appEl.querySelector(".upload-image-container");

  if (uploadImageContainer) {
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });
  }
    


    document.getElementById("add-button").addEventListener("click", () => {
      // onAddPostClick({
      //   description: "Описание картинки",
      //   imageUrl: "https://image.png",
      // });
      const descriptionValue = document.getElementById("description").value
      if (!descriptionValue) {
        alert("Введите описание!");
        return;
      }
      if (!imageUrl) {
        alert("Не выбрана фотография");
        return;
      }

      addPost({token: getToken(), description : replacerSafity(descriptionValue) , imageUrl : imageUrl});
      

    });
  };
  

  render();
}
