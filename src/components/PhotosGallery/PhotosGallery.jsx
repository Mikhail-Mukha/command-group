import { Grid, PhotosGalleryItem } from '..';

export const PhotosGallery = ({ images, openModal }) => {
  return (
    <Grid>
      {images.map(({ id, avg_color, alt, src }) => (
        <PhotosGalleryItem
          key={id}
          alt={alt}
          src={src}
          color={avg_color}
          openModal={openModal}
        />
      ))}
    </Grid>
  );
};
