import { Box, Heading, Button, Input, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { useState } from 'react';

import ingredients from './ingredients.json'

function Select(props: any) {
    const [possibilities, setPossibilities] = useState(ingredients)

    function onSearchChange(e: any) {
        if(e.target.value === '') {
            setPossibilities(ingredients)
        } else {
            setPossibilities(ingredients.filter((ingredient: any) => ingredient.toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }

    return <Box bg='white' color='#DC8056' w='60%' m='50px auto' borderRadius='38px'>
        <Heading size='lg' textAlign='center' pt='30px'>
            Ingredients
        </Heading>
        <Heading size='sm' textAlign='center' mb='20px'>
            You have selected {props.selectedList.length} ingredients
        </Heading>
        <Box m='20px auto' w='80%'>
            <Box display='grid' placeItems='center' mb='30px'>
                <Input placeholder='Search for ingredients' onChange={onSearchChange} w='70%'/>
            </Box>
            <Box h='500px' overflowY='auto' css={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                background: '#DC8056',
                borderRadius: '24px',
                },
            }}>
                {possibilities.map((item: any) => {
                    return <Button m='3px 5px' variant='outline' colorScheme='orange' key={item} onClick={() => {
                        if(!props.selectedList.includes(item)) {
                            props.setSelectedList([...props.selectedList, item]);
                        }
                    }} >{item}</Button>
                })}
            </Box>

            <Box my='30px'>
                {props.selectedList.map((item: any) => {
                    return  <Tag size='lg' m='5px 5px' key={item} borderRadius='full' variant='solid' colorScheme='green'>
                                <TagLabel>{item}</TagLabel>
                                <TagCloseButton onClick={() => props.setSelectedList(props.selectedList.filter((ingredient: any) => ingredient !== item))} />
                            </Tag>
                })}
            </Box>
        </Box>

        <Box display='grid' placeItems='center' pb='30px'>
            <Button colorScheme='orange' w='60%' onClick={() => {
                if(props.selectedList.length > 0) {
                    props.setSelected(true)
                }
            }} size='lg'>Search</Button>
        </Box>
    </Box>;
}



export default Select;
