import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    Box
} from '@chakra-ui/react'
import { useRef } from "react";
import {useEffect, useState} from "react";

const baseURL = `https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/`;

function Recipe(props: any) {
    const cancelRef = useRef(null)
    const [recipeId, setrecipeId] = useState<any>();


    useEffect(() => {
        if(props.recipeData.idMeal) {
            fetch(baseURL + `lookup.php?i=${props.recipeData.idMeal}`)
                .then(response => response.json())
                .then(data => { 
                    setrecipeId(data.meals[0]);
                    console.log(data.meals[0])
                })
                .catch(err => console.error(err));
        }
    }, [props.recipeData.idMeal]);

    return (
        <>
            <AlertDialog
                isOpen={props.isOpen}
                leastDestructiveRef={cancelRef}
                onClose={props.onClose}
                size='2xl'
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold' color='black'>
                            {props.recipeData.strMeal}
                        </AlertDialogHeader>

                        <AlertDialogBody color='black'>
                            <img src={props.recipeData.strMealThumb} alt={props.recipeData.strMeal} />
                        </AlertDialogBody>

                        <AlertDialogBody color='black' fontSize={'1rem'} fontWeight='bold'>
                            <h1>How to Make {recipeId== null ? null : recipeId.strMeal}  </h1>
                        </AlertDialogBody>

                        <AlertDialogBody color='black' fontSize={'1rem'} fontFamily=''>
                            <h2> This meal is {recipeId== null ? null : recipeId.strArea} and is / contains {recipeId== null ? null : recipeId.strCategory} </h2>
                        </AlertDialogBody>

                        <AlertDialogBody color='black' fontSize={'1rem'} fontFamily='' fontWeight='bold'>
                            <h1> Ingredients: </h1>
                        </AlertDialogBody>

                        <AlertDialogBody color='black' fontSize={'18px'}>
                         

                                <p>{recipeId == null ? null : recipeId.strIngredient1}</p>
                                <p>{recipeId == null ? null : recipeId.strIngredient2}</p>
                                <p>{recipeId == null ? null : recipeId.strIngredient3}</p>
                                <p>{recipeId == null ? null : recipeId.strIngredient4}</p>
                                <p>{recipeId == null ? null : recipeId.strIngredient5}</p>
                                <p>{recipeId == null ? null : recipeId.strIngredient6}</p>
                                <p>{recipeId == null ? null : recipeId.strIngredient7}</p>
                                <p>{recipeId == null ? null : recipeId.strIngredient8}</p>
                                <p>{recipeId == null ? null : recipeId.strIngredient9}</p>

                        </AlertDialogBody>


                        <AlertDialogBody color='black' fontSize={'1rem'} fontFamily='' fontWeight='bold'>
                            <h1> Youtube Video: </h1>
                        </AlertDialogBody>

                        <AlertDialogBody color='black' fontSize={'18px'}>
                            {recipeId == null ? null : <p>{recipeId.strYoutube}</p> }
                        </AlertDialogBody>
 
                        <AlertDialogBody color='black' fontSize={'1rem'} fontFamily='' fontWeight='bold'>
                            <h1> Instructions: </h1>
                        </AlertDialogBody>

                        <Box>
                            <AlertDialogBody color='black'>
                                {recipeId == null ? null : <p>{recipeId.strInstructions}</p> }
                            </AlertDialogBody>
                        </Box>




                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={props.onClose} colorScheme='orange'>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default Recipe;
