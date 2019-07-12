<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Sale.master" AutoEventWireup="true" CodeBehind="mposSaleDashboard.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMPOS.mposSaleDashboard.mposSaleDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">

    <%--<link rel="stylesheet" type="text/css" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.spa.css")%>' />--%>
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
                   <%-- <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="">Monthly Sale Dashboard</h3>
                    </div>--%>
                    <div class="panel-body" id="panel_daily_sale" style="min-height:300px;">
                          <div class="col-md-4">
                        <div class="dx-field-value" style="float: left;">
                            <div id="escape"></div>
                        </div>
                              </div>
                       
                         <div class="col-md-12">
                        <div class="demo-container">

                            <div id="chart-demo">
                                <div id="monthly_chart" style="width:100%;"></div>

                            </div>
                        </div>
</div>




                    </div>
                </div>

            </div>

        </div>
            

        <div class="row" id="panel_list_background">
            <div class="col-md-6">
                <form id="form1" runat="server">
                    <input type="hidden" id="tb_po_received_id" value="" />
                    <div class="panel">
                    <%--    <div class="panel-heading">
                            <div class="panel-control"></div>
                            <h3 class="panel-title"><span data-translate="">Annual Sales Performance </span></h3>
                        </div>--%>
                        <div class="panel-body">
                            <div style="width: 100%; border: 1px solid gray; min-height: 500px;">
                                <br />
                                 <div id="gauge"></div>
                             
                            </div>


                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-6">
                <form class="form-horizontal">
                    <div class="panel">
                      <%--  <div class="panel-heading">
                            <div class="panel-control"></div>
                            <h3 class="panel-title"><span data-translate="">Sale By Item Group</span></h3>
                        </div>--%>
                        <div class="panel-body" style="min-height: 500px;">
                            <div style="width: 100%; border: 1px solid gray; min-height: 500px;">
                                <br />
                                 <div id="pie"></div>
                             
                            </div>
 </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
    <!--===================================================-->
    <!--End page content-->
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">

    <script type="text/javascript" src='<%= ResolveUrl("../../../../js/globalize/date.min.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("mposSaleDashboard.js")%>'></script>
</asp:Content>
