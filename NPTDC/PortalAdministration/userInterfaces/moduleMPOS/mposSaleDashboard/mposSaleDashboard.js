$('title').html(get_current_organization_title() + "Sale Dashboard");
$('#menu_sale').addClass('active-sub');
$('#menu_sale_group').addClass('in');
$('#menu_sale_SaleDashboard').addClass('active-link');

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const d = new Date();
var yyyy = d.getFullYear();
var today = yyyy + "," + monthNames[d.getMonth()];


$("#escape").dxDateBox({
    placeholder: today,
    showClearButton: true,
    //useMaskBehavior: true,
    displayFormat: "yyyy , MMM",
    type: "date",
    value: new Date(),
    onValueChanged: function (data) {
        const dd = new Date(data.value);
        var month = dd.getMonth() + 1;

        var output = dd.getFullYear() + '/' +
            (month < 10 ? '0' : '') + month + '/' + '01';

        GetMonthlyData(output);
    }
});

Load_Monthly_Data();
function Load_Monthly_Data() {
    const dd = new Date();
    var month = dd.getMonth() + 1;

    var output = dd.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' + '01';
    GetMonthlyData(output);
}

function GetMonthlyData(startDate) {
    $('#panel_daily_sale').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SaleDashboard.asmx/GetMonthlySaleDataByMonth",
        data: "{ " +
            "'startDate':'" + startDate+ "' " +
            ",'orgID':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                BindDataToMonthlyChart(data.d);

            }
            $('#panel_daily_sale').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_daily_sale').loading('stop');
        }
    });
}




function BindDataToMonthlyChart(data) {

    var result = JSON.parse(data);
    var monthlyTotal = 0;
    $.each(result, function (key, val) {
        monthlyTotal += result[key]['AMOUNT'];
   
    });

    //$("#dailyTotal").text('$' + (Math.round(results.dailyTotal / 100000)) / 10 + 'M');
    var monthly_chartOptions = {
        dataSource: result,
        title: "Monthly Sale Record  (Total : " + NumberWithCommas(monthlyTotal) + " Kyat)", /*(Math.round(monthlyTotal / 100000)) / 10 + "M)",*/
        size: {
            height: 300,
            //width:100%
        },
        series: {
            argumentField: "NUMBER",
            valueField: "AMOUNT",
            type: "spline",
             name: "Day"
        },
        legend: {
            visible: false
        },
        commonPaneSettings: {
            border: {
                visible: true,
                width: 2,
                top: false,
                right: false
            }
        },
        "export": {
            enabled: true
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                return {
                    text: arg.valueText + " MMK"
                };
            }
        },
        valueAxis: {
            type: "continuous",
            grid: {
                opacity: 0.2
            },
            label: {
                customizeText: function () {
                    return this.valueText + " MMK";
                }
            },
            title: {
                text: "Total Amount"
            }
        },
        argumentAxis: {
            type: "discrete",
            grid: {
                visible: true,
                opacity: 0.5
            }// ,
            //title: {
            //    text: "Days"
            //}
        }
    };

    $("#monthly_chart").dxChart(monthly_chartOptions);
  
}
GetAnnualData();
function GetAnnualData() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SaleDashboard.asmx/GetAnnualData",
        data: "{ " +
             "'orgID':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                BindDataToAnnualChart(data.d);

            }
            $('#panel_daily_sale').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_daily_sale').loading('stop');
        }
    });
}

var Annual_Year_List = "";
function BindDataToAnnualChart(data) {

    var result = JSON.parse(data);
    Annual_Year_List = JSON.parse(result.Years);
    $("#gauge").dxBarGauge({
        startValue: 0,
        endValue: result.endValue,
        values: JSON.parse(result.Data),
        label: { visible: false },
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                return {sat: getText(arg, arg.valueText)
                };
            }
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Annual Sales Performance",
            font: {
                size: 28
            }
        },
        legend: {
            visible: true,
            verticalAlignment: "bottom",
            horizontalAlignment: "center",
            customizeText: function (arg) {
                return getText(arg.item, arg.text);
            }
        }
    });

    function getText(item, text) {

        return " " + Annual_Year_List[item.index] + " - " + text + " Million(MMK)";
    }

}


GetSaleDataByItemType();
function GetSaleDataByItemType() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SaleDashboard.asmx/GetSaleByItemTypeData",
        data: "{ " +
            "'orgID':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                BindDataToSaleByItemType(data.d);

            }
            $('#panel_daily_sale').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_daily_sale').loading('stop');
        }
    });
}


function BindDataToSaleByItemType(data) {

    var result = JSON.parse(data);

    $("#pie").dxPieChart({
        type: "doughnut",
        palette: "Soft Pastel",
        dataSource: result,
        title: "Sale By Item Type",
        tooltip: {
            enabled: true,
            //format: "millions",
            customizeTooltip: function (arg) {
                //var percentText = Globalize.formatNumber(arg.percent, {
                //    style: "percent",
                //    minimumFractionDigits: 2,
                //    maximumFractionDigits: 2
                //});

                return {
                    text: "Qty " + arg.valueText,
                };
            }
        },
        legend: {
            orientation: "horizontal",
            itemTextPosition: "right",
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            columnCount: 4
        },
        "export": {
            enabled: true
        },
        series: [{
            argumentField: "ItemTypeName",
            valueField: "TotalQty",
            label: {
                visible: true,
                //format: "millions",
                connector: {
                    visible: true
                }
            }
        }]
    });

}
