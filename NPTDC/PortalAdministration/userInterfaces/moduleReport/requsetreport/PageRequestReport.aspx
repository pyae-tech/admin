<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="PageRequestReport.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleReport.requsetreport.PageRequestReport" %>

<%@ Register Assembly="DevExpress.XtraReports.v17.2.Web, Version=17.2.5.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.XtraReports.Web" TagPrefix="dx" %>
<%@ Register assembly="DevExpress.Web.ASPxRichEdit.v17.2, Version=17.2.5.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.Web.ASPxRichEdit" tagprefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_TopLeftMenu" runat="server">
 
    <ol class="menucrumb">
         <li>
             <button class="btn btn-dark  btn-rounded  btn-labeled" runat="server" type="button" onclick="richEditor_temp.commands.filePrint.execute(); return false;;" style="display: block;">
                 <i class="btn-label ion-printer"></i><span class="bold">Print</span></button></li>
          <li>
              
              <asp:LinkButton runat="server"  CssClass="btn btn-dark  btn-rounded  btn-labeled" id="btn_download_Pdf"
                   OnClick="btn_download_Pdf_Click">    <i class="btn-label ion-download"></i><span class="bold">Download PDF</span></asp:LinkButton>
           </li>
             
        <li>
            <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="window.close();return false;" style="display: block;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">ပိတ်မည်</span></button></li>
    </ol> 


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <div id="page-content">
        <div class="panel">
            <div class="panel-body">
                <div class="panel"> 
                        <asp:HiddenField runat="server" ID="hf_selected_value" ClientIDMode="Static" Value="" />
                        <div id="rp_view" style="min-height: 300px; border: 1px solid silver;">


                            <script>
                                function initViewer(s, e) { 
                                    var reportPreview = s.GetPreviewModel().reportPreview;
                                    var currentExportOptions = reportPreview.exportOptionsModel;
                                    var optionsUpdating = false;
                                    var fixExportOptions = function (options) {
                                        try {
                                            optionsUpdating = true;
                                            if (!options) {
                                                currentExportOptions(null);
                                            } else { 
                                                delete options["pdf"];
                                                currentExportOptions(options);
                                            }
                                        } finally {
                                            optionsUpdating = false;
                                        }
                                    };
                                    currentExportOptions.subscribe(function (newValue) {
                                        !optionsUpdating && fixExportOptions(newValue);
                                    });
                                    fixExportOptions(currentExportOptions()); 
                                }
                                function customizeActions(s, e) {

                                    const itemsToHide = [
                              //DevExpress.Report.Preview.ActionId.FirstPage,
                              //DevExpress.Report.Preview.ActionId.PrevPage,
                              //DevExpress.Report.Preview.ActionId.NextPage,
                              //DevExpress.Report.Preview.ActionId.LastPage,
                              //DevExpress.Report.Preview.ActionId.MultipageToggle,
                              //DevExpress.Report.Preview.ActionId.HightlightEditingFields,
                              //DevExpress.Report.Preview.ActionId.ZoomOut,
                              //DevExpress.Report.Preview.ActionId.ZoomSelector,
                              //DevExpress.Report.Preview.ActionId.ZoomIn,
                              DevExpress.Report.Preview.ActionId.Print,
                              DevExpress.Report.Preview.ActionId.PrintPage,
                              //DevExpress.Report.Preview.ActionId.Search,
                                    ]
                                    e.Actions.filter(function (i) { return itemsToHide.indexOf(i.id) !== -1; }).forEach(function (i) { i.visible = false; });


                                }


                            </script>

                          

                            <dx:ASPxWebDocumentViewer ID="docViwer" runat="server" ColorScheme="softblue">
                                <ClientSideEvents CustomizeMenuActions="customizeActions"
                                    Init="initViewer" />
                            </dx:ASPxWebDocumentViewer>
                              <dx:ASPxRichEdit ID="richEditor_temp" ClientIDMode="Static" style="display:none;" runat="server" >
                            </dx:ASPxRichEdit>
                            
                        </div> 

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="cph_slider_general_bar" runat="server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_SliderMenu" runat="server">
</asp:Content>
<asp:Content ID="Content7" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
</asp:Content>
