$('title').html(get_current_CusGp_organization_title() + "CustomerGroup Services");

$('#menu_sale').addClass('active-sub');
$('#menu_customer_group').addClass('in');
$('#menu_customergroupFuelPutIn').addClass('active-link');


$("#tab-main").tabs();
$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");



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




$("#dtp_ser_date").val(moment(new Date()).format('YYYY.MM.DD HH:mm'));
$('#dtp_ser_date').periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD HH:mm',

});
$('#dtp_ser_date').periodpicker('change');

$("#btn_search_all_dates").change(function () {

    Load_List();
});

Load_List();

//if (GetURLData('id') != null && GetURLData('id') != "") {
//    GetServices(GetURLData('id'));
//}
//else {
//    LoadNew();
//    $('#dialogBox_Detail_Form').modal('hide');

//}




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
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Service.asmx/GetAllServiceDateByCusGroup",
        data: "{ " +
            "'from_date':'" + $("#tb_search_from_date").val() + "' " +
            ",'to_date':'" + $("#tb_search_to_date").val() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
            ",'search_text':'" + "" + "' " +
            ",'search_service':'" + $("#tb_search").val() + "' " +
            ",'cusGpID':'" + get_current_CustomerGroup_id+','+get_current_CustomerGroupIDs() + "' " +
            ",'RequestID':'" + get_current_Created_User_id() + "' " +
            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    total_amount = 0;

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

            if (records[key]['AppStatus'] == "Approved")
                status = '<span class="label label-success">Approved</span>';
            else if (records[key]['AppStatus'] == "Rejected") status = '<span class="label label-danger">Rejected</span>';
            else status = "";






            allCardsCode += the_template.replace()
                .replace("[ServiceID]", records[key]['ServiceID'])
                .replace("[ServiceStartOn]", records[key]['ServiceStartOn'].Hours + ":" + records[key]['ServiceStartOn'].Minutes + ":" + records[key]['ServiceStartOn'].Seconds)
                .replace("[ServiceEndOn]", records[key]['ServiceEndOn'].Hours + ":" + records[key]['ServiceEndOn'].Minutes + ":" + records[key]['ServiceEndOn'].Seconds)
                .replace("[ServiceDate]", JsonDateToFormat(records[key]['ServiceDate'], 'DD-MM-YYYY'))
                .replace("[ServiceNo]", records[key]['ServiceNo'])
                .replace("[ServiceStatus]", records[key]['ServiceStatus'])
                .replace("[CustomerNameEng]", records[key]['CustomerNameEng'])
                //.replace("[TotalAmount]", records[key]['TotalAmount'] == null ? "" : NumberWithCommas(records[key]['TotalAmount']))
                .replace("[UserName]", records[key]['UserName'])
                .replace("[AppStatus]", status)
            //total_amount += (records[key]['TotalAmount'])


        }

    });
    if (rowindex == 0) $('#panel_list').hide();
    else $('#panel_list').show();


    $('.list_count').html(rowindex - 1);
    //$('.list_total_amount').html(" : " + NumberWithCommas(total_amount) + " MMK");
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





//Approval
function Add_Instant_Decision_Completed() {
    GetServices(GetURLData("id"));
}

function CloseDetail() {
    if (GetURLData("action") == '') {
        $('#dialogBox_Detail_Form').modal('hide');
        Load_List();
    }
    else {
        window.close();
        Load_List();
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





