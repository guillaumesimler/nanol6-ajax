function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    

    var SVStreet = $('#street').val();
    
    var SVCity = $('#city').val();
    var SVLocation= SVStreet + ', ' + SVCity;
    
    var SVInput='https://maps.googleapis.com/maps/api/streetview?size=1200x800&location="'+ SVLocation +'"';

    console.log(SVInput);
    $body.append('<img class="bgimg" src =' + SVInput + '>' );


    // load NY Times article

    var NYTurl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + SVCity+ '&fq=news_desk:("Foreign" "Business Day")&begin_date=20150701&sort=newest&api-key=4ecc07b082543d6d7e9b6a3617bc46f1:17:72720808';


    $.getJSON( NYTurl, function( data ) {
        console.log(data);
        $nytHeaderElem.text('10 latest NyTimes Articles about ' + SVCity);

        var articles = data.response.docs;
 
        for (var i = 0; i < 5; i++) {
            var article = articles[i];

            $nytElem.append('<li class="article"> <a href=" ' + article.web_url + '">' + article.headline.main + '</a> <p>' + article.snippet + '</p></li>');
        } 

    }).error(function(e){
            console.log(e);
            $nytHeaderElem.text('no NyTimes Articles available');
    });

    // Load Wikipedia Article

    var WikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + SVCity + '&prop=revisions&rvprop=content&format=json&callback=wikiCallback'
    
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get a wikipedia article")
    },8000);

    $.ajax({
        url:WikiUrl,
        dataType: "jsonp",
        success: function(response) {
            var articleList = response[1];
            var articleUrl = response[3];

            for (var i = 0; i < Math.min(articleList.length, 5); i++) {
                articleStr = articleList[i];
                var url = articleUrl[i];
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
