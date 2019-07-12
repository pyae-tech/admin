$('title').html(get_current_organization_title() + "Sacout Type");

$('#menu_marketing').addClass('active-sub');
$('#menu_marketing_group').addClass('in');
$('#menu_marketing_ScoutsMap').addClass('active-link');

$("#tab-main").tabs();

var startDate = new Date();

$("#tb_search_from_date").dxDateBox({
    applyValueMode: "useButtons",
    displayFormat: "yyyy/MM/dd",
    type: "date",
    value: new Date(),
    max: new Date(),
    min: new Date(1900, 0, 1),
    onValueChanged: function (data) {
        Load_ScoutInfo_List('search');
    }
});

$("#btn_search_all_dates").dxCheckBox({
    text: "Search On All Date",
    value: false,
    onValueChanged: function (data) {
        Load_ScoutInfo_List('search');
    }
});

//$("#tb_search_text").dxTextBox({
//    value: "",
//    height: "55px",
//    width: "55px",
//    placeholder:"Search Text",
//    onValueChanged: function (data) {
//        Load_ScoutInfo_List('search');
//    }
//});

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

function New_ScoutInfo() {
    window.open('scoutInfoDetail?id=', '_blank');
}

function GetDetailScoutInfoById(ID) {
    window.open('scoutInfoDetail?id=' + ID, '_blank');
}

Load_Township_List();
function Load_Township_List() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Township.asmx/GetAllScoutTownshipJson",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'CityID':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                $("#tb_TownshipName").dxLookup({
                    items: result,
                    showClearButton: true,
                    valueExpr: 'TownshipID',
                    displayExpr: function (item) {
                        if (!item) {
                            return "";
                        }

                        return item.TownshipNameEng;
                    },
                    placeholder: "Select Township",

                    showPopupTitle: false,
                    onValueChanged: function (e) {
                        if (e.value === "null" || e.value == null) {
                            Load_ScoutInfo_List('search');
                        }
                        else {
                            Load_ScoutInfo_List('search');
                        }


                    }


                });
                // restore_search();

            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });

}


Load_User_List();
function Load_User_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_User.asmx/GetAllUserByOrganizationJson",
        data: "{ " +
            "'orgId':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
               
                var result = JSON.parse(data.d);
                $("#tb_search_uploadedId").dxLookup({
                    items: result,
                    showClearButton: true,
                    valueExpr: 'UserID',
                    displayExpr: function (item) {
                        if (!item) {
                            return "";
                        }

                        return item.UserName;
                    },
                    placeholder: "Select Uploaded By",

                    showPopupTitle: false,
                    onValueChanged: function (e) {
                        if (e.value === "null" || e.value == null) {
                            Load_ScoutInfo_List('search');
                        }
                        else {
                            Load_ScoutInfo_List('search');
                        }


                    }


                });
                // restore_search();
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function ConvertDate(sdate) {
    const date = new Date(sdate);
    var month = date.getMonth() + 1;
    var dd = date.getDate();

    var output = date.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' + (dd < 10 ? '0' : '') + dd;
    return output;
}


Load_ScoutInfo_List();
function Load_ScoutInfo_List(status) {
    $("#page-content").loading();
    var townshipName = ""; var uploadby = ""; var search_All = false; var searchtext = "";
    var uploadon = ConvertDate(new Date());
    if (status == "search") {
        //searchtext = $("#tb_search_text").dxCheckBox("instance").option('value');
        search_All = $("#btn_search_all_dates").dxCheckBox("instance").option('value');
        uploadon = ConvertDate($("#tb_search_from_date").dxDateBox('instance').option('value'));
        townshipName = $("#tb_TownshipName").dxLookup("instance").option('value') == null ? "" : $("#tb_TownshipName").dxLookup("instance").option('value');
        uploadby = $("#tb_search_uploadedId").dxLookup("instance").option('value') == null ? "" : $("#tb_search_uploadedId").dxLookup("instance").option('value');
    }
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ScoutInfo.asmx/GetAllScoutInfoWithPaginationAtMap",
        data: "{ " +
            "'search_text':'" + searchtext+ "' " +
            ",'from_date':'" + uploadon + "' " +
            ",'township':'" + townshipName + "' " +
            ",'uploadby':'" + uploadby + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'orgId':'" + get_current_user_org_id() + "' " +
            ",'search_all_date':'" + search_All + "' " +
            
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
               // BindTable(data.d);
                LoadMap(data.d);
                $("#page-content").loading('stop');
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $("#page-content").loading('stop');
        }
    });
}


function generate_list(records) {

    var allCardsCode = '';
    rowindex = 0;
    $.each(records, function (key, val) {
        rowindex++;
     
            the_template = $('#template_row').html();
            console.log(records);
            var ScoutOn_date = JsonDateToFormat(records[key]["ScoutOn"], 'YYYYMMDDHHmmss');

            allCardsCode += the_template
                .replace("[ScoutID]", records[key]['ScoutID'])
                .replace("[ScoutNo]", records[key]['ScoutNo'])
                .replace("[TownshipName]", records[key]['TownshipNameEng'])
                .replace("[ScoutTypeNameEng]", records[key]['ScoutTypeNameZawGyi'])
                //.replace("[ContactPerson]", records[key]['ContactPerson'])
                .replace("[UploadByName]", records[key]['UploadByName'])
                .replace("[CompanyName]", records[key]['CompanyName'])
                .replace("[ScoutOnMoment]", moment(ScoutOn_date, "YYYYMMDDHHmmss").fromNow())
                .replace("[ScoutOn]", JsonDateToFormat(records[key]["ScoutOn"], 'DD-MM-YYYY HH:mm:ss'));
       

    });
    if (rowindex == 0) $('#panel_list').hide();
    else {
        $('#panel_list').show();
    }

    $('.list_count').html(rowindex);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);
}

function search() {
    Load_ScoutInfo_List();

}

/* ---------------------------------------------------------------------- */
/*	Contact Map
/* ---------------------------------------------------------------------- */
var lattitue = 0;;
var longitude = 0;
function LoadMap(records) {
    ClearMap();

    var mapContainer = $('.map');
    var locations = [];
    var center = [];
    $.each(records, function (key, val) {
        if (key == 1) {
            center.push(records[key]["User_Lat"], records[key]["User_Lon"]);
        }
        if (key > 0) {
            locations.push({ latLng: [records[key]["User_Lat"], records[key]["User_Lon"]], data: records[key]["CompanyName"] });
        }
    });
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
                draggable: false,

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
                },

            }
        }
    }, "autofit");

}

function ClearMap() {
    opts = {};
    $('.map').gmap3({ clear: opts });
}