using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleReport.requsetreport
{
    public partial class PageRequestReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack == false)
                do_load_report();
        }

        void do_load_report()
        {
            string search_reqid = Request.QueryString["id"];
            string search_deoid = Request.QueryString["DepartmentId"];
            rpt_request_report the_report = new rpt_request_report();
          //  rpt_report_request_item the_report1 = new rpt_report_request_item();


            if (search_deoid != "")
            {
              //  the_report1.do_fill_data1(search_reqid);
              //  the_report1.CreateDocument();
              //  docViwer.OpenReport(the_report1);
                the_report.do_fill_data(search_deoid, search_reqid);
                the_report.CreateDocument();
                docViwer.OpenReport(the_report);
            }



        }

        
    }
}