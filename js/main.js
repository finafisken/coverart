var templateSourceAlbums = document.getElementById('results-template-albums').innerHTML,
    templateAlbums = Handlebars.compile(templateSourceAlbums),
    resultsPlaceholder = document.getElementById('results'),
    templateSourceArtist = document.getElementById('results-template-artist').innerHTML,
    templateArtist = Handlebars.compile(templateSourceArtist),
    artistPlaceholder = document.getElementById('artists');

function searchAlbums(artistId) {
    $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + artistId + '/albums?market=us&album_type=single,album&limit=50',
        success: function (response) {
            console.log(response);
            //remove duplicates
            for (var i = 0; i < response.items.length-1; i++) {
              if (response.items[i].name === response.items[i+1].name){
                  response.items.splice(i, 1);
              }
            }
            resultsPlaceholder.innerHTML = templateAlbums(response);

        }
    });
};

function searchArtist(query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search?limit=10',
        data: {
            q: query,
            type: 'artist'
        },
        success: function (response) {
            artistPlaceholder.innerHTML = templateArtist(response);
            console.log(response);
        }
    });
};

function getAlbumInfo(id){
        $.ajax({
        url: 'https://api.spotify.com/v1/albums/'+id,
        success: function (response) {
            console.log("album object");
            console.log(response);
        }
    });
};


artistPlaceholder.addEventListener('click', function(e) {
    var target = e.target,
    artistId = target.getAttribute('data-artist-id');
    searchAlbums(artistId);
    $('#artists').slideUp(400);
});

resultsPlaceholder.addEventListener('click', function(x) {
    var target = x.target,
    albumId = target.getAttribute('data-album-id');
    window.open(albumId);
});

$( "#query" ).keyup(function() {
    searchArtist(document.getElementById('query').value);
    $('#artists').slideDown(400);
});

$(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
    }
});

$('#back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
});
