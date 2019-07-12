<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pagePasswordForget.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.login.pagePasswordForget" %>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Sign Up</title>


    <!--STYLESHEET-->
    <!--=================================================-->

    <!--Open Sans Font [ OPTIONAL ]-->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>


    <!--Bootstrap Stylesheet [ REQUIRED ]-->
    <link href='<%= ResolveUrl("../../../css/bootstrap.min.css")%>' rel="stylesheet">


    <!--Nifty Stylesheet [ REQUIRED ]-->
    <link href='<%= ResolveUrl("../../../css/nifty.min.css")%>' rel="stylesheet"> 


    <!--Nifty Premium Icon [ DEMONSTRATION ]-->
    <link href='<%= ResolveUrl("../../../css/demo/nifty-demo-icons.min.css")%>' rel="stylesheet">
    <link href='<%= ResolveUrl("../../../plugins/toastr/toastr.css")%>' rel="stylesheet" />

    <!--=================================================-->



    <!--Pace - Page Load Progress Par [OPTIONAL]-->
    <link href='<%= ResolveUrl("../../../plugins/pace/pace.min.css")%>' rel="stylesheet"> 


        
    <!--Demo [ DEMONSTRATION ]-->
    <link href='<%= ResolveUrl("../../../css/demo/nifty-demo.min.css")%>' rel="stylesheet">

      <style>
        .demo-my-bg{
            background-image: url(../../../PortalAdministration/img/bg-img/bg-img-3.jpg)
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
		            <h1 class="h3">Forgot password</h1>
                    <div class ="row">
                        <div class="co-md-3"> <p class="pad-btm">Enter your email address to recover your password. </p></div>
                    </div>
		           
		            <form>
		                <div class="form-group">
		                    <input type="email" class="form-control"  id ="forgot_mail" placeholder="Email">
		                </div>
		                <div class="form-group text-right">
		                    <button class="btn btn-danger btn-lg btn-block" type="submit"  onclick="ForgotPassword();return false;">Reset Password</button>
		                </div>
		            </form>
		            <div class="pad-top">
		                <a href="login" class="btn-link text-bold text-main">Back to Login</a>
		            </div>
		        </div>
		    </div>
		</div>
		<!--===================================================-->
		
		
		 
		<!--===================================================-->
		
		
		
    </div>
    <!--===================================================-->
    <!-- END OF CONTAINER -->


        
    <!--JAVASCRIPT-->
    <!--=================================================-->
     
    <script src='<%= ResolveUrl("../../../js/jquery.min.js")%>'></script> 
    <script src='<%= ResolveUrl("../../../js/bootstrap.min.js")%>'></script> 
    <script src='<%= ResolveUrl("../../../js/nifty.min.js")%>'></script> 
    <script src='<%= ResolveUrl("../../../js/demo/bg-images.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/cookie/jquery.cookie.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/toastr/toastr.min.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/systematic/jquery.systematic.common.js")%>'></script>
    <script src='<%= ResolveUrl("pageLogin.js")%>'></script>

</body>
</html>
