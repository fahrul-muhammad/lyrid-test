import {useState} from 'react';

export const modalHandler = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return {showModal, setShowModal};
};
