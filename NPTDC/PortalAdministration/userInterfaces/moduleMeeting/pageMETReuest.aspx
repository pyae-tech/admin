<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.master" AutoEventWireup="true" CodeBehind="pageMETReuest.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMeeting.pageMETReuest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%=ResolveUrl("../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_TopLeftMenu" runat="server">
     <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="SaveRequest();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">စာရင်းသိမ်း</span></button>
            <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">ဖျတ်ရန်</span></button>
            <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span class="bold" data-translate="_log">Log</span></button>
            <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="">အသစ်</span></button>

            <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="window.close();return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">ပိတ်မည်</span></button>
       
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><span data-translate="">အမှာစာ ပြုစုခြင်း</span></h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_materbook"><span data-translate="">အစည်းအဝေးများ</span></a></li>
        <li class="active"><span data-translate="">အမှာစာ ပြုစုခြင်း</span></li>
     
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

                                                <div class="col-md-12">
                                                    အမှာစာ  ခေါင်းစဉ် 
                                                </div>
                                            </div>
                                            <div class="form-group">


                                                <div class="col-md-12">
                                                    <input type="text" class="form-control" id="tb_meeting_title" style="font-weight:bold" placeholder="အကြောင်းအရာ ရေးပါ။">
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
    <script src='<%=ResolveUrl("../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("pageMETReuest.js")%>'></script>
</asp:Content>
