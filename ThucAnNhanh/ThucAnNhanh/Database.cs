using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace ThucAnNhanh
{
    public class Database
    {
        private string connectionString =
            "Data Source=(local);Initial Catalog=ThucAnNhanh_Test;"
            + "Integrated Security=true";
        public DataTable Query(string queryString)
        {
            DataTable dt = new DataTable();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                
                SqlCommand command = new SqlCommand(queryString, connection);
                
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    
                    dt.Load(reader);
               
            }
            return dt;
        }
        public int NonQuery(string QueryString)
        {
            int numroweffects = 0;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                connection.Open();
                SqlCommand command = new SqlCommand();
                command.CommandType = System.Data.CommandType.Text;
                command.CommandText = QueryString;
                command.Connection = connection;

                numroweffects = command.ExecuteNonQuery();
                connection.Close();


            }
            return numroweffects;
        }

        public int Insert(string InsertString)
        {
            return NonQuery(InsertString);
        }

        public int Delete(string DeleteString)
        {
            return NonQuery(DeleteString);
        }
        public int Update(string UpdateString)
        {
            return NonQuery(UpdateString);
        }
    }
}