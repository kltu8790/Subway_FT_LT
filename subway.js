window.onload = init;

var url = "http://openapi.seoul.go.kr:8088/4b644f67436b6c7435326d61686d4e/json/SearchFirstAndLastTrainbyLineServiceNew/1/200/";
var subway = [];
var subways, inout, week;

function init() {
    $( function() {

    $('#Button').click(function () { 

        subways = $('#subline option:selected').val()
        inout = $('#inout option:selected').val()
        week = $('#week option:selected').val()

        $.getJSON(url + subways + "/" + inout + "/" + week, updatesubway);

    });

   $('#subline').selectmenu();
   $('#inout').selectmenu();
   $('#week').selectmenu();
   $('#Button').button();
   $('#Button').click(function(event){
    $(".dataItem").remove();   

    })
})

}

function updatesubway(str) {
    var select = document.getElementById('subline');
    var stationNum = document.getElementById('numOfStation');
    var lineNumArray =[];
    try {
        subways = str.SearchFirstAndLastTrainbyLineServiceNew.row;
        stationNum.innerHTML = " " 
            String(subways.length);
    } catch (error) {
        stationNum.innerHTML = '데이터가 없습니다. '
    }

    var subwayDiv = document.getElementById('subway');
    for (var index = 0; index < subways.length; index++) {
        var subway = subways[index];
        var div = document.createElement('div');
        div.setAttribute('class', 'dataItem');
        div.innerHTML = "호선 : " + subway.LINE_NUM + 
        "\t역 이름 : " + subway.STATION_NM + 
        "\n첫차시간 : " + subway.FIRST_TIME + 
        "\t첫차출발역명 : " + subway.F_SUBWAYSNAME + 
        "\t첫차도착역명 : " + subway.F_SUBWAYENAME + 
        "\n막차시간 : " + subway.LAST_TIME + 
        "\t막차도착역명 : " + subway.L_SUBWAYSNAME + 
        "\t막차도착역명 : " + subway.L_SUBWAYENAME;

        subwayDiv.appendChild(div);
    }

    
}

