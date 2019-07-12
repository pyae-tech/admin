﻿<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="pagechangePassword.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.login.pagechangePassword" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemComment/controlComment.ascx" TagPrefix="uc1" TagName="controlComment" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%= ResolveUrl("../../../plugins/easyautocomplete/easy-autocomplete.css")%>' rel="stylesheet" />
    <style>
        .form-group {
            margin-bottom: 5px;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <br />
    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">System</a></li>
        <li class="active">Change Password</li>
        <li class="active">
        </li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">

        <div class="row">


           
            <div class="col-md-12">

                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title">Change Password</h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                             <input type="hidden" id="tb_id" value="" />
                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label">Old Password</label>
                                <div class="col-md-2">
                                    <input type="password" class="form-control" id="tb_old_password" placeholder="Enter Old Password">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label">New Password</label>
                                <div class="col-md-2">
                                      <input type="password" class="form-control" id="tb_new_password" placeholder="Enter Old Password">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label">Confirm Password</label>
                                <div class="col-md-2">
                                    <input type="password" class="form-control" id="tb_confirm_password" placeholder="Enter Confirm Password" >
                                </div>
                            </div>
                            <div class="form-group"></div>
                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label"></label>
                                <div class="col-md-2">
                                     <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="ChangePassword();return false;">
                                    <span class="bold">Change Password</span></button>
                                </div>
                            </div>


                        
                                 
                        </form>

                    </div>
                </div>

               


            </div>





        </div>

       
    </div>

 
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <link href='<%= ResolveUrl("../../moduleSale/saleFuelPutInList/dxp.css")%>' rel="stylesheet" />
    <script src='<%= ResolveUrl("pageChangePassword.js")%>'></script>
</asp:Content>
