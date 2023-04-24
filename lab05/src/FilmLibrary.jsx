import dayjs from "dayjs";

function Film(id, title, favorites = false, date, rating ) {
    this.id = id ?? null;
    this.title = title ?? "";
    this.favorites = favorites ?? false;
    this.date = date ?? null;
    this.rating = rating ?? null;

    this.toString = () => `ID: ${this.id} Title: ${this.title} Favorite: ${this.favorites} Watch Date: ${dayjs(this.date).isValid() ? dayjs(this.date).format("YYYY-MM-DD") : "Unwatched"} Rating: ${this.rating ? this.rating : "Unrated"}`;
}

function FilmLibrary(films) {
    this.films = films ?? [];

    this.checkID = function(id) {
        return (this.films.filter( film => film.id === id).length === 0);
    }

    this.suggestedID = function() {
        return this.films.length + 1;
    }

    this.addNewFilmByElements = function (id, title, favorites, date, rating) {
        this.films.push(new Film(id, title, favorites, date, rating));
    }

    this.addNewFilm = function (film) {
        this.films.push(film);
    }

    this.getAll = function() {
        return [...this.films].sort((a,b) => { return ( ( a.title === b.title ) ? 0 : ( ( a.title > b.title ) ? 1 : -1 ) ); });
    }

    this.getFavorites = function() {
        return [...this.films].filter( item => item.favorites );
    }

    this.getBestRated = function() {
        return [...this.films].sort((a,b) => {
            if(b.rating === a.rating)
                return ( ( a.title === b.title ) ? 0 : ( ( a.title > b.title ) ? 1 : -1 ) );
            return b.rating > a.rating; });
    }

    this.getUnseen = function() {
        return [...this.films].filter( item => item.date === null );
    }

    this.getSeenLastMonth = function() {
        let now = dayjs();
        return [...this.films].filter( item => {
            if( item.date != null && dayjs(item.date).diff(now, "months") >= 0)
                return 1;
            return 0;
        });
    }

    this.changeFavorite = function(id) {
        this.films.forEach((film) => {
            if(film.id === id) film.favorites = !film.favorites;
        });
    }

    this.changeRating = function(id, index) {
        this.films.forEach( (film) => {
           if(film.id === id) film.rating = index;
        });
    }

    this.deleteFilm = function(id) {
       this.films = this.films.filter( (film) => film.id !== id);
    }

    this.toString = () => this.films.reduce((acc, curr) => acc + curr + "\n", "");

}

const filmLibrary = new FilmLibrary();

filmLibrary.addNewFilm(new Film(1, "Pulp Fiction", true, dayjs("2023-03-10"), 5));
filmLibrary.addNewFilm(new Film(2, "21 Grams", true, dayjs("2023-01-17"), 4));
filmLibrary.addNewFilm(new Film(3, "Star Wars", false));
filmLibrary.addNewFilm(new Film(4, "Matrix", false));
filmLibrary.addNewFilm(new Film(5, "Shrek", false, dayjs("2023-03-21"), 3));

export default filmLibrary


