import { getPhotos } from 'apiService/photos';
import { Button, Form, Loader, PhotosGallery, Text } from 'components';
import ImageModal from 'components/ImageModal/ImageModal';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      setLoading(true);
      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page,
        );
        if (!photos.length) {
          return setIsEmpty(true);
        }
        setImages(prevImages => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const onHandleSubmit = value => {
    setQuery(value);
    setImages([]);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
    setPage(1);
  };
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openModal = (url, alt) => {
    setShowModal(true);
    setAlt(alt);
    setModalUrl(url);
  };
  const closeModal = () => {
    setShowModal(false);
    setAlt('');
    setModalUrl('');
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <PhotosGallery images={images} openModal={openModal} />
      )}
      {isVisible && (
        <Button onClick={loadMore} disabled={loading}>
          {loading ? 'Loading' : 'Load more'}
        </Button>
      )}
      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {loading && <Loader />}
      {error && (
        <Text textAlign="center">❌ Something went wrong - {error}</Text>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      <ImageModal
        modalIsOpen={showModal}
        closeModal={closeModal}
        src={modalUrl}
        alt={alt}
      />
    </>
  );
};
