const showName = localStorage.getItem("1");
$("#newShowTitle").text(showName);
localStorage.removeItem("1");

const showId = localStorage.getItem("2");
localStorage.removeItem("2");

const $getCrew = $("#getCrew");
const $getAkas = $("#getAkas");
const $getEpisodes = $("#getEpisodes");

const getShowDetails = () => {
    let $main = $("main");
    let $showDetails = $("#showDetails");

    let imageDescrEndpoint = "https://api.tvmaze.com/shows/" + showId;
    let seasonsEndpoint = "https://api.tvmaze.com/shows/" + showId + "/seasons";
    let castEndpoint = "https://api.tvmaze.com/shows/" + showId + "/cast";

    fetch(imageDescrEndpoint)

        .then(response => response.json())

        .then(imageDescrResponse => {
            if (imageDescrResponse.image == null) {
                let $img = $("<img>");

                $img.attr("src", "./assets/imagePlaceholder.png");
                $img.attr("alt", "imagePlaceholder");
                $main.prepend($img);
            } else {
                let image = imageDescrResponse.image.original;

                let $img = $("<img>");
                $img.attr("src", image);
                $img.attr("alt", showName);
                $main.prepend($img);
            }

            let description = imageDescrResponse.summary;
            $(description).insertAfter($showDetails);
        });

    fetch(seasonsEndpoint)

        .then(response => response.json())

        .then(seasonsResponse => {

            let numberOfSeasons = seasonsResponse.length;
            $("#h3Seasons").html(`Seasons (${numberOfSeasons})`);

            let $ul = $("<ul class='seasons col12'>");

            $("#h3Seasons").after($ul);

            for (let i = numberOfSeasons - 1; i >= 0; i--) {
                let seasonStart = seasonsResponse[i].premiereDate;
                let seasonEnd = seasonsResponse[i].endDate;

                if (seasonStart === null) {
                    seasonStart = "No information about season start";
                }

                if (seasonEnd === null) {
                    seasonEnd = "No information about season end";
                }

                let $li = $("<li>");
                $li.text(seasonStart + " - " + seasonEnd);
                $(".seasons").append($li);
            }
        });

    fetch(castEndpoint)

        .then(response => response.json())

        .then(castResponse => {

            let $ul = $("<ul class='cast col12'>");
            $("#h3Cast").after($ul);

            for (let j = 0; j < castResponse.length; j++) {
                let actorName = castResponse[j].person.name;

                let $li = $("<li>");
                $li.text(actorName);
                $(".cast").append($li);
            }

            if ($(".cast").children().length === 0) {
                let $p = $("<p>");
                $p.text("Cast is not available.");

                $("#h3Cast").after($p);
            }
        });
}
setTimeout(getShowDetails, 500);



const getCrew = () => {

    let crewEndpoint = "https://api.tvmaze.com/shows/" + showId + "/crew";

    fetch(crewEndpoint)

        .then(response => response.json())

        .then(crewResponse => {

            let olDivCrew = $("<ol class='olCrew'>");

            $(".crew").append(olDivCrew);

            for (let k = 0; k < crewResponse.length; k++) {
                let crewName = crewResponse[k].person.name;

                let liCrew = $("<li>");
                liCrew.text(crewName);
                $(".olCrew").append(liCrew);
            }

            if ($(".olCrew").children().length < 1) {
                let liCrew = $("<li>");
                liCrew.text("There is no available information.");
                $(".olCrew").append(liCrew);
            }
        });

    $("#getCrew").html("Hide Crew");
    $getCrew.off("click");
    $getCrew.one("click", hideCrew);
}
$getCrew.one("click", getCrew);



const getAkas = () => {

    let akasEndpoint = "https://api.tvmaze.com/shows/" + showId + "/akas";

    fetch(akasEndpoint)

        .then(response => response.json())

        .then(akasResponse => {

            let olDivAkas = $("<ol class='olAkas'>");

            $(".akas").append(olDivAkas);

            for (let l = 0; l < akasResponse.length; l++) {
                let akasName = akasResponse[l].name;

                let liAkas = $("<li>");
                liAkas.text(akasName);
                $(".olAkas").append(liAkas);
            }

            if ($(".olAkas").children().length < 1) {
                let liAkas = $("<li>");
                liAkas.text("There is no available information.");
                $(".olAkas").append(liAkas);
            }
        });

    $("#getAkas").html("Hide Akas");
    $getAkas.off("click");
    $getAkas.one("click", hideAkas);
}
$getAkas.one("click", getAkas);



const getEpisodes = () => {

    let episodesEndpoint = "https://api.tvmaze.com/shows/" + showId + "/episodes";

    fetch(episodesEndpoint)

        .then(response => response.json())

        .then(episodesResponse => {

            let olDivEpisodes = $("<ol class='olEpisodes'>");

            $(".episodes").append(olDivEpisodes);

            for (let m = 0; m < episodesResponse.length; m++) {
                let episodeName = episodesResponse[m].name;

                let liEpisode = $("<li>");
                liEpisode.text(episodeName);
                $(".olEpisodes").append(liEpisode);
            }

            if ($(".olEpisodes").children().length < 1) {
                let liEpisode = $("<li>");
                liEpisode.text("There is no available information.");
                $(".olEpisodes").append(liEpisode);
            }
        });

    $("#getEpisodes").html("Hide Episodes");
    $getEpisodes.off("click");
    $getEpisodes.one("click", hideEpisodes);
}
$getEpisodes.one("click", getEpisodes);


const hideCrew = () => {
    $(".olCrew").remove();
    $("#getCrew").html("Show Crew");
    $getCrew.off("click");
    $getCrew.one("click", getCrew);
}


const hideAkas = () => {
    $(".olAkas").remove();
    $("#getAkas").html("Show Akas");
    $getAkas.off("click");
    $getAkas.one("click", getAkas);
}


const hideEpisodes = () => {
    $(".olEpisodes").remove();
    $("#getEpisodes").html("Show Episodes");
    $getEpisodes.off("click");
    $getEpisodes.one("click", getEpisodes);
}


