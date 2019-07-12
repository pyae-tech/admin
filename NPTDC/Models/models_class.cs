using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SBSPortal3.Models
{
    public class verify_email_result
    {
        public string email { get; set; }
        public string result { get; set; }
        public string resultcode { get; set; }
        public string subresult { get; set; }
        public string free { get; set; }
        public string role { get; set; }
        public string didyoumean { get; set; }
        public string system { get; set; }
        public string executiontime { get; set; }
        public string error { get; set; }
    }

}