<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="PagePreviewAndPrint.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemAttachment.PagePreviewAndPrint" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <style>
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            /*background-color: #FAFAFA;*/
            /*font: 12pt "Tahoma";*/
        }

        * {
            box-sizing: border-box;
            -moz-box-sizing: border-box;
        }

        .page {
            width: 210mm;
            min-height: 297mm;
            /*padding: 1mm;*/
            margin: 7mm auto;
            border: 1px #D3D3D3 solid;
            border-radius: 5px;
            background: white;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }

        .subpage {
            /*padding: 1cm;*/
            /*border: 5px red solid;*/
            /*height: 257mm;*/
            height: 297mm;
            /*outline: 1cm #FFEAEA solid;*/
        }

        @page {
            size: A4;
            margin: 0;
        }

        @media print {
            html, body {
                width: 210mm;
                height: 297mm;
            }

            .page {
                margin: 0;
                border: initial;
                border-radius: initial;
                width: initial;
                min-height: initial;
                box-shadow: initial;
                background: initial;
                /*page-break-after: always;*/
            }
        }         

        .img_box {
            /* background-color: lightgrey; */
            width: 300px;
            border: 4px solid silver;
            padding: 10px;
            /* margin: 25px; */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="col-md-2" style="float: right; margin-top: -61px;">
        <button class="btn btn-mint btn-labeled" style="float: right; margin-top: 27px;" type="button" onclick="printDiv();return false;"><i class="btn-label ion-printer"></i><span class="bold">Print</span></button>
    </div>
    <br />
    <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10" id="images_panel">
            <div class="book" id="image_show">
              
            </div>

        </div>
        <div class="col-md-10" id="nodata_panel" style='border: 3px solid silver; display: none;'>
            <span style="font: xx-large; color: brown; text-align: center;">No image to show!</span>
        </div>
        <div class="col-md-1"></div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="cph_slider_general_bar" runat="server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolder_SliderMenu" runat="server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("PagePreviewAndPrint.js")%>'></script>
</asp:Content>
