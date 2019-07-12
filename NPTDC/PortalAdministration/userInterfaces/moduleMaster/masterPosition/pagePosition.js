$('title').html(get_current_organization_title() + "Positions");

$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_StaffPosition').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetPosition(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

Load_List();

//#region Listing
//function clearSearch() {
//    $('#tb_search_text').val('');
//    $('#tb_search').val('');
   
//    Load_List();
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");
//}
//function search() {

//    $('#tb_search_text').val();
//    $('#tb_search').val();

//    Load_List();
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");

//}

//function Load_List() {
//    $('#panel_list_background').loading();
//    Pace.start();
//    $.ajax({

//        //GetAllAirLineWithPagination(string search_text, string RequestID, string pageNo)
//        url: baseUrl() + "WebServices/WebService_Position.asmx/GetAllPositionWithPagination",
//        data: "{ " +
//            "'search_text':'" + $("#tb_search_text").val() + "' " +
//            ",'search_position':'" + $("#tb_search").val() + "' " +
//            ",'RequestID':'" + get_current_user_id() + "' " +
//            ",'pageNo':'" + $('#hf_current_page').val() + "' " +
//            " }",
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
//                .replace("[PositionID]", records[key]['PositionID'])
//                .replace("[PositionName]", records[key]['PositionName'])
//                .replace("[PositionCode]", records[key]['PositionCode'])
//                .replace("[DefaultBasicSalary]", NumberWithCommas(records[key]['DefaultBasicSalary']))
//                .replace("[DefaultOTRate]", NumberWithCommas(records[key]['DefaultOTRate']))
//                .replace("[DefaultMinSalary]", NumberWithCommas(records[key]['DefaultMinSalary']))
//                .replace("[DefaultGeneralAdjustment]", NumberWithCommas(records[key]['DefaultGeneralAdjustment']))
//                .replace("[JobLevel]", records[key]['JobLevel']);
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
//    Load_List();
//}
//function pageJumpToThis()//paginatin function
//{
//    $('#hf_current_page').val($('.tb_current_page').val());
//    Load_List();
//}

//#endregion

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_name").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Position Name Need To Be Fill"
    }
    if ($("#tb_position_code").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Position Code Need To Be Fill"
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SavePosition() {
    if (SaveRecordVerification() == false)
        return;
    Pace.start();


   
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Position.asmx/SavePosition",
        data: "{ " +
            "'position_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'position_name':'" + $("#tb_name").val() + "' " +
            ",'position_code':'" + $("#tb_position_code").val() + "' " +
            ",'dbasic_salary':'" + $("#tb_DBasic_Salary").val() + "' " +
            ",'dot_rate':'" + $("#tb_DOTRate").val() + "' " +
            ",'dmini_salary':'" + $("#tb_DMini_Salary").val() + "' " +
            ",'dg_adjustment':'" + $("#tb_DGAdjustment").val() + "' " +
            ",'job_level':'" + $("#tb_Job_Level").val() + "' " +
            ",'remark':'" + esc_quot($("#tb_remark").val()) + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
               
                Load_List();
                ShowSuccessMessage("Saved.");
                scrollToDiv('#tab-main');
            }

            else if (data.d.toString().split('~')[0] == "Error") {
                ShowErrorBoxMessage("Duplicate Position Code");
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
    $("#tab_detail_header").html('Create New Position');
    $("#tb_id").val("");
    $("#tb_name").val("");
    $("#tb_position_code").val("");
    $("#tb_DBasic_Salary").val("");
    $("#tb_DOTRate").val("");
    $("#tb_DMini_Salary").val("");
    $("#tb_DGAdjustment").val("");
    $("#tb_Job_Level").val("");
    $("#tb_remark").val("");

    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");

    $('#dialogBox_Detail_Form').modal('show');
    $("#tb_name").focus();

     //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_name').focus();
    });

   
}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeletePosition");
}
function DeletePosition() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Position.asmx/DeletePosition",
        data: "{ " +
            "'position_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                LoadNew();
                ShowSuccessMessage("Deleted.");
                LoadList();
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
function GetPosition(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Position.asmx/GetPosition",
        data: "{ " +
            "'position_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["PositionID"]);

                $("#tab_detail_header").html(data.d["PositionName"]);
                $("#tb_name").val(data.d["PositionName"]);
                $("#tb_position_code").val(data.d["PositionCode"]);
                $("#tb_DBasic_Salary").val(NumberWithCommas(data.d["DefaultBasicSalary"]));
                $("#tb_DOTRate").val(NumberWithCommas(data.d["DefaultOTRate"]));
                $("#tb_DMini_Salary").val(NumberWithCommas(data.d["DefaultMinSalary"]));
                $("#tb_DGAdjustment").val(NumberWithCommas(data.d["DefaultGeneralAdjustment"]));
                $("#tb_Job_Level").val(data.d["JobLevel"]);
                $("#tb_remark").val(data.d["Remark"]);
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
function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Position.asmx/GetAllPositionJSON",
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
        keyExpr: "PositionID",
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
                GoPositionDetail(data.PositionID);
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
            dataField: "PositionName",
            caption: "အမည္",
        },
        {
            dataField: "PositionCode",
            caption: "ကုဒ္",

        },
        {
            dataField: "DefaultBasicSalary",
            caption: "အေျခခ",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false
        },
        {
            dataField: "DefaultOTRate",
            caption: "အခိ်န္ပိ",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false
        },
        {
            dataField: "DefaultMinSalary",
            caption: "အနိမ့္ဆ",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false
        },
        {
            dataField: "DefaultGeneralAdjustment",
            caption: "ရာထူးတိုး",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false
        },
        {
            dataField: "JobLevel",
            caption: "ရာထူး",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false
        },
    ];
}

function GoPositionDetail(id) {
    GotoPage('Portal/positions?id=' + id);


}


