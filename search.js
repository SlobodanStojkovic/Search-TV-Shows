const input = $("#inputField");
const gallery = $(".gallery");
const h1 = $("h1");

const searchForShow = () => {
    let query = input.val();
    let searchShowEndpoint = "https://api.tvmaze.com/search/shows?q=" + query;

    fetch(searchShowEndpoint)

        .then(response => response.json())

        .then(data => {

            $("#searchOptions").empty();    //this empties all the options from search list

            for (let j = 0; j < data.length && j < 10; j++) {
                let searchResult = data[j].show.name;
                let searchedShowId = data[j].show.id;

                let liOption = $("<li>");
                liOption.text(searchResult);
                liOption.attr("class", "searchedOption dropdown-item");
                liOption.attr("id", searchedShowId);

                $("#searchOptions").append(liOption);
            }

            $(".searchedOption").click(function ()  {
                let showName = $(this).text();
                let showId = $(this).attr("id");

                localStorage.setItem("1", showName);
                localStorage.setItem("2", showId);
                window.location.replace("tvShow.html");
            });
        });
};
input.keyup(searchForShow);



const showSearched = () => {

    let showSearchedEndpoint = "https://api.tvmaze.com/search/shows?q=" + input.val();

    fetch(showSearchedEndpoint)

        .then(response => response.json())

        .then(data => {

            gallery.empty();
            h1.empty();
            $(".buttons").empty();
            $(".crewAkasEpisodes").empty();

            for (let i = 0; i < data.length; i++) {

                let name = data[i].show.name;

                if (data[i].show.image != null) {
                    var image = data[i].show.image.medium;
                } else {
                    var image = "./assets/imagePlaceholder.png";   //image placeholder
                }

                let showId = data[i].show.id;

                let $div = $("<div class='show col-4 p-3'>");
                gallery.append($div);

                let $img = $("<img>");
                $img.attr("src", image);
                $img.attr("class", showId);
                $img.attr("alt", name);
                $div.append($img);

                let $a = $("<a>");
                $a.addClass("userLink");
                $a.attr("href", "./tvShow.html");
                $a.attr("target", "_blank");
                $a.attr("id", showId);
                $a.text(name);

                $div.append($a);
            }

            $("a").click(function ()  {
                let showName = $(this).text();
                let showId = $(this).attr("id");

                localStorage.setItem("1", showName);
                localStorage.setItem("2", showId);
            });

            $("img").click(function () {

                let showName = $(this).attr("alt");
                let showId = $(this).attr("class");

                localStorage.setItem("1", showName);
                localStorage.setItem("2", showId);
                window.location.replace("tvShow.html");
            });
        });
};

input.keypress(e => {
    if (e.which == 13) {

        e.preventDefault();

        showSearched();
    }
});
