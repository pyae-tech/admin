$('title').html(get_current_organization_title() + "System Roles");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_system_role').addClass('active-link');


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

        url: baseUrl() + "WebServices/WebService_UserRole.asmx/GetAllUserRole",
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
            .replace("[RoleID]", records[key]['RoleID'])
            .replace("[RoleName]", records[key]['RoleName'])
            .replace("[RoleCode]", records[key]['RoleCode'])


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

var menu_check_list = '';
function SaveUserRole() {
    if (SaveRecordVerification() == false)
        return;

    Pace.start();

    $.ajax({
        url: baseUrl() + "WebServices/WebService_UserRole.asmx/SaveUserRole",
        data: "{ " +
            "'record_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'role_name':'" + $("#tb_name").val() + "' " +
            ",'role_code':'" + $("#tb_code").val() + "' " +
            ",'menulist':'" + menu_check_list + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +



            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_id").val(data.d.toString().split('~')[1]);
                ShowSuccessMessage("Saved.");
                Load_List();
                Load_Program_Roles($("#tb_id").val());
                if ($("#tb_id").val() == $.cookie('roleid')) {
                    ShowConfirmation("Your menu is changed.Do You want to log out to see changes?", "logout", "dologout");
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


//#region New Record
function LoadNew() {
    Pace.start();
    $("#tab_detail_header").html('Add New User Role');

    $("#tb_id").val("");
    $("#tb_code").val("");
    $("#tb_name").val("");
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#tb_menu").val("");
    $('#dialogBox_Detail_Form').modal('show');
    $("#tb_name").focus();


    //$('#menu - list').empty();
    $('#table_item_list').empty();
    Load_Menus();
    //for (var i = 0; i < menu_list_id.length; i++) {// all menu id       
    //    $('#ch_menu_' + menu_list_id[i]).prop('checked', false);
    //}


    $('#dialogBox_Detail_Form').on('shown.bs.modas', function () {
        $(this).find('#tb_name').focus();
    });


}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteUserRole");
}
function DeleteUserRole() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_UserRole.asmx/DeleteUserRole",
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
function GetUserRole(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_UserRole.asmx/GetUserRole",
        data: "{ " +
            "'record_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["RoleID"]);

                $("#tab_detail_header").html(data.d["RoleName"]);

                $("#tb_name").val(data.d["RoleName"]);
                $("#tb_code").val(data.d["RoleCode"]);
                $("#tb_menu").val(data.d["RoleMenu"]);
                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + moment(data.d["CreatedOn"]).format('DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + moment(data.d["ModifiedOn"]).format('DD/MM/YYYY HH:mm'));
                //  $('#treeView_menu').empty();
                Load_SysMenu_TreeView(data.d["RoleID"]);
                RoleMenuList(id);
                Load_Program_Roles(id);
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

// RoleMenuList

function RoleMenuList(id) {
    var arr_user_menu = [];
    //#region Get UserRoleMenu
    $.ajax({
        url: baseUrl() + "WebServices/WebService_UserRole.asmx/GetUserRoleMenu",
        data: "{ " +
            "'role_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                records = data.d;
                $.each(records, function (key, val) {
                    arr_user_menu.push(records[key]['MenuID']); // check ids
                });
            }

            //// checkon 


            //for (var j = 0; j < arr_user_menu.length;j++)
            //{
            // for (var i = 0; i < menu_list_id.length;i++){// all menu id
            //     if (menu_list_id[i] == arr_user_menu[j]) {// 0,1
            //$('#ch_menu_' + arr_user_menu[j]).prop('checked', true);

            //         var instance = $('#treeView_menu').jstree(true);
            //         if (instance != false) {
            //             instance.select_node(arr_user_menu[j]);
            //         }
            //     }
            //}
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });
}
//#endregion

//#region Load Program Role
function Load_Program_Roles(id) {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_UserRole.asmx/GetProgramUserRole",
        data: "{ " +
            "'roleid':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_program_roles(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_program_roles(records) {
    var allCardsCodeITEM = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;


        _isCreate = "";
        if (records[key]['AllowCreate'] == true) _isCreate = "checked";
        _isUpdate = "";
        if (records[key]['AllowUpdate'] == true) _isUpdate = "checked";
        _isView = "";
        if (records[key]['AllowView'] == true) _isView = "checked";
        _isDelete = "";
        if (records[key]['AllowDelete'] == true) _isDelete = "checked";
        _isAllowDecision = "";
        if (records[key]['AllowDecision'] == true) _isAllowDecision = "checked";
        _isAllowAllDepartment = "";
        if (records[key]['AllowAllDepartment'] == true) _isAllowAllDepartment = "checked";

        the_item_template = $('#template_item_row').html();
        allCardsCodeITEM += the_item_template.replace()
            .replace("[ProgramID]", records[key]['ProgramID'])
            .replace("[ProgramID]", records[key]['ProgramID'])
            .replace("[ProgramID]", records[key]['ProgramID'])
            .replace("[ProgramID]", records[key]['ProgramID'])
            .replace("[ProgramID]", records[key]['ProgramID'])
            .replace("[ProgramID]", records[key]['ProgramID'])

            .replace("[ProgramName]", records[key]['ProgramName'])
            .replace("[is_create_checked]", _isCreate)
            .replace("[is_view_checked]", _isView)
            .replace("[is_update_checked]", _isUpdate)
            .replace("[is_delete_checked]", _isDelete)
        .replace("[is_allowdecision_checked]", _isAllowDecision)
            .replace("[is_allowalldepartment_checked]", _isAllowAllDepartment)




    });
    if (rowindex == 0) $('#panel_item_list').hide();
    else {
        $('#panel_item_list').show();
    }

    $('#table_item_list').empty();
    $('#table_item_list').append(allCardsCodeITEM);

}


//#endregion

//#region Set Record
function SetProgramRoles(id, type, control) {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_UserRole.asmx/SetProgramRoles",
        data: "{ " +
            "'role_id':'" + $("#tb_id").val() + "' " +
            ",'program_id':'" + id + "' " +
            ",'type':'" + type + "' " +
            ",'data':'" + ($(control).is(":checked")) + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {

                ShowSuccessMessage("Updated Successfully.");
                Load_Program_Roles(($("#tb_id").val()));
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


//#region Menu_List
Load_Menus();



function Load_Menus() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_SystemMenu.asmx/GetAllMenu",
        data: "{ " +
             //"'role_id':'" + $("#tb_id").val() + "' " +
            "'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_menu_roles(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

var menu_list_id = [];
function generate_menu_roles(records) {
    var allCardsCodeMenu = '';

    $.each(records, function (key, val) {
        the_item_template = $('#menu-template').html();
        allCardsCodeMenu += the_item_template.replace()
            .replace("[MenuID]", records[key]['MenuID'])
            .replace("[MenuID]", records[key]['MenuID'])
            .replace("[MenuID]", records[key]['MenuID'])
            .replace("[MenuID]", records[key]['MenuID'])
            .replace("[MenuName]", records[key]['MenuName']);


        menu_list_id.push(records[key]['MenuID']);
    });

    $('#menu-list').empty();
    $('#menu-list').append(allCardsCodeMenu);

}



//#endregion Menu_List

//#region TreeView
//Load_SysMenu_TreeView();
treeView_menu_name = "";
running_no = 0;
function Load_SysMenu_TreeView(id) {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_SystemMenu.asmx/GetAllMenuTreeViewByRole",
        data: "{ " +
            "'RoleID':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
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
                    'core': {
                        'check_callback': true
                    },
                    'plugins': ['types', 'checkbox'],
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
                    },
                    "checkbox": {
                        "keep_selected_style": false,
                        "two_state": true
                    }

                }).bind("loaded.jstree", function (event, data) {
                    $('li[selected=selected]').each(function () {
                        $(this).removeClass('jstree-unchecked').addClass('jstree-checked');
                    });
                });


                $('#' + treeView_menu_name).on("changed.jstree", function (e, data) {
                    //if (data.action == "select_node") {
                    //    if (!data.selected.includes(data.node.parent)) {
                    //        if (data.node.parent != "#") {
                    //            data.selected.push(data.node.parent);
                    //        }

                    //    }
                    //}
                    menu_check_list = data.selected;
                });
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
//#endregion






