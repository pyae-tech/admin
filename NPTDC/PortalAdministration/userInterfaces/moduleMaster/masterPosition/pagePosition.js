$('title').html(get_current_organization_title() + "Positions");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_positions').addClass('active-link');


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
            "'pos_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'position_name':'" + $("#tb_name").val() + "' " +
            ",'position_code':'" + $("#tb_position_code").val() + "' " +
            ",'protocol':'" + $("#tb_protocol").val() + "' " +
            ",'description':'" + esc_quot($("#tb_description").val()) + "' " +
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
                ShowErrorBoxMessage("Duplicate Position Name");
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
    $("#tb_protocol").val("");
    $("#tb_description").val("");
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
            "'pos_id':'" + $("#tb_id").val() + "' " +
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
            "'pos_id':'" + id + "' " +
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
                $("#tb_protocol").val(data.d["Protocol"]);
                $("#tb_description").val(data.d["Description"]);
                $("#tb_remark").val(data.d["Remark"]);
                $("#lbl_created").text("စာရင်းသွင်းသူ : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("ပြင်ဆင်သူ : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));
               
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
            "'RequestID':'" + get_current_user_id() + "' " +
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
            fileName: "Position",
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
        rowAlternationEnabled: true,
        columnResizingMode: "nextColumn",
        columnMinWidth: 50,
        height: 600,
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
            caption: "ရာထူး",
            cssClass: 'cls',
        },
        {
            dataField: "PositionCode",
            caption: "ကုဒ်",
            cssClass: 'cls',

        },
        {
            dataField: "Protocol",
            caption: "Protocol",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false,
             cssClass: 'cls',
        },
        {
            dataField: "Description",
            caption: "ဖော်ပြချက်",
            allowHeaderFiltering: false,
             cssClass: 'cls',
        },
      
    ];
}

function GoPositionDetail(id) {
    GotoPage('Portal/positions?id=' + id);


}


