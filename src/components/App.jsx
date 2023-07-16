import { Component } from 'react';
import css from './App.module.css';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

const secretKey = '35496971-fbfc726ccc8da9a7b0725eb09';

export class App extends Component {
  constructor(Props) {
    super(Props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  state = {
    images: [],
    isLoading: false,
    error: '',
    currentPage: 1,
    SelectedPicture: '',
  };

  async componentDidMount() {
    const images = await this.getImages('', 1);
    this.setState({ images });

    document.addEventListener('keydown', e => {
      if (e.code == 'Escape') {
        this.setState({ SelectedPicture: '' });
      }
    });
  }

  async componentDidUpdate() {}

  getImages = async (query, page) => {
    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${secretKey}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (!response.ok) {
      if (response.status == 404) {
        Notiflix.Notify.failure('Oops, there is no pictures with that name');
      }
      throw new Error(response.status);
    }
    const result = await response.json();
    if (result.total == 0) {
      Notiflix.Notify.failure('Oops, there is no pictures with that name');
    }
    return result.hits;
  };

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ images: [] });

    const form = event.currentTarget;
    const query = form.elements.query.value;

    if (query != '') {
      const images = await this.getImages(query, 1);
      this.setState({ images });
    } else {
      Notiflix.Notify.failure('Oops, there is no pictures with that name');
    }
  }

  handleModal(URL) {
    this.setState({ SelectedPicture: URL });
  }

  hideModal() {
    this.setState({ SelectedPicture: '' });
  }

  render() {
    const { images, isLoading, SelectedPicture } = this.state;

    return (
      <div className={css.App}>
        {' '}
        <Searchbar submit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} onClick={this.handleModal} />
        ) : (
          ''
        )}
        {isLoading ? <Loader /> : ''}
        {images.length > 0 ? <Button /> : ''}
        {SelectedPicture != '' ? (
          <Modal largeImageURL={SelectedPicture} hideModal={this.hideModal} />
        ) : (
          ''
        )}
      </div>
    );
  }
}
