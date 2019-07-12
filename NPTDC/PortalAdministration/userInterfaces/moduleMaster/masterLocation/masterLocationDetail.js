$('title').html(get_current_organization_title() + "Warehouse");

$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_Warehouse').addClass('active-link');

$("#tab-main").tabs();

$('#tb_search_text').keyup(function (e) {
    Load_Location_List();
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetLocation(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

function GoToLog() {

    if ($("#tb_id").val() == "") {
        window.open('logs?id=', '_blank');
    } else {
        window.open('logs?id=' + $("#tb_id").val(), '_blank');
    }
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");


Load_Location_List();

////#region Listing
//function clearSearch() {
//    $('#tb_search_text').val('');
//    $('#tb_search_text1').val('');
//    Load_Location_List();
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");
//}
//function search() {

//    $('#tb_search_text').val();
//    $('#tb_search_text1').val();
//    Load_Location_List();
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");

//}

//function Load_Location_List() {
//    $('#panel_list_background').loading();
//    Pace.start();
//    $.ajax({

//        url: baseUrl() + "WebServices/WebService_Location.asmx/GetAllLocationWithPagination",
//        data: "{ " +
//        "'search_text':'" + $("#tb_search_text").val() + "' " +
//        ",'search_location':'" + $("#tb_search_text1").val() + "' " +
//        ",'RequestID':'" + get_current_user_id() + "' " +
//        ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
//        " }",
//        dataType: 'json',
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        success: function (data) {
//            if (data.d != null) {
//                generate_list(data.d);
//                $('#panel_list_background').loading('stop');
//            }
//        },
//        error: function (xhr, msg) {
//            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
//            $('#panel_list_background').loading('stop');
//        }
//    });
//}

//function generate_list(records) {
//    var allCardsCode = '';
//    rowindex = 0;

//    $.each(records, function (key, val) {
//        rowindex++;
//        the_template = $('#template_row').html();

//        if (rowindex == 1) {//paginatin function
//            paginationInfos = records[key].split('~');
//            $('.lbl_record_count').html("Total Records : " + paginationInfos[0] + ", Page: ");
//            $('.tb_current_page').val(paginationInfos[2]);
//            $('.lbl_page_count').html(" of " + paginationInfos[1] + " pages");
//            $('#hf_current_page').val(paginationInfos[2]);
//            $('.btn_pagination_next').hide();
//            $('.btn_pagination_previous').hide();
//            if (paginationInfos[4] == 'y') {
//                $('.btn_pagination_next').attr('actionPage', parseInt(paginationInfos[2]) + 1);
//                $('.btn_pagination_next').show();
//            }
//            if (paginationInfos[3] == 'y') {
//                $('.btn_pagination_previous').attr('actionPage', parseInt(paginationInfos[2]) - 1);
//                $('.btn_pagination_previous').show();
//            }
//        } else {

//            the_template = $('#template_row').html();


//            allCardsCode += the_template.replace()
//                .replace("[StockLocationID]", records[key]['StockLocationID'])
//                .replace("[LocCode]", records[key]['LocationCode'])
//                .replace("[LocName]", records[key]['LocationName'])
//                .replace("[LocContactInfo]", records[key]['ContactInfo']);
//        }

//    });
//    if (rowindex == 0) $('#panel_list').hide();
//    else $('#panel_list').show();



//    $('.list_count').html(rowindex - 1);
//    $('#table_list').empty();
//    $('#table_list').append(allCardsCode);



//}

//function pageJump(control)//paginatin function
//{
//    $('#hf_current_page').val($(control).attr('actionPage'));
//    Load_Location_List();
//}
//function pageJumpToThis()//paginatin function
//{
//    $('#hf_current_page').val($('.tb_current_page').val());
//    Load_Location_List();
//}

////#endregion

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_name1").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Location Code Needs To Be Filled"
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveLocation() {

    if (SaveRecordVerification() == false)
        return;
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Location.asmx/SaveLocation",
        data: "{ " +
        "'location_id':'" + $("#tb_id").val() + "' " +
        ",'user_id':'" + get_current_user_id() + "' " +
        ",'location_code':'" + $("#tb_name1").val() + "' " +
        ",'location_name':'" + $("#tb_name2").val() + "' " +
            ",'Loc_contactInfo':'" + $("#tb_code").val() + "' " +
            ",'loc_remark':'" + esc_quot($("#tb_description").val()) + "' " +
        //",'agentid':'" + $("#tb_agent").val() + "'" +
        ",'isdefaultLocation':'" + $("#cb_deflocation").is(":checked") + "'" +//checkbox
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                Load_Location_List();
                ShowSuccessMessage("Saved.");
                scrollToDiv('#tab-main');
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
    Pace.start();
    $("#tab_detail_header").html('Create New Location');
    $("#tb_id").val("");
    $("#tb_code").val("");
    $("#tb_name1").val("");
    $("#tb_name2").val("");
    $("#tb_description").val("");

    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");
    $("#cb_deflocation").prop("checked", false);
    
    $('#dialogBox_Detail_Form').modal('show');

    //for focus on adding new data
    $("#tb_name1").focus();

    //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_name1').focus();
    });
}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteLocation");
}
function DeleteLocation() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Location.asmx/DeleteLocation",
        data: "{ " +
        "'location_id':'" + $("#tb_id").val() + "' " +
        ",'user_id':'" + get_current_user_id() + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                LoadNew();
                Load_Location_List();
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

//#endregion

//#region Load Record
function GetLocation(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Location.asmx/GetLocation",
        data: "{ " +
        "'location_id':'" + id + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["StockLocationID"]);

                //$("#tab_detail_header").html(data.d["LocationCode"]);

                $("#tb_name1").val(data.d["LocationCode"]);
                $("#tb_name2").val(data.d["LocationName"]);
                $("#tb_code").val(data.d["ContactInfo"]);
                //$("#tb_agent").val(data.d["AgentID"]);
                $("#tb_description").val(data.d["Remark"]);

                if (data.d['IsDefaultLocation'] == true)
                    $("#cb_deflocation").prop("checked", true);
                else
                    $("#cb_deflocation").prop("checked", false);

                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));

                ShowSuccessMessage("Loaded.");
                $('#dialogBox_Detail_Form').modal('show');
            }
            else {
                ShowBoxMessage("Oops, we can't find the record. ");
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
//#endregion

////#region Load Agents
//function Load_Agent_List() {
//    Pace.start();
//    $.ajax({
//        url: baseUrl() + "WebServices/WebService_Agent.asmx/GetAllAgent",
//        data: "{ " +
//        "'search_text':'" + "" + "' " +
//        ",'RequestID':'" + get_current_user_id() + "' " +

//        " }",
//        dataType: 'json',
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        success: function (data) {
//            console.log(data.d);
//            if (data.d != null) {

//                $("#tb_agent").empty();
//                $("#tb_agent").append("<option value=''>" + "Choose Agent" + "</option>");

//                $.each(data.d, function (key, val) {
//                    $("#tb_agent").append("<option value=" + data.d[key]['AgentID'] + ">" + data.d[key]['AgentName'] + "</option>");


//                })
//            }
//            else {
//                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
//            }
//        },
//        error: function (xhr, msg) {
//            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

//        }
//    });
//}
////#endregion
function Load_Location_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Location.asmx/GetAllLocationJSON",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                BindTable(data.d);
                $('#panel_list_background').loading('stop');
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
function BindTable(data) {
    Build_ColumnHeader();
    var result = JSON.parse(data);
    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: result,
        showBorders: true,
        keyExpr: "StockLocationID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "Brand",
            allowExportSelectedData: false
        },
        headerFilter: {
            visible: true
        },
        hoverStateEnabled: true,
        paging: {
            pageSize: 20
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [20, 40, 60],
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
        onContentReady: function (options) {
            var $dataGridElement = options.element,
                isNoData = $dataGridElement.find(".dx-datagrid-nodata").is(":visible");

            $dataGridElement.find(".dx-datagrid-rowsview").toggleClass("customClass", isNoData);
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                GoWarehouseDetail(data.StockLocationID);
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
var Columns = [];
function Build_ColumnHeader() {
    Columns = [
        {
            dataField: "LocationCode",
            caption: "Location Code",
        },
        {
            dataField: "LocationName",
            caption: "Location Name",

        },
        {
            dataField: "ContactInfo",
            caption: "Contact Info",
            allowHeaderFiltering: false
        },
    ];
}

function GoWarehouseDetail(id) {
    GotoPage('Portal/warehouse?id=' + id);


}

