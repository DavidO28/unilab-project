import './FormPage.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '../../assets/images/FormPage/search.png';
import studentsData from '../../data/data';
import FilterComponent from '../FilterComponent/FilterComponent';
import PaginationComponent from '../PaginationComponent/PaginationComponent';

function FormPage() {
    const registrationComplete = localStorage.getItem('registrationComplete');
    const navigateTo = useNavigate();
    const name = localStorage.getItem('name');
    const picture = localStorage.getItem('picture');
    const [LogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const studentsPerPage = 10;
    const [filteredStudents, setFilteredStudents] = useState([]);
    const pageCount = Math.ceil(filteredStudents.length / studentsPerPage);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilterPopUp = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const initialFilters = {
        male: true,
        female: true,
        active: true,
        inactive: true,
    };
    const [filters, setFilters] = useState(initialFilters);

    const filteredAndPaginatedStudents = filteredStudents.slice(
        pageNumber * studentsPerPage,
        (pageNumber + 1) * studentsPerPage
    );

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
        setPageNumber(0);
    };

    const filterStudents = () => {
        const filteredData = studentsData.filter((person) => {
            return filters[person.gender] && filters[person.status];
        });
        setFilteredStudents(filteredData);
    };

    useEffect(() => {
        filterStudents();
    }, [filters]);

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

    const RowClass = (i) => {
        return i % 2 == 0 ? 'grayRow' : 'whiteRow';
    };

    const handlePageClick = (selectedPage) => {
        setPageNumber(selectedPage.selected);
    };

    const handleRedirect = () => {
        if (!registrationComplete) {
            navigateTo("/RegistrationPage");
        } else {
            navigateTo("/ApiPage");
        }
    }

    return (
        <div className="formPage">
            <header>
                <h2>Form</h2>
                <div className='headerContainer'>
                    <h2 className='apiHeadline' onClick={handleRedirect}>API</h2>
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
                <div className="formTableSearch">
                    <FilterComponent
                        filters={filters}
                        isFilterOpen={isFilterOpen}
                        toggleFilterPopUp={toggleFilterPopUp}
                        handleFilterChange={handleFilterChange}
                    />
                    <div className='searchInputContainer'>
                        <img src={SearchIcon} alt="searchIcon" />
                        <input type="search" name="search" id="search" />
                    </div>
                </div>
                <div className="formList">
                    <table>
                        <thead>
                            <tr>
                                <th>სტუდენტის სახელი <br /> და გვარი</th>
                                <th>სტატუსი</th>
                                <th>სქესი</th>
                                <th>ქულები</th>
                                <th>პირადი ნომერი</th>
                                <th>ელ.მეილი</th>
                                <th>მობილურის ნომერი</th>
                                <th>მისამართი</th>
                                <th>დაბადების თარიღი</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndPaginatedStudents.map((person, i) => (
                                <tr key={person.id} className={RowClass(i)}>
                                    <td>{person.name}</td>
                                    <td>{person.status}</td>
                                    <td>{person.gender}</td>
                                    <td>{person.points}</td>
                                    <td>ID-12345</td>
                                    <td>student@mail.com</td>
                                    <td>123-456-7890</td>
                                    <td>123 Main St</td>
                                    <td>1990-01-01</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default FormPage;