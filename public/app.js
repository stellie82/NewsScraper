var refreshArticles = function() {
    $.getJSON("/articles", function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var card = $("<div>").attr({
                class: "card"
            });

            var title = $("<a>")
                .attr("href", data[i].link)
                .attr("target", "_blank")
                .text(data[i].title)
                .addClass("article-title");

            var imgURL = data[i].image;
            console.log(imgURL);
            var image = $("<img>").attr({
                src: imgURL,
                class: "article-img",
                alt: "article-photo"
            });

            var saveBtn = $("<button>")
                .addClass("btn btn-sm btn-outline-secondary save-button")
                .text("Save Article");

            card.append(title);
            card.append(image);
            card.append(saveBtn);
            $("#articles-container").append(card);
        };
    });
};

// Add event listener for the refresh button
$("#refresh").on("click", refreshArticles);