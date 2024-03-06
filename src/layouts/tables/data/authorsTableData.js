/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";

export default function data() {
  const [tableData, setTableData] = useState({ columns: [], rows: [] });
  const headers= [
    { Header: "author", accessor: "author", width: "45%", align: "left" },
    { Header: "function", accessor: "function", align: "left" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "employed", accessor: "employed", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]
  useEffect(() => {
    let isMounted = true;
  
    axios.get('http://localhost:8000/api/v1/product')
      .then(response => {
        if (isMounted) {
          const apiData = response.data;
          console.log("data;;",apiData)
          const mappedData = apiData?.data.map(item => ({
            author: <Author image={team2} name={item.name} email={item.price} />,
            function: <Job title={item.quantityInStock} description={item.description} />,
            status: (
              <MDBox ml={-1}>
                <MDBadge badgeContent={item.createdAt} color="success" variant="gradient" size="sm" />
              </MDBox>
            ),
            employed: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                {item.updatedAt}
              </MDTypography>
            ),
            action: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                Edit
              </MDTypography>
            ),
          }));
  
          // Set the data in the state
          setTableData({ columns: headers, rows: mappedData });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    return () => {
      isMounted = false; 
    };
  }, []);


  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: tableData.columns,
    rows: tableData.rows
  };
}
