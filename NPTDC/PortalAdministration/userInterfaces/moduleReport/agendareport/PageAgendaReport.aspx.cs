using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleReport.agendareport
{
    public partial class PageAgendaReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (IsPostBack == false)
                do_load_report();
        }
        void do_load_report()
        {
            string serach_agendaid = Request.QueryString["id"];
            string search_deoid = Request.QueryString["DepartmentId"];
            rpt_agenda_report the_report = new rpt_agenda_report();
            if (serach_agendaid != "")
            {
                the_report.do_fill_data(serach_agendaid, search_deoid);
                the_report.CreateDocument();
                docViwer.OpenReport(the_report);
            }
        }
    }
}