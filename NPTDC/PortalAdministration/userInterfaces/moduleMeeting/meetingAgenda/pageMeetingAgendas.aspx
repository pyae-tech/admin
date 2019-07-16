<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.master" AutoEventWireup="true" CodeBehind="pageMeetingAgendas.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMeeting.meetingAgenda.pageMeetingAgendas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
 <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
 <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_TopLeftMenu" runat="server">
 
 <button class="btn  btn-dark   btn-rounded  btn-labeled" type="button" onclick="NewAgenda();return false;"><i class="btn-label ion-plus-round"></i>
             <span class="bold" data-translate="_new">စာရင်း အသစ်သွင်းရန်</span></button>
           <button class="btn  btn-dark   btn-rounded  btn-labeled" type="button" onclick="Refresh();return false;"><i class="btn-label ion-refresh"></i><span class="bold" data-translate="_reflesh">ပြန်ဖွင့်</span></button>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
  <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><span data-translate="">အမှာစာ စုစည်းခြင်း</span></h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_materbook"><span data-translate="">အစည်းအဝေးများ</span></a></li>
        <li class="active"><span data-translate="">အမှာစာ စုစည်းခြင်းများ</span></li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
     <div id="page-content">

        <div class="panel">
            <div class="panel-body">
                <div class="panel">
                    <div class="tabs-container" id="tab-main">
                        <!--Panel heading-->
                        <div class="panel-heading" style="display: none;">
                            <div class="panel-control">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab"><span data-translate="_Listing">Listing</span> <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab"><span data-translate="_search">Search</span></a></li>
                                </ul>
                            </div>

                        </div>
                        <%--<h3><i class="ion-compose">&nbsp</i><span data-translate="">အမှာစာ စုစည်းခြင်းများ</span></h3>--%>
                        <!--Panel body-->
                        <div class="panel-body" id="backdetect">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">


                                    <div class="dx-viewport demo-container" id="panel_list_background" style="min-height: 300px;">

                                        
                                        <div id="gc_agendaList"></div>
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
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
     <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("pageMeetingAgendas.js")%>'></script>

</asp:Content>
