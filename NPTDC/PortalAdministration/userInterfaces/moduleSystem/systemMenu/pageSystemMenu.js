$('title').html(get_current_organization_title() + "SystemMenu");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_system_menu').addClass('active-link');

 
$("#tab-main").tabs();

$('#tb_search_text').keyup(function (e) {
    Load_SysMenu_List();
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetSysMenu(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

Load_SysMenu_List();
ShowNodeMenu();
function ShowNodeMenu() {
    if ($("#cb_isnode").is(":checked")) {
        $("#isNodeMenu").css("display", "none");
    }
    else {
        $("#isNodeMenu").css("display", "block");
    }
}
//#region Listing
function clearSearch() {

    $('#tb_search_text1').val('');
    Load_SysMenu_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}


function search() {

    Load_SysMenu_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");

}

Load_NodeMenu_List();
function Load_NodeMenu_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_SystemMenu.asmx/GetAllMenu",
        data: "{ " +
            "'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#ddl_notemenu").empty();
                $("#ddl_notemenu").append("<option value=''>" + "Choose Node Menu..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#ddl_notemenu").append("<option value=" + data.d[key]['MenuID'] + ">" + data.d[key]['MenuName'] + "</option>");
                });
                $('#ddl_notemenu').chosen().change();
                if ($('#hf_notemenu').val() != "") {
                    $('#ddl_notemenu').val($('#hf_notemenu').val()).trigger("chosen:updated");
                }
              
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function Load_SysMenu_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_SystemMenu.asmx/GetAllSysMenuWithPagination",
        data: "{ " +
        "'search_text':'" + $("#tb_search_text").val() + "' " +
        ",'search_sysmenu':'" + $("#tb_search_text1").val() + "' " +
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
                .replace("[MenuID]", records[key]['MenuID'])
                .replace("[MenuName]", records[key]['MenuName'])
                .replace("[MenuLabel]", records[key]['MenuLabel'])
                .replace("[MenuLinkPage]", records[key]['MenuLinkPage']);
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
    Load_SysMenu_List();
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    Load_SysMenu_List();
}

//#endregion

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_menuname").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Menu Name No Needs To Be Filled."
    }

    var inamt = $("#tb_menuseq");
    if (inamt.val() != "") {

        if (isNaN(inamt.val())) {
            error_message += "\n";
            error_message += "Menu Seq should be numeric."

        }


        if (error_message == "") { return true; }
        else {
            ShowErrorBoxMessage(error_message);
            return false;
        }

    }
}

    function SaveSysMenu() {

        if (SaveRecordVerification() == false)
            return;
        Pace.start();
        $.ajax({
            url: baseUrl() + "WebServices/WebService_SystemMenu.asmx/SaveSysMenu",
            data: "{ " +
            "'menu_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'menu_name':'" + $("#tb_menuname").val() + "' " +            
            ",'menu_label':'" + encodeURI($("#tb_menulabel").val()) + "' " +
            ",'menu_icon':'" + $('#tb_menuicon').val() + "' " +
            ",'menu_linkpage':'" + $("#tb_menulinkpage").val() + "' " +
            ",'menu_onclick':'" + $("#tb_menuclick").val() + "' " +
            ",'menu_seq':'" + $("#tb_menuseq").val() + "' " +
            ",'is_node':'" + $("#cb_isnode").is(":checked") + "'" +
            ",'noteMenuID':'" + $("#ddl_notemenu").val() + "' " +                
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d.toString().split('~')[0] == "Success") {
                    Load_SysMenu_List();
                    Load_SysMenu_TreeView();
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
        $("#tb_id").val("");
        $("#tb_menuname").val("");
        $("#tb_menulabel").val("");
        $("#tb_menuicon").val("");
        $("#tb_menulinkpage").val("");
        $("#tb_menuclick").val("");
        $("#tb_menuseq").val("");
        $("#cb_isnode").prop("checked", false);

        $("#lbl_created").text("");
        $("#lbl_modified").text("");
        $("#lbl_lastlogin").text("");

        //$('#dialogBox_Detail_Form').modal('show');

        //for focus on adding new data
        $("#tb_menuname").focus();

        //for focus on first page load
        //$('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        //    $(this).find('#tb_menuname').focus();
        //});
    }
    //#endregion


    //#region Delete

    function DeleteRecordConfirmation() {
        ShowConfirmation("Are you sure you want to delete?", "DeleteSysMenu");
    }
    function DeleteSysMenu() {
        Pace.start();
        $.ajax({
            url: baseUrl() + "WebServices/WebService_SystemMenu.asmx/DeleteSysMenu",
            data: "{ " +
            "'menu_id':'" + $("#tb_id").val() + "' " +
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
    function GetSysMenu(id) {
        Pace.start();
        $.ajax({
            url: baseUrl() + "WebServices/WebService_SystemMenu.asmx/GetSysMenu",
            data: "{ " +
            "'menu_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d != null) {

                    $("#tb_id").val(data.d["MenuID"]);

                    $("#tb_menuname").val(data.d["MenuName"]);                  

                    $("#tb_menulabel").val(data.d["MenuLabel"]);
                    $("#tb_menuicon").val(data.d["IconClass"]);
                    $("#tb_menulinkpage").val(data.d["MenuLinkPage"]);
                    $("#tb_menuclick").val(data.d["MenuOnClick"]);
                    $("#tb_menuseq").val(data.d["MenuSeq"]);

                    if (data.d['IsNode'] == true) {
                        $("#cb_isnode").prop("checked", true);
                    }
                    else {
                        $("#cb_isnode").prop("checked", false);
                        }
                    ShowNodeMenu();

                    var my_val = data.d["NoteMenuID"];
                    $("#ddl_notemenu").val(my_val).trigger("chosen:updated");


                    $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                    $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));

                    ShowSuccessMessage("Loaded.");
                    //$('#dialogBox_Detail_Form').modal('show');
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

//#region TreeView
Load_SysMenu_TreeView();
treeView_menu_name = "";
running_no = 0;
function Load_SysMenu_TreeView() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_SystemMenu.asmx/GetAllMenuTreeView",
        data: "{ " + 
            "'RequestID':'" + get_current_user_id() + "' " + 
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $('#treeview_room').html("");

                treeView_menu_name = "treeView_menu" + running_no;
                $('#treeview_room').append("<div id='" + treeView_menu_name + "'></div>");
                running_no = running_no + 1;
                $('#' + treeView_menu_name).html(data.d);
                $('#' + treeView_menu_name).jstree({
                    "crrm": {
                        "move": {
                            "check_move": function (m) {
                               // console.log(m);
                                if (m.p == "before" || m.p == "after")
                                    return false;
                                if (m.o.attr('movable'))
                                    return true;
                                else
                                    return false;


                            }
                        }
                    },
                    'core': {
                        'check_callback': true
                    },
                    'plugins': ['types', 'dnd'],
                    'types': {
                        'default': {
                            'icon': 'demo-psi-folder'
                        },
                        'html': {
                            'icon': 'demo-psi-file-html'
                        },
                        'file': {
                            'icon': 'demo-psi-file'
                        },
                        'jpg': {
                            'icon': 'demo-psi-file-jpg'
                        },
                        'zip': {
                            'icon': 'demo-psi-file-zip'
                        }
                      }
                  
                }).bind("move_node.jstree", function (e, data) {
                    console.log(e); console.log(data); 
                    var move_node = data;
                    ChangeSequence(data);
                   
                    //alert('this move is not allowed');
                });
         


                $('#' + treeView_menu_name).on("changed.jstree", function (e, data) {
                     
                    GetSysMenu(data.selected);
                });
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function ChangeSequence(move_node) {
    //if (move_node.parent == move_node.old_parent)
    //{
        var ids = move_node.instance._model.data[move_node.parent].children.toString();
        $.ajax({
            url: baseUrl() + "WebServices/WebService_SystemMenu.asmx/ChangeSysMenu",
            data: "{ " +
                "'menu_ids':'" + ids + "' " + 
                ",'oldnoteMenuID':'" + move_node.old_parent + "' " +
                ",'noteMenuID':'" + move_node.parent + "' " +
                ",'RequestID':'" + get_current_user_id() + "' " +
                " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d.toString().split('~')[0] == "Success") {
                    Load_SysMenu_List();
                    Load_SysMenu_TreeView();
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
    //}
}
 
//#endregion