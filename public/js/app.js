$(document).ready(function(event) {
    // Add event listener for save button on all articles
    $("#articles-container").on("click", ".save-article", function() {
        var thisId = $(this).attr("article-id");

        $.ajax({
            method: "GET",
            url: "/save-article/" + thisId,
        })
            .then(function() {
                console.log("Article ID: " + thisId + "has been added to your saved list.");
                window.location.href = "/";
            });
    });

    // Add event listener for delete button on all articles
    $("#saved-articles").on("click", ".delete-saved", function() {
        var thisId = $(this).attr("article-id");

        $.ajax({
            method: "GET",
            url: "/delete-saved/" + thisId,
        })
            .then(function() {
                console.log("Article ID: " + thisId + "has been deleted from your saved list.");
                window.location.href = "/saved-articles";
            });
    });

    // Add event listener for adding notes on an article
    $("#saved-articles").on("click", ".article-notes", function() {
        $("#modalBox").modal("show");
        $(".modal-body").empty();
        $(".modal-notes").empty();
        var thisId = $(this).attr("article-id");
        console.log(thisId);

        $.ajax({
            method: "GET",
            url: "/article/" + thisId
        })
            .then(function(data) {
                console.log(data);
                $(".modal-body").append(
                    "<div class='input-group mb-3'>" +
                    "<input id='title-input' type='text' class='form-control' placeholder='Title'>" +
                    "</div>"
                );

                $(".modal-body").append(
                    "<div class='input-group mb-3'>" +
                    "<textarea id='body-input' type='text' class='form-control' placeholder='Notes'></textarea>" +
                    "</div>"
                );

                $(".modal-title").html("<h5>Notes for Article: " + data.title + "</h5>");
                $("#save-note").attr("article-id", data._id);

                if (data.notes) {
                    console.log(data.notes);
                    for (i = 0; i < data.notes.length; i++) {
                        var card = $("<div class='article-note'>");
                        var title = "<h5>" + data.notes[i].title + "</h5>";
                        var body = "<p>" + data.notes[i].body + "</p>" + "<hr>";

                        card.append(title);
                        card.append(body);
                        $(".modal-notes").append(card);
                    };
                };
            });
    });

    // Add functionality to save and post note to article
    $("#modalBox").on("click", "#save-note", function() {
        var thisId = $(this).attr("article-id");
        console.log(thisId);

        $.ajax({
            method: "POST",
            url: "/article/" + thisId,
            data: {
                title: $("#title-input").val(),
                body: $("#body-input").val()
            }
        })
            .then(function(data) {
                console.log(data);
                $(".modal-body").empty();
            });
        $("#title-input").empty();
        $("#body-input").empty();
        $("#modalBox").modal("hide");
    });

    // Create function to scrape articles for page
    $(".navbar").on("click", "#scrape", function() {
        $.ajax({
            method: "GET",
            url: "/scrape",
        })
            .then(function(data) {
                console.log("Articles have been scraped.");
                window.location.href = "/";
            });
    });

    // Create function to scrape articles for page through link
    $("#articles-container").on("click", "#link-scrape", function() {
        $.ajax({
            method: "GET",
            url: "/scrape",
        })
            .then(function(data) {
                console.log("Articles have been scraped.");
                window.location.href = "/";
            });
    })

    // Create function to scrape articles for page through link
    $("#articles-container").on("click", "#link-saved", function() {
        $.ajax({
            method: "GET",
            url: "/saved-articles",
        })
            .then(function(data) {
                window.location.href = "/saved-articles";
            });
    })

    // Create function to clear articles (and notes) from page
    $(".navbar").on("click", "#clear", function() {
        $.ajax({
            method: "GET",
            url: "/articles/clear",
        })
            .then(function() {
                console.log("All articles have been cleared from the page.");
                window.location.href = "/";
            });
        $("#articles-container").empty();
    });
});