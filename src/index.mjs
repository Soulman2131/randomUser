import "./styles.css";

const app = document.getElementById("app");
app.innerHTML = "<h1> La liste des utilisateurs</h1>";

let userData = [];

// FUNCTION DATE PARSER
const dateParser = (date) => {
  let newDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return newDate;
};

//FUNCTION COMPARATE DATE
const dateCompare = (date) => {
  let today = new Date();
  //Today
  let todayTimesTamp = Date.parse(today);
  //Yesterday
  let timestamp = Date.parse(date);

  //Result
  // return (todayTimesTamp - timestamp) / 8.64e7;
  return Math.ceil((todayTimesTamp - timestamp) / 8.64e7);
};

const fetchTasks = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((res) => {
      console.log(res.results);
      userData = res.results;
    });
};

const displayTasks = async () => {
  await fetchTasks();
  app.innerHTML += userData
    .map(
      (user) =>
        `
				<div class="card">
				<img src=${user.picture.large} alt="photo de ${user.name.last}" />
				<h3> ${user.name.first}  </h3>
				<p> ${user.location.city}, ${dateParser(user.dob.date)} </p>
				<em>Membre depuis :${dateCompare(user.registered.date)}  jours </em>
				</div>
		`,
    )
    .join("");
};
displayTasks();
