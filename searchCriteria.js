$(document).ready(function(){
    $("#Submit").click(function(event){
        console.log("Clicked");
       $('#r_distance').empty(); //Empty any stored data
        begin();
        event.preventDefault();
    });
});

var mainURL;

function begin(){
  createURL();
  console.log(mainURL);
  callAjax();
}
/**
* Reads Location, Destination and the type of commute (Vehical,Pedestrian,Bicycle)
* Returns URL 
*/
 function createURL(){
    if (document.getElementById('location') != null) { var location = document.getElementById("location").value; }
    if (document.getElementById('destination') != null) { var destination = document.getElementById("destination").value; }

    var selection = document.querySelector('input[name="selection"]:checked').id;

    /** Create the URL **/ 
    var beginURL = "https://www.mapquestapi.com/directions/v2/route?key=9vyfTMs7Q4JVtr4u5ItN8Fd0YHuw1dqn&from=";
    url = beginURL.concat(location);
    var addDestnation = "&to="
    var addDest = addDestnation.concat(destination);
    url2 = url.concat(addDest);
    var returnXMLFormat = "&outFormat=XML&ambiguities=ignore&"
    url3 = url2.concat(returnXMLFormat);
    var routeType = "routeType=";
    var combineRoute = routeType.concat(selection);
    url4 = url3.concat(combineRoute);
    var endURL = "&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false"
    finalURL = url4.concat(endURL);
    mainURL = finalURL;

}
/**
* Reads in the URL 
* Parses the contents to parseXML
*/
function callAjax(){
    console.log("Clicked");
   $.ajax({
    type: "GET", 
    url: mainURL,
    dataType: "XML",
    success: parseXML,
     error: function (request, status, error) {
        console.log(request.responseText);
    }
  });
}

/**
*Reads in the XML in D
*Print the distance for the first Distance node found 
*/
function parseXML(xml) {
  console.log("display xml");
 
  var d = $('distance', xml).get();
  $.each(d, function( index, value ) {
    console.log( index + ": " + value.textContent );
    $('#r_distance').append("<b>Distance in miles: </b>" + value.textContent);
    return false;
  });
  
}