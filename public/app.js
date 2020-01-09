// Retrive articles as JSON
$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles-container").append(
            "<div>" + data[i].title + data[i].link + data[i].img + data[i].summary + "</div>"
        );
    }
});