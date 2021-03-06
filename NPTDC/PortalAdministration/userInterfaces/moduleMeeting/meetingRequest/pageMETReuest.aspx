﻿<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.master" AutoEventWireup="true" CodeBehind="pageMETReuest.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMeeting.pageMETReuest" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemAttachment/ControlAttachment.ascx" TagPrefix="uc1" TagName="ControlAttachment" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
   
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_TopLeftMenu" runat="server">

      <ol class="menucrumb">
        <li>
            <button class="btn btn-dark  btn-rounded  btn-labeled request_decision"  type="button" onclick="RequestDecision('Approved');return false;" style="display: none;"><i class="btn-label ion-forward"></i><span class="bold" data-translate="_save">ခွင့်ပြုသည်။</span></button></li>
        <li>
            <button class="btn btn-dark  btn-rounded  btn-labeled request_decision" type="button" onclick="RequestDecision('Rejected');return false;" style="display: none;"><i class="btn-label ion-settings"></i><span class="bold" data-translate="_save">ပယ်ဖျက်သည်။</span></button></li>
        <li>
            <button class="btn btn-success  btn-rounded  btn-labeled request_create" type="button" onclick="SaveRequest();return false;" style="display: none;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">စာရင်းသိမ်းရန်</span></button></li>
        <li>
            <button class="btn  btn-dark   btn-rounded btn-labeled request_delete" type="button" onclick="DeleteRecordConfirmation();return false;" style="display: none;">
                <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">ဖျက်ရန်</span></button></li>
        <li>
            <button class="btn btn-dark  btn-rounded  btn-labeled request_create" type="button" onclick="LoadNew();return false;" style="display: none;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">အသစ်</span></button></li>
        <li>
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;" style="display: block;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="">Log</span></button></li>
        <li>
            <button class="btn  btn-dark   btn-rounded  btn-labeled" type="button" onclick="Refresh();return false;" style="display: block;"><i class="btn-label ion-refresh"></i><span class="bold" data-translate="_reflesh">ပြန်ဖွင့်</span></button></li>
        <li>
            <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="window.close();return false;" style="display: block;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">ပိတ်မည်</span></button></li>
        <li>
            <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="print_receipt();return false;" style="display: block;"><i class="btn-label ion-printer"></i><span class="bold">Print</span></button></li>
    </ol>
      
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><span data-translate="">အမှာစာ ပြုစုခြင်း</span></h1>
         <%-- <button id="demo-bootbox-prompt" class="btn btn-warning">Prompt</button>--%>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_materbook"><span data-translate="">အစည်းအဝေးများ</span></a></li>
        <li class="active"><a href="requests"><span data-translate="">အမှာစာ ပြုစုခြင်း</span></a></li>
     
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <div id="page-content">
        <div class="panel">
            
            <div class="panel-body">
                <div class="row">
                  
                    <div class="col-md-4 ">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel  ">

                                    <div class="panel-body">
                                        <form class="form-horizontal">
                                            <div class="form-group">
                                                <label for="tb_name" class="col-md-3 control-label" data-translate="">အမှတ်စဉ်</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" id="tb_request_no" placeholder="အမှာစာအမှတ်စဉ်" readonly="true">
                                                </div>
                                            </div>
                                            <div class="form-group">

                                                <label for="ddl_meetingtype" class="col-md-3 control-label" data-translate="">အစည်းအဝေး</label>
                                                <div class="col-md-9">
                                                       <input type="hidden" id="hf_meetingtype" value="" />
                                                    <div id="ddl_meetingtype"></div>
                                                </div>
                                            </div>

                                            <div class="form-group">

                                                <label for="tb_department_name" class="col-md-3 control-label" data-translate="">ဌာန</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" id="tb_department_name" readonly>
                                                </div>
                                            </div>
                                            <div class="form-group">

                                                <label for="requeston" class="col-md-3 control-label" data-translate="">တင်ပြချိန်</label>
                                                <div class="col-md-9">
                                                    <div id="dt_requeston" style="width: 100%"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">

                                                <label for="ddl_requeststatus" class="col-md-3 control-label" data-translate="">အခြေအနေ</label>
                                                <div class="col-md-9">
                                                        <input type="hidden" id="hf_requeststatus" value="" />
                                                    <div id="ddl_requeststatus"></div>

                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="ddl_requestby" class="col-md-3 control-label" data-translate="">တင်ပြသူ</label>
                                                <div class="col-md-9">
                                                    <div id="ddl_requestby"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="tb_Remark" class="col-md-3 control-label" data-translate="">မှတ်ချက်</label>
                                                <div class="col-md-9">
                                                    <textarea id="tb_Remark" rows="6" cols="50" class="form-control" placeholder="မှတ်ချက် ရေးပါ။"></textarea>
                                                </div>
                                            </div>
                                              <div class="form-group">
                                                <label for="tb_Description" class="col-md-3 control-label" data-translate="">ဆုံးဖြတ်ချက်</label>
                                                <div class="col-md-9">
                                                    <textarea id="tb_Description" rows="5" cols="50" class="form-control" placeholder="ဆုံးဖြတ်ချက် ရေးပါ။"></textarea>
                                                </div>
                                            </div>
                                              <div class="form-group div_approved" style="display:none;">
                                                <label for="tb_Description" class="col-md-3 control-label" data-translate="">ဆုံးဖြတ်မှတ်ချက်</label>
                                                <div class="col-md-9">
                                                    <textarea id="tb_ApprovedRemark" rows="5" cols="50" class="form-control" placeholder="ဆုံးဖြတ်မှတ်ချက်"></textarea>
                                                </div>
                                            </div>
                                            

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel  ">

                                    <div class="panel-body">
                                        <form class="form-horizontal">
                                            <input type="hidden" id="tb_id" value="" />
                                            <input type="hidden" id="hf_requestbyId" value="" />



                                            <div class="form-group">                                                
                                                  <div class="col-md-3">အမှာစာ  ခေါင်းစဉ် <div id="lbl_status"></div>
                                                    <%--  <div  class="col-md-2 ">  <span class="label label-success label-icon label-circle"><i class="ion-checkmark"></i></span></div> --%>
                                                </div>
                                                 <br />
                                            </div>
                                            <div class="form-group">


                                                <div class="col-md-12">
                                                    <input type="text" class="form-control" id="tb_meeting_title" style="font-weight: bold" placeholder="အကြောင်းအရာ ရေးပါ။">
                                                </div>
                                            </div>
                                            <div class="form-group">

                                                <div class="col-md-12">
                                                    <div id="gc_RequestItems"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-md-12">
                                                    <div id="gc_RequestDescription"></div>
                                                </div>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row">
                  
                    <div class="col-md-12 ">
                        <uc1:ControlAttachment runat="server" ID="ControlAttachment" />
                    </div>
                
                </div>

                <div class="form-group  pull-right">
                    <%--<label for="tb_note" class="col-md-2 control-label"></label>--%>
                    <div class="col-md-12">
                        <small><span id="lbl_created"></span></small>
                        <br />
                        <small><span id="lbl_modified"></span></small>
                        <br />
                    </div>
                </div>

            </div>


        </div>
    </div>
 

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("pageMETReuest.js")%>'></script>
</asp:Content>
