<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="pageAttachment.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemImage.pageAttachment" %>

<%@ Register Assembly="DevExpress.Web.v17.2, Version=17.2.5.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemImage/UploadedFilesContainer.ascx" TagPrefix="uc1" TagName="UploadedFilesContainer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <%--start highlighted block--%>
    <link href='<%= ResolveUrl("attachment.css")%>' rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.spa.css")%>' />
    <link rel="stylesheet" type="text/css" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' />
    <link rel="dx-theme" data-theme="generic.light" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' />
    <link rel="dx-theme" data-theme="android5.light" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.android5.light.css")%>' />
    <link rel="dx-theme" data-theme="ios7.default" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.ios7.default.css")%>' />
    <link rel="dx-theme" data-theme="win10.black" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.win10.black.css")%>' />
    <link rel="dx-theme" data-theme="win10.white" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.win10.white.css")%>' />
    <script type="text/javascript">
        function onFileUploadComplete(s, e) {
            if (e.callbackData) {
                var fileData = e.callbackData.split('|');
                var fileName = fileData[0],
                    fileUrl = fileData[1],
                    fileSize = fileData[2];
                DXUploadedFilesContainer.AddFile(fileName, fileUrl, fileSize);
            }
        }
    </script>
    <%--end highlighted block--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <br />
  
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow">ဖိုင်လ်တင်ရန်</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <%--  <div id="page-content">
        <div class="row">

            <h3><i class="ion-briefcase">&nbsp;</i><span data-translate="">Upload Attachment</span> </h3>
            <br />
        </div>

        <div class="row">
            <div class="col-md-12" style="height:100%">
                  <div class="demo-container">
                            <div id="fileuploader">
                                <div class="widget-container">
                                    <div id="file-uploader"></div>
                                    <div class="content" id="selected-files">
                                        <div>
                                            <h4>Selected Files</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="options">
                                    <div class="caption">Options</div>
                                    <div class="option">
                                        <span>File types</span>
                                        <div id="accept-option"></div>
                                    </div>
                                    <div class="option">
                                        <span>Upload mode</span>
                                        <div id="upload-option"></div>
                                    </div>
                                    <div class="option">
                                        <div id="multiple-option"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
         

        </div>    



    </div>--%>
    <div id="page-content">


        <div class="row">
            <div class="panel  ">
                <div class="panel-heading">
                    <div class="panel-control">
                    </div>
                    <h3 class="panel-title" data-translate="">နောက်ဆက်တွဲ အချက်အလက် ဖိုင်လ်များတင်ရန်</h3>
                </div>
                <div class="panel-body">
                  

                  <div class="col-md-12" style="border:1px solid #ddd;min-height:600px;">
                      <form  id="form1">
                        <div class="demo-container" style="min-height: 100%">
                            <div id="fileuploader">
                                <div class="widget-container">
                                    <div id="file-uploader"></div>
                                    <div class="content" id="selected-files">
                                        <div>
                                            <h4>တင်မည့် ဖိုင်လ် ရွှေးချယ်ပါ။</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="options">
                                    <div class="caption">အခြားရွှေးချယ်ခြင်း</div>
                                    <div class="option">
                                        <span>ဖိုင်လ် အမျိုးအစား</span>
                                        <div id="accept-option"></div>
                                    </div>
                                    <div class="option">
                                        <span>ပုံစံ</span>
                                        <div id="upload-option"></div>
                                    </div>
                                    <div class="option">
                                        <div id="multiple-option"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                          </form>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <%--  <div id="page-content">

        <div class="panel">
            <div class="panel-body">



                <div class="panel">
                    <div class="tabs-container" id="tab-main">
                        <!--Panel heading-->
                        <div class="panel-heading">

                            <h3><i class="ion-briefcase"></i>Upload Attachment </h3>--%>
    <%-- <form class="form-horizontal" runat="server">

                                <div class="form-group">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6">
                                        <dx:aspxuploadcontrol id="UploadControl" runat="server" clientinstancename="UploadControl" width="320"
                                            nulltext="Select multiple files..." uploadmode="Advanced" showuploadbutton="True" showprogresspanel="True"
                                            onfileuploadcomplete="UploadControl_FileUploadComplete">
                                            <AdvancedModeSettings EnableMultiSelect="True" EnableFileList="True" EnableDragAndDrop="True" />
                                            <ValidationSettings MaxFileSize="4194304" AllowedFileExtensions=".jpg,.jpeg,.gif,.png,.txt,.pdf">
                                            </ValidationSettings>
                                            <ClientSideEvents FilesUploadStart="function(s, e) { DXUploadedFilesContainer.Clear(); }"
                                                FileUploadComplete="onFileUploadComplete" />
                                        </dx:aspxuploadcontrol>
                                        <br />

                                        <uc1:uploadedfilescontainer id="FileContainer" runat="server" width="380" height="180"
                                            namecolumnwidth="240" sizecolumnwidth="70" headertext="Uploaded files" />
                                        <br />
                                        <br />
                                        <p class="note">
                                            <dx:aspxlabel id="AllowedFileExtensionsLabel" runat="server" text="Allowed file extensions: .jpg, .jpeg, .gif, .png." font-size="8pt">
                                            </dx:aspxlabel>
                                            <br />
                                            <dx:aspxlabel id="MaxFileSizeLabel" runat="server" text="Maximum file size: 4 MB." font-size="8pt">
                                            </dx:aspxlabel>
                                        </p>

                                    </div>


                                </div>

                            </form>--%>




    <%--                        </div>


                    </div>


                </div>
            </div>
        </div>
    </div>--%>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_SliderMenu" runat="server">

    <script src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("Demo.js")%>'></script>
    <script src='<%= ResolveUrl("pageAttachment.js")%>'></script>
</asp:Content>
