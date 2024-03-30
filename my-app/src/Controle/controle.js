import React, { useState, useEffect } from "react";
import './images.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import jwt_decode from 'jwt-decode';


function Home() {
    const [name, setname] = useState('');
    const [description, setDescription] = useState('');
    const [information, setInformation] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    const UserId=decode.user_id
    const [added, setAdded] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:3002/user/products`,
            {
                headers: {
                    'authorization': ` ${token}` // Send token in the Authorization header
                }
            })
            .then((response) => {


                setInformation(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
           
    }, [added]);


    const add = async (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            try {
                await axios.put(`http://localhost:3002/user/products/${information[editIndex].id}`, {
                    name: name,
                    description: description
                },  {headers: {
                    'authorization': ` ${token}` // Send token in the Authorization header
            }});
                const updatedInformation = [...information];
                updatedInformation[editIndex] = { id: information[editIndex].id, name: name, description: description };
                setInformation(updatedInformation);
                setEditIndex(null);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            try {
                const response = await axios.post("http://localhost:3002/user/products", {
                    name: name,
                    description: description,
                    user_id: UserId 
                },  {headers: {
                    'authorization': ` ${token}` // Send token in the Authorization header
            }});
                console.log('Product added:', response.data);
                setInformation([...information, response.data]);
                setAdded(1);
                setname('');
                setDescription('');
            } catch (error) {
                console.error('Error adding product:', error);
            }
        }
    };

    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3002/user/products/${id}`   ,{
                headers: {
                    'authorization': ` ${token}` // Send token in the Authorization header
                }
            })
            console.log(response);
            console.log('Product deleted successfully');
            setInformation(information.filter(item => item.id !== id));
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    };

    const editPost = (id) => {
        const index = information.findIndex(product => product.id === id);
        if (index !== -1) {
            setname(information[index].name);
            setDescription(information[index].description);
            setEditIndex(index);
        } else {
            console.error(`Product with ID ${id} not found`);
        }
    };

    return (
        <div className="home-container">
            <img src="./images/pexels-photo-3631711.jpeg" className="img" alt="Example" />
            <div className="form-container">
                <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="name" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <button onClick={add}>{editIndex !== null ? 'Update' : 'Add'}</button>
                {information.map((info, index) => (
                    <div className="post" key={index}>
                        <h2>{info.name}</h2>
                        <p>{info.description}</p>
                        <button onClick={() => deletePost(info.id)}>Delete</button>
                        <button onClick={() => editPost(info.id)}>Update</button>
                    </div>
                ))}
            </div>
        </div>
    );
}





export default Home;
