$('title').html(get_current_organization_title() + "System Programs");
 
$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_system_program').addClass('active-link');

 
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

Load_List();

//#region Listing
function clearSearch() {
    $('#tb_search_text').val('');
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

        url: baseUrl() + "WebServices/WebService_Program.asmx/GetAllProgram",
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
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


        allCardsCode += the_template.replace()
            .replace("[ProgramID]", records[key]['ProgramID'])
            .replace("[ProgramName]", records[key]['ProgramName'])
            .replace("[ProgramCode]", records[key]['ProgramCode'])


    });
    if (rowindex == 0) $('#panel_list').hide();
    else {
        $('#panel_list').show();
    }

    $('.list_count').html(rowindex);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);

}



//#endregion

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_name").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Program  Name Need To Be Fill"
    }
    if ($("#tb_code").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Program Code Need To Be Fill"
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveProgram() {
    if (SaveRecordVerification() == false)
        return;

    Pace.start();

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Program.asmx/SaveProgram",
        data: "{ " +
            "'record_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'program_name':'" + $("#tb_name").val() + "' " +
            ",'program_code':'" + $("#tb_code").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
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

//#region New Record
function LoadNew() {
    Pace.start();
    $("#tab_detail_header").html('Add New Program');

    $("#tb_id").val("");
    $("#tb_code").val("");
    $("#tb_name").val("");
    $("#lbl_created").text("");
    $("#lbl_modified").text("");


    $("#tab-main").tabs("option", "active", 1);
    $(".tab-menu").removeClass("active");
    $("#tab_detail_menu").addClass("active");

    $("#tb_name").focus();

    $('#dialogBox_Detail_Form').modal('show');
}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteProgram");
}
function DeleteProgram() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Program.asmx/DeleteProgram",
        data: "{ " +
            "'record_id':'" + $("#tb_id").val() + "' " +
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
function GetProgram(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Program.asmx/GetProgram",
        data: "{ " +
            "'record_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["ProgramID"]);

                $("#tab_detail_header").html(data.d["ProgramName"]);

                $("#tb_name").val(data.d["ProgramName"]);
                $("#tb_code").val(data.d["ProgramCode"]);

                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + moment(data.d["CreatedOn"]).format('DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + moment(data.d["ModifiedOn"]).format('DD/MM/YYYY HH:mm'));
           
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




