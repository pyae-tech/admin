using NPT_DC_App.LINQs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NPT_DC_App.Controllers
{
    public class model
    {
        public class Return_login
        {
            public SYS_UserView user_data { get; set; }
            public Access MeetingRequest { get; set; }
            public Access SysConfig { get; set; }
            public Access MeetingAgenda { get; set; }
            public Access UserControl { get; set; }
            public Access MeetingMinute { get; set; }



        }

        public class Access
        {
            public bool AllowView { get; set; }
            public bool AllowDelete { get; set; }
            public bool AllowCreate { get; set; }
            public bool AllowDecision { get; set; }
            public bool AllowAllDepartment { get; set; }
            public bool AllowUpdate { get; set; }
            

        }
    }
}