import Select from "./components/Select";
import Recipes from "./components/Recipes";
import { useState, useRef } from "react";

import logo from "./components/logo.png";

import {
  Box,
  Heading,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Image
} from "@chakra-ui/react";

function App() {
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const [selected, setSelected] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <Box bg="#8BB979" h="100%" w="100%" overflowY='auto' position="sticky" top="0">
      <Box bg="#588646" w="100%" boxShadow="0px 1px 17px 7px rgba(0,0,0,0.58)" h='70px'>
        <Image src={logo} alt="logo" h='70px' ml='50px' display="inline-block" lineHeight='70px' />
        <Heading display="inline-block" color="white" lineHeight='70px' verticalAlign='top' ml='10px'>
          Recispeed
        </Heading>
        <Box float="right" p="20px 50px" display="inline-block">
          <Button colorScheme="orange" onClick={onOpen}>
            How to Use
          </Button>
        </Box>
      </Box>
      {selected ? <Recipes selectedList={selectedList} /> : <Select selectedList={selectedList} setSelectedList={setSelectedList} setSelected={setSelected}/> }

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader color="black">How to Use</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody color="black">
            Select what ingredient you currently have, and we will generate a
            list of recipes that you can make with them!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} color="black">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
}

export default App;
