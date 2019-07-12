<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="controlActivity.ascx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.crmActivityPlugin.controlActivity" %>
<div id="Activity_Template" style="display: none">
    <!-- Newsfeed Content -->
    <!--===================================================-->
    <div class="comments media-block" id="[ActivityID]">
        <a class="media-left" href="#">
            <img class="img-circle img-sm" alt="Profile Picture" src='<%= ResolveUrl("../../../img/profile-photos/6.png")%>'></a>
        <div class="media-body">
            <div class="comment-header">
                <a href="#" class="media-heading box-inline text-main text-semibold">[ActivityByName] </a>&nbsp; <i class="ion-star"></i>&nbsp;Activity Type -&nbsp;<a href="#" class="media-heading box-inline text-main text-semibold">[ActivityType]</a>
                <p class="text-muted text-sm"><i class="demo-pli-monitor-2 icon-lg"></i>&nbsp;- &nbsp;[ActivityOn]</p>
            </div>
            <p>[ActivityDescription] </p>
            <blockquote class="text-muted text-sm">
                [ShortToPoint]
            </blockquote>
        </div>
    </div>
    <!--===================================================-->
    <!-- End Newsfeed Content -->


</div>

<div id="Activity_box">
    <input type="hidden" id="tb_id" value="" />
    <div id="tbl_activity"></div>
    <div class="panel-footer">
        <div class="panel-heading">
            <h3 class="panel-title">Add Activity</h3>
            <span class="input-group-btn text-right">
                <button class="btn btn-info" style="margin-top: -40px" type="button" onclick="Add_Activity(); return false;" id="btn_save_comment"><i class="btn-label ion-share"></i>Keep My Activity </button>
            </span>

        </div>

        <!--No Label Form-->
        <!--===================================================-->

        <form class="form-horizontal">
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-4 mar-btm">
                       <%-- <input type="text" class="form-control" id="tb_ActivityType" placeholder="Activity Type">--%>
                     <select id="tb_ActivityType" class="form-control">
                             <option value="Site Visit">Site Visit</option>
                             <option value="Cool Call">Cool Call</option>
                             <option value="Email">Email</option>
                             <option value="SMS">SMS</option>
                             <option value="Facebook">Facebook</option>
                             <option value="Contact">Contact</option>
                             <option value="Meeting">Meeting</option>
                         </select>
                    </div>
                    <div class="col-md-8 mar-btm">
                        <input type="email" class="form-control" id="tb_ActivityDescription" placeholder="Description">
                    </div>
                </div>
                <textarea placeholder="Short To Point" rows="6" id="tb_ShortToPoint" class="form-control"></textarea>
            </div>

        </form>

        <!--===================================================-->
        <!--End No Label Form-->

    </div>

</div>
