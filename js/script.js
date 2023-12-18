const imageEle = document.getElementById("image");
const nameEle = document.getElementById("name");

const user = fetch("https://api.github.com/users/harreson-lima/events", {
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
})
.then(data => data.json())
.then(values => {
  console.log(values)
  nameEle.innerHTML = values.name;
  imageEle.src = values.avatar_url;
})

/*
  name; String
  avatar_url; String
  bio; String
  followers; Number
  hireable; Boolena
  location; String
  html_url; String
  repos_url;
  chart: https://ghchart.rshah.org/"user"
*/