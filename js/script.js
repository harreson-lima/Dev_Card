const URL = "https://api.github.com/users/";

const inputEle = document.getElementById("user-input");
inputEle.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    getUser();
  }
});
const searchBtnEle = document.getElementById("btn-search");
searchBtnEle.addEventListener("click", getUser);

const imageEle = document.getElementById("image");
const nameEle = document.querySelector(".name");
const bioEle = document.querySelector(".bio");
const followersEle = document.getElementById("followers");
const followingEle = document.getElementById("following");
const locationEle = document.querySelector(".location");
const reposEle = document.querySelector(".repos");
const linkEle = document.querySelector(".link");
const cardEle = document.querySelector(".card");

function getUser() {
  if (inputEle.value !== "") {
    const user = fetch(URL + inputEle.value, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
      .then((data) => data.json())
      .then((values) => {
        if (values.message === "Not Found") {
          document.querySelector(".card").style = "display: none";
          Toastify({
            text: "Please, insert a valid user name",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #2296b3,#15aacf)",
            }
          }).showToast();
        } else {
          createCard(values);
        }
      });
    inputEle.value = "";
  } else {
    Toastify({
      text: "Please, insert a user name",
      duration: 3000,
      close: true,
      gravity: "top", 
      position: "right", 
      stopOnFocus: true, 
      style: {
        background: "linear-gradient(to right, #e32424, #ff6347)",
      }
    }).showToast();
  }
}

function createCard(user) {
  imageEle.src = user.avatar_url;
  nameEle.innerHTML = user.name;
  bioEle.innerHTML = user.bio;
  followersEle.innerHTML = `<div>${user.followers}</div><div>Followers</div>`;
  followingEle.innerHTML = `<div>${user.following}</div><div>Following</div>`;
  locationEle.innerHTML =
    `<span class="material-symbols-outlined">
  location_on
  </span> ` + user.location;
  reposEle.innerHTML = `${user.public_repos} Repositories`;
  linkEle.href = user.html_url;
  cardEle.style = "display: flex";
}
