<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Marketing.master" AutoEventWireup="true" CodeBehind="crmDashboard.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleCRM.crmDashboard.crmDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link rel="stylesheet" type="text/css" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' />
    <link rel="dx-theme" data-theme="generic.light" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <div id="page-content">

        <div class="row">
            <div class="col-md-12">
                <div class="panel">
                    <div class="panel-body" id="panel_daily_sale" style="min-height: 300px;">

                        <div class="col-md-12">
                            <div class="demo-container">
                                <div class="demo-container">
                                    <div id="chart"></div>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>

            </div>

        </div>


        <div class="row" id="panel_list_background">
            <div class="col-md-12">
                <form id="form1" runat="server">
                    <input type="hidden" id="tb_po_received_id" value="" />
                    <div class="panel">
                        <div class="panel-body">
                            <div class="col-md-8">
                                <div id="pie"></div>

                            </div>
                            <div class="col-md-4">
                                <br />
                                <br />
                                <div id="gauge"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script type="text/javascript" src='<%= ResolveUrl("../../../../js/globalize/date.min.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("crmDashboard.js")%>'></script>

</asp:Content>
