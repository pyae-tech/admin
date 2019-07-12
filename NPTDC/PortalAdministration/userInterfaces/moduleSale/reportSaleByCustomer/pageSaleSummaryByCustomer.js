$('title').html(get_current_organization_title() + "Customer");
 
$('#menu_sale').addClass('active-sub');
$('#menu_sale_group').addClass('in');
$('#menu_sale_summary_by_customer').addClass('active-link');

$('#hf_current_user').val(get_current_user_id()); 
$("#tb_search_date").val(moment(new Date()).format('YYYY.MM.DD'));
$("#tb_search_to_date").val(moment(new Date()).format('YYYY.MM.DD'));
 

$('#tb_search_date').periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
});

$('#tb_search_to_date').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
});



//#region ItemTypeList
LoadItemType();
function LoadItemType() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ItemType.asmx/GetItemTypeList",

        data: JSON.stringify({
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_item_type_list(data.d);
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

function generate_item_type_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    var arrToServer = [];
    $.each(records, function (key, val) {
        rowindex++;
        arrToServer.push({ Name: records[key]['TypeName'], id: records[key]['ItemTypeID'] });
    });
    var options = {
        data: arrToServer,
        getValue: "Name",
        list: {
            match: {
                enabled: false
            },
            onChooseEvent: function () {
                $("#hf_item_type_id").val($("#tb_item_type").getSelectedItemData().id);

                LoadItems();

                $('#hf_item_id').val('');
                $('#tb_item').val('');
                $('#tb_item').focus();
            },
            onHideListEvent: function () {

            }
        },
        adjustWidth: false,
        template: {
            type: "Name",
            fields: {
                description: "id"
            }
        }
    };
    $("#tb_item_type").easyAutocomplete(options);

}
//#endregion


//#region ItemList

LoadItems();

function LoadItems() {
    var selected_item_type_id = '';
    if ($("#tb_item_type").val() != '')
        selected_item_type_id = $("#tb_item_type").getSelectedItemData().id;
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Items.asmx/GetAllItemsWithoutPagination",
        data: "{ " +
            "'search_text':'" + selected_item_type_id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_item_list(data.d);
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

function generate_item_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    var arrToServer = [];
    $.each(records, function (key, val) {
        rowindex++;
        arrToServer.push({ Name: "-" + records[key]['ItemName'], id: records[key]['ItemID'] });
    });
    var options = {
        data: arrToServer,
        getValue: "Name",
        list: {
            match: {
                enabled: false
            },
            onChooseEvent: function () {
                $("#hf_item_id").val($("#tb_item").getSelectedItemData().id);
            },
            onHideListEvent: function () {

            }
        },
        adjustWidth: false,
        template: {
            type: "Name",
            fields: {
                description: "id"
            }
        }
    };
    $("#tb_item").easyAutocomplete(options);
    $('#tb_item').focus();
}

//#endregion
//#region Save Search
function save_search() {
    if ($("#tb_item_type").val() == '') $("#hf_item_type_id").val('');
    if ($("#tb_item").val() == '') $("#hf_item_id").val(''); 



    var last_search =
        $('#tb_search_date').val() + "~" +  //0
        $('#tb_search_to_date').val() + "~" + //1
      '' + "~" + //2
        ''+ "~" +//3
      ''+ "~" +//4
        $('#hf_item_type_id').val() + "~" +//5
        $('#tb_item_type').val() + "~" +//6
        $('#hf_item_id').val() + "~" +//7
        $('#tb_item').val() + "~" +//8
        $('#tb_search_text').val() //9
        ;

    $.cookie('report_sale_summary_search', last_search, { expires: 1, path: '/' });

}
function restore_search() {
    if ($.cookie('report_sale_summary_search') != '') {
        var search_values = $.cookie('report_sale_summary_search').split('~');
        $('#tb_search_date').val(search_values[0]);
        $('#tb_search_date').periodpicker('change');

        $('#tb_search_to_date').val(search_values[1]);
        $('#tb_search_to_date').periodpicker('change');

        //$('#tb_status').val(search_values[2]);
        //$('#hf_agent_id').val(search_values[3]);
        //$('#tb_agent').val(search_values[4]);
        $('#hf_item_type_id').val(search_values[5]);
        $('#tb_item_type').val(search_values[6]);
        $('#hf_item_id').val(search_values[7]);
        $('#tb_item').val(search_values[8]);
        $('#tb_search_text').val(search_values[9]);
    }
}

restore_search();
//#endregion






















function download_report() { 
    myReportViwer.ExportTo();
}

//function load_report() {
//    alert('ok');
//    ASPxWebDocumentViewer1.OpenReport("SBSPortal3.PortalAdministration.userInterfaces.moduleSale.reportSaleByItem.dxrpt_sale_by_item");
//    //ASPxWebDocumentViewer1.previewModel.parametersModel["parItemID"]("hello"); 
//    //ASPxWebDocumentViewer1.ExportTo();
//}
//function parametersReset(s, e) {
//    alert("parametersReset");
//    var preview = s.GetPreviewModel();
//    if (preview) {
//        preview.tabPanel.collapsed(true);
//    }
//}
//function MyParameter(s, e) {
//    alert("MyParameter");
//    var preview = s.GetPreviewModel();
//    if (preview) {
//        preview.parametersModel["parItemID"]("hello");
//    }
//}
 