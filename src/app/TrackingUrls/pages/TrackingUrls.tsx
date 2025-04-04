import { Box, Grid, Typography, useTheme } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridFilterModel,
    GridPaginationModel,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { TrackingLinksModel } from "../../../models/trackingLinks";
import trackingLinksService from "../../Attribution/services/trackingLinks.service";

const TrackingUrls = () => {
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [{ field: "", operator: "" }],
  });
  const [trackingLinksData, setTrackingLinksData] = useState<
    TrackingLinksModel[]
  >([]);

  const onFilterChange = (newFilterModel: GridFilterModel) => {
    setFilterModel(newFilterModel);
  };

  useEffect(() => {
    getTrackingLinksData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "URL Name",
      width: 280,
    },
    {
      field: "url",
      headerName: "URL",
      width: 450,
    },
    {
      field: "_id",
      headerName: "Our Tracking URL",
      renderCell: (params) => {
        return params.value ? (
          <a
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "none" }}
          >
            {`https://oohmetrics.co/tracklink/${params.value}`}
          </a>
        ) : (
          "No URL Available"
        );
      },
      width: 420,
    },
  ];

  const getTrackingLinksData = async () => {
    try {
      const response: any = await trackingLinksService.getTrackingLinks({
        pageSize: 100,
      });
      if (response?.data?.data?.length) {
        setTrackingLinksData(response.data.data);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const onPaginationChange = useCallback(
    (newPaginationModel: GridPaginationModel) => {
      setPaginationModel(newPaginationModel);
    },
    []
  );
  return (
    <Grid container>
      <Grid item xs={12}>
        {" "}
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "5px",
            width: "fit-content",
            marginBlock: "25px",
          }}
        >
          <Typography variant="h3">Tracking Urls</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <DataGrid
            rows={trackingLinksData}
            getRowId={(row) => row._id}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationChange}
            pageSizeOptions={[5, 10, 20]}
            filterModel={filterModel}
            onFilterModelChange={onFilterChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TrackingUrls;
