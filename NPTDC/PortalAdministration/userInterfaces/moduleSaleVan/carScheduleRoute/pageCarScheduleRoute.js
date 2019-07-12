$('title').html(get_current_organization_title() + "Car Schedule");

$('#menu_salevan').addClass('active-sub');
$('#menu_salevan_group').addClass('in');
$('#menu_salevan_MonthlyVanRoute').addClass('active-link');

$("#tab-main").tabs();
$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

$("#tb_ScheduleDate").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_ScheduleDate').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
        Load_List();
    }

});

Load_Cars();
function Load_Cars() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Car.asmx/GetAllCar",
        data: "{ " +
            "'search_text':'" + "" + "' " +           
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_Car_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_Car_list(records) {
    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;

        allCardsCode += "<a href='#' id='" + records[key]['CarID'] + "' onclick='Car_Click(\"" + records[key]['CarID'] + "\",\"" + records[key]['CarNo'] + "\")'  class='list-group-item'><div class='btn btn-danger btn-rounded'><i class='ti-truck icon-3x icon-fw'></i> " + records[key]['CarNo'] + "</div></a>";


    });
    $('.list_count').html(rowindex - 1);
    $('#div_car_list').empty();
    $('#div_car_list').append(allCardsCode);
}

function Car_Click(CarID, CarNo, ItemTypeID) {

    $(".list-group-item").removeClass("active");
    $("#car_no").html(CarNo);
    var id = "#" + CarID;
    $(id).addClass('active');
    $("#tb_carId").val(CarID);
    var mm = parseInt($('#hf_date_month').val());
    load_car_schedule(getDaysInMonth(mm + 1, $('#hf_date_year').val(), 0), mm, $('#hf_date_year').val());
}

LoadRoute();
function LoadRoute() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_RoutePlan.asmx/GetAllRouteWithPagination",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'search_wayplan':'" + $("#tb_searchroute").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (day_count == "") {
                    generate_route_list(data.d);
                }
                else {
                    bind_Route_To_DDL(day_count,data.d);
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_route_list(records) {
    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;
      
        if (rowindex == 1) {//paginatin function
            paginationInfos = records[key].split('~');
            $('#lbl_record_count2').html("Total Records : " + paginationInfos[0] + ", Page: ");
            $('#tb_current_page2').val(paginationInfos[2]);
            $('#lbl_page_count2').html(" of " + paginationInfos[1] + " pages");
            $('#hf_current_page2').val(paginationInfos[2]);
            $('#btn_pagination_next2').hide();
            $('#btn_pagination_previous2').hide();
            if (paginationInfos[4] == 'y') {
                $('#btn_pagination_next2').attr('actionPage', parseInt(paginationInfos[2]) + 1);
                $('#btn_pagination_next2').show();
            }
            if (paginationInfos[3] == 'y') {
                $('#btn_pagination_previous2').attr('actionPage', parseInt(paginationInfos[2]) - 1);
                $('#btn_pagination_previous2').show();
            }
        } else {
            the_template = $('#div_available_route_template').html();


            allCardsCode += the_template.replace()
                .replace("[RouteID]", records[key]['RouteID'])
                .replace("[RouteID]", records[key]['RouteID'])
                .replace("[RouteID]", records[key]['RouteID'])
                .replace("[RouteNo]", records[key]['RouteNo'])
                .replace("[RouteSeq]", records[key]['RouteSeq'])
                .replace("[Status]", records[key]['Status']);
        }
    });

    $('.list_count').html(rowindex - 1);
    $('#div_available_customer').empty();
    $('#div_available_customer').append(allCardsCode);
}



$('#tb_searchItemGroup').keyup(function (e) {
    LoadItemType();
});

var date = new Date();
$('#date_title').text(getMonthName(date.getMonth()) + " , " + date.getFullYear());
$('#hf_date_month').val(date.getMonth());
$('#hf_date_year').val(date.getFullYear());
var day_count ="";
function monthJump(status) {
    var month = 0; var year = $('#hf_date_year').val();
    if (status == 'next') {
        month = parseInt($('#hf_date_month').val()) + 1;
        if (month > 11) {
            month = month - 12;
            year = parseInt($('#hf_date_year').val()) + 1;
        }

    }
    else {
        month = parseInt($('#hf_date_month').val()) - 1;
        if (month < 0) {
            month = 11;
            year = parseInt($('#hf_date_year').val()) - 1;
        }
    }
    $('#date_title').text(getMonthName(month) + " , " + year);
    $('#hf_date_month').val(month);
    $('#hf_date_year').val(year);
    load_car_schedule(getDaysInMonth(month+1, year,0), month,year);
}

function getMonthName(m) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[m];
}

var getDaysInMonth = function (month, year,day) {
    return new Date(year, month, day).getDate();
};

function load_car_schedule(day_count,month,year)
{
    var allCardsCode = '';
    the_template = $('#div_schedule_template').html();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var i;
    for (i = 1; i < day_count+1; i++) {        
        var d = new Date();
        d.setFullYear(year, month, i);  

        var mm = d.getMonth() + 1;
        if (mm < 10) {
            mm = "0" + mm;
        }
        
     
        var sDate = d.getFullYear() + "-" + mm  + "-" + i;
        allCardsCode += the_template.replace()
            .replace("[dayCount]", i)
            .replace("[dayName]", weekday[d.getDay()])
            .replace("[ScheduleDate]", sDate)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i);
    }
    $('#schedule_list').empty();
    $('#schedule_list').append(allCardsCode);
    LoadAllRoute(day_count, sDate);
}

function LoadAllRoute(day_count,schedule_date) {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_RoutePlan.asmx/GetAllRoute",
        data: "{ " +
            "'search_text':'" + "" + "' " +           
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                
                    for (i = 1; i < day_count + 1; i++) {
                        var id = "#ddl_route_" + i;
                        $(id).empty();
                        $(id).append("<option value='delete'>" + "Choose Route" + "</option>");
                        $.each(data.d, function (key, val) {
                            $(id).append("<option value=" + data.d[key]['RouteID'] + ">" + data.d[key]['RouteNo'] + "</option>");

                        });                        
                      
                        //$(id).chosen().change();
                }
                LoadCarScheduleRoute(schedule_date);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function LoadCarScheduleRoute(schedule_date) {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_CarScheduleRoute.asmx/GetCarScheduleRoute",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'CarID':'" + $("#tb_carId").val() + "' " +
            ",'ScheduleDate':'" + schedule_date + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                console.log(data.d);
                $.each(data.d, function (key, val) {
                    rowindex++;
                    var id = parseInt(JsonDateToFormat(data.d[key]['ScheduleDate'], 'DD'));
                    var ddl_id = "#ddl_route_" + id;
                    var carScheduleId = "#hf_car_sh_route_id_" + id;
                    $(ddl_id).val(data.d[key]['RouteID']);
                    $(carScheduleId).val(data.d[key]['CarScheduleID']);
                });
                    }
        },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

            }
        });
}


//#region Save
function SaveRecordVerification(count, ScheduleDate) {
    error_message = "";
    if (count == "" || count == "undefined") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Choose Route "
    }
    if (ScheduleDate == "" || ScheduleDate == "undefined") {
        if (error_message != "") error_message += "<br/>";
        error_message += "ScheduleDate  Need To Be Fill"
    }
    if ($("#tb_carId").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Car Need To Be Fill"
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}


function saveCarScheduleRoute(count, ScheduleDate)
{
    if (SaveRecordVerification(count, ScheduleDate) == false)
        return;   
        var id = "#ddl_route_" + count;
    var carScheduleId = "#hf_car_sh_route_id_" + count;

        Pace.start();
        $.ajax({

            url: baseUrl() + "WebServices/WebService_CarScheduleRoute.asmx/SaveCarScheduleRoute",
            data: "{ " +
                "'CarScheduleID':'" + $(carScheduleId).val() + "' " +
                ",'ScheduleDate':'" + ScheduleDate + "' " +
                ",'CarID':'" + $("#tb_carId").val() + "' " +
                ",'RouteID':'" + $(id).val() + "' " +
                ",'RequestID':'" + get_current_user_id() + "' " +
                " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d.toString().split('~')[0] == "Success") {
                    $(carScheduleId).val(data.d.toString().split('~')[1]);
                    ShowSuccessMessage("Saved.");
                    scrollToDiv('#tab-main');

                }

            },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

            }
        });        
}

function Select_Route(count, ScheduleDate) {
    var id = "#ddl_route_" + count;
    if ($(id).val() == "delete") {
        DeleteCarScheduleRoute(count);
    }
    else {
        saveCarScheduleRoute(count, ScheduleDate);
    }
}

function DeleteCarScheduleRoute(count) {
    var carScheduleId = "#hf_car_sh_route_id_" + count;
        Pace.start();
        $.ajax({
            url: baseUrl() + "WebServices/WebService_CarScheduleRoute.asmx/DeleteCarScheduleRoute",
            data: "{ " +
                "'CarScheduleID':'" + $(carScheduleId).val() + "' " +
                ",'user_id':'" + get_current_user_id() + "' " +
                ",'RequestID':'" + get_current_user_id() + "' " +
                " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d.toString().split('~')[0] == "Success") {
                    ShowSuccessMessage("Deleted.");
                }
                else {
                    ShowBoxMessage("Oops, we can't save. " + data.d.toString().split('~')[1]);
                }

            },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

            }
    });
}