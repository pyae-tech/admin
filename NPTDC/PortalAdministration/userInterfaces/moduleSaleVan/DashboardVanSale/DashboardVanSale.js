$('title').html(get_current_organization_title() + "Dashboard");
//test

$('#menu_salevan').addClass('active-sub');
$('#menu_salevan_group').addClass('in');
$('#menu_salevan_Dashboard').addClass('active-link');

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");
//first comment by WPP for VSTS
$("#tab-main").tabs();

var d = new Date();

var month = d.getMonth() + 1;
var day = d.getDate();

var output = d.getFullYear() + '/' +
    (month < 10 ? '0' : '') + month + '/' +
    (day < 10 ? '0' : '') + day;
var x = setInterval(function () {
    if ($("#tb_search_from_date").val() == output)
    load_Ways();
}, 50000);



$("#tb_search_from_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_search_from_date').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
        load_Ways();
    }

});


$("#tb_search_to_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_search_to_date').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
        load_Ways();
    }
});

load_Ways();
function load_Ways()
{
    $("#showMap").css('display', 'none');
    $('#progessbar_list').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Ways.asmx/GetAllWayForDashboard",
        data: "{ " +
            "'from_date':'" + $("#tb_search_from_date").val() + "' " +
            ",'to_date':'" + $("#tb_search_to_date").val() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +           
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list(data.d);
            }
            $('#progessbar_list').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#progessbar_list').loading('stop');
        }
    });
}

function generate_list(records) {

    var allCardsCode = '';
    rowindex = 0;
    index = 0;
    $.each(records, function (key, val) {
        rowindex++;

        the_template = $('#template_row').html();
            console.log(records);
        allCardsCode += the_template.replace()
            .replace("[RouteID]", records[key]['RouteID'])
            .replace("[count]", rowindex)
            .replace("[count]", rowindex)
            .replace("[WayID]", records[key]['WayID'])
            .replace("[WayID]", records[key]['WayID'])
            .replace("[RouteID]", records[key]['RouteID'])
            .replace("[WayNo]", records[key]['WayNo'])
            .replace("[CarNo]", records[key]['CarNo'])
            .replace("[CarSaleMan]", records[key]['CarSaleMan'])
            .replace("[index]", rowindex)
            .replace("[index]", rowindex)
            .replace("[index]", rowindex)
            .replace("[index]", rowindex)
            .replace("[index]", rowindex)
            .replace("[index]", rowindex)
            .replace("[startShopName]", records[key]['StartShopName'])
            .replace("[finishedPercent]", records[key]['FinishedShopCount'])
            .replace("[currentShopName]", records[key]['CurrentShopName'])
            .replace("[remainPercent]", records[key]['RemainShopCount'])
            .replace("[endShopName]", records[key]['EndShopName']);



    }); 
    
    $('#progessbar_list').empty();
    $('#progessbar_list').append(allCardsCode);
    $.each(records, function (key, val) {
        index++;
        $('#finished_' + index).css({ "width": records[key]['FinishedShopPercent'] + "%" });
        $('#finished_' + index).css({ "max-width": records[key]['FinishedShopPercent'] + "%" });
        $('#remain_' + index).css({ "width": records[key]['RemainShopPercent'] + "%" });
        $('#remain_' + index).css({ "max-width": records[key]['RemainShopPercent'] + "%" });
        $('#finished_shop_' + index).css({ "margin-left": records[key]['FinishedShopPercent'] + "%" });
        $('#finished_shop_icon_' + index).css({ "margin-left": records[key]['FinishedShopPercent'] + "%" });
        
    });
    if (rowindex == 0) {      
            $('#img_no_data').show();
        } else {
            $('#img_no_data').hide();
        }
}

function ViewRouteOnMap(way_id,routeid,count,car_name) {
    $.ajax({
       
        //url: baseUrl() + "WebServices/WebService_RouteCustomer.asmx/GetCustomersByRoute",
        //data: "{ " +
        //    "'route_id':'" + routeid + "' " +
        //    ",'RequestID':'" + get_current_user_id() + "' " +
        //    " }",
        url: baseUrl() + "WebServices/WebService_Ways.asmx/GetShopListOnWay",
        data: "{ " +
            "'way_id':'" + way_id + "' " +
            ",'route_id':'" + routeid + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var locations = [];
                var center = [];
                var finishes = []; var remains = [];
                $.each(data.d.AllShop, function (key, val) {
                    if (key == 1) {
                        if (data.d.AllShop[key]["User_Lat"] != "" && data.d.AllShop[key]["User_Lon"] != "") {
                            center.push(data.d.AllShop[key]["User_Lat"], data.d.AllShop[key]["User_Lon"]);
                        }
                    }
                    if (key > 0) {
                        if (data.d.AllShop[key]["User_Lat"] != "" && data.d.AllShop[key]["User_Lon"] != "") {
                            locations.push({ latLng: [data.d.AllShop[key]["User_Lat"], data.d.AllShop[key]["User_Lon"]], data: data.d.AllShop[key]["CustomerNameEng"] });

                        }
                    }
                });
                if (data.d.AllFinishedShop.length > 0) {
                    $.each(data.d.AllFinishedShop, function (key, val) {
                        if (data.d.AllFinishedShop[key]["User_Lat"] != "" && data.d.AllFinishedShop[key]["User_Lon"] != "") {
                            finishes.push({ latLng: [data.d.AllFinishedShop[key]["User_Lat"], data.d.AllFinishedShop[key]["User_Lon"]], data: data.d.AllFinishedShop[key]["CustomerNameEng"] });
                        }
                    });
                }
                else {
                    finishes.push({ latLng: ["", ""], data: "" });
                }
                
                LoadMap(locations, center, finishes, count, car_name);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function GoToWaySale(wayid, routeid) {
    window.open('way?id=' + wayid + '&rid=' + routeid, '_blank');
}

function GetFinishedShop(way_id, routeid, record) {
    $.ajax({
        //GetFinishShopOnWay(string way_id, string route_id, string RequestID)
        url: baseUrl() + "WebServices/WebService_Ways.asmx/GetFinishShopOnWay",
        data: "{ " +
            "'way_id':'" + way_id + "' " +
            ",'route_id':'" + routeid + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
               
                LoadMap(data.d, count);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
// Map 
// =================================================================
function LoadMap(locations, center, finishes, count,car_name) {
    $("#car_title").html(car_name);
    $("#showMap").css('display', 'block');
    CheckAll(count);
    ClearMap();
    
    var mapContainer = $('.map');
    //var locations = [];
    //var center = [];
    //$.each(records, function (key, val) {
    //    if (key == 1) {
    //        if (records[key]["User_Lat"] != "" && records[key]["User_Lon"] != "") {
    //            center.push(records[key]["User_Lat"], records[key]["User_Lon"]);
    //        }
    //    }
    //    if (key > 0) {
    //        if (records[key]["User_Lat"] != "" && records[key]["User_Lon"] != "") {
    //            locations.push({ latLng: [records[key]["User_Lat"], records[key]["User_Lon"]], data: records[key]["CustomerNameEng"] });

    //        }}
    //});
    mapContainer.gmap3({
        clear: {
            name: ["marker", "circle"],
            last: true
        }
    });

    mapContainer.gmap3({
        map: {
            options: {
                center: center,
                scrollwheel: true,
                gestureHandling: 'greedy'
            }
        },
        marker: {
            values: locations,
            options: {
                draggable: false

            },
            events: {
                mouseover: function (marker, event, context) {
                    var map = $(this).gmap3("get"),
                        infowindow = $(this).gmap3({ get: { name: "infowindow" } });
                    if (infowindow) {
                        infowindow.open(map, marker);
                        infowindow.setContent(context.data);
                    } else {
                        $(this).gmap3({
                            infowindow: {
                                anchor: marker,
                                options: { content: context.data }
                            }
                        });
                    }
                },
                mouseout: function () {
                    var infowindow = $(this).gmap3({ get: { name: "infowindow" } });
                    if (infowindow) {
                        infowindow.close();
                    }
                }

            }
        },
        polyline: {
            options: {
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                path: finishes
            }
        }
    }, "autofit");

  
}

function ClearMap() {
    opts = {};
    $('.map').gmap3({ clear: opts });
    $(document).scrollTop($(document).height());
}

function CheckAll(count) {
    $('.gomap').css('color', '');
    $('#' + count).css('color', '#1d4ed8');
}

$("#btn_search_all_dates").change(function () {
    load_Ways();
});

function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[0], parts[1] - 1, parts[2])
}
function change_date(status) {
    if (status == 'next') {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).add(1, 'day').format('YYYY/MM/DD');
        newtodate = moment(toDate($("#tb_search_to_date").val())).add(1, 'day').format('YYYY/MM/DD');
    }
    else {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).subtract(1, 'day').format('YYYY/MM/DD');
        newtodate = moment(toDate($("#tb_search_to_date").val())).subtract(1, 'day').format('YYYY/MM/DD');
    }
    $('#tb_search_from_date').val(newfromdate);
    $('#tb_search_from_date').periodpicker('change');
    $('#tb_search_to_date').val(newtodate);
    $('#tb_search_to_date').periodpicker('change');
    load_Ways();
}
