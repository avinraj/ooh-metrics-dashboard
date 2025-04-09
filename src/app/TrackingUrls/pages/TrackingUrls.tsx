import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  useTheme
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useEffect, useRef, useState } from "react";
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

  // Modal state
  const [openQrModal, setOpenQrModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<TrackingLinksModel | null>(
    null
  );
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    getTrackingLinksData();
  }, []);

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

  const onFilterChange = (newFilterModel: GridFilterModel) => {
    setFilterModel(newFilterModel);
  };

  const handleOpenQrModal = (row: TrackingLinksModel) => {
    setSelectedLink(row);
    setOpenQrModal(true);
  };

  const handleCloseQrModal = () => {
    setOpenQrModal(false);
    setSelectedLink(null);
  };

  const handleDownloadQr = () => {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${selectedLink?.name || "qr-code"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

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
            href={`https://oohmetrics.co/tracklink/${params.value}`}
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
    {
      field: "qr_code",
      headerName: "QR Code",
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          sx={{ color: "black", borderColor: "black" }}
          onClick={() => handleOpenQrModal(params.row)}
        >
          View QR Code
        </Button>
      ),
      width: 150,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
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

      {/* QR Code Modal */}
      <Dialog
        open={openQrModal}
        onClose={handleCloseQrModal}
        maxWidth="xs"
        fullWidth
      >
        <DialogActions
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            variant="h6"
            sx={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}
          >
            QR Code
          </Typography>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={handleDownloadQr}
          >
            Download
          </Button>
        </DialogActions>
        <DialogContent
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {selectedLink && (
            <QRCodeCanvas
              value={`https://oohmetrics.co/tracklink/${selectedLink._id}`}
              size={200}
              ref={qrCanvasRef}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrackingUrls;
