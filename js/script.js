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
          alert("Please, insert a valid user name");
        } else {
          createCard(values);
        }
      });
      inputEle.value = "";
  } else {
    alert("Please, insert a user name");
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
