using NPT_DC_App.LINQs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NPT_DC_App.Controllers
{
    public static class Controller_RunningNo
    {
        //Added Organization Code for running no.
        public static string GetNewRunningCode(string RunningNoCode, string UserID)
        {
            string new_running_no = "";
            try
            {
                LINQ_SystemDataContext dc_sys = new LINQ_SystemDataContext();
                SYS_User the_user = (from c in dc_sys.SYS_Users where c.UserID == UserID && c.Active == true select c).FirstOrDefault();
                if (the_user == null) return "No User";


                SysRunningNo the_running_no = (from c in dc_sys.SysRunningNos where c.RunningNoCode == RunningNoCode && c.OrganizationID == the_user.OrgID select c).FirstOrDefault();
     
                if (the_running_no == null)
                {
                    //check default code
                    SysRunningNo the_default_running_no = (from c in dc_sys.SysRunningNos where c.RunningNoCode == RunningNoCode select c).FirstOrDefault();
                    if (the_default_running_no == null)
                    {
                        return "No Running Code";
                    }
                    the_running_no = new SysRunningNo()
                    {
                        RunningNoID = Guid.NewGuid().ToString(),
                        OrganizationID = the_user.OrgID,
                        RunningNoCode = the_default_running_no.RunningNoCode,
                        RunningPrefix = the_default_running_no.RunningPrefix,
                        RunningSequenceWord = "A",
                        RunningSequneceLength = the_default_running_no.RunningSequneceLength,
                        RunningSequence = 0,
                        OrganizationPrefix = true 
                    };
                    dc_sys.SysRunningNos.InsertOnSubmit(the_running_no);
                }

                SYS_Organization the_org = (from c in dc_sys.SYS_Organizations where c.OrgID == the_user.OrgID && c.Active == true select c).FirstOrDefault();
                if (the_org == null) return "User don't have company info.";

                the_running_no.RunningSequence = the_running_no.RunningSequence + 1;
                string running_number_length = "D" + the_running_no.RunningSequneceLength.ToString();
                if (the_running_no.RunningSequence.ToString().Length > the_running_no.RunningSequneceLength)
                {
                    #region Get New Running Sequence Word
                    switch (the_running_no.RunningSequenceWord.ToUpper())
                    {
                        case "A": the_running_no.RunningSequenceWord = "B"; break;
                        case "B": the_running_no.RunningSequenceWord = "C"; break;
                        case "C": the_running_no.RunningSequenceWord = "D"; break;
                        case "D": the_running_no.RunningSequenceWord = "E"; break;
                        case "E": the_running_no.RunningSequenceWord = "F"; break;
                        case "F": the_running_no.RunningSequenceWord = "G"; break;
                        case "G": the_running_no.RunningSequenceWord = "H"; break;
                        case "H": the_running_no.RunningSequenceWord = "I"; break;
                        case "I": the_running_no.RunningSequenceWord = "J"; break;
                        case "J": the_running_no.RunningSequenceWord = "K"; break;
                        case "K": the_running_no.RunningSequenceWord = "L"; break;
                        case "L": the_running_no.RunningSequenceWord = "M"; break;
                        case "M": the_running_no.RunningSequenceWord = "N"; break;
                        case "N": the_running_no.RunningSequenceWord = "O"; break;
                        case "O": the_running_no.RunningSequenceWord = "P"; break;
                        case "P": the_running_no.RunningSequenceWord = "Q"; break;
                        case "Q": the_running_no.RunningSequenceWord = "R"; break;
                        case "R": the_running_no.RunningSequenceWord = "S"; break;
                        case "S": the_running_no.RunningSequenceWord = "T"; break;
                        case "T": the_running_no.RunningSequenceWord = "W"; break;
                        case "W": the_running_no.RunningSequenceWord = "X"; break;
                        case "X": the_running_no.RunningSequenceWord = "Y"; break;
                        case "Y": the_running_no.RunningSequenceWord = "Z"; break;
                        case "Z": the_running_no.RunningSequenceWord = "AA"; break;
                        case "AA": the_running_no.RunningSequenceWord = "AB"; break;
                        default: the_running_no.RunningSequenceWord = "ERR"; break;
                    }
                    the_running_no.RunningSequence = 1;
                    #endregion
                }


                new_running_no = the_org.OrgCode.ToUpper()+ the_running_no.RunningPrefix + the_running_no.RunningSequenceWord + the_running_no.RunningSequence.ToString(running_number_length);

                dc_sys.SubmitChanges();
                return new_running_no;
            }
            catch (Exception ex)
            {
                return "ERR";
            }

        }
    }
}