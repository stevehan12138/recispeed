import { Box, Link, Image, SimpleGrid, Heading, Text, useDisclosure, Tag, TagLabel } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import Recipe from './Recipe'

const baseURL = `https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/`;

function Recipes(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ recipeData, setRecipeData ] = useState({});
    const [ fetchedData, setFetchedData ] = useState<any[]>([]);

    function onRecipeClick(recipe: any) {
        setRecipeData(recipe);
        onOpen()
    }

    useEffect(() => {
        props.selectedList.forEach((element: any) => {
            fetch(baseURL + `filter.php?i=${element}`)
                .then(res => res.json())
                .then(data => {
                    setFetchedData(prev => {
                        data = data?.meals;
                        if (data) {
                            //remove all recipes that are already in the list
                            data = data.filter((recipe: any) => !prev.some((prevRecipe: any) => prevRecipe.idMeal === recipe.idMeal));
                            return [...prev, ...data];
                        }
                        return prev;
                    });
                })
        });
        
    }, []);


    return <Box w='60%' m='50px auto'>
        <Heading size='xl' textAlign='center' py='30px' color='#FCFFF7'>
            We found {fetchedData.length} recipes for you!
        </Heading>
        <Box className="Box">
            <Box mb='10px'>
                {props.selectedList.map((item: any) => {
                        return  <Tag size='lg' m='5px 5px'borderRadius='full' variant='solid' colorScheme='teal' key={item}>
                            <TagLabel>{item}</TagLabel>
                        </Tag> 
                    })}
            </Box>
            <SimpleGrid minChildWidth='400px' spacing='40px'>
                {fetchedData.map((recipe:any) => {
                    return (
                        <Link display='inline-block' bg='#EBEBEB' minH='30px' py='35px' px="45px"  borderRadius='20px' key={recipe.idMeal} onClick={() => {
                            onRecipeClick(recipe)
                        }} css={`
                            &:hover {
                                box-shadow: 3px 4px 12px 7px rgba(0,0,0,0.3);
                            }
                        `}>
                            <Heading size='xl' mb='20px' color='#000000'>
                                {recipe.strMeal} 
                            </Heading> 
                            <Text color='#DC8056' fontSize='lg' borderBottom={'15px'} borderColor="#000000">&emsp;&emsp;{recipe.strInstructions}</Text>
                            
                            <Image src={`${recipe.strMealThumb}/preview`} alt="recipe" float='right' borderRadius='12px' borderTop={'15px'}/>
                        </Link>
                    )
                })}
            </SimpleGrid>
            <Recipe isOpen={isOpen} onClose={onClose} recipeData={recipeData} />
        </Box>
    </Box>;
}

export default Recipes;