<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.Master" AutoEventWireup="true" CodeBehind="pagePosition.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMaster.masterPosition.pagePosition" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
    <style>
         .customClass {
       height: 300px !important;
}

    </style>
</asp:Content>

<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_TopLeftMenu" runat="server">
     <button style="display:none;" class="btn btn-dark  btn-rounded  btn-labeled usercontrol_create" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">စာရင်း အသစ်သွင်းရန်</span></button>
    </asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
         <h1 class="page-header text-overflow"><i class="ion-ribbon-b"></i> ရာထူးများ</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
       <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">စနစ် စီမံခြင်း </a></li>
        <li class="active">ရာထူးများ</li> 
      
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
                        <!--Panel heading-->
                        <div class="panel-heading" style="display:none;">
                            <div class="panel-control">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab"><span data-translate="_Listing">Listing</span><span class="pull-right badge badge-primary list_count">0</span></a></li> 
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab"><span class="_search" data-translate="_search">Search</span></a></li>
                                </ul>
                            </div>
                           
                        </div>
                       <%--  <h3><i class="ion-person-stalker">&nbsp;</i><span data-translate="">ရာထူးများ</span></h3>--%>
                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                              
                                    <div class="tab-pane fade in " id="tab-list" style="min-height:700px;">
                                    <div class="dx-viewport demo-container" id="panel_list_background" style="min-height: 300px;">
                                        <div id="gridContainer"></div>
                                        <div class="options">

                                            <div class="option">
                                                <div id="autoExpand"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                 

                                </div>
                    


                              
                           
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>




    <div class="modal fade" id="dialogBox_Detail_Form" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title"><span data-translate="PositionDetail">ရာထူး - အသေးစိတ်အချက်အလက်</span></h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" id="tb_id" value="" />
                       
                     
                                                        <div class="form-group">
                                                            <label for="tb_name" class="col-md-3 control-label" data-translate="PositionName">ရာထူး အမည်</label>
                                                            <div class="col-md-5">
                                                                <input type="text" class="form-control" id="tb_name" placeholder="Enter Position Name">
                                                            </div>
                                                             <label for="tb_position_code" class="col-md-1 control-label" data-translate="Code">ကုဒ်</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="tb_position_code" placeholder="Enter Position Code">
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="tb_DBasic_Salary" class="col-md-3 control-label" data-translate="">Protocol</label>
                                                            <div class="col-md-5">
                                                                <input type="text" class="form-control"  id="tb_protocol" placeholder="Enter Protocol">
                                                            </div>
                                                        </div>


                                                        <div class="form-group">
                                                            <label for="tb_DOTRate" class="col-md-3 control-label" data-translate="">အကြောင်းအရာ</label>
                                                            <div class="col-md-9">
                                                                <textarea  class="form-control" rows="3"  id="tb_description" placeholder="Enter Description"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="tb_remark" class="col-md-3 control-label" data-translate="">မှတ်ချက်</label>
                                                            <div class="col-md-9">
                                                                <textarea class="form-control" rows="3" placeholder="မှတ်ချက်ရေးရန်" id="tb_remark"></textarea>
                                                            </div>
                                                        </div>
                  
                        <div class="form-group">
                                <label for="tb_note" class="col-md-3 control-label"></label>
                            <div class="col-md-9" >
                                <small><span id="lbl_created"></span></small>
                                <br />
                                <small><span id="lbl_modified"></span></small>
                                <br />
                            </div>
                        </div>
                    </form>
                </div>
                <!--Modal footer-->
                <div class="modal-footer">
                    <button style="display: none;" class="btn btn-primary  btn-rounded  btn-labeled usercontrol_create" type="button" onclick="SavePosition();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="">စာရင်းသိမ်းရန်</span></button>
                    <button style="display: none;" class="btn btn-danger  btn-rounded btn-labeled usercontrol_delete" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">ဖျက်ရန်</span></button>
                    <button style="display: none;" class="btn btn-dark  btn-rounded  btn-labeled usercontrol_create" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">အသစ်</span></button>
                         <button  data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" ><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">ပိတ်ရန်</span></button>

                     
                </div>
            </div>
        </div>
    </div>



</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
      <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/backDetect/jquery.backDetect.js")%>'></script>
     <script src='<%= ResolveUrl("pagePosition.js")%>'></script>
</asp:Content>
