$('title').html(get_current_organization_title() + "System Organization");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_system_organization').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});

$("#tb_joint_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_joint_date').periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',

});
$('#tb_joint_date').periodpicker('change');

$("#tb_expiry_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_expiry_date').periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',

});
$('#tb_expiry_date').periodpicker('change');


$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

function GetOrganization(id) {
    window.open('organization?id=' + id, '_blank');
}

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

    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/GetAllOrganizationWithPagination",
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'search_org':'" + $("#tb_search").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
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
                .replace("[OrgID]", records[key]['OrgID'])
                .replace("[OrgName]", records[key]['OrgName'])
                .replace("[OrgCode]", records[key]['OrgCode'])
                .replace("[UserCount]", records[key]['UserCount'])
                .replace("[OrgPlan]", records[key]['OrgPlan'])
                .replace("[Remark]", records[key]['Remark']);
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


function NewOrganization() {
    window.open('organization?id=', '_blank');
}