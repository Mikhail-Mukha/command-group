import { GridItem } from '..';
import s from './PhotosGalleryItem.module.css';
export const PhotosGalleryItem = ({ src, alt, color, openModal }) => {
  return (
    <GridItem>
      <div
        className={s.thumb}
        style={{ backgroundColor: color, borderColor: color }}
      >
        <img
          src={src.large}
          alt={alt}
          onClick={() => openModal(src.large, alt)}
        />
      </div>
    </GridItem>
  );
};
