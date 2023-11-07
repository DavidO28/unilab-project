import './RegistrationPage.css';
import AddPhoto from '../../assets/images/RegistrationPage/add_a_photo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const [picture, setPicture] = useState('');
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const navigateTo = useNavigate();
    const [success, setSuccess] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        if (name && picture) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Picture = reader.result;
                localStorage.setItem('name', name);
                localStorage.setItem('picture', base64Picture);
                localStorage.setItem('registrationComplete', 'true');
                navigateTo('/FormPage');
            };
            reader.readAsDataURL(picture);
        } else {
            alert('Both, name and picture are required in order to sign in.');
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };


    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setPicture(selectedFile);
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setSuccess(true);
        }
    };

    return (
        <div className='registrationPage'>
            <form>
                <h2>Get Started</h2>
                <p>add a photo</p>

                <label className='fileLabel' htmlFor="photo">
                    <img
                        className='addPhoto'
                        src={image == null ? AddPhoto : image}
                        alt="photo"
                    />
                </label>
                <input
                    className='fileInput'
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {success && <p className='success'>Success! Picture uploaded.</p>}

                <label htmlFor="fname">fill in your name</label>
                <input
                    type="text"
                    name="fname"
                    id="fname"
                    placeholder='your name'
                    value={name}
                    onChange={handleNameChange}
                />

                <button onClick={handleSave}>Sign in</button>
            </form>
        </div>
    );
}

export default RegistrationPage;