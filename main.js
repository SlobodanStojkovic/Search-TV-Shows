const showTop50 = () => {
    let gallery = $(".gallery");
    let showTop50Endpoint = "https://api.tvmaze.com/shows";

    fetch(showTop50Endpoint)

        .then(response => response.json())

        .then(data => {

            data.sort((a, b) => {                     //this sorts response data by rating descending 
                return b.rating.average - a.rating.average;
            });

            for (let i = 0; i < 50; i++) {
                let name = data[i].name;
                let image = data[i].image.medium;
                let showId = data[i].id;

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

            $("a").click(function () {
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
}
showTop50();

