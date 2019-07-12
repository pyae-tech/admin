$('title').html(get_current_organization_title() + "Scout Dashboard");
$('#menu_marketing').addClass('active-sub');
$('#menu_marketing_group').addClass('in');
$('#menu_marketing_Dashboard').addClass('active-link');


GetFavScoutType();
function GetFavScoutType() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_CrmDashboard.asmx/GetFavScoutType",
        data: "{ " +
            "'orgID':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                BindDataToFavScoutType(data.d);

            }
            $('#panel_daily_sale').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_daily_sale').loading('stop');
        }
    });
}

function BindDataToFavScoutType(data) {

    var result = JSON.parse(data);

    $("#pie").dxPieChart({
        type: "doughnut",
        palette: "Soft Pastel",
        dataSource: result.full_Data,
        title: "Top Ten Favourite Scout Type",
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {          
                 return {
                     text:   arg.argumentText
                };
            }
        },
        legend: {
            horizontalAlignment: "right",
            verticalAlignment: "top",
            margin: 0
        },
        "export": {
            enabled: false
        },
        series: [{
            argumentField: "ScoutTypeNameEng",
            valueField: "favCount",
            label: {
                visible: true,
                connector: {
                    visible: true
                }
            }
        }]
    });

    $("#gauge").dxBarGauge({
        startValue: 0,
        endValue: result.Count_Data[0],
        values: result.Count_Data,
        size: {
            height: 300,
            width: 300
        },
        label: { visible: false },
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                return {
                    sat: getText(arg, arg.valueText)
                };
            }
        },
        "export": {
            enabled: false
        },
        title: {
            text: "",
        },
        legend: {
            visible: false,
            horizontalAlignment: "right",
            position: "inside",
            border: { visible: true },
            verticalAlignment: "left",
            customizeText: function (arg) {
                return arg.text;
            }
        }
    });   
}



GetUserCountOnScout();
function GetUserCountOnScout() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_CrmDashboard.asmx/GetUserCountOnScout",
        data: "{ " +
            "'orgID':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                BindDataToUserCountChart(data.d);

            }
            $('#panel_daily_sale').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_daily_sale').loading('stop');
        }
    });
}

function BindDataToUserCountChart(data) {

    var result = JSON.parse(data);

    $("#chart").dxChart({
        dataSource: result,
        commonSeriesSettings: {
            argumentField: "UploadByName",          
            type: "bar",
            hoverMode: "allArgumentPoints",
            selectionMode: "allArgumentPoints",
            label: {
                visible: true,
                backgroundColor: "#ff7c7c",
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            }
        },
        series: {
            argumentField: "UploadByName",
            valueField: "UploadCount",
            type: "bar",
             name:"Upload Count"
        },
        title: "Upload Count By Users",
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        onPointClick: function (e) {
            e.target.select();
        }
    });
}
