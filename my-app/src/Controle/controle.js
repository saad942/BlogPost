
import React, { useState, useEffect } from "react";
import './images.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Home() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [information, setInformation] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [added, setAdded] = useState(0);
    const [image, setImage] = useState(); // Set initial value of image to null

    useEffect(() => {
        axios.get(`http://localhost:3002/user/products/${user.id}`, {
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
                    image:image,
                    name: name,
                    description: description,
                    category: category,
                }, {
                    headers: {
                        'Authorization': ` ${token}`
                    }
                });
                const updatedInformation = [...information];
                updatedInformation[editIndex] = { id: information[editIndex].id,image:image, name: name, description: description, category: category };
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
                formData.append('user_id', user.id);
                formData.append('image', image);
                formData.append('category', category);

                const response = await axios.post("http://localhost:3002/user/products", formData, {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
                console.log('Product added:', response.data);
                setInformation([...information, response.data]);
                const postInfo=response.data.postInfo;
                localStorage.setItem('post', JSON.stringify(postInfo)); // Store user info as JSON string
                setName('');
                setDescription('');
                setImage(null);
                setCategory('');
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
            setImage(information[index].image);
            setDescription(information[index].description);
            setCategory(information[index].category);
            setEditIndex(index);
        } else {
            console.error(`Product with ID ${id} not found`);
        }
    };

    return (
        <div className="home-container">
            <img src="./images/pexels-photo-3631711.jpeg" className="img" alt="Example" />
            <div className="form-container">
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option>category</option>
                <option value="News">News</option>
                <option value="Économique">Économique</option>
                <option value="Sport">Sport</option>
            </select>
                <input type="file"   onChange={(e) => setImage(e.target.files[0])} />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <button onClick={add}>{editIndex !== null ? 'Update' : 'Add'}</button>
                {information.map((info, index) => (
                    <div className="post" key={index}>
                        <h2>{info.name}</h2>
                        <h4>{info.category}</h4>
                        <img src={`http://localhost:3002/${info.image}`} alt={info.name} style={{ maxWidth: '200px' }} />
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
