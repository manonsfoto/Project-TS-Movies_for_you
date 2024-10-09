import { movies } from "./movies";
type Movie = [string, string, string, string, string[], string];

// 'The Shawshank Redemption', // Titel
// '1994', // Erscheinungsjahr
// 'Frank Darabont', // Regisseur:in
// '2h 22min', // Spieldauer
// ['Crime', 'Drama'], // Genre
// '9.3' // Bewertung
const inputSearch = document.querySelector("#inputSearch") as HTMLInputElement;
const btnSearch = document.querySelector("#btnSearch") as HTMLInputElement;
const btnYearUp = document.querySelector("#btnYearUp") as HTMLInputElement;
const btnYearDown = document.querySelector("#btnYearDown") as HTMLInputElement;
const btnBestRate = document.querySelector("#btnBestRate") as HTMLInputElement;
const showResult = document.querySelector("#showResult") as HTMLElement;

// !================================
// !======function render List ======
// !================================

const renderList = (Arr: Movie[]) => {
  showResult.innerHTML = "";
  Arr?.forEach((item) => {
    showResult.innerHTML += `<li>${item}</li>`;
  });
};
renderList(movies);

// !====================================
// !======function sort ListYearUp ======
// !====================================
const sortListYearUp = (Arr: Movie[]): Movie[] => {
  return Arr.sort((a: Movie, b: Movie) => Number(a[1]) - Number(b[1]));
};
// !======================================
// !======function sort ListYearDown ======
// !======================================
const sortListYearDown = (Arr: Movie[]): Movie[] => {
  return Arr.sort((a: Movie, b: Movie) => Number(b[1]) - Number(a[1]));
};
// !======================================
// !======function sort ListBestRate ======
// !======================================
const sortListBestRate = (Arr: Movie[]): Movie[] => {
  return Arr.sort((a: Movie, b: Movie) => Number(b[5]) - Number(a[5]));
};

let updatedList: Movie[] = movies.map((elt) => elt);
// !============================
// !======Event btn YearUp ======
// !============================
btnYearUp?.addEventListener("click", () => {
  renderList(sortListYearUp(updatedList));
});
// !==============================
// !======Event btn YearDown ======
// !==============================
btnYearDown?.addEventListener("click", () => {
  renderList(sortListYearDown(updatedList));
});
// !==============================
// !======Event btn BestRate ======
// !==============================
btnBestRate?.addEventListener("click", () => {
  renderList(sortListBestRate(updatedList));
});
// !============================
// !======Event btn Search ======
// !============================

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
  if (searchName.length !== 0) {
    updatedList = searchName;
    renderList(updatedList);
  } else if (searchYear.length !== 0) {
    updatedList = searchYear;
    renderList(updatedList);
  } else if (searchDirector.length !== 0) {
    updatedList = searchDirector;
    renderList(updatedList);
  } else {
    showResult.innerHTML = `<p>Film not found</p>`;
  }
});
