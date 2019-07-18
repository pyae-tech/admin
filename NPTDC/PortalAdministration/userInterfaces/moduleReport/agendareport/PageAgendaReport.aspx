<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="PageAgendaReport.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleReport.agendareport.PageAgendaReport" %>
<%@ Register Assembly="DevExpress.XtraReports.v17.2.Web, Version=17.2.5.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.XtraReports.Web" TagPrefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_TopLeftMenu" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
     <div id="page-content">
        <div class="panel">
            <div class="panel-body">
                <div class="panel">
                     <form id="form1" runat="server">
                            <asp:HiddenField runat="server" ID="hf_selected_value" ClientIDMode="Static" value="" />
         <div id="rp_view" style="min-height: 300px; border:1px solid silver;">        
        <dx:ASPxWebDocumentViewer ID="docViwer" runat="server" 
        ></dx:ASPxWebDocumentViewer>
             </div>    
    </form>
                   
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
