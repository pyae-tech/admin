<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.master" AutoEventWireup="true" CodeBehind="pageMeetingAgenda.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMeeting.meetingAgenda.pageMeetingAgenda" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_TopLeftMenu" runat="server">
    <button class="btn btn-success  btn-rounded  btn-labeled" type="button" onclick="SaveAgenda();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">စာရင်းသိမ်းရန်</span></button>
    <button class="btn  btn-dark   btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">ဖျက်ရန်</span></button>
    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">အသစ်</span></button>
    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="">Log</span></button>
    <button class="btn  btn-dark   btn-rounded  btn-labeled" type="button" onclick="Refresh();return false;"><i class="btn-label ion-refresh"></i><span class="bold" data-translate="_reflesh">ပြန်ဖွင့်</span></button>
    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="window.close();return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">ပိတ်မည်</span></button>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
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
        <li class="active"><a href="agendas"><span data-translate="">အမှာစာ ပြုစုခြင်း</span></a></li>

    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <div id="page-content">
        <div class="panel">

            <div class="panel-body">
                <div class="panel  ">

                    <div class="panel-body">
                          <div class="row">
                        <form class="form-horizontal">
                            <input type="hidden" id="tb_id" value="" />
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="tb_name" class="col-md-2 control-label" data-translate="">အမှတ်စဉ်</label>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" id="tb_agenda_no" placeholder="အမှာစာအမှတ်စဉ်" readonly="true">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="tb_name" class="col-md-2 control-label" data-translate="">ရက်စွဲ</label>
                                            <div class="col-md-9">
                                                <div id="dt_agenda_date" style="width: 100%"></div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="tb_name" class="col-md-2 control-label" data-translate="">အစည်းအဝေးအမှတ်စဉ်</label>
                                            <div class="col-md-9">
                                                <input type="text" class="form-control" id="tb_agenda_no_label" placeholder="အစည်းအဝေးအမှတ်စဉ်" >
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="ddl_meetingtype" class="col-md-2 control-label" data-translate="">အခြေအနေ</label>
                                            <div class="col-md-9">
                                                <input type="hidden" id="hf_agenda_status" value="" />
                                                <div id="ddl_agenda_status"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="tb_Remark" class="col-md-2 control-label" data-translate="">မှတ်ချက်</label>
                                            <div class="col-md-9">
                                                <textarea id="tb_Remark" rows="8" cols="50" class="form-control" placeholder="မှတ်ချက် ရေးပါ။"></textarea>
                                            </div>
                                        </div>

                                    </div>
                            </form>
                              </div>
                          <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-4">
                                            <%--<textarea id="tb_Description" rows="5" cols="50" class="form-control" placeholder="ဆုံးဖြတ်ချက် ရေးပါ။"></textarea>--%>
                                            <div id="btn_request_add"></div>
                                        </div>
                                    </div>
                                    <div class="form-group">

                                        <div class="col-md-12">
                                            <div id="gc_AgendaList"></div>
                                        </div>
                                    </div>
                      

                    </div>
                </div>
            </div>

            <div class="form-group">
                <br />
                <div class="col-md-12">
                    <small class="pull-left"><span id="lbl_created"></span></small>

                    <small class="pull-right"><span id="lbl_modified"></span></small>
                    <br />
                </div>
            </div>
        </div>
    </div>


</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("pageMeetingAgenda.js")%>'></script>

</asp:Content>
