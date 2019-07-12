$('title').html(get_current_organization_title() + "Scout Information");


$('#menu_marketing').addClass('active-sub');
$('#menu_marketing_group').addClass('in');
$('#menu_marketing_scoutInfo').addClass('active-link');

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetRecord(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");



$("#dtp_ScoutOn_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#dtp_ScoutOn_date').periodpicker({
    todayButton: true,
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    format: "DD/MM/YYYY"

});
$('#dtp_ScoutOn_date').periodpicker('change');

$("#tb_UploadedOn").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_UploadedOn').periodpicker({
    todayButton: true,
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    format: "DD/MM/YYYY"

});
$('#tb_UploadedOn').periodpicker('change');

//#region Delete

function DeleteRecordConfirmation() {

    ShowConfirmation("Are you sure you want to delete?", "DeleteScoutInfo");
}

function DeleteScoutInfo() {
    //Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ScoutInfo.asmx/DeleteScoutInfo",
        data: "{ " +
            "'ScoutID':'" + $("#tb_ScoutID").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {

                ShowSuccessMessage("Deleted.");
                LoadNew();
                Load_ScoutInfo_List();
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
//#endregion Delete

//#region Save
function AddScoutInfo() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ScoutInfo.asmx/SaveScoutInfo",

        data: "{ " +

            "'ScoutID':'" + $('#tb_ScoutID').val() + "' " +
            ",'TownshipID':'" + $('#tb_TownshipName').val() + "' " +
            ",'ScoutTypeID':'" + $('#tb_ScoutType').val() + "' " +
            ",'ContactPerson':'" + $('#tb_ContactPerson').val() + "' " +
            ",'ContactInformation':'" + $('#tb_ContactInformation').val() + "' " +
            ",'ContactAddress':'" + $('#tb_ContactAddress').val() + "' " +
            ",'CompanyName':'" + $('#tb_CompanyName').val() + "' " +
            ",'ScoutOn':'" + $('#dtp_ScoutOn_date').val() + "' " +
            ",'ScoutNo':'" + $('#tb_ScoutNo').val() + "' " +
            ",'UploadedBy':'" + $('#tb_uploadby').val() + "' " +
            ",'UploadedOn':'" + $('#tb_UploadedOn').val() + "' " +
            ",'Remark':'" + $('#tb_Remark').val() + "' " +
            ",'GPS_Lat':'" + $('#tb_Gps_Lat').val() + "' " +
            ",'GPS_Lon':'" + $('#tb_GPS_Lon').val() + "' " +
            ",'Cell_Lat':'" + $('#tb_Cell_Lat').val() + "' " +
            ",'Cell_Lon':'" + $('#tb_Cell_Lon').val() + "' " +
            ",'User_Lat':'" + $('#tb_User_Lat').val() + "' " +
            ",'User_Lon':'" + $('#tb_User_Lon').val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data.d.toString().split('~')[0] == "Success") {
                $('#tb_ScoutID').val(data.d.toString().split('~')[1]);
                $('#tb_ScoutNo').val(data.d.toString().split('~')[2]);
                ShowSuccessMessage("Saved.");
                Load_ScoutInfo_List();
                LoadMap();
            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });
}

//#endregion

//#region New Record
function LoadNew() {

    $('#tb_ScoutID').val("");
    $('#tb_ScoutNo').val("");
    $("#dtp_ScoutOn_date").val(moment(new Date()).format('YYYY/MM/DD'));
    $('#dtp_ScoutOn_date').periodpicker({
        todayButton: true,
        norange: true,
        cells: [1, 2],
        okButton: false,
        hideOnBlur: true,
        hideAfterSelect: true
    });
    $('#dtp_ScoutOn_date').periodpicker('change');
    $('#hf_scouttypeid').val("");
    $('#tb_ScoutType').val("").trigger("chosen:updated");
    $('#hf_TownshipID').val("");
    $('#tb_TownshipName').val("").trigger("chosen:updated");
    $('#hf_uploadid').val("");
    $('#tb_uploadby').val("").trigger("chosen:updated");
    

    $("#tb_UploadedOn").val(moment(new Date()).format('YYYY/MM/DD'));
    $('#tb_UploadedOn').periodpicker({
        todayButton: true,
        norange: true,
        cells: [1, 2],
        okButton: false,
        hideOnBlur: true,
        hideAfterSelect: true
    });
    $('#tb_UploadedOn').periodpicker('change');
    $('#tb_Gps_Lat').val("");
    $('#tb_GPS_Lon').val("");
    $('#tb_Cell_Lat').val("");
    $('#tb_Cell_Lon').val("");
    $('#tb_User_Lat').val("");
    $('#tb_User_Lon').val("");
    $('#tb_ContactPerson').val("");
    $('#tb_CompanyName').val("");

    $('#tb_ContactInformation').val("");
    $('#tb_ContactAddress').val("");
    $('#tb_Remark').val("");
    $("#scoutInfoNo").html("New Scout Information");
    //Comment-------------------------
    New_Comments();
    //Comment------------------------
    LoadMap();
}
//#endregion



//#region Load Record
function GetRecord(id) {


    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ScoutInfo.asmx/GetDetailScoutInfoById",
        data: "{ " +
            "'ScoutID':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $('#tb_ScoutID').val(data.d["ScoutID"]);
                $("#dtp_ScoutOn_date").val(moment(data.d["ScoutOn"]).format('YYYY/MM/DD'));
                $('#dtp_ScoutOn_date').periodpicker({
                    todayButton: true,
                    norange: true,
                    cells: [1, 2],
                    okButton: false,
                    hideOnBlur: true,
                    hideAfterSelect: true
                });

                $('#dtp_ScoutOn_date').periodpicker('change');

                $("#hf_scouttypeid").val(data.d["ScoutTypeID"]);
                var scout_typeid = data.d["ScoutTypeID"];
                $("#tb_ScoutType").val(scout_typeid).trigger("chosen:updated");

                $("#hf_TownshipID").val(data.d["TownshipID"]);
                var township_id = data.d["TownshipID"];
                $("#tb_TownshipName").val(township_id).trigger("chosen:updated");

                $("#hf_uploadid").val(data.d["UploadedBy"]);
                var upload_id = data.d["UploadedBy"];
                $("#tb_UploadedBy").val(upload_id).trigger("chosen:updated");

              

        
                
                $("#tb_ContactPerson").val(data.d["ContactPerson"]);
                $("#tb_CompanyName").val(data.d["CompanyName"]);
              

                $("#tb_UploadedOn").val(moment(data.d["UploadedOn"]).format('YYYY/MM/DD'));
                $('#tb_UploadedOn').periodpicker({
                    todayButton: true,
                    norange: true,
                    cells: [1, 2],
                    okButton: false,
                    hideOnBlur: true,
                    hideAfterSelect: true
                });

                $('#tb_UploadedOn').periodpicker('change');
                var ScoutOn_date = JsonDateToFormat(data.d["ScoutOn"], 'YYYYMMDDHHmmss');
                $("#scout_on_moment").html("(" + moment(ScoutOn_date, "YYYYMMDDHHmmss").fromNow() + ")");
                var UploadedOn_date = JsonDateToFormat(data.d["UploadedOn"], 'YYYYMMDDHHmmss');
                $("#UploadedOn_moment").html("(" + moment(UploadedOn_date, "YYYYMMDDHHmmss").fromNow() + ")");
                $("#tb_Gps_Lat").val(data.d["GPS_Lat"]);
                $("#tb_GPS_Lon").val(data.d["GPS_Lon"]);
                $("#tb_Cell_Lat").val(data.d["Cell_Lat"]);
                $("#tb_Cell_Lon").val(data.d["Cell_Lon"]);
                $("#tb_User_Lat").val(data.d["User_Lat"]);
                $("#tb_User_Lon").val(data.d["User_Lon"]);
                $("#tb_ContactInformation").val(data.d["ContactInformation"]);
                $("#tb_ContactAddress").val(data.d["ContactAddress"]);
                $("#tb_Remark").val(data.d["Remark"]);
                var start_index = data.d["ScoutNo"].indexOf(" ");
                var scoutno = data.d["ScoutNo"].substring(start_index, data.d["ScoutNo"].lengh);
                $("#tb_ScoutNo").val(scoutno);
                $("#scoutInfoNo").html(scoutno);
                GetScoutImageByScoutID(data.d["ScoutID"]);
                $("#lbl_GPS").text("GPS:(" + data.d["GPS_Lat"] + ',' + data.d["GPS_Lon"] + ")");
                $("#lbl_Cell").text("Cell:(" + data.d["Cell_Lat"] + ',' + data.d["Cell_Lon"] + ")");
                $("#lbl_User").text("User:(" + data.d["User_Lat"] + ',' + data.d["User_Lon"] + ")");
                ShowSuccessMessage("Loaded.");

                //Comment-----------------------------------------
                request_comment_id = data.d["ScoutID"];
                request_comment_type = "ScoutInfo";
                Load_Comments();
                //-----------------------------------------------------
                LoadMap();
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
//#endregion

//#region Get Scout Image

function GetScoutImageByScoutID(id) {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ScoutInfo.asmx/GetScoutImageByScoutID",
        data: "{ " +
            "'ScoutID':'" + id + "' " +
            ",'Request_ID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                i = 0;
                $.each(data.d, function (key, val) {
                    addImage("http://bandaryae.com:82/CRM_ScoutImage/" + data.d[key]['ScoutImageName'], i, data.d[key]['ScoutImageName']);
                    i++;
                });
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
//#endregion

//#region Township List
//Load_Township_List();
//function Load_Township_List() {
//    Pace.start();
//    $.ajax({

//        url: baseUrl() + "WebServices/WebService_Township.asmx/GetAllTownship",
//        data: "{ " +
//            "'search_text':'" + "" + "' " +
//            ",'CityID':'" + "" + "' " +
//            ",'RequestID':'" + get_current_user_id() + "' " +
//            " }",
//        dataType: 'json',
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        success: function (data) {
//            if (data.d != null) {
//                $("#tb_TownshipName").empty();
//                $("#tb_TownshipName").append("<option value=''>" + "Choose Township" + "</option>");
//                $.each(data.d, function (key, val) {
//                    $("#tb_TownshipName").append("<option value=" + data.d[key]['TownshipID'] + ">" + data.d[key]['TownshipNameEng'] + "</option>");
//                });
//                $('#tb_TownshipName').chosen().change();
//                if ($('#hf_TownshipID').val() != "") {
//                    $('#tb_TownshipName').val($('#hf_TownshipID').val()).trigger("chosen:updated");
//                }
//            }

//        },
//        error: function (xhr, msg) {
//            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

//        }
//    });
//}
//#endregion

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
                           // getSMTHFuelPutInList();
                        }
                        else {
                           // getSMTHFuelPutInList('search');
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

//#region UserList Selection

Load_User_List();
function Load_User_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_User.asmx/GetAllUserByOrganization",
        data: "{ " +
            "'orgId':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (data.d != null) {
                    $("#tb_uploadby").empty();
                    $("#tb_uploadby").append("<option value=''>" + "Choose Uploaded By" + "</option>");
                    $.each(data.d, function (key, val) {
                        $("#tb_uploadby").append("<option value=" + data.d[key]['UserID'] + ">" + data.d[key]['UserName'] + "</option>");
                    });
                    $('#tb_uploadby').chosen().change();
                    if ($('#hf_uploadid').val() != "") {
                        $('#tb_uploadby').val($('#hf_uploadid').val()).trigger("chosen:updated");
                    }
                }

            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
//#endregion 

//#region Scout Type
Load_ScoutType_List();
function Load_ScoutType_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_ScoutType.asmx/GetAllSacout",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (data.d != null) {
                    $("#tb_ScoutType").empty();
                    $("#tb_ScoutType").append("<option value=''>" + "Choose ScoutType" + "</option>");
                    $.each(data.d, function (key, val) {
                        $("#tb_ScoutType").append("<option value=" + data.d[key]['ScoutTypeID'] + ">" + data.d[key]['ScoutTypeNameEng'] + "</option>");
                    });
                    $('#tb_ScoutType').chosen().change();
                    if ($('#hf_scouttypeid').val() != "") {
                        $('#tb_ScoutType').val($('#hf_scouttypeid').val()).trigger("chosen:updated");
                    }
                }

            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });

}
//#endregion

//#region LoadMap
var lattitue = 0;;
var longitude = 0;
function LoadMap(status) {

    var mapContainer = $('.map');

    var title3 = '"User::' + $('#tb_User_Lat').val() + ',' + $('#tb_User_Lon').val() + '"';
    var value_points = [{ latLng: [$('#tb_User_Lat').val(), $('#tb_User_Lon').val()], data: title3 }];

    if (status == 'cell') {
        var title1 = '"Cell::' + $('#tb_Cell_Lat').val() + ',' + $('#tb_Cell_Lon').val() + '"';
        value_points.push({ latLng: [$('#tb_Cell_Lat').val(), $('#tb_Cell_Lon').val()], data: title1 });
    }
    else if (status == 'gps') {
        var title2 = '"GPS::' + $('#tb_Gps_Lat').val() + ',' + $('#tb_GPS_Lon').val() + '"';
        value_points.push({ latLng: [$('#tb_Gps_Lat').val(), $('#tb_GPS_Lon').val()], data: title2 });
    }


    mapContainer.gmap3({
        map: {
            options: {
                center: [$('#tb_User_Lat').val(), $('#tb_User_Lon').val()],
                scrollwheel: true,
                zoom: 17,
                gestureHandling: 'greedy'
            }
        },
        marker: {
            values: value_points,
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
                }
            }
        }
    });

}
function ShowLocation(status) {
    LoadMap(status);
}
function addImage(source, index, name) {


    var Iname = "'" + name + "'";
    var id = '#img_slide_show_' + index;
    var a_append_id = '#h_slide_show_' + index;
    var a_id = "'h_slide_show_" + index + "'";
    var id_img = "'img_slide_show_" + index + "'";
    $('#showImage').append("<div class='col-md-2 img_slide_show'  style='width: 134px;height: 113px;' id=" + id_img + "></div>");
    var show_image = id_img + "," + Iname;
    var deleteImage = 'ShowImage(' + show_image + ');return false;';
    $(id).append("<a class='example-image-link'  href=" + source + " data-lightbox='example-2' data-title=" + Iname + "  id=" + a_id + " ></a>");

    var x = document.createElement("IMG");
    x.setAttribute("src", source);
    x.setAttribute("width", "100%");
    x.setAttribute("height", "100%");
    x.setAttribute("alt", "No Image");
    x.setAttribute("class", "pmo");
    //x.setAttribute("onclick", deleteImage);
    $(a_append_id).append(x);
}
//#endregion LoadMap

//#region ShowLocation
function ShowImage(image_id, image_name) {
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    expandImg.src = "http://192.168.1.117:8080/CRM_ScoutImage/" + image_name;
    imgText.innerHTML = image_name;
    expandImg.parentElement.style.display = "block";
}
//#endregion showlocation


















   


















    


