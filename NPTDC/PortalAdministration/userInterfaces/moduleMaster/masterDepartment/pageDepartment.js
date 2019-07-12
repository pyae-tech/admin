$('title').html(get_current_organization_title() + "Departments");

$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_StaffDepartment').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetDepartment(GetURLData('id'));
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
//        url: baseUrl() + "WebServices/WebService_Department.asmx/GetAllDepartmentWithPagination",
//        data: "{ " +
//            "'search_text':'" + $("#tb_search_text").val() + "' " +
//            ",'search_dep':'" + $("#tb_search").val() + "' " +
//            ",'RequestID':'" + get_current_user_id() + "' " +
//            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
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
//                .replace("[DepartmentID]", records[key]['DepartmentID'])
//                .replace("[DepartmentName]", records[key]['DepartmentName'])
//                .replace("[DepartmentCode]", records[key]['DepartmentCode'])
//                .replace("[PaymentType]", records[key]['PaymentType'])
//                .replace("[Remark]", records[key]['Remark']);
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
        error_message += "Department Name Need To Be Fill"
    }
  

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveDepartment() {
    if (SaveRecordVerification() == false)
        return;
    Pace.start();
   
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Department.asmx/SaveDepartment",
        data: "{ " +
            "'dep_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'department_name':'" + $("#tb_name").val() + "' " +
            ",'dep_code':'" + $("#tb_code").val() + "' " +
            ",'paymenttype':'" + $("#ddl_pay_type").val() + "' " +
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
                ShowErrorBoxMessage("Duplicate Department Code");
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
    $("#tb_code").val("");
    $("#ddl_pay_type").val("MMK");
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
    ShowConfirmation("Are you sure you want to delete?", "DeleteDepartment");
}
function DeleteDepartment() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Department.asmx/DeleteDepartment",
        data: "{ " +
            "'dep_id':'" + $("#tb_id").val() + "' " +
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
function GetDepartment(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Department.asmx/GetDepartment",
        data: "{ " +
            "'dep_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["DepartmentID"]);

                $("#tab_detail_header").html(data.d["DepartmentName"]);
                $("#tb_name").val(data.d["DepartmentName"]);
                $("#tb_code").val(data.d["DepartmentCode"]);
                $("#ddl_pay_type").val(data.d["PaymentType"]);
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
        url: baseUrl() + "WebServices/WebService_Department.asmx/GetAllDepartmentJSON",
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
        keyExpr: "DepartmentID",
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
                GoDepartmentDetail(data.DepartmentID);
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
            dataField: "DepartmentName",
            caption: "Department Name",
        },
        {
            dataField: "DepartmentCode",
            caption: "Code",

        },
        {
            dataField: "PaymentType",
            caption: "Payment Type",
        },
        {
            dataField: "Remark",
            caption: "Remark",
            allowHeaderFiltering: false
        },
    ];
}

function GoDepartmentDetail(id) {
    GotoPage('Portal/departments?id=' + id);


}

