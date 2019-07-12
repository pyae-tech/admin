$('title').html(get_current_organization_title() + " Daily Opportunitys");

$('#menu_marketing').addClass('active-sub');
$('#menu_marketing_group').addClass('in');
$('#menu_master_SalePerson').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});


$("#tb_search_from_date").val(moment(new Date()).format('YYYY.MM.DD'));
$("#tb_search_from_date").periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
    Load_List_By_Date();
    }
});


$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

Load_List();

$('#ddl_sorting').on('change', function () {
    if ($('#btn_search_all_dates').is(':checked'))//ture
    {
        Load_List();
    }
    else {
        Load_List_By_Date();
    }
});

$("#btn_search_all_dates").change(function () {
    Load_List();
});

 
//#region Listing
function clearSearch() {
    $('#tb_search_text').val("");
    $('#tb_search').val("");

    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}
function search() {
    $('#tb_search_text').val();
    $('#tb_search').val();
    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");

}

function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        //GetAllAirLineWithPagination(string search_text, string RequestID, string pageNo)
        url: baseUrl() + "WebServices/WebService_DailyOpportunity.asmx/GetAllOpportunityWithPagination",
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'search_opportunity':'" + $("#tb_search").val() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
            ",'Sort':'" + $('#ddl_sorting').val() + "' " +
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
            $('#panel_list_background').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_list_background').loading('stop');
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
                .replace("[OpportunityID]", records[key]['OpportunityID'])
                .replace("[OpportunityDate]", JsonDateToFormat(records[key]['OpportunityDate'], 'DD-MM-YYYY'))
                .replace("[LeadName]", records[key]['LeadName'] == null ? "" : records[key]['LeadName'])
                .replace("[LeadCompany]", records[key]['LeadCompany'] == null ? "" : records[key]['LeadCompany'])
                .replace("[Source]", records[key]['Source'] == null ? "" : records[key]['Source'])
                .replace("[Status]", records[key]['Status']);
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


function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[0], parts[1] - 1, parts[2])
}
function change_date(status) {
    if (status == 'next') {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).add(1, 'day').format('YYYY/MM/DD');
    }
    else {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).subtract(1, 'day').format('YYYY/MM/DD');
    }
    $('#tb_search_from_date').val(newfromdate);
    $('#tb_search_from_date').periodpicker('change');
    Load_List_By_Date();
}

//#region SearchByDate

function Load_List_By_Date() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        //GetAllAirLineWithPagination(string search_text, string RequestID, string pageNo)
        url: baseUrl() + "WebServices/WebService_DailyOpportunity.asmx/GetAllByDate",
        data: "{ " +
            "'from_date':'" + $("#tb_search_from_date").val() + "' " +
            ",'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'search_opportunity':'" + $("#tb_search").val() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
            ",'Sort':'" + $('#ddl_sorting').val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list_by_date(data.d);
            }
            $('#panel_list_background').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_list_background').loading('stop');
        }
    });
}

function generate_list_by_date(records) {
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
                .replace("[OpportunityID]", records[key]['OpportunityID'])
                .replace("[OpportunityDate]", JsonDateToFormat(records[key]['OpportunityDate'], 'DD-MM-YYYY'))
                .replace("[LeadName]", records[key]['LeadName'] == null ? "" : records[key]['LeadName'])
                .replace("[LeadCompany]", records[key]['LeadCompany'] == null ? "" : records[key]['LeadCompany'])
                .replace("[Source]", records[key]['Source'] == null ? "" : records[key]['Source'])
                .replace("[Status]", records[key]['Status']);
        }

    });
    if (rowindex == 0) $('#panel_list').hide();
    else $('#panel_list').show();



    $('.list_count').html(rowindex - 1);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);



}
//#endregion SearchByDate











