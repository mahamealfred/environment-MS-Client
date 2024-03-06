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
import axios from "axios";
// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { useEffect, useState } from "react";

export default function data() {
  const [tableData, setTableData] = useState({ columns: [], rows: [] });

  const headers= [
    { Header: "Category Name", accessor: "project", width: "30%", align: "left" },
    { Header: "Number of Products", accessor: "budget", align: "left" },
    { Header: "Created Date", accessor: "completion", align: "center" },
    { Header: "action", accessor: "action1", align: "center" },
  ]

  useEffect(() => {
    let isMounted = true;
  
    axios.get('http://localhost:8000/api/v1/category')
      .then(response => {
        if (isMounted) {
          const apiData = response.data;
          const mappedData = apiData?.data.map(item => ({
            project: <Project image={LogoAsana} name={item.categoryName} />,
            budget: (
              <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            {item.Products?.length} 
            </MDTypography>
            ),
            completion: (
              <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            {item.createdAt} 
            </MDTypography>
            ),
            action: (
              <MDTypography component="a" href="#" color="text">
              <Icon>more_vert</Icon>
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

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: tableData.columns,
    rows: tableData.rows
  };
}
