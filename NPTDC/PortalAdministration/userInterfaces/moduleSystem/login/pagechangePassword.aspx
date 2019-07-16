<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.Master" AutoEventWireup="true" CodeBehind="pagechangePassword.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.login.pagechangePassword" %>

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
        <li><a href="#">စနစ်</a></li>
        <li class="active">လျှိုဝှက် နံပါတ် ပြောင်းရန်</li>
        <li class="active">
        </li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">
                <div class="panel">
                    <div class="panel-body">
                          <div class="panel">
                   <div class="tabs-container" id="tab-main">
                         <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                         <h3><i class="demo-pli-gear"></i>&nbsp;<span data-translate="">လျှိုဝှက် နံပါတ် ပြောင်းရန်</span></h3>
                        <h3 class="panel-title"></h3>
                    </div>

                           <div class="panel-body">
                           
                                <div>
                                     <div class="modal-body">


                                        <div class="col-md-12">
                                          <form class="form-horizontal">
                            
                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label">လျှိုဝှက် နံပါတ် အဟောင်း</label>
                                <div class="col-md-4">
                                    <input type="password" class="form-control" id="tb_old_password" placeholder="လျှိုဝှက် နံပါတ် အဟောင်း">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label">လျှိုဝှက် နံပါတ် အသစ်</label>
                                <div class="col-md-4">
                                      <input type="password" class="form-control" id="tb_new_password" placeholder="လျှိုဝှက် နံပါတ် အသစ်">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label">အတည်ပြုပါ</label>
                                <div class="col-md-4">
                                    <input type="password" class="form-control" id="tb_confirm_password" placeholder="အတည်ပြုပါ" >
                                </div>
                            </div>
                            <div class="form-group"></div>
                            <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label"></label>
                                <div class="col-md-2">
                                     <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="ChangePassword();return false;">
                                    <i class="btn-label ion-checkmark"></i><span class="bold">လျှိုဝှက် နံပါတ် ပြောင်းရန်</span></button>
                                </div>
                            </div>


                        
                                 
                        </form>

                                        </div>

                                       

                                        

                                    </div>

                            </div>
                        </div>
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
