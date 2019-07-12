$('title').html(get_current_organization_title() +  " Scout Information");


$('#menu_marketing').addClass('active-sub');
$('#menu_marketing_group').addClass('in');
$('#menu_marketing_DailyScouts').addClass('active-link');


$("#tab-main").tabs();

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

//$("#tb_search_from_date").val(moment(new Date()).format('YYYY.MM.DD'));
//$('#tb_search_from_date').periodpicker({

//    norange: true,
//    cells: [1, 1],
//    okButton: false,
//    hideOnBlur: true,
//    hideAfterSelect: true,
//    formatDate: 'YYYY/MM/DD',
//    onAfterHide: function () {
//        Load_List();
//    }

//});
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

Load_User_List();
Load_Township_List();

//#region GetScoutInformation
function GetDetailScoutInfoById(ID) {
    window.open('scoutInfoDetail?id=' + ID, '_blank');
}
//#endregion 
function ConvertDate(sdate) {
    const date = new Date(sdate);
    var month = date.getMonth() + 1;
    var dd = date.getDate();

    var output = date.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' + (dd < 10 ? '0' : '') + dd;
    return output;
}
//#region ScoutInfo_List
Load_ScoutInfo_List('');
function Load_ScoutInfo_List(status) {
    $("#infoList").loading();
    var townshipName = ""; var uploadby = ""; var search_All = false;
    var uploadon = ConvertDate(new Date());
    if (status == "search") {
        search_All = $("#btn_search_all_dates").dxCheckBox("instance").option('value');
        uploadon = ConvertDate($("#tb_search_from_date").dxDateBox('instance').option('value'));
        townshipName = $("#tb_TownshipName").dxLookup("instance").option('value') == null ? "" : $("#tb_TownshipName").dxLookup("instance").option('value');
        uploadby = $("#tb_search_uploadedId").dxLookup("instance").option('value') == null ? "" : $("#tb_search_uploadedId").dxLookup("instance").option('value');
    }
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ScoutInfo.asmx/GetAllScoutInfoJson",
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'from_date':'" + uploadon + "' " +
            ",'township':'" + townshipName + "' " +
            ",'uploadby':'" + uploadby + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'search_all_date':'" + search_All + "' " +
            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                BindTable(data.d);
                $("#infoList").loading('stop');
                //generate_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $("#infoList").loading('stop');
        }
    });
}
var Columns = [    
    {
        caption: "Scout On",
        dataField: "ScoutOn",
        dataType: "date",
        format: 'MM/dd/yyyy hh:mm tt',
        allowHeaderFiltering: false,
        calculateDisplayValue: function (rowData) { // combines display values
            return JsonDateToFormat(rowData.ScoutOn, 'DD-MM-YYYY HH:mm:ss') + " (" + moment(JsonDateToFormat(rowData.ScoutOn, 'YYYYMMDDHHmmss'), "YYYYMMDDHHmmss").fromNow()+ ")";
        }
    },
    {
        caption: "Township",
        dataField: "TownshipNameEng"
       
    },
    {
        caption: "Scout Type",
        dataField: "ScoutTypeNameEng"

    },
    {
        caption: "Company",
        dataField: "CompanyName"

    },
    {
        caption: "Uploaded By",
        dataField: "UploadByName"

    }];
function BindTable(data) {
  
    var result = JSON.parse(data);

    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: result,
        showBorders: true,
        //keyExpr: "ServiceID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "Scout List",
            allowExportSelectedData: false
        },
        //filterRow: {
        //    visible: true,
        //    applyFilter: "auto"
        //},
        headerFilter: {
            visible: true
        },
        hoverStateEnabled: true,
        paging: {
            pageSize: 20
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [10, 20, 30, 40],
            showInfo: true
        },
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnResizingMode: "nextColumn",
        columnMinWidth: 50,
        columnAutoWidth: true,
        grouping: {
            autoExpandAll: true
        },
        searchPanel: {
            visible: true
        },
        groupPanel: {
            visible: true
        },
        columns: Columns,
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                GetDetailScoutInfoById(data.ScoutID);
            }
        }
    }).dxDataGrid("instance");

    $("#autoExpand").dxCheckBox({
        value: true,
        text: "Expand All Groups",
        onValueChanged: function (data) {
            dataGrid.option("grouping.autoExpandAll", data.value);
        }
    });
   
}

function generate_list(records) {

    var allCardsCode = '';
    rowindex = 0;
    $.each(records, function (key, val) {
        rowindex++;
        if (rowindex == 1) {//paginatin function
            paginationInfos = records[key].split('~');
            $('.lbl_record_count').html("Total Records : " + paginationInfos[0] + ", Page: ");
            $('.tb_current_page').val(paginationInfos[2]);
            $('.lbl_page_count').html(" of " + paginationInfos[1] + " pages");
            $('#hf_current_page').val(paginationInfos[2]);
            $('.btn_pagination_next').hide();
            $('.btn_pagination_previous').hide();
            if (paginationInfos[4] == 'y') {
                $('.btn_pagination_next').attr('actionPage', parseInt(paginationInfos[2]) + 1);
                $('.btn_pagination_next').show();
            }
            if (paginationInfos[3] == 'y') {
                $('.btn_pagination_previous').attr('actionPage', parseInt(paginationInfos[2]) - 1);
                $('.btn_pagination_previous').show();
            }
        } else {
            the_template = $('#template_row').html();
            console.log(records);
            var ScoutOn_date = JsonDateToFormat(records[key]["ScoutOn"], 'YYYYMMDDHHmmss');

            allCardsCode += the_template
                .replace("[ScoutID]", records[key]['ScoutID'])
                .replace("[ScoutNo]", records[key]['ScoutNo'])
                .replace("[TownshipName]", records[key]['TownshipNameEng'])
                .replace("[ScoutTypeNameEng]", records[key]['ScoutTypeNameZawGyi'])
                .replace("[UploadByName]", records[key]['UploadByName'])
                .replace("[CompanyName]", records[key]['CompanyName'])
                .replace("[ScoutOnMoment]", moment(ScoutOn_date, "YYYYMMDDHHmmss").fromNow())
                .replace("[ScoutOn]", JsonDateToFormat(records[key]["ScoutOn"], 'DD-MM-YYYY HH:mm:ss'));
        }

    });
    if (rowindex == 0) $('#panel_list').hide();
    else {
        $('#panel_list').show();
    }

    $('.list_count').html(rowindex - 1);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);
}

//#endregion ScoutInfo 

 


 


 

function search() {
    Load_ScoutInfo_List('search');
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}






function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[0], parts[1] - 1, parts[2])
}
function change_date(status) {
    if (status == 'next') {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).add(1, 'day').format('YYYY/MM/DD');
    }
    else {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).subtract(1, 'day').format('YYYY/MM/DD');
    }
    $('#tb_search_from_date').val(newfromdate);
    $('#tb_search_from_date').periodpicker('change');
    Load_List();
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

//#region Township Selection

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
//            }

//        },
//        error: function (xhr, msg) {
//            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

//        }
//    });
//}
//#endregion

//#region UserList Selection


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
                    //$("#tb_search_uploadedId").empty();
                    //$("#tb_search_uploadedId").append("<option value=''>" + "Choose Uploaded By" + "</option>");
                    //$.each(data.d, function (key, val) {
                    //    $("#tb_search_uploadedId").append("<option value=" + data.d[key]['UserID'] + ">" + data.d[key]['UserName'] + "</option>");
                    //});
                    //$('#tb_search_uploadedId').chosen().change();
                    //if ($('#hf_customergroup').val() != "") {
                    //    $('#tb_TownshipName').val($('#tb_TownshipName').val()).trigger("chosen:updated");
                    //}

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
//#endregion 
function NewScoutInfo() {
    window.open('scoutInfoDetail?id=', '_blank');
}
 
 