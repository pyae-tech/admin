$('title').html(get_current_organization_title() + "Sacout Type");

$('#menu_marketing').addClass('active-sub');
$('#menu_marketing_group').addClass('in');
$('#menu_marketing_ScoutsType').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetCity(GetURLData('id'));
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
function clearSearch() {
    $('#tb_search_text').val('');
    $('#tb_search').val('');
   
    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}
function search() {


    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");

}

function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({      
        url: baseUrl() + "WebServices/WebService_ScoutType.asmx/GetAllScoutTypeJson",
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'search_sacout':'" + $("#tb_search").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
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
            $('#panel_list_background').loading('stop');
        }
    });
}


var Columns = [
    {
        dataField: "ScoutTypeNameEng",
        caption: "Scout Type (Eng)",
    },
    {
        dataField: "ScoutTypeNameZawGyi",
        caption: "Scout Type (ZawGyi)",
    },
    {
        dataField: "ScoutTypeNameUnicode",
        caption: "Scout Type (Unicode)",

    },
    {
        dataField: "Description",
        caption: "Description",
        allowHeaderFiltering: false
    }
];
function BindTable(data) {
       var result = JSON.parse(data);
    var dataGrid = $("#grid_scoutType").dxDataGrid({
        dataSource: result,
        showBorders: true,
        keyExpr: "ScoutTypeID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "ScoutType",
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
        onToolbarPreparing: function (e) {
            var dataGrid1 = e.component;

            e.toolbarOptions.items.unshift({
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        onClick: function () {
                            dataGrid.clearSelection();
                            Load_List();
                        }
                    }
                });
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                GetScoutType(data.ScoutTypeID);
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
        the_template = $('#template_row').html();

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


            allCardsCode += the_template.replace()
                .replace("[ScoutTypeID]", records[key]['ScoutTypeID'])
                .replace("[ScoutTypeNameEng]", records[key]['ScoutTypeNameEng'])
                .replace("[ScoutTypeNameZawGyi]", records[key]['ScoutTypeNameZawGyi'])
                .replace("[ScoutTypeNameUnicode]", records[key]['ScoutTypeNameUnicode'])
                .replace("[Description]", records[key]['Description']);
        }

    });
    if (rowindex == 0) $('#panel_list').hide();
    else $('#panel_list').show();



    $('.list_count').html(rowindex - 1);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);



}

function pageJump(control)//paginatin function
{
    $('#hf_current_page').val($(control).attr('actionPage'));
    Load_List();
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    Load_List();
}

//#endregion

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_eng_name").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Name (English)  Need To Be Fill"
    }
    if ($("#tb_zawgyi_name").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Name (ZawGyi) Need To Be Fill"
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveScoutType() {
    if (SaveRecordVerification() == false)
        return;
    Pace.start();
   
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ScoutType.asmx/SaveScoutType",
        data: "{ " +
            "'scout_type_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'scout_eng':'" + $("#tb_eng_name").val() + "' " +
            ",'scout_zawgyi':'" + $("#tb_zawgyi_name").val() + "' " +
            ",'scout_unicode':'" + $("#tb_unicode_name").val() + "' " +
            ",'description':'" + $("#tb_description").val() + "' " +
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
    $("#tab_detail_header").html('Create New Scout Type');
    $("#tb_id").val("");
    $("#tb_eng_name").val("");
    $("#tb_zawgyi_name").val("");
    $("#tb_unicode_name").val("");
    $("#tb_description").val("");

    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");

    $('#dialogBox_Detail_Form').modal('show');
    $("#tb_eng_name").focus();

     //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_eng_name').focus();
    });

   
}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteScoutType");
}
function DeleteScoutType() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ScoutType.asmx/DeleteScoutType",
        data: "{ " +
            "'scout_type_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                LoadNew();
                search();
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
function GetScoutType(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ScoutType.asmx/GetScoutType",
        data: "{ " +
            "'scout_type_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["ScoutTypeID"]);

                $("#tab_detail_header").html(data.d["ScoutTypeNameEng"]);

                $("#tb_eng_name").val(data.d["ScoutTypeNameEng"]);
                $("#tb_zawgyi_name").val(data.d["ScoutTypeNameZawGyi"]);
                $("#tb_unicode_name").val(data.d["ScoutTypeNameUnicode"]);
                $("#tb_description").val(data.d["Description"]);
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

