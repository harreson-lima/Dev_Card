const inputEle = document.getElementById("user-input");
const searchBtnEle = document.getElementById("btn-search");

const imageEle = document.getElementById("image");
const nameEle = document.querySelector(".name");
const bioEle = document.querySelector(".bio");
const followersEle = document.getElementById("followers");
const followingEle = document.getElementById("following");
const locationEle = document.querySelector(".location");
const linkEle = document.querySelector(".repos");

searchBtnEle.addEventListener("click", getUser);

function getUser() {
  if (inputEle.value !== "") {
    const user = fetch(`https://api.github.com/users/${inputEle.value}`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
      .then((data) => data.json())
      .then((values) => {
        document.querySelector(".card").style = "display: flex";
        imageEle.src = values.avatar_url;
        nameEle.innerHTML = values.name;
        bioEle.innerHTML = values.bio;
        followersEle.innerHTML = `<div>${values.followers}</div><div>Followers</div>`;
        followingEle.innerHTML = `<div>${values.following}</div><div>Following</div>`;
        locationEle.innerHTML =
          `<span class="material-symbols-outlined">
location_on
</span> ` + values.location;
        linkEle.href = values.html_url;
      });
  } else {
    alert("Please, insert a user name");
  }
}

/*
  name; String -
  avatar_url; String-
  bio; String-
  followers; Number-
  location; String-
  html_url; String-
*/
