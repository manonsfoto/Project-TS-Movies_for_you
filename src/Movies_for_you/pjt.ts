import { movies } from "./movies";
type Movie = [string, string, string, string, string[], string];

const inputSearch = document.querySelector("#inputSearch") as HTMLInputElement;
const btnSearch = document.querySelector("#btnSearch") as HTMLInputElement;
const btnYearUp = document.querySelector("#btnYearUp") as HTMLInputElement;
const btnYearDown = document.querySelector("#btnYearDown") as HTMLInputElement;
const btnBestRate = document.querySelector("#btnBestRate") as HTMLInputElement;
const showResult = document.querySelector("#showResult") as HTMLElement;

// !======function render List ======

const renderList = (Arr: Movie[]) => {
  showResult.innerHTML = "";

  Arr?.forEach((item) => {
    const genreList = item[4].map((genre) => `<li>${genre}</li>`).join("");

    showResult.innerHTML += `<div><h4>${item[0]}</h4>
    <p>${item[1]}</p>
    <b><p>${item[2]}</p></b>
    <p>${item[3]}</p>
    <ul>${genreList}</ul>
    <p>${item[5]}</p></div>`;
  });
};
renderList(movies);

// !======function sort ListYearUp ======

const sortListYearUp = (Arr: Movie[]): Movie[] => {
  return Arr.sort((a: Movie, b: Movie) => Number(a[1]) - Number(b[1]));
};

// !======function sort ListYearDown ======

const sortListYearDown = (Arr: Movie[]): Movie[] => {
  return Arr.sort((a: Movie, b: Movie) => Number(b[1]) - Number(a[1]));
};

// !======function sort ListBestRate ======

const sortListBestRate = (Arr: Movie[]): Movie[] => {
  return Arr.sort((a: Movie, b: Movie) => Number(b[5]) - Number(a[5]));
};

let updatedList: Movie[] = movies.map((elt) => elt);

// !======Event btn YearUp ======

btnYearUp?.addEventListener("click", () => {
  renderList(sortListYearUp(updatedList));
});

// !======Event btn YearDown ======

btnYearDown?.addEventListener("click", () => {
  renderList(sortListYearDown(updatedList));
});

// !======Event btn BestRate ======

btnBestRate?.addEventListener("click", () => {
  renderList(sortListBestRate(updatedList));
});

// !======Event btn Search ======

btnSearch?.addEventListener("click", () => {
  const searchName: Movie[] = updatedList.filter((movieName: Movie) => {
    if (movieName[0].toLowerCase().includes(inputSearch.value.toLowerCase())) {
      return movieName;
    }
  });

  const searchYear: Movie[] = updatedList.filter((movieYear: Movie) => {
    if (movieYear[1].toLowerCase().includes(inputSearch.value.toLowerCase())) {
      return movieYear;
    }
  });

  const searchDirector: Movie[] = updatedList.filter((movieDirector: Movie) => {
    if (
      movieDirector[2].toLowerCase().includes(inputSearch.value.toLowerCase())
    ) {
      return movieDirector;
    }
  });

  const searchGenre: Movie[] = updatedList.filter((movieGenre: Movie) => {
    if (
      movieGenre[4]
        .join("")
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    ) {
      return movieGenre;
    }
  });

  if (searchName.length !== 0) {
    updatedList = searchName;
    renderList(updatedList);
  } else if (searchYear.length !== 0) {
    updatedList = searchYear;
    renderList(updatedList);
  } else if (searchDirector.length !== 0) {
    updatedList = searchDirector;
    renderList(updatedList);
  } else if (searchGenre.length !== 0) {
    updatedList = searchGenre;
    renderList(updatedList);
  } else {
    showResult.innerHTML = `<h6>Film not found</h6>`;
  }
});

// !======add a film function ======
const inputTitle = document.querySelector("#inputTitle") as HTMLInputElement;
const inputYear = document.querySelector("#inputYear") as HTMLInputElement;
const inputDirector = document.querySelector(
  "#inputDirector"
) as HTMLInputElement;
const inputGenre = document.querySelector("#inputGenre") as HTMLInputElement;
const inputRate = document.querySelector("#inputRate") as HTMLInputElement;
const inputRuntime = document.querySelector(
  "#inputRuntime"
) as HTMLInputElement;
const btnAdd = document.querySelector("#btnAdd") as HTMLInputElement;

btnAdd.addEventListener("click", () => {
  const title = inputTitle?.value.trim();
  const year = inputYear?.value.trim();
  const director = inputDirector?.value.trim();
  const runtime = inputRuntime?.value.trim();
  const genres = inputGenre?.value
    .split(",")
    .map((elt) => elt.trim())
    .filter((elt) => elt !== "");
  const rate = inputRate?.value.trim();

  if (title && year && director && runtime && rate && genres.length > 0) {
    const newFilmArr: Movie = [title, year, director, runtime, genres, rate];
    movies.unshift(newFilmArr);
    updatedList = movies;
    renderList(updatedList);
  } else {
    alert("Bitte füllen Sie alle Felder aus!🚨");
  }
});
