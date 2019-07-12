<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pageLogin.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.login.pageLogin" %>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Login page | Nifty - Admin Template</title>


    <!--STYLESHEET-->
    <!--=================================================-->

    <!--Open Sans Font [ OPTIONAL ]-->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>


    <!--Bootstrap Stylesheet [ REQUIRED ]-->
    <link href='<%= ResolveUrl("../../../css/bootstrap.min.css")%>' rel="stylesheet">


    <!--Nifty Stylesheet [ REQUIRED ]-->
    <link href='<%= ResolveUrl("../../../css/nifty.min.css")%>' rel="stylesheet"> 

     <!--Nifty Stylesheet [ REQUIRED ]-->
    <link href='<%= ResolveUrl("../../../css/nifty.css")%>' rel="stylesheet"> 


    <!--Nifty Premium Icon [ DEMONSTRATION ]-->
    <link href='<%= ResolveUrl("../../../css/demo/nifty-demo-icons.min.css")%>' rel="stylesheet">
    <link href='<%= ResolveUrl("../../../plugins/toastr/toastr.css")%>' rel="stylesheet" />

    <!--=================================================-->

    <!--Pace - Page Load Progress Par [OPTIONAL]-->
    <link href='<%= ResolveUrl("../../../plugins/pace/pace.min.css")%>' rel="stylesheet"> 


        
    <!--Demo [ DEMONSTRATION ]-->
    <link href='<%= ResolveUrl("../../../css/demo/nifty-demo.min.css")%>' rel="stylesheet">
     <link rel="shortcut icon" type="text/x-html-insertion" href='<%=ResolveUrl("../../../img/bg-img/favicon.ico") %>'>
     
    <style>
        .demo-my-bg{
            background-image: url(../../../PortalAdministration/img/bg-img/bg-img-3.jpg);
        }
    </style>
    
  
</head>

<!--TIPS-->
<!--You may remove all ID or Class names which contain "demo-", they are only used for demonstration. -->

<body>
    <div id="container" class="cls-container">
        
		<!-- BACKGROUND IMAGE -->
		<!--===================================================-->
		<div id="bg-overlay"  class="bg-img"  style="background-image: url(../../../PortalAdministration/img/bg-img/bg-img-3.jpg)"></div>
		
		
		<!-- LOGIN FORM -->
		<!--===================================================-->
      
		<div class="cls-content">
		    <div class="cls-content-sm panel">
		        <div class="panel-body">
		            <div class="mar-ver pad-btm">
                      
		                <h1 class="h3">ဘ႑ာေရး.com</h1>
		                <p>Sign In to your account</p>
		            </div>
		            <form>
		                <div class="form-group">
		                    <input type="text" class="form-control"  placeholder="Username" autofocus id="usercode">
		                </div>
		                <div class="form-group">
		                    <input type="password" class="form-control" placeholder="Password" id="password">
		                </div>
		                <div class="checkbox pad-btm text-left">
                             <a href="forget" class="btn-link mar-rgt">Forgot password ?</a>
		                 <%--   <input id="demo-form-checkbox" class="magic-checkbox" type="checkbox">
		                    <label for="demo-form-checkbox">Remember me</label>--%>
		                </div>
		                <button class="btn btn-primary btn-lg btn-block" onclick="do_login();return false;">Sign In</button>
		            </form>
		        </div>
	     <%--   <div class="pad-all">
		           <a href="forget" class="btn-link mar-rgt">Forgot password ?</a>
		            <a href="signup" class="btn-link mar-lft">Create a new account</a>
		
		        <div class="media pad-top bord-top">
		                <div class="pull-right">
		                    <a href="#" class="pad-rgt" onclick="facebook_authen();"><i class="demo-psi-facebook icon-lg text-primary"></i></a>
		                    <a href="#" class="pad-rgt" onclick="twitter_authen();"><i class="demo-psi-twitter icon-lg text-info"></i></a>
		                    <a href="#" class="pad-rgt" onclick="show_orgmodal();"><i class="demo-psi-google-plus icon-lg text-danger"></i></a>
		                </div>
		                <div class="media-body text-left text-bold text-main">
		                    Login with
		                </div>
		            </div>
		        </div>--%>
		    </div>
		</div>
		<!--===================================================-->
		<!--===================================================-->
    </div>

     <div class="modal fade" id="org-modal" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title">Add Organization</h4>
                </div>
                <!--Modal body-->
                  <form id="form_org">
                <div class="modal-body">                  
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <input type="text" id="tb_orgname_save" class="form-control" placeholder="Organization Name" autofocus required>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <input type="text" id="tb_orgcode_save" class="form-control" placeholder="Organization Code" required>
                            </div>
                        </div>
                    </div>                                      
                </div>
                <!--Modal footer-->
                <div class="modal-footer">
                    <button data-dismiss="modal" class="btn btn-default" type="button">Close</button>
                    <input class="btn btn-primary" type="button" value="Save" onclick="save_org();">
                </div>
              </form>
            </div>
        </div>
    </div>

    <!--===================================================-->
    <!-- END OF CONTAINER -->
    <!--JAVASCRIPT-->
    <!--=================================================-->
     
    <script src='<%= ResolveUrl("../../../js/jquery.min.js")%>'></script> 
    <script src='<%= ResolveUrl("../../../js/bootstrap.min.js")%>'></script> 
    <script src='<%= ResolveUrl("../../../js/nifty.min.js")%>'></script> 
    <script src='<%= ResolveUrl("../../../plugins/bootbox/bootbox.js")%>'></script> 
    <script src='<%= ResolveUrl("../../../js/demo/bg-images.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/cookie/jquery.cookie.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/toastr/toastr.min.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/systematic/jquery.systematic.common.js")%>'></script>
    <script src='<%= ResolveUrl("pageLogin.js")%>'></script>
    
</body>
</html>
