import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

/** Styles */
import "./googleCloud.less";

/** Components */
import DatasetSelector from "./DatasetSelector";
import { getServers } from "../../google/utils";

/** Providers */
import { useServer } from "../../providers/ServerProvider";
import { useAuth } from "../../providers/AuthProvider";

const DICOMStorePickerModal = ({ isOpen = false, onClose = () => {} }) => {
  const { servers, setServers } = useServer();
  const activeServer = servers.find(s => !!s.active);
  const { user } = useAuth();
  const url = activeServer.qidoRoot;

  const handleEvent = (data) => {
    const servers = getServers(data, data.dicomstore);
    setServers(servers);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Google Cloud Healthcare API"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
    >
      <DatasetSelector setServers={handleEvent} user={user} url={url} />
    </Modal>
  );
};

DICOMStorePickerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default DICOMStorePickerModal;