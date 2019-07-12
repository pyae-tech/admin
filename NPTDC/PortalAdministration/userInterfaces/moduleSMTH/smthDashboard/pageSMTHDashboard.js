$('title').html(get_current_organization_title() + "Dashboard");
$('#menu_sale').addClass('active-sub');
$('#menu_sale_group').addClass('in');
$('#menu_sale_Dashboard').addClass('active-link');

Load_CustomerGroup();
Load_TypeofTower();
getFuelData();

//function Search() {
//    getFuelData();
//}
function Load_CustomerGroup() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_CustomerGroup.asmx/GetAllCustomerGroupJson",
        data: JSON.stringify({
            search_text: $("#tb_search_text").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                $("#dx_customergroup").dxLookup({
                    items: result,
                    showClearButton: true,
                    valueExpr: 'CustomerGroupID',
                    displayExpr: function (item) {
                        if (!item) {
                            return "";
                        }

                        return item.GroupName;
                    },
                    placeholder: "Select CustomerGroup",

                    showPopupTitle: false,
                    onValueChanged: function (e) {
                        if (e.value === "null" || e.value == null) {
                            getFuelData();
                        }
                        else {
                            getFuelData('search_CusromerGroup');
                        }


                    }


                });
              

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
var dupes = {};
var singles = [];
function Load_TypeofTower() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Customer.asmx/GetAllTypeOfTowerJSON",
        data: "{ " +
            "'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                $.each(result, function (i, el) {

                    if (!dupes[el.ShortCode1]) {
                        dupes[el.ShortCode1] = true;
                        if ([el.ShortCode1] != "" && [el.ShortCode1] != "-") {
                            singles.push(el);
                        }
                    }
                });
                
                if (singles != "") {
                    $("#ddl_typeoftower").dxLookup({
                        items: singles,
                        showClearButton: true,
                        valueExpr: 'ShortCode1',
                        displayExpr: function (item) {
                            if (!item) {
                                return "";
                            }

                            return item.ShortCode1;
                        },
                        placeholder: "Select Tower Type",

                        showPopupTitle: false,
                        onValueChanged: function (e) {
                            if (e.value === "null" || e.value == null) {
                                getFuelData();
                            }
                            else {
                                getFuelData('search_Tower');
                            }


                        }


                    });
                }


              
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });


}

var hasData = false;
function getFuelData(status) {
    $('#panel_list_background').loading();
    var sh_Group_list = "";
    var sh_tower_list = "";
    if (status == "search_CusromerGroup") {
        sh_Group_list = $("#dx_customergroup").dxLookup("instance").option('value');
       
    }
    if (status =="search_Tower") {
        sh_tower_list = $("#ddl_typeoftower").dxLookup("instance").option('value');
    }
    Pace.start();
    $.ajax({
      
        url: baseUrl() + "WebServices/WebService_ServiceDashboard.asmx/getFuelData",
        data: "{ " +
            "'CustomerGroupID':'" + sh_Group_list + "' " +
            ",'TypeofTower':'" +  sh_tower_list + "' " +
            ",'orgID':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null && data.d != "Error~There is no Data") {
                hasData = true;
                var result = JSON.parse(data.d);
                BindChart(result);
                LoadMap(result.Locations);
                $('#panel_list_background').loading('stop');
            }
            else {
                $('#panel_list_background').loading('stop');
                ShowErrorBoxMessage("No Data");
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function BindChart(result) {

    //var result = JSON.parse(data);

    $("#pie").dxPieChart({
        //type: "doughnut", red / yellow /green
        palette: ['#e03347', '#c0a631', '#60c867'],
        dataSource: result.ChartData,
        title: {
            text: "Fuel (%) of Sites",
            subtitle: {
                text: "(in all regions )"
            }
        },
        tooltip: {
            enabled: true,
            format: "percent",
            customizeTooltip: function () {
                return { text: this.argumentText + ": " + this.percentText };
            }
        },
        onPointClick: function (arg) {
            arg.target.select();
            ShowTableFuel(arg.target.data.label, result);
        },
        legend: {
            orientation: "horizontal",
            itemTextPosition: "right",
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            columnCount: 4
        },
        //legend: {
        //    //horizontalAlignment: "left",
        //    verticalAlignment: "top",
        //    margin: 0
        //},
        "export": {
            enabled: true
        },
        series: [{
            argumentField: "label",
            valueField: "val",
            label: {
                visible: true,
                font: {
                    size: 16
                },
                connector: {
                    visible: true,
                    width: 0.5
                },
                position: "columns",
                customizeText: function (arg) {
                    return arg.percentText;
                }
            }
        }]
    });
}
function ShowTableFuel(data, result) {
    if (data == "High") {      
        BindTableFuel(result.High);
        LoadMap(result.High_Locations);
       
    }
    else if (data == "Medium") {
      //  $(".dx-datagrid").css("background-color", "#c0a631"); 
        BindTableFuel(result.Medium);
        LoadMap(result.Medium_Locations);
        
    }
    else {
        BindTableFuel(result.Low);
        LoadMap(result.Low_Locations);
     //   $(".dx-datagrid").css("background-color", "#e03347"); 
    }
   
}
function BindTableFuel(fuelData) {
    $("#gridContainer").dxDataGrid({
        dataSource: fuelData,
        showBorders: true,
        "export": {
            enabled: true,
            fileName: "FuelPutIn",
            allowExportSelectedData: false
        },
        headerFilter: {
            visible: true
        },
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true
        },
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnResizingMode: "nextColumn",
        columnMinWidth: 50,
        columnAutoWidth: true,
        columns: [
            {
                caption: "Site Code",
                dataField: "CustomerNameEng"              
            },
            {
                caption: "Fuel Level",
                dataField: "CurrentLevelLiter"
            }, {
                caption: "Region",
                dataField: "GroupName"                
            },
            {
                caption: "Address",
                dataField: "Address",
                allowHeaderFiltering: false
            }]
    });

}
//#region Browse File
var fileArray = [];
var fileName = "";
function readURL(input) {
    var val = input.value;
     fileName = val.substr(val.lastIndexOf("\\") + 1, val.length);

    if (fileName.substr(fileName.lastIndexOf(".") + 1, fileName.length) == "xlsx" || "xls" || "xlx" || "All Files") {
        var files = $("#f_UploadFile").get(0).files;

        if (files.length > 0) {
            // filedata.append("UploadedFiles[]", files[0]);
            fileArray.push(files);
            UploadFile(fileName);           
            $('#btn_imported').removeAttr('disabled');
        }
    }
    else {
        ShowErrorBoxMessage("File Input mismatch!");
    }
}


//#endregion

//#region Upload File
function UploadFile(fileName) {

    var filedata = new FormData();
    for (i = 0; i < fileArray.length; i++) {
        var filename = "UploadedFile" + i;
        filedata.append(filename, fileArray[i][0]);
    }
    filedata.append("UserID", get_current_user_id());
    filedata.append("OrgID", get_current_user_org_id());

    fileArray = [];

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "SMTHDashboard", true);
    xhr.send(filedata);
    xhr.onreadystatechange = function (data) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert('' + fileName + '  is Save Successfully.');
        }
        else if (xhr.status == 404) {
            ShowErrorBoxMessage("File cannot Imported!.");          
        }          
    };
}

//#endregion Upload File
function ImportExcel() {   
    $('#panel_list_background').loading();
    var fName = fileName.split('.')[0] + "_" + get_current_user_id()+"." + fileName.split('.')[1];
    Pace.start();
    $.ajax({

      
        url: baseUrl() + "WebServices/WebService_ServiceDashboard.asmx/ImportFuelDataFromExcel",
        data: "{ " +
            "'filename':'" + fName + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (data.d.toString().split('~')[0] == "Success") {
                    ShowErrorBoxMessage(data.d.toString().split('~')[1]);                   
                    fileName = "";
                    getFuelData();
                    $('#panel_list_background').loading('stop');
                }
                else {
                    alert("Oops. " + data.d.toString().split('~')[1]);
                    $('#panel_list_background').loading('stop');
                }
                $('#panel_list_background').loading('stop');
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_list_background').loading('stop');
        }
    });
}

function CheckAndDeleteOldRecord() {
    if (hasData == true) {
        ShowConfirmation("Old Data will lost.Do you want to continue?", "DeleteOldData");
    }
    else {
        ImportExcel();
    }
}
function DeleteOldData() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ServiceDashboard.asmx/DeleteOldData",
        data: "{ " +
              "'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                ImportExcel();               
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
/* ---------------------------------------------------------------------- */
/*	Contact Map
/* ---------------------------------------------------------------------- */
var lattitue = 0;
var longitude = 0;
function LoadMap(data) {
  
    ClearMap();

    var mapContainer = $('.map');
    //var locations = [{
    //    latLng: [21.956896, 95.273394], data: "Tower1", options: { icon: "" }
    //},
    //{ latLng: [21.949747, 96.091947], data: "Tower2", options: { icon: "../../../img/all_red_tower.png" } },
    //{ latLng: [23.198770, 95.520200], data: "Tower3", options: { icon: "../../../img/all_red_tower.png" } },
   //];
    var center = [22.119796, 95.153156];
  
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
            values: data,
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
