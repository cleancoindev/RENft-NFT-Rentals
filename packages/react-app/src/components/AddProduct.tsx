import React, { useState, useEffect, useContext } from 'react';
import { Box, Form, Input, Field, Flex, Button, Modal, Card } from 'rimble-ui';
import { Button as MaterialButton } from '@material-ui/core';
import { addProduct } from '../config/index'
import WalletContext from '../ctx/wallet';

type AddProductProps = {
  isOpen: boolean;
  setIsOpen: (boolean) => void;
};

const AddProduct: React.FC<AddProductProps> = ({ isOpen, setIsOpen }) => {
  const [validated, setValidated] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formInputValue, setFormInputValue] = useState('');
  const [duration, setDuration] = useState(0);
  const { wallet, web3 } = useContext(WalletContext);

  const validateInput = (e): void => {
    e.target.parentNode.classList.add('was-validated');
  };

  const handleInput = (e): void => {
    setInputValue(e.target.value);
    validateInput(e);
  };

  const handleFormInput = (e): void => {
    setFormInputValue(e.target.value);
    validateInput(e);
  };

  const handleDuration = (e): void => {
    setDuration(e.target.value);
    validateInput(e);
  };

  const validateForm = (): void => {
    // Perform advanced validation here
    if (inputValue.length > 0) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  useEffect(() => {
    validateForm();
  });

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    console.log('connector', wallet?.connector);
    console.log('web3', web3);
    // need a way to get the web3 instance
    if (wallet) await addProduct(web3, inputValue, formInputValue, duration, wallet.account);
  };

  const closeModal = (): void => setIsOpen(false);

  return (
    <Modal isOpen={isOpen}>
      <Card width="520px" p={0}>
        <Button.Text
          icononly
          icon="Close"
          color="moon-gray"
          position="absolute"
          top={0}
          right={0}
          mt={3}
          mr={3}
          onClick={closeModal}
        />
        <Box p={4}>
          <Box>
            <Form onSubmit={handleSubmit}>
              <Flex
                mx={-3}
                flexWrap="wrap"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box width={[1, 1, 1 / 2]} px={3}>
                  <Field label="NFT Address" validated={validated} width={1}>
                    <Input
                      type="text"
                      required // set required attribute to use brower's HTML5 input validation
                      onChange={handleInput}
                      value={inputValue}
                      width={1}
                    />
                  </Field>
                </Box>
                <Box width={[1, 1, 1 / 2]} px={3}>
                  <Field label="NFT ID" validated={validated} width={1}>
                    <Form.Input
                      type="number"
                      required // set required attribute to use brower's HTML5 input validation
                      onChange={handleFormInput}
                      value={formInputValue}
                      width={1}
                    />
                  </Field>
                </Box>
                <Box width={[1, 1, 1 / 2]} px={3}>
                  <Field
                    label="Duration (in days)"
                    validated={validated}
                    width={1}
                  >
                    <Form.Input
                      type="number"
                      required // set required attribute to use brower's HTML5 input validation
                      onChange={handleDuration}
                      value={duration}
                      width={1}
                    />
                  </Field>
                </Box>
              </Flex>

              <MaterialButton
                type="submit"
                variant="outlined"
                disabled={!validated}
              >
                Add
              </MaterialButton>
            </Form>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
};

export default AddProduct;
