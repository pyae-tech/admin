$('title').html(get_current_organization_title() + "Show Case");

$('#menu_sale').addClass('active-sub');
$('#menu_sale_group').addClass('in');
$('#menu_service_showcase').addClass('active-link');

$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

$("#tb_search_from_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_search_from_date').periodpicker({
    todayButton: true,
    norange: true,
    cells: [1, 2],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    format: "DD/MM/YYYY"

});
$('#tb_search_from_date').periodpicker('change');


function GetDetailScoutInfoById(ID) {
    window.open('scoutInfoDetail?id=' + ID, '_blank');
}

Load_CustomerGroup();
Load_TypeofTower();
LoadMap();
function Load_CustomerGroup() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_CustomerGroup.asmx/GetAllCustomerGroup",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#ddl_customergroup").empty();
                $("#ddl_customergroup").append("<option value=''>" + "Choose Customer Group..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#ddl_customergroup").append("<option value=" + data.d[key]['CustomerGroupID'] + ">" + data.d[key]['GroupName'] + "</option>");
                });
                $('#ddl_customergroup').chosen().change();
                $("#ddl_customergroup_chosen").css({ "width": "100%" });
                if ($('#hf_customergroup').val() != "") {
                    $('#ddl_customergroup').val($('#hf_customergroup').val()).trigger("chosen:updated");
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var towerList = [];
function Load_TypeofTower() {
    // parent_child_customergroup = get_current_CustomerGroupIDs() + get_current_CustomerGroup_id();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Customer.asmx/GetAllTypeOfTower",
        data: "{ " +
            "'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#ddl_typeoftower").empty();
                $("#ddl_typeoftower").append("<option value=''>" + "Choose Tower Type..." + "</option>");
                $.each(data.d, function (key, val) {
                    towerList.push(data.d[key]['ShortCode1']);
                });
                var unique = towerList.filter(onlyUnique);
                if (unique != "") {

                    $("#ddl_typeoftower").empty();
                    $("#ddl_typeoftower").append("<option value=''>" + "Choose Tower Type..." + "</option>");
                    $.each(unique, function (key, val) {

                        if (unique[key] != "undefined") {
                            $("#ddl_typeoftower").append("<option value=" + unique[key] + ">" + unique[key] + "</option>");
                        }
                    });
                    $('#ddl_typeoftower').chosen().change();
                    $("#ddl_typeoftower_chosen").css({ "width": "100%" });
                    if ($('#hf_typeoftower').val() != "") {
                        $('#ddl_typeoftower').val($('#hf_typeoftower').val()).trigger("chosen:updated");
                    }
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });


}

function search() {


}

function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[0], parts[1] - 1, parts[2])
}
function change_date(status) {
    if (status == 'next')
        newdate = moment(toDate($("#tb_search_from_date").val())).add(1, 'day').format('YYYY/MM/DD');
    else
        newdate = moment(toDate($("#tb_search_from_date").val())).subtract(1, 'day').format('YYYY/MM/DD');
    $('#tb_search_from_date').val(newdate);
    $('#tb_search_from_date').periodpicker('change');
    Load_ScoutInfo_List();
}

function pageJump(control)//paginatin function
{
    $('#hf_current_page').val($(control).attr('actionPage'));
    Load_ScoutInfo_List();
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    Load_ScoutInfo_List();
}

/* ---------------------------------------------------------------------- */
/*	Contact Map
/* ---------------------------------------------------------------------- */
var lattitue = 0;
var longitude = 0;
function LoadMap() {
    ClearMap();

    var mapContainer = $('.map');
    var locations = [{
        latLng: [21.956896, 95.273394], data: "Tower1", options: {icon: "" }},
        { latLng: [21.949747, 96.091947], data: "Tower2", options: { icon: "../../../img/all_red_tower.png" }},
        { latLng: [23.198770, 95.520200], data: "Tower3", options: { icon: "../../../img/all_red_tower.png" } },
        { latLng: [21.907899, 95.967970], data: "Tower4", options: { icon: "../../../img/all_red_tower.png" } },
        { latLng: [22.576564, 95.702248], data: "Tower5", options: { icon: "../../../img/green_tower.png" } },
        { latLng: [22.031224, 96.485856], data: "Tower6", options: { icon: "../../../img/green_tower.png" } },
        { latLng: [22.119796, 95.153156], data: "Tower7", options: { icon: "../../../img/green_tower.png" }}
    ];
    var center = [22.119796, 95.153156]; 
    //$.each(records, function (key, val) {
        //if (key == 1) {]
        //    center.push(records[key]["User_Lat"], records[key]["User_Lon"]);
        //}
        //if (key > 0) {
        //    locations.push({ latLng: [records[key]["User_Lat"], records[key]["User_Lon"]], data: records[key]["CompanyName"] });
        //}
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
                draggable: false,
                //icon: 'https://maps.google.com/mapfiles/marker_green.png'

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