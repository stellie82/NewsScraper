var refreshArticles = function() {
    $.getJSON("/articles", function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var card = $("<div article-id='" + data[i]._id + "'>");

            var header = $("<h5>").addClass("card-header");

            var title = $("<a>")
                .attr("href", data[i].link)
                .attr("target", "_blank")
                .text(data[i].title)
                .addClass("article-title");

            var saveBtn = $("<button>")
                .addClass("btn btn-sm btn-outline-secondary save-button")
                .text("Save Article");

            header.append(title);
            header.append(saveBtn);

            var body = $("<div>")
                .addClass("card-body");

            var imgURL = data[i].image;
            var image = $("<img>").attr({
                src: imgURL,
                class: "article-img",
                alt: "article-photo",
                style: "width: 200px"
            });

            var summary = $("<p>").text(data[i].summary);

            body.append(image);
            body.append(summary);

            card.append(header);
            card.append(body);
            $("#articles-container").append(card);
        };
    });
};

var clearArticles = function() {
    $("#articles-container").empty();
};

// Add event listener for the refresh button
$("#refresh").on("click", refreshArticles);
$("#clear").on("click", clearArticles);