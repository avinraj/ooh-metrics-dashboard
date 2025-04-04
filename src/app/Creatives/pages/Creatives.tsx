import { Close, Fullscreen } from "@mui/icons-material";
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import image1 from "../../../assets/duroflex/160 x 600.jpg";
import image2 from "../../../assets/duroflex/300 x 250.jpg";
import image3 from "../../../assets/duroflex/300 x 600.jpg";
import image4 from "../../../assets/duroflex/320 x 480.jpg";
import image5 from "../../../assets/duroflex/320 x 50.jpg";
import image6 from "../../../assets/duroflex/728 x 90.jpg";
import image7 from "../../../assets/duroflex/New leaflet.jpg";

const images = [
  { src: image1, name: "160 x 600" },
  { src: image2, name: "300 x 250" },
  { src: image3, name: "300 x 600" },
  { src: image4, name: "320 x 480" },
  { src: image5, name: "320 x 50" },
  { src: image6, name: "728 x 90" },
  { src: image7, name: "New Leaflet" },
];

const Creatives = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    name: string;
  } | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleOpen = (image: { src: string; name: string }) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Grid container>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          padding: "5px",
          width: "fit-content",
          marginBlock: "25px",
        }}
      >
        <Typography variant="h3">Creatives</Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: 2,
        }}
      >
        {/* Display uploaded images/videos */}
        {images.length > 0 && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {images.map((img, index) => (
                <Grid item key={index} xs={6} md={3}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "300px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "270px",
                        position: "relative",
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      {hoverIndex === index && (
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            transition: "opacity 0.3s",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.7)",
                            },
                          }}
                          onClick={() => handleOpen(img)}
                        >
                          <Fullscreen color="primary" sx={{ fontSize: 30 }} />
                        </IconButton>
                      )}
                    </Box>

                    {/* Image Name */}
                    <Typography
                      variant="body1"
                      sx={{ marginTop: "8px", fontWeight: "bold" }}
                    >
                      {img.name}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>

      {/* Image Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogActions
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            variant="h6"
            sx={{ marginTop: "10px", marginLeft: "15px", fontWeight: "bold" }}
          >
            {selectedImage?.name ?? ""}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogActions>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                borderRadius: "8px",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Creatives;
