
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
    
    var SVInput='https://maps.googleapis.com/maps/api/streetview?size=600x400&location="'+ SVLocation +'"';

    console.log(SVInput);
    $body.append('<img class="bgimg" src =' + SVInput + '>' );


    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
