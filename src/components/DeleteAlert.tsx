import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import themeModal from '../theme/theme';

const DeleteConfirmationModal = ({
  isVisible,
  setIsVisible,
  onDelete,
  onClose,
}: any) => {
  const theme = themeModal();

  const handleShowModal = () => setIsVisible(true);
  const handleHideModal = () => setIsVisible(false);
  const handleConfirmDelete = () => {
    onDelete();
    handleHideModal();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={[styles.modalText, { color: theme.fullColor }]}>
          Are you sure you want to delete?
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleHideModal} />
          <Button title="Delete" color="red" onPress={handleConfirmDelete} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default DeleteConfirmationModal;
