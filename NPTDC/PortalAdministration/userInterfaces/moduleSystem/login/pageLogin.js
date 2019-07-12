//$.cookie('userid', '', { expires: 1, path: '/' });
//$.cookie('usercode', '', { expires: 1, path: '/' });
//$.cookie('username', '', { expires: 1, path: '/' });
//$.cookie('refid', '', { expires: 1, path: '/' });
//$.cookie('reftype', '', { expires: 1, path: '/' });
//$.cookie('StoreName', '', { expires: 1, path: '/' });
//$.cookie('StoreCode', '', { expires: 1, path: '/' });

//$.cookie('roleid', "", { expires: 1, path: '/' });
//$.cookie('rolename', "", { expires: 1, path: '/' });
//$.cookie('rolemenu', "", { expires: 1, path: '/' });
//$.cookie('orgName', "", { expires: 1, path: '/' });
//$.cookie('orgID', "", { expires: 1, path: '/' });
//$.cookie('orgCode', "", { expires: 1, path: '/' });

$('title').html("Login");
$('#usercode').focus();

//Declaration
var organziation = '';
var organization_id = '';
var provider = 'sbs';
var fb_email = '';
var fb_fname = '';
var fb_lname = '';

// if user is logged in this browser
//if ($.cookie('userid') != '' && $.cookie('userid') !=null && $.cookie('userid') != undefined){  
//    GotoPage("portal/modules");
//}
function loginVerification() {
    error_message = "";
    if (($.cookie('userid') != '' && $.cookie('userid') != undefined) && ($.cookie('usercode') != '' && $.cookie('usercode') != undefined)) {
        if ($('#usercode').val() != $.cookie('usercode')) {
            error_message += "Another user is already login.";
        }
        else {
            return true;
        }
    }
    if (error_message == "") { return true; }
    else {
        ShowErrorMessage(error_message);
        return false;
    }

}

function do_login() {
    if (loginVerification() == false)
        return;

    if ($('#usercode').val() == '' || $('#usercode').val() == null) {
        $('#usercode').focus();
        return;
    }
    if ($('#password').val() == '' || $('#password').val() == null) {
        $('#password').focus();
        return;
    }


    $.ajax({
        url: baseUrl() + "WebServices/WebService_System.asmx/do_login",
        data: "{ " +
        "'usercode':'" + $('#usercode').val() + "' " +
        ",'password':'" + $('#password').val() + "' " +
        " }",
        dataType: 'json',
        crossDomain: true,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                ShowSuccessMessage("Login Successful");
                $.cookie('userid', data.d["UserID"], { expires: 1, path: '/' });
                $.cookie('usercode', data.d["UserCode"], { expires: 1, path: '/' });
                $.cookie('username', data.d["UserName"], { expires: 1, path: '/' });
                $.cookie('useremail', data.d["Email"], { expires: 1, path: '/' });
                $.cookie('refid', data.d["Ref_ID"], { expires: 1, path: '/' });
                $.cookie('reftype', data.d["Ref_Type"], { expires: 1, path: '/' });
                $.cookie('roleid', data.d["RoleID"], { expires: 1, path: '/' });
                $.cookie('roleCode', data.d["RoleCode"], { expires: 1, path: '/' });
                $.cookie('rolemenu', data.d["RoleMenu"], { expires: 1, path: '/' });
                $.cookie('StoreName', data.d["AgentName"], { expires: 1, path: '/' });
                $.cookie('orgName', data.d["OrgName"], { expires: 1, path: '/' });
                $.cookie('orgID', data.d["OrgID"], { expires: 1, path: '/' });
                $.cookie('orgType', data.d["OrgType"], { expires: 1, path: '/' });
                $.cookie('orgCode', data.d["OrgCode"], { expires: 1, path: '/' });
                $.cookie('InvoiceType', data.d["InvoiceType"], { expires: 1, path: '/' });
                

                //if (data.d["Ref_Type"] == 'Admin')
                //    GotoPage("portal/users");   //dashboardSacouts  //dashboardAdmin //dashboardExpenses
                ////GotoPage("portal/dashboardAdmin");  
                ////GotoPage("portal/dashboardSacouts"); 
                //else

                CreateMenu();          //Build Menu according to user role      
               
            }
            else {
                $.cookie('userid', "", { expires: 1, path: '/' });
                $.cookie('usercode', "", { expires: 1, path: '/' });
                $.cookie('username', "", { expires: 1, path: '/' });
                $.cookie('refid', "", { expires: 1, path: '/' });
                $.cookie('reftype', "", { expires: 1, path: '/' });
                $.cookie('roleid', "", { expires: 1, path: '/' });
                $.cookie('roleCode', "", { expires: 1, path: '/' });
                $.cookie('rolemenu', "", { expires: 1, path: '/' });
                $.cookie('StoreName', "", { expires: 1, path: '/' });
                $.cookie('orgName', "", { expires: 1, path: '/' });
                $.cookie('orgType', "", { expires: 1, path: '/' });
                $.cookie('orgID', "", { expires: 1, path: '/' });
                $.cookie('InvoiceType', "", { expires: 1, path: '/' });
                ShowErrorMessage("User Name Or Password Is Wroung Please Check And Try Again! ");
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });
}

function CreateMenu() {
    //$('#panel_list_background').loading();
   
    $.ajax({

        url: baseUrl() + "WebServices/WebService_UserRole.asmx/GetUserRoleMenuResult",
        data: "{ " +
            "'RoleID':'" + $.cookie('roleid') + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                localStorage.setItem('module_menu', JSON.stringify(data.d.ModuleMenu));
                localStorage.setItem('main_menu', JSON.stringify(data.d.MainMenu));
                GotoPage("portal/modules");
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            //$('#panel_list_background').loading('stop');
        }
    });

}

function ForgotPassword() {

    if ($('#forgot_mail').val() === '') {
        ShowErrorMessage("Please enter email address!"); return false;
    }
    else {
        $.ajax({
            url: baseUrl() + "WebServices/WebService_ForgtPassword.asmx/ForgotPassword",
            data: "{ " +
            "'to_mail':'" + $('#forgot_mail').val() + "' " +
            " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (data.d.toString().split('~')[0] == "Not Register") {
                    ShowErrorMessage("This email address is not registerd. Please Sign Up");

                }
                else if (data.d.toString().split('~')[0] == "success") {
                    ShowSuccessMessage("We are already sent new password to your mail. Please link to your mail and get password.");

                }

            },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            }
        });
    }
}


// Signup

$('#tb_org').click(function () {
    show_orgmodal();
});

$('#tb_org').keypress(function () {
    show_orgmodal();
});

$('#tb_org').focus(function () {
    show_orgmodal();
});


$("#btn_register").click(function () {
    if (validation_signup()) {
        do_signup();
    }
});

function validation_signup() {
    if ($('#tb_fname').val() == '' || $('#tb_fname').val() == null) {
        ShowErrorMessage("Please enter the first name!");
        return false;
    }
    if ($('#tb_org').val() == '' || $('#tb_org').val() == null) {
        ShowErrorMessage("Please add the organization!");
        return false;
    }

    if ($('#tb_password').val() == '' || $('#tb_password').val() == null) {
        ShowErrorMessage("Please enter the password!");
        return false;
    }

    if ($('#tb_password').val() != $('#tb_ps_confirm').val()) {
        ShowErrorMessage("Password doesn't match!");
        return false;
    }

    if (!$('#ch_terms').is(":checked")) {
        $('#ch_terms').focus();
        return false;
    }

    if (!isValidEmailAddress($('#tb_email').val())) {
        ShowErrorMessage("Invalid email address!");
        return false;
    }
    return true;
}


function save_org() {

    if ($('#tb_orgname_save').val() == '' || $('#tb_orgname_save').val() == null) {
        $('#tb_orgname_save').focus();
        return;
    }
    if ($('#tb_orgcode_save').val() == '' || $('#tb_orgcode_save').val() == null) {
        $('#tb_orgcode_save').focus();
        return;
    }
    do_saveorganization();
}

function do_saveorganization() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/do_saveorganization",
        data: JSON.stringify({
            org_id: $('#hd_orgid').val(),
            org_name: $('#tb_orgname_save').val(),
            org_code: $('#tb_orgcode_save').val()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (data.d.toString().split('~')[0] == "Success") {
                    $('#tb_org').val($('#tb_orgname_save').val());
                    $('#hd_orgid').val(data.d.toString().split('~')[1]);
                    organization_id = data.d.toString().split('~')[1];

                    if (provider == 'sbs') {
                        hide_orgmodal();
                    } else if (provider == 'facebook') {
                        do_signup();
                        // checkFBLoginState();
                    }
                    else if (provider == 'twitter') {

                    }
                    else {

                    }
                }
            }
            else {
                LogJSError("Oops. " + data.d.toString().split('~')[1]);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });
}


function do_signup() {

    var aa = organization_id;

    var fname = fb_fname;
    var lname = fb_lname;
    var email = fb_email;
    var password = '';

    if (provider == 'sbs') {
        organization_id = $('#hd_orgid').val();
        fname = $('#tb_fname').val();
        lname = $('#tb_lname').val();
        email = $('#tb_email').val();
        password = $('#tb_password').val();
    }

    $.ajax({
        url: baseUrl() + "WebServices/WebService_System.asmx/do_signup",
        data: JSON.stringify({
            fname: fname,
            lname: lname,
            orgid: organization_id,
            email: email,
            password: password,
            provider: provider
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $('#hd_orgid').val('');
                // redirect to login page 
                if (provider == 'sbs') {
                    bootbox.alert({
                        title: "INFORMATION",
                        message: "Successfully Account Register. Please Login.",
                        closeButton: false,
                        callback: function () {
                            GotoPage('portal/login');
                        }
                    });
                }
                else// with other provider
                {
                    $.cookie('userid', data.d.toString().split('~')[1], { expires: 1, path: '/' });
                    GotoPage("portal/modules");
                }
            }
            else {
                LogJSError("Oops. " + data.d.toString().split('~')[1]);
            }
        },
        error: function (xhr, msg) {
            LogJSError("Oops. " + data.d.toString().split('~')[1]);
        }
    });
}

//facebook authentication
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        testAPI();
    } else {
        // The person is not logged into your app or we are unable to tell.
        //document.getElementById('status').innerHTML = 'Please log ' +
        //    'into this app.';
    }

}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkFBLoginState() {
    FB.getLoginStatus(function (response) {
        if (response.status == "not_authorized") {
            FB.login(function (response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function (response) {
                        console.log('Good to see you, ' + response.name + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        } else if (response.status == "unknown") {
            FB.login(function (response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function (response) {
                        console.log('Good to see you, ' + response.name + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }
        statusChangeCallback(response);
    });
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.

var fb_email = '';
var fb_fname = '';
var fb_lname = '';

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me',
        { fields: "id,age_range,picture,birthday,email,first_name,last_name,gender,hometown,link,location,middle_name,name,timezone,website,work" },
        function (response) {
            console.log("fetching info:" + response);
            console.log('Successful login for: ' + response.name + response.first_name + " " + response.email);
            fb_email = response.email;
            fb_fname = response.name;
            fb_lname = '';

            provider = 'facebook';
            // retrieve organization of current user   
            if (fb_email != '' && fb_email != null && fb_email != undefined) {
                get_orgbycurrentuser(fb_email);
            }

        });
}

function get_orgbycurrentuser(email) {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_System.asmx/do_getorganization",
        data: JSON.stringify({
            email: email
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                organization_id = data.d.toString().split('~')[1];

            }
            else {
                LogJSError("Oops. " + data.d.toString().split('~')[1]);
            }


            if (organization_id == '' || organization_id == null || organization_id == undefined) {
                show_orgmodal();
            }
            else { // already register in  SBSPortal
                do_loginwithfacebookuser();
            }
        },
        error: function (xhr, msg) {
            LogJSError("Oops. " + data.d.toString().split('~')[1]);
        }
    });
}

function hide_orgmodal() {
    $('#org-modal').modal('hide');
}

function show_orgmodal() {
    $('#org-modal').modal('show');
}


function facebook_authen() {
    checkFBLoginState();
    provider = 'facebook';

}

function twitter_authen() {
    show_orgmodal();
    provider = 'twitter';
}

function google_authen() {
    show_orgmodal();
    provider = 'google';
}

function loginByFacebook() {
    FB.login(function (response) {
        if (response.authResponse) {
            FacebookLoggedIn(response);
            //testAPI();
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, { scope: 'public_profile,email' });
}

function FacebookLoggedIn(response) {
    var loc = 'https://bandaryae.com/portal/facebook-backend';
    if (loc.indexOf('?') > -1)
        window.location = loc + '&authprv=facebook&access_token=' + response.authResponse.accessToken;
    else
        window.location = loc + '?authprv=facebook&access_token=' + response.authResponse.accessToken;
}


function do_loginwithfacebookuser() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_System.asmx/do_login",
        data: "{ " +
        "'usercode':'" + fb_email + "' " +
        ",'password':'" + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d !== null && data.d['Note'] == 'Success') {
                ShowSuccessMessage("Login Successful");
                $.cookie('userid', data.d["UserID"], { expires: 1, path: '/' });
                $.cookie('usercode', data.d["UserCode"], { expires: 1, path: '/' });
                $.cookie('username', data.d["UserName"], { expires: 1, path: '/' });
                $.cookie('useremail', data.d["Email"], { expires: 1, path: '/' });
                $.cookie('refid', data.d["Ref_ID"], { expires: 1, path: '/' });
                $.cookie('reftype', data.d["Ref_Type"], { expires: 1, path: '/' });
                $.cookie('roleid', data.d["RoleID"], { expires: 1, path: '/' });
                $.cookie('rolename', data.d["RoleName"], { expires: 1, path: '/' });
                $.cookie('rolemenu', data.d["RoleMenu"], { expires: 1, path: '/' });
                $.cookie('StoreName', data.d["AgentName"], { expires: 1, path: '/' });
                $.cookie('orgName', data.d["OrgName"], { expires: 1, path: '/' });
                $.cookie('orgID', data.d["OrgID"], { expires: 1, path: '/' });
                $.cookie('orgCode', data.d["OrgCode"], { expires: 1, path: '/' });

                //if (data.d["Ref_Type"] == 'Admin')
                //    GotoPage("portal/users");   //dashboardSacouts  //dashboardAdmin //dashboardExpenses
                ////GotoPage("portal/dashboardAdmin");  
                ////GotoPage("portal/dashboardSacouts"); 
                //else

                GotoPage("portal/modules");
            }
            else if (data.d !== null && data.d['Note'] != 'Success') {

                $.cookie('userid', "", { expires: 1, path: '/' });
                $.cookie('usercode', "", { expires: 1, path: '/' });
                $.cookie('username', "", { expires: 1, path: '/' });
                $.cookie('refid', "", { expires: 1, path: '/' });
                $.cookie('reftype', "", { expires: 1, path: '/' });
                $.cookie('roleid', "", { expires: 1, path: '/' });
                $.cookie('rolename', "", { expires: 1, path: '/' });
                $.cookie('rolemenu', "", { expires: 1, path: '/' });
                $.cookie('StoreName', "", { expires: 1, path: '/' });
                $.cookie('orgName', "", { expires: 1, path: '/' });
                $.cookie('orgID', "", { expires: 1, path: '/' });

                ShowErrorMessage(data.d['Note']);
            }
            else {
                $.cookie('userid', "", { expires: 1, path: '/' });
                $.cookie('usercode', "", { expires: 1, path: '/' });
                $.cookie('username', "", { expires: 1, path: '/' });
                $.cookie('refid', "", { expires: 1, path: '/' });
                $.cookie('reftype', "", { expires: 1, path: '/' });
                $.cookie('roleid', "", { expires: 1, path: '/' });
                $.cookie('rolename', "", { expires: 1, path: '/' });
                $.cookie('rolemenu', "", { expires: 1, path: '/' });
                $.cookie('StoreName', "", { expires: 1, path: '/' });
                $.cookie('orgName', "", { expires: 1, path: '/' });
                $.cookie('orgID', "", { expires: 1, path: '/' });

                ShowErrorMessage('User Name Or Password Is Wroung Please Check And Try Again! ');
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });
}
