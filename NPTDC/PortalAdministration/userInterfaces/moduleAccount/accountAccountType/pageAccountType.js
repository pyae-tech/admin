$('title').html(get_current_organization_title() + "Account Type");

$('#menu_account').addClass('active-sub');
$('#menu_account_group').addClass('in');
$('#menu_account_AccountType').addClass('active-link');


$("#tab-main").tabs();

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetRecord(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");


$('#tb_search_text').keyup(function (e) {
    Load_List();
});


// checkbox change
$('#cb_isparent').on('change', function () {
    if ($('#cb_isparent').is(':checked'))//ture
    {
        $("#choose_parent").css("display", "none");       
    }
    else
    {
        $("#choose_parent").css("display", "block");
    }
       

});


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

//#region Listing
function clearSearch() {
    $('#tb_search_text').val('');
    $('#tb_search_accouttype').val('');
    $('#hf_current_page').val("1");
   
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
    Load_List();
}

function search() {
    $('#tb_search_text').val();
    $('#tb_search_accouttype').val();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
    Load_List();

}

function LoadNew() {

    $("#tab_detail_header").html('Create New Account Type');
    $("#tb_id").val("");
    $("#cb_isparent").prop("checked", true);//checkbox
    if ($('#cb_isparent').is(':checked'))//ture
    {
        $("#choose_parent").css("display", "none");
    }
    $("#tb_ParentID").val(""); 
    $("#tb_accoutType_name").val("");
    $("#tb_account_code").val("");
    $("#tb_seq").val("");
    $("#tb_remark").val("");

  
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");

    $('#dialogBox_Detail_Form').modal('show');
    $("#tb_accoutType_name").focus();

    //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_accoutType_name').focus();
    });

}

Load_List();
function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_AccoutType.asmx/GetAllAccountTypeWithPagination",
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'search_accounttype':'" + $("#tb_search_accouttype").val()  + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'pageNo':'" + $('#hf_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list(data.d);
                $('#panel_list_background').loading('stop');
            }
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
        
                .replace("[AccountTypeID]", records[key]['AccountTypeID'])
                .replace("[Title]", records[key]['Title'])
                .replace("[AccountTypeCode]", records[key]['AccountTypeCode'])
                .replace("[ShowSeq]", records[key]['ShowSeq'])
                .replace("[Remark]", records[key]['Remark'] == null ? '' : records[key]['Remark']);
              
        }

    });
    if (rowindex == 0) $('#panel_list').hide();
    else {
        $('#panel_list').show();
    }

    $('.list_count').html(rowindex-1);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);
}

Load_Parent_List();
function Load_Parent_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_AccoutType.asmx/GetAllParentAccountType",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_ParentID").empty();
                $("#tb_ParentID").append("<option value=''>" + "Choose Accout Type" + "</option>");
              $.each(data.d, function (key, val) {
                  $("#tb_ParentID").append("<option value=" + data.d[key]['AccountTypeID'] + ">" + data.d[key]['AccountTypeName'] + "</option>");
                  })
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

function GetAccountType(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_AccoutType.asmx/GetAccountType",
        data: "{ " +
            "'account_type_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["AccountTypeID"]);

                $("#tab_detail_header").html(data.d["AccountTypeName"]);

                if (data.d['IsParent'] == true)               
                { //parent             
                    $("#cb_isparent").prop("checked", true);
                    $("#tb_ParentID").val(""); 
                    $("#choose_parent").css("display", "none");
                }
                else {   // child
                 
                    $("#cb_isparent").prop("checked", false);
                    $("#tb_ParentID").val(data.d["ParentAccountTypeID"]);  
                    $("#choose_parent").css("display", "block");
                }

                $("#tb_accoutType_name").val(data.d["AccountTypeName"]);
                $("#tb_account_code").val(data.d["AccountTypeCode"]);
                $("#tb_seq").val(data.d["ShowSeq"]);
                $("#tb_remark").val(data.d["Remark"]);

                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));

                //$("#tab-main").tabs("option", "active", 0);
                //$(".tab-menu").removeClass("active");
                //$("#tab_list_menu").addClass("active");
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

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_accoutType_name").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "AccountType Name Need To Be Fill"
    }

    if (!$("#cb_isparent").is(":checked")) {
        if ($("#tb_ParentID").val() == "") {
            if (error_message != "") error_message += "<br/>";
            error_message += "Choose Item Type "
        }
    }


    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveAccountType() {
    if (SaveRecordVerification() == false)
        return;

    Pace.start();


    $.ajax({
        url: baseUrl() + "WebServices/WebService_AccoutType.asmx/SaveAccountType",
        data: "{ " +
            "'account_type_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'accounttype_name':'" + $("#tb_accoutType_name").val() + "' " +
            ",'accounttype_code':'" + $("#tb_account_code").val() + "' " +
            ",'seq':'" + $("#tb_seq").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'IsParent':'" + $("#cb_isparent").is(":checked") + "'" +//checkbox
            ",'remark':'" + $("#tb_remark").val() + "' " +
            ",'parent_accounttypeid':'" + $("#tb_ParentID").val() + "' " +



            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_id").val(data.d.toString().split('~')[1]);
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


//#region Delete
function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteAccountType");
}
function DeleteAccountType() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_AccoutType.asmx/DeleteAccountType",
        data: "{ " +
            "'account_type_id':'" + $("#tb_id").val() + "' " +
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