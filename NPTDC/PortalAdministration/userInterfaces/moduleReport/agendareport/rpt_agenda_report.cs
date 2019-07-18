using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleReport.agendareport
{
    public partial class rpt_agenda_report : DevExpress.XtraReports.UI.XtraReport
    {
        public rpt_agenda_report()
        {
            InitializeComponent();
        }
        public void do_fill_data(string agendaID, string depID)
        {
            parameter1.Value = agendaID;
            parameter2.Value = depID;
            sqlDataSource1.Fill();
        }

    }
}
