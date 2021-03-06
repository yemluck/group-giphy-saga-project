import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function Sports({favorites}) {

    const dispatch=useDispatch();
    const handleChange = (event, picID) => {
        console.log('in handleChange', event, picID);

        dispatch({
            type: 'SET_CATEGORY',
            payload: {
                id: picID,
                category_id: event,
            }
        })
    };

    const deleteFavPic=(id) => {
        //id is being sent from the client on click of delete button into deleteFavPic function
        //now we send that id to DELETE_IMAGE SAGA 
            dispatch({
                type: "DELETE_IMAGE",
                payload: id
            })
    }
    
    return (
        <>
        <h1>Sports Favorites</h1>
        {favorites && // This is saying "if there is something in 'favorite', render
                // the following code, otherwise, don't render anything and don't give an error"
                // This prevents that when favorites is empty, the code freaks out trying to render
                // undefined or null values
                <div className='container'>
                        {favorites.map(fav => (
                            fav.category_id === 5 && 
                                <div className='picDiv' key={fav.id} >
                                <img 
                                    src={fav.url}
                                    width={200} 
                                    height={250}
                                    className='pic'
                                />
                                <div className= "categoryDlt"> 
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" >Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Age"
                                            defaultValue=''
                                            onChange={event => handleChange(event.target.value, fav.id)}
                                        >
                                        <MenuItem value={2} >Funny</MenuItem>
                                        <MenuItem value={3} >Animal</MenuItem>
                                        <MenuItem value={4}>Inspirational</MenuItem>
                                        <MenuItem value={5}>Sports</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                {/* on delete button click, the function deleteFavPic is triggered */}
                                <IconButton aria-label="delete" size="large" >
                                        <DeleteIcon fontSize= "inherit" onClick={()=> deleteFavPic(fav.id)} />
                                </IconButton>                                
                                </div>
                                </div>
                            ))}
                    </div>
                }
        </>
    )
};

export default Sports;