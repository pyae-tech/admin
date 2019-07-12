$('title').html(get_current_organization_title() +  " Issue Notes");

$('#menu_salevan').addClass('active-sub');
$('#menu_salevan_group').addClass('in');
$('#menu_salevan_IssueNote').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});




 
$("#tb_search_from_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_search_from_date').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
        Load_List();
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
        Load_List();
    }
});
$("#btn_search_all_dates").change(function () {

    Load_List();
});
$("#tb_Remark").keydown(function (event) {
    if (event.which == 13) {
        var test = $("#tb_Remark").val() + "\n";
        $("#tb_Remark").val(test);
    }
});

Load_List();
 


//function Load_List() {
//    $('#panel_list_background').loading();
//    $.ajax({ 
//        //GetAllByDate(from_date, to_date, search_all_date, search_text, RequestID, PageNoString);
//        url: baseUrl() + "WebServices/WebService_IssueNote.asmx/GetAllByDate",
//        data: "{ " + 
//            "'from_date':'" + $("#tb_search_from_date").val() + "' " +
//          ",'to_date':'" + $("#tb_search_to_date").val() + "' " +
//            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
//            ",'search_text':'" + $("#tb_search_text").val() + "' " + 
//            ",'search_issue':'" + $("#tb_search_OutTypeName").val() + "' " + 
//            ",'RequestID':'" + get_current_user_id() + "' " +  
//            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
//            " }",
//        dataType: 'json',
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        success: function (data) {
//            if (data.d != null) {
//                generate_list(data.d);
//            }
//            $('#panel_list_background').loading('stop');
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
//    var total_amount = 0;

//    $.each(records, function (key, val) {
//        rowindex++;
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
//            status_color = "label-warning";
//            if (records[key]['Status'] == 'Order')
//                status_color = "label-purple";
//            else if (records[key]['Status'] == 'Completed')
//                status_color = "label-primary";
//            else if (records[key]['Status'] == 'Cancelled')
//                status_color = "label-danger";

//            if (records[key]['ApproveStatus'] == "Approved")
//                status = '<span class="label label-success">Approved</span>';
//            else if (records[key]['ApproveStatus'] == "Rejected") status = '<span class="label label-danger">Rejected</span>';
//            else status = "";
            
//            the_template = $('#template_row').html();
//            console.log(records); 
//            allCardsCode += the_template.replace()
//                .replace("[IssueNoteID]", records[key]['IssueNoteID'])
//                .replace("[IssueNoteNo]", records[key]['IssueNoteNo'])
//                .replace("[statusColor]", status_color)
//                .replace("[IssueDate]", JsonDateToFormat(records[key]['IssueDate'], 'DD/MM/YYYY'))
//                .replace("[CarNo]", records[key]['CarNo'])
//                .replace("[WayNo]", records[key]['WayNo'] == null ? "" : records[key]['WayNo'])
//                .replace("[Status]", records[key]['Status'])
//                .replace("[ApproveStatus]", status);
//        }

//    });
//    $('.total_record').html(rowindex - 1 + ' records');
//    if (rowindex == 0) $('#panel_list').hide();
//    else {
//        $('#panel_list').show();
//    }

//    $('.list_count').html(rowindex - 1); 
//    $('#table_list').empty();
//    $('#table_list').append(allCardsCode);


//    goToListTab();

//}


 

//function search() {
//    $("#tb_search_text").val();
//    $("#tb_search_OutTypeName").val();
//    Load_List();
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");
//}

//function clearSearch() {
//    $("#tb_search_text").val("");
//    $("#tb_search_OutTypeName").val("");
//    Load_List();
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");
//}

//function goToListTab() {
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");
//}

function GoToLog() {

    if ($("#tb_OutID").val() == "") {
        window.open('log?id=', '_blank');
    }
    else {
        window.open('log?id=' + $("#tb_OutID").val(), '_blank');
    }
}

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
    Load_List();
}

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
//Approval
function Add_Instant_Decision_Completed() {
    Load_List();
}

function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_IssueNote.asmx/GetAllByDateJSON",
        data: "{ " +
            "'from_date':'" + $("#tb_search_from_date").val() + "' " +
            ",'to_date':'" + $("#tb_search_to_date").val() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
            ",'search_text':'" + $("#tb_search_text").val() + "' " +
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

function Build_ColumnHeader() {
    Columns = [
        {
            dataField: "IssueNo",
            caption: "Issue No",
        },
        {
            dataField: "IssueDate",
            dataType: "date",
            format: 'dd-MM-yyyy',
        },
        {
            dataField: "CarNo",
            caption: "Car No",
        },
        {
            dataField: "WayNo",
            caption: "Way No",
        },
        {
            dataField: "Status",
            caption: "Status",
            
            cellTemplate: function (cellElement, cellInfo) {
               
                if (cellInfo.data.Status === "New") {
                    $('<span class="label label-purple full-width">').text(cellInfo.data.Status).appendTo(cellElement);
                }
                else if (cellInfo.data.Status === "Confirm") {
                    $('<span  class="label label-primary full-width">').text(cellInfo.data.Status).appendTo(cellElement);
                }
                else if (cellInfo.data.Status === "Cancelled") {
                    $('<span class="label label-danger full-width">').text(cellInfo.data.Status).appendTo(cellElement);
                }
                else if (cellInfo.data.Status === "Ready") {
                    $('<span class="label label-warning full-width">').text(cellInfo.data.Status).appendTo(cellElement);
                }
            }

        },
        {
            dataField: "ApproveStatus",
            caption: "Approved/Rejected",
            allowHeaderFiltering: false,
            cellTemplate: function (cellElement, cellInfo) {
                if (cellInfo.data.ApproveStatus === "Approved") {
                    $('<span class="label label-success">').text(cellInfo.data.ApproveStatus).appendTo(cellElement);
                }
                else if (cellInfo.data.ApproveStatus === "Rejected") {
                    $('<span class="label label-danger">').text(cellInfo.data.ApproveStatus).appendTo(cellElement);
                }
            }
        }

    ];
}

function BindTable(data) {
    Build_ColumnHeader();
    var result = JSON.parse(data);
    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: result,
        showBorders: true,
        keyExpr: "IssueNoteID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "Issue Note",
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
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                GoIssueNoteDetail(data.IssueNoteID);
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
function GoIssueNoteDetail(id) {
    GotoPage('Portal/issue?id=' + id);
}
 
 