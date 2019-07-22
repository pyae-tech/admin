<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Sale.master" AutoEventWireup="true" CodeBehind="pageSaleSummaryByCustomer.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSale.reportSaleByCustomer.pageSaleSummaryByCustomer" %>

<%@ Register Assembly="DevExpress.Web.v17.2, Version=17.2.5.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<%@ Register Assembly="DevExpress.XtraReports.v17.2.Web, Version=17.2.5.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.XtraReports.Web" TagPrefix="dx" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%= ResolveUrl("../../../plugins/easyautocomplete/easy-autocomplete.css")%>' rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">



    <div id="page-content">
        <div class="panel">
            <div class="panel-body">
                <div class="panel">

                    <form id="form1" runat="server">
                        <div class="row">
                            <div class="col-md-9">
                                <dx:ASPxWebDocumentViewer ID="myReportViwer" ClientIDMode="Static" runat="server" DisableHttpHandlerValidation="False">
                                </dx:ASPxWebDocumentViewer>

                            </div>
                            <div class="col-md-3">
                                <div class="row">

                                    <div class="panel  panel-primary">
                                        <div class="panel-heading">
                                            <div class="panel-control">
                                                <button class="demo-panel-ref-btn btn btn-default" data-target="#demo-panel-ref" data-toggle="panel-overlay">
                                                    <i class="demo-psi-repeat-2 icon-fw"></i>Reset
                                                </button>

                                            </div>
                                            <h3 class="panel-title">Search here...</h3>
                                        </div>

                                        <!--No Label Form-->
                                        <!--===================================================-->

                                        <div class="panel-body ">
                                            <form class="form-horizontal">

                                                <div class="form-group">

                                                    <div class="col-md-12">
                                                        <input type="text" class="form-control" id="tb_search_date" placeholder="" runat="server" clientidmode="Static">
                                                    </div>

                                                </div>


                                                <div class="form-group">

                                                    <div class="col-md-12">

                                                        <input type="text" class="form-control" id="tb_search_to_date" placeholder="" runat="server" clientidmode="Static">
                                                    </div>
                                                </div>


                                                <div class="form-group">
                                                    <div class="col-md-12" style="margin-bottom: 7px;">
                                                        <input type="hidden" id="hf_current_user" runat="server" clientidmode="Static" />
                                                        <input type="hidden" id="hf_item_type_id" runat="server" clientidmode="Static" />



                                                        <input type="text" class="form-control" id="tb_item_type" placeholder="All Stock Types">
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <div class="col-md-12" style="margin-bottom: 7px;">
                                                        <input type="hidden" id="hf_item_id" runat="server" clientidmode="Static" />



                                                        <input type="text" class="form-control" id="tb_item" placeholder="All Stocks" />
                                                    </div>
                                                </div>


                                                <div class="form-group" style="margin-bottom: 7px;">

                                                    <div class="col-md-12">
                                                        <input type="text" class="form-control" id="tb_search_text" placeholder="Search Text" runat="server">
                                                        &nbsp;
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>


                                </div>

                                <div class="row">
                                    <asp:LinkButton runat="server" OnClick="btn_refresh_report_Click" Style="cursor: pointer" OnClientClick="save_search();">
                                    
                                    <div class="panel panel-danger panel-colorful media middle pad-all">
					                <div class="media-left">
					                    <div class="pad-hor">
					                        <i class="ion-refresh icon-3x"></i>
					                    </div>
					                </div>
					                <div class="media-body">
					                    <p class="text-2x mar-no text-semibold">Refresh</p>
					                    <p class="mar-no">Reload the report</p>
					                </div>
					            </div>
                                    
                                    </asp:LinkButton>
                                </div>

                                
                                <div class="row">
                                    <a href="#" runat="server" onclick="download_report();return false;" style="cursor: pointer">

                                        <div class="panel panel-primary panel-colorful media middle pad-all">
                                            <div class="media-left">
                                                <div class="pad-hor">
                                                    <i class="ion-arrow-down-a icon-3x"></i>
                                                </div>
                                            </div>
                                            <div class="media-body">
                                                <p class="text-2x mar-no text-semibold">Download</p>
                                                <p class="mar-no">Receipt copy</p>
                                            </div>
                                        </div>

                                    </a>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>





</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">

    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("pageSaleSummaryByCustomer.js")%>'></script>
    <script src='<%= ResolveUrl("../../../js/demo/nifty-demo.js")%>'></script>
</asp:Content>
