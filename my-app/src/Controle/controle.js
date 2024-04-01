
import React, { useState, useEffect } from "react";
import './images.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Home() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [information, setInformation] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [added, setAdded] = useState(0);
    const [image, setImage] = useState(null); // Set initial value of image to null

    useEffect(() => {
        axios.get(`http://localhost:3002/user/products/${user._id}`, {
            headers: {
                'Authorization': ` ${token}` // Fix Authorization header
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
                    description: description,
                }, {
                    headers: {
                        'Authorization': ` ${token}`
                    }
                });
                const updatedInformation = [...information];
                updatedInformation[editIndex] = { id: information[editIndex].id, name: name, description: description };
                setInformation(updatedInformation);
                setEditIndex(null);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('description', description);
                formData.append('user_id', user._id);
                formData.append('image', image); 

                const response = await axios.post("http://localhost:3002/user/products", formData, {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
                console.log('Product added:', response.data);
                setInformation([...information, response.data]);
                setName('');
                setDescription('');
                setImage(null);
                setAdded(added + 1);
            } catch (error) {
                console.error('Error adding product:', error);
            }
        }
    };

    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3002/user/products/${id}`, {
                headers: {
                    'Authorization': ` ${token}`
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
            setName(information[index].name);
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
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <button onClick={add}>{editIndex !== null ? 'Update' : 'Add'}</button>
                {information.map((info, index) => (
                    <div className="post" key={index}>
                        <h2>{info.name}</h2>
                        <p>{info.description}</p>
                        <img src={`data:image/png;base64,${info.image}`} alt={info.name} style={{ maxWidth: '200px' }} />
                        <button onClick={() => deletePost(info.id)}>Delete</button>
                        <button onClick={() => editPost(info.id)}>Update</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
