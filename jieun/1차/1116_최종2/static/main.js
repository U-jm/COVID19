// <!--슬라이드 바의 value 값을 전역 변수로 설정-->
var selectedMonthIndex = null;
var selectedMonth = null;
// 슬라이드,월별 부분
var months = [
    "2020년 1월", "2020년 2월", "2020년 3월", "2020년 4월", "2020년 5월", "2020년 6월",
    "2020년 7월", "2020년 8월", "2020년 9월", "2020년 10월", "2020년 11월", "2020년 12월",
    "2021년 1월", "2021년 2월", "2021년 3월", "2021년 4월", "2021년 5월", "2021년 6월",
    "2021년 7월", "2021년 8월", "2021년 9월", "2021년 10월", "2021년 11월", "2021년 12월",
    "2022년 1월", "2022년 2월", "2022년 3월", "2022년 4월", "2022년 5월", "2022년 6월",
    "2022년 7월", "2022년 8월", "2022년 9월", "2022년 10월", "2022년 11월", "2022년 12월",
    "2023년 1월", "2023년 2월", "2023년 3월", "2023년 4월", "2023년 5월", "2023년 6월",
    "2023년 7월", "2023년 8월", "2023년 9월", "2023년 10월", "2023년 11월"
];

$("#lever").change(function () {
    selectedMonthIndex =$(this).val()
    selectedMonth = months[selectedMonthIndex];
    $("#month-display").text(selectedMonth);
    console.log("슬라이더 값 변경: " + selectedMonth);
});

// ***버튼 클릭 시 조건 변경 수정중***
var selectedButtons = [];
var buttonIndex = null;

// 현재 활성화된 버튼에 'active' 클래스를 추가하고
// 이전에 활성화 되었던 버튼들에서 'active' 클래스를 제거한다
function updateButtonState() {
    $(".active").removeClass("active");
    selectedButtons.forEach(function (button) {
        $(button).addClass("active");
    });
}

$('#left_side_btn button').each(function () {
    $(this).click(function () {
        // 클릭된 버튼을 찾아서 있으면 초기화, 없으면 추가하며 버튼 색상 변경
        var index = selectedButtons.indexOf(this);
        if (index === -1) { // 해당 버튼이 배열에 없는 경우
            selectedButtons.push(this); // 배열에 추가
        } else {
            selectedButtons.splice(index, 1); // 배열에서 해당 버튼 제거
        }

        $(this).toggleClass("active", index === -1); // 선택된 버튼에 클래스 추가 또는 제거
            updateButtonState(); // 중복 코드 제거를 위해 함수 호출

        buttonIndex = $(this).index();
        // console.log("buttonIndex:"+buttonIndex)
        switch (buttonIndex) {
            case 0:
                console.log("확진자 버튼이 눌렸어요");
                updateButtonState();
                // 변경된 chk 데이터로 차트 업데이트
                break;
            case 1:
                console.log("사망자 버튼이 눌렸어요");
                updateButtonState();

                break;
            case 2:
                console.log("접종자 버튼이 눌렸어요");
                updateButtonState();

                break;
            case 3:
                console.log("총 인구수 버튼이 눌렸어요");
                updateButtonState();

                break;
        }//switch case 

        // chk 데이터 업데이트
        chk[buttonIndex] = !chk[buttonIndex];
        console.log("chk:"+chk);
    });
});

//데이터 부분
var chk = [true, true, true, false];
function chked_data(data, chk) {
    // console.log("chk array:", chk);
    // console.log("data array:", data);
    return data.filter((_, i) => chk[i]);
}

function make_chart(myChart, labels, label, data) {
    // Create the chart
    const ctx = document.getElementById(myChart).getContext("2d");
    console.log("차트 생성 코드 실행됨" + ctx);
    console.log("Label:", label);
    console.log("Labels:", labels);
    console.log("Data:", data);
    $('#' + myChart).css({ 'background-color': 'white', 'border-radius': '5%' });
    // Check if the chart instance exists
    if (window.myChartInstance) {
        // window.myChartInstance.destroy();
}

window.myChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
        labels: labels, // x-axis labels (dates)
        datasets: [
            {
            label: label,
            data: data,
            backgroundColor: "rgba(255, 0, 235, 0.2)",
            borderColor: "rgba(0, 255, 235, 1)",
            borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});
}

$('area').click(function() {
console.log("클릭 이벤트 발생");
console.log("selectedMonthIndex 값:", selectedMonthIndex);
var areaId = $(this).attr('id');
var $areaBox = $('#' + areaId + 'Box');
$.ajax({
    type: "get", // 타입 (get, post, put 등등)
    url: "/ajax", // 요청할 서버 url    async : true, // 비동기화 여부 (default : true)
    data: {month:selectedMonthIndex},
    dataType: "json",
    success: function (data) {
        console.log("요청 성공", data);
        // Prepare the data for the chart
        const labels = chked_data(chk, [
            "total_cases",
            "total_deaths",
            "people_vaccinated",
            "population",
        ]);

        const SAF = chked_data(Object.values(data["SAF"]), chk);
        const AFR = chked_data(Object.values(data["AFR"]), chk);
        const ASIA = chked_data(Object.values(data["ASIA"]), chk);
        const CHN = chked_data(Object.values(data["CHN"]), chk);
        const KOR = chked_data(Object.values(data["KOR"]), chk);
        const AUS = chked_data(Object.values(data["AUS"]), chk);
        const JPN = chked_data(Object.values(data["JPN"]), chk);
        const RSI = chked_data(Object.values(data["RSI"]), chk);
        const EEU = chked_data(Object.values(data["EEU"]), chk);
        const WEU = chked_data(Object.values(data["WEU"]), chk);
        const NAM = chked_data(Object.values(data["NAM"]), chk);
        const USA = chked_data(Object.values(data["USA"]), chk);
        const SAM = chked_data(Object.values(data["SAM"]), chk);

        const loc_name_list = ['남아프리카공화국','아프리카','아시아','중국','한국','오세아니아','일본','러시아','동유럽','서유럽','남아메리카','미국','서아메리카']
        const loc_data_list = [SAF,AFR,ASIA,CHN,KOR,AUS,JPN,RSI,EEU,WEU,NAM,USA,SAM]
        const chart_id_list = [
            'area1_chart','area2_chart','area3_chart','area4_chart','area5_chart','area6_chart','area7_chart',
            'area8_chart','area9_chart','area10_chart','area11_chart','area12_chart','area13_chart'
        ];
        for (let i = 0; i < loc_data_list.length; i++) {
            const chart_name = chart_id_list[i];
            const loc_code = loc_name_list[i];
            const loc_data = loc_data_list[i];

            make_chart(chart_name, labels, loc_code, loc_data);
        }
    },
});
    $areaBox.toggle()
});
$('.areaBox').click(function() {
    $(this).hide();
});


// jQuery 문서가 준비되면 실행
$(function(){
    // 'map' 클래스 maphilight() 초기화
    $('.map').maphilight();

    // maphilight default 값 설정
    $.fn.maphilight.defaults = {
        fill: true,
        fillColor: 'CCCCCC',
        fillOpacity: 0.5,
        stroke: true,
        strokeColor: 'FFFFFF',
        strokeOpacity: 1,
        strokeWidth: 1
    }
    $('img[usemap]').maphilight();

    // 구역 별로 정보 반환
    function getAreaContent(areaId) {
        var areaContents = {
            'area1': '남아공','area2': '아프리카','area3': '아시아','area4': '중국','area5': '한국','area6': '오세아니아',
            'area7': '일본','area8': '러시아','area9': '동유럽','area10': '서유럽','area11': '북아메리카','area12': '미국',
            'area13': '남아메리카'
        };
        return areaContents[areaId];
    }

    // 호버 시 국가 이름
    $('area').hover(function (event) {
    var areaContent = getAreaContent($(this).attr('id'));

    $('#infoBox').html(areaContent).css({
        top: event.pageY + 'px',
        left: event.pageX + 'px',
        display: 'block'
    });
    }, function () {
    $('#infoBox').css('display', 'none');
    });

    $('body').append('<div id="infoBox"></div>');
});