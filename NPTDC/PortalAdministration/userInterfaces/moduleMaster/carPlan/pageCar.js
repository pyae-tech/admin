$('title').html(get_current_organization_title() + "Car Plan");

$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_Cars').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});
if (GetURLData('id') != null && GetURLData('id') != "") {
    GetCar(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");
//Load_Sale_Person1_List();
//Load_Sale_Person2_List();

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
//function GoToLog() {

//    if ($("#tb_id").val() == "") {
//        window.open('logs?id=', '_blank');
//    } else {
//        window.open('logs?id=' + $("#tb_id").val(), '_blank');
//    }
//}
//function Load_List() {
//    $('#panel_list_background').loading();
//    Pace.start();
//    $.ajax({

//        //GetAllAirLineWithPagination(string search_text, string RequestID, string pageNo)
//        url: baseUrl() + "WebServices/WebService_Car.asmx/GetAllCarWithPagination",
//        data: "{ " +
//            "'search_text':'" + $("#tb_search_text").val() + "' " +
//            ",'search_car':'" + $("#tb_search").val() + "' " +
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
//                .replace("[CarID]", records[key]['CarID'])
//                .replace("[CarNo]", records[key]['CarNo'])
//                .replace("[Saleperson1]", records[key]['SalePerson1Name'] == null ? '' : records[key]['SalePerson1Name'])
//                .replace("[Saleperson2]", records[key]['SalePerson2Name'] == null ? '' : records[key]['SalePerson2Name'])
//                .replace("[Status]", records[key]['Status'] == null ? '' : records[key]['Status'] )
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
    if ($("#tb_car_no").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Car No Need To Be Fill"
    }
    if ($("#ddl_saleperson1").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Sale Person 1 Need To Be Fill"
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveCar() {
    if (SaveRecordVerification() == false)
        return;
    //if ($('#tb_id').val() == '') {
        IsExistCarNo($('#tb_id').val(),$("#tb_car_no").val());
    //}
    //else {
    //    SaveRecord();
    //}
}

//#endregion
function SaveRecord() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Car.asmx/SaveCar",
        data: "{ " +
            "'car_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'car_no':'" + $("#tb_car_no").val() + "' " +
            ",'sale_person1':'" + $("#ddl_saleperson1").val() + "' " +
            ",'sale_person2':'" + $("#ddl_saleperson2").val() + "' " +
            ",'status':'" + $("#ddl_status").val() + "' " +
            ",'remark':'" + esc_quot($("#tb_remark").val()) + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                Load_List();
                $("#tb_id").val(data.d.toString().split('~')[1]);
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

function IsExistCarNo(car_id,car_no) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Car.asmx/IsExistCarNo",
        data: "{ " +
            "'car_id':'" + car_id + "' " +
            ",'car_no':'" + car_no + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Exist") {
                ShowInfoMessage("Car No is already exist!");
            }
            else {
                SaveRecord();
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });


}
//#region New Record
function LoadNew() {
    Pace.start();
    $("#tab_detail_header").html('Create New Car');
    $("#tb_id").val("");
    $("#tb_car_no").val("");
    $("#ddl_status").val("New");
    $("#ddl_saleperson1").val("").trigger("chosen:updated");
    $("#ddl_saleperson2").val("").trigger("chosen:updated");
    $("#tb_remark").val("");

    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");
    $('#dialogBox_Detail_Form').modal('show');
    $("#tb_carno").focus();

    //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_car_no').focus();
    });
   
}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteCar");
}
function DeleteCar() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Car.asmx/DeleteCar",
        data: "{ " +
            "'car_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                LoadNew();
                Load_List();
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
function GetCar(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Car.asmx/GetCar",
        data: "{ " +
            "'car_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["CarID"]);

                $("#tab_detail_header").html(data.d["CarNo"]);
                $("#tb_car_no").val(data.d["CarNo"]);
                $("#hf_sale1id").val(data.d["UserID1"]);
                var sale1_id = data.d["UserID1"];
                $("#ddl_saleperson1").val(sale1_id).trigger("chosen:updated");
                $("#hf_sale2id").val(data.d["UserID2"]);
                var sale2_id = data.d["UserID2"];
                $("#ddl_saleperson2").val(sale2_id).trigger("chosen:updated");
                $("#ddl_status").val(data.d["Status"]);
                $("#tb_remark").val(data.d["Remark"]);
                $("#lbl_created").text("Created By : " + data.d["CreatedByUserCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByUserCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));
               
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


Load_User_List();
//#region Users
function Load_User_List() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_User.asmx/GetAllUser",
        data: "{" +
            "'search_text':'" + "" + "'" +
            ",'org_id':'" + get_current_user_org_id()+ "'" +
            ",'RequestID':'" + get_current_user_id() + "'" +
            "}",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data.d);
            if (data.d != null) {
                $("#ddl_saleperson1").empty();
                $("#ddl_saleperson2").empty();
                $("#ddl_saleperson1").append("<option value=''>" + "Choose Sale Person 1" + "</option>");
                $("#ddl_saleperson2").append("<option value=''>" + "Choose Sale Person2" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#ddl_saleperson1").append("<option value=" + data.d[key]['UserID'] + ">" + data.d[key]['UserName'] + "</option");
                    $("#ddl_saleperson2").append("<option value=" + data.d[key]['UserID'] + ">" + data.d[key]['UserName'] + "</option>");
                });
                $("#ddl_saleperson1").chosen().change();
                $("#ddl_saleperson2").chosen().change();
                $("#ddl_saleperson1_chosen").css({ "width": "100%" });
                $("#ddl_saleperson2_chosen").css({ "width": "100%" });
                if ($('#hf_sale1id').val() != "") {
                    $('#ddl_saleperson1').val($('#hf_sale1id').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_sale1id').val("");
                    $('#ddl_saleperson1').val("").trigger("chosen:updated");
                }
                if ($('#hf_sale2id').val() != "") {
                    $('#ddl_saleperson2').val($('#hf_sale2id').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_sale2id').val("");
                    $('#ddl_saleperson2').val("").trigger("chosen:updated");
                }



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
function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Car.asmx/GetAllCarJSON",
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
        keyExpr: "CarID",
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
                GoCarDetail(data.CarID);
            }
        },
        calculateCellValue: function (rowData) {
            // ...
            return this.defaultCalculateCellValue(rowData);
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
            dataField: "CarNo",
            caption: "Car No",
        },
        {
            dataField: "SalePerson1Name",
            caption: "Sale Person1",

        },
        {
            dataField: "SalePerson2Name",
            caption: "Sale Person2",

        },
        {
            dataField: "SalePerson2Name",
            caption: "Sale Person2",

        },
        {
            dataField: "Status",
            caption: "Status",
        },
        {
            dataField: "Remark",
            caption: "Remark",
            allowHeaderFiltering: false
        },
        
    ];
}

function GoCarDetail(id) {
    GotoPage('Portal/cars?id=' + id);


}

