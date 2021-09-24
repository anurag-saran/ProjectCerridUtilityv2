var parseXml;
if (typeof window.DOMParser != "undefined") {
    parseXml = function(xmlStr) {
        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" &&
    new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = function(xmlStr) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    throw new Error("No XML parser found");
}



$(document).ready(function(e) {
    $("#btn-submit").on('click', onXMLSubmit);
    $("#btn-submit-xml").on('click', onDirSubmit);
});


var xmlObj;
function onDirSubmit() {
    var xmlString = $("#xmlentry").val();
    console.log('Dir coming:- ' + xmlString);
    $.ajax({
        method: "POST",
        url: "/api/v2",
        data: {
            xmld: xmlString
        },
        success: function (res) {
            console.log('result ' + res);
            if (res.status == "success") {
                $("#msg").html('<div class="alert alert-success">' + res.message + ' ' + res.count + '</div>')
            } else {
                $("#msg").html('<div class="alert alert-danger">' + res.message + '</div>')
            }
        }
    });  
}

function onXMLSubmit() {
    var xmlString = $("#xmlentry").val();    
    if (xmlString == "") {
        return false;
    }   
    xmlObj = parseXml(xmlString);
    console.log('data ' + xmlObj);


    $.ajax({
        method: "POST",
        url: "/api/v1",
        data: {
            xmld: xmlString
        },
        success: function (res) {
            console.log('result ' + res);
            if (res.status == "success") {
                $("#msg").html('<div class="alert alert-success">' + res.message + ' ' + res.count + '</div>')
            } else {
                $("#msg").html('<div class="alert alert-danger">' + res.message + '</div>')
            }
        }
    });    
}

