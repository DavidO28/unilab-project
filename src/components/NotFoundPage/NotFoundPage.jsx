import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="notFound">
            <p>Page can't be found</p>
            <Link to="/">Go to homepage...</Link>
        </div>
    );
}

export default NotFoundPage;