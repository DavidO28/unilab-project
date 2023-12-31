import './ApiPage.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import axios from 'axios';

function ApiPage() {
    const registrationComplete = localStorage.getItem('registrationComplete');
    const navigateTo = useNavigate();
    const name = localStorage.getItem('name');
    const picture = localStorage.getItem('picture');
    const [LogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const studentsPerPage = 10;
    const [filteredStudents, setFilteredStudents] = useState([]);
    const pageCount = Math.ceil(filteredStudents.length / studentsPerPage);

    const filteredAndPaginatedStudents = filteredStudents.slice(
        pageNumber * studentsPerPage,
        (pageNumber + 1) * studentsPerPage
    );

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setFilteredStudents(response.data.slice(0, 100));
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('picture');
        localStorage.removeItem('registrationComplete');
    };

    useEffect(() => {
        if (!registrationComplete) {
            navigateTo("/RegistrationPage");
        }
    }, [registrationComplete]);

    const handlePageClick = (selectedPage) => {
        setPageNumber(selectedPage.selected);
    };

    const handleRedirect = () => {
        if (!registrationComplete) {
            navigateTo("/RegistrationPage");
        } else {
            navigateTo("/FormPage");
        }
    }

    return (
        <div className="ApiPage">
            <header>
                <h2>Api</h2>
                <div className='headerContainer'>
                    <h2 className='formHeadliner' onClick={handleRedirect}>Form</h2>
                    <div className='profile'>
                        <h2>{name}</h2>
                        <img
                            src={picture}
                            alt="UserPicture"
                            onClick={() => setLogoutModalVisible(true)}
                        />
                        {LogoutModalVisible && (
                            <div className="logoutOverlay" onClick={() => setLogoutModalVisible(false)}>
                                <div className="logoutModal">
                                    <p>Are you sure you want to log out?</p>
                                    <div className="modalButtonsBox">
                                        <button onClick={handleLogout}>Log Out</button>
                                        <button onClick={() => setLogoutModalVisible(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header >
            <div className="formTable">
                <div className="personContainer">
                    {filteredAndPaginatedStudents.map((person) => (
                        <div className='personBox' key={person.id} >
                            <div className='ellipse'>
                            <p>{person.userId}</p>
                            </div>
                            <p className='boldParagraph'>{person.title.slice(0, 25)}</p>
                            <p>{person.body.slice(0, 80)}</p>
                            <p>User Id: {person.userId}</p>
                        </div>
                    ))}
                </div>
                <PaginationComponent
                    pageNumber={pageNumber}
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
            </div>
        </div >
    );
}

export default ApiPage;