import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsModel } from "../../../../models/analytics";
import { TrackingLinksModel } from "../../../../models/trackingLinks";
import TrackingUrlMap from "./DuroflexTrackingUrlMap";

interface DuroflexTrackingUrlProps {
  analyticsData: AnalyticsModel[];
  trackingLinksData: TrackingLinksModel[];
}

const DuroflexTrackingUrl: React.FC<DuroflexTrackingUrlProps> = ({
  analyticsData,
  trackingLinksData,
}) => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<AnalyticsModel[]>(analyticsData);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [{ field: "", operator: "" }],
  });

  // Create a Map for faster tracking URL lookup
  const trackingLinksMap = useMemo(
    () => new Map(trackingLinksData.map((link) => [link._id, link.url])),
    [trackingLinksData]
  );

  const storeName = useMemo(
    () => new Map(trackingLinksData.map((link) => [link._id, link.name])),
    [trackingLinksData]
  );

  // Define Columns for DataGrid
  const columns: GridColDef[] = [
    {
      field: "createdAt",
      headerName: t("attribution.trackingurl.dateAndTime"),
      width: 180,
    },
    {
      field: "device_model",
      headerName: t("attribution.trackingurl.deviceModel"),
      width: 150,
    },
    {
      field: "device_type",
      headerName: t("attribution.trackingurl.deviceType"),
      width: 120,
    },
    {
      field: "device_vendor",
      headerName: t("attribution.trackingurl.deviceVendor"),
      width: 130,
    },
    {
      field: "ip_address",
      headerName: t("attribution.trackingurl.ipAddress"),
      width: 150,
    },
    {
      field: "name",
      headerName: t("attribution.trackingurl.storeAddress"),
      width: 150,
    },
    {
      field: "url",
      headerName: t("attribution.trackingurl.url"),
      width: 250,
      renderCell: (params) => {
        return params.value ? (
          <a
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "none" }}
          >
            {params.value}
          </a>
        ) : (
          "No URL Available"
        );
      },
    },
  ];

  // Transform analyticsData into DataGrid row format
  const rows = tableData.map((obj, index) => ({
    id: index,
    createdAt: obj.createdAt,
    campaign_id: obj.campaign_id,
    device_model: obj.device_model,
    device_type: obj.device_type,
    device_vendor: obj.device_vendor,
    ip_address: obj.ip_address,
    url: trackingLinksMap.get(obj.qr_link_id) || "",
    name: storeName.get(obj.qr_link_id) || "",
  }));

  const onFilterChange = (newFilterModel: GridFilterModel) => {
    setFilterModel(newFilterModel);
  };

  const onPaginationChange = useCallback(
    (newPaginationModel: GridPaginationModel) => {
      setPaginationModel(newPaginationModel);
    },
    []
  );

  return (
    <Box sx={{ width: "100%", height: 600 }}>
      <TrackingUrlMap
        data={tableData}
        refetchData={(newData) => {
          setTableData((prevData) => {
            const exists = prevData.some((item) => item._id === newData._id);
            console.log(exists, "Exists");
            if (!exists) {
              return [newData, ...prevData];
            }
            return prevData;
          });
        }}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange}
        pageSizeOptions={[5, 10, 20]}
        filterModel={filterModel}
        onFilterModelChange={onFilterChange}
      />
      {/* <TrackingUrlReport /> */}
    </Box>
  );
};

export default React.memo(DuroflexTrackingUrl);
